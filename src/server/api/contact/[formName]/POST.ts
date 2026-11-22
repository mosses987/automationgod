/** TREAT AS IMMUTABLE - This file is protected by the file-edit tool
 *
 * Forwards contact form submissions to the Inbox backend /api/v2/contact endpoint.
 * Config values are read from contact-form.config.json (map of form entries).
 * Inbox backend host is resolved at runtime from GODADDY_API_BASE_URL.
 */
import type { Request, Response } from "express";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isIPv4, isIPv6 } from "node:net";

interface ContactFormEntry {
	brandId: string;
	categoryId: number | string;
	overrideEmail?: string;
}

interface ContactFormConfig {
	forms: Record<string, ContactFormEntry>;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function loadConfig(): ContactFormConfig {
	// publish (dist-only): cwd = /app/dist → contact-form.config.json
	// dev (preview):        cwd = /app     → src/lib/contact-form.config.json
	const candidates = [
		join(process.cwd(), "contact-form.config.json"),
		join(process.cwd(), "src/lib/contact-form.config.json"),
	];
	for (const p of candidates) {
		try {
			return JSON.parse(readFileSync(p, "utf-8")) as ContactFormConfig;
		} catch (err: unknown) {
			// Only skip missing-file errors; surface anything unexpected
			const code = (err as NodeJS.ErrnoException).code;
			if (code !== "ENOENT") {
				console.error("[contact] config read error at", p, err);
			}
		}
	}
	throw new Error("contact-form.config.json not found");
}

function resolveInboxHost(): string {
	const apiBase = process.env.GODADDY_API_BASE_URL || "";
	if (apiBase.includes("dev-godaddy.com")) return "reamaze.dev-godaddy.com";
	if (apiBase.includes("test-godaddy.com")) return "reamaze.test-godaddy.com";
	return "reamaze.godaddy.com";
}

const inboxHost = resolveInboxHost();

function getConfig(): ContactFormConfig | null {
	try {
		return loadConfig();
	} catch {
		return null;
	}
}

// ---------------------------------------------------------------------------
// IP rate limiting — 5 requests per 60 seconds per visitor IP
// In-memory per process: resets on restart, does not protect across instances.
// ---------------------------------------------------------------------------

interface RateBucket {
	count: number;
	resetAt: number;
}

/** The form heading. The inbox shows it as the conversation title. */
const CONTACT_FORM_TITLE_KEY = "__gd_contact_form_title";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const rateBuckets = new Map<string, RateBucket>();

// Prune expired buckets periodically so the Map doesn't grow unbounded.
setInterval(() => {
	const now = Date.now();
	for (const [ip, bucket] of rateBuckets) {
		if (now > bucket.resetAt) rateBuckets.delete(ip);
	}
}, RATE_WINDOW_MS);

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const bucket = rateBuckets.get(ip);

	if (!bucket || now > bucket.resetAt) {
		rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
		return false;
	}

	if (bucket.count >= RATE_LIMIT) return true;

	bucket.count++;
	return false;
}

// ---------------------------------------------------------------------------
// Visitor IP
// dev-supervisor is always fronted by Cloudflare; the real client IP is in
// Cf-Connecting-Ip. Fall back to X-Forwarded-For (first entry), then socket.
// Never use req.socket.remoteAddress alone — that's the dev-supervisor proxy.
// ---------------------------------------------------------------------------

function getVisitorIp(req: Request): string {
	const cfIp = req.headers["cf-connecting-ip"];
	if (typeof cfIp === "string" && cfIp.trim()) return cfIp.trim();

	const xff = req.headers["x-forwarded-for"];
	if (typeof xff === "string" && xff.trim()) {
		return xff.split(",")[0]?.trim() ?? "";
	}

	return req.socket?.remoteAddress ?? req.ip ?? "unknown";
}

/**
 * Narrows an IP to its network prefix for logging: /24 for IPv4, /48 for IPv6.
 * Abuse triage still groups repeat offenders by subnet, but a full address is
 * personal data and these log lines are relayed into shared logs.
 */
export function truncateIp(ip: string): string {
	const trimmed: string = ip.trim();
	if (!trimmed || trimmed === "unknown") return "unknown";
	// Node reports an IPv4 peer on an IPv6 socket as ::ffff:a.b.c.d.
	const candidate: string = trimmed.startsWith("::ffff:") ? trimmed.slice(7) : trimmed;
	// X-Forwarded-For is client-supplied, so the value must be a real address before
	// any of it is logged. Counting separators is not enough: "a@example.com.c.d" has four
	// dot-separated fields and would otherwise be echoed back with its last one zeroed.
	if (isIPv4(candidate)) {
		const octets: string[] = candidate.split(".");
		return `${octets[0]}.${octets[1]}.${octets[2]}.0/24`;
	}
	if (isIPv6(candidate)) {
		// "::" may elide groups from the middle, so reading only the head can
		// over-truncate the prefix, never under-truncate it.
		const head: string = candidate.split("::")[0] ?? "";
		const groups: string[] = head.split(":").filter(Boolean).slice(0, 3);
		return groups.length > 0 ? `${groups.join(":")}::/48` : "::/48";
	}
	return "unknown";
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req: Request, res: Response): Promise<void> {
	const formName = req.params.formName as string;
	const body = req.body;

	const visitorIp = getVisitorIp(req);

	// Honeypot — bots fill hidden fields; real users never do
	if (body?._gotcha) {
		console.warn("[contact] honeypot triggered", { ip: truncateIp(visitorIp) });
		res.status(200).json({ success: true });
		return;
	}

	// Input validation — require an email. Inbox replies to a contact form by
	// email, so a visitor without one cannot get an answer.
	const email = body?.user?.email;
	if (!email) {
		res.status(400).json({ success: false, error: "user.email is required" });
		return;
	}

	const messageBody = body?.conversation?.messages_attributes?.[0]?.body;
	if (!messageBody) {
		res.status(400).json({ success: false, error: "conversation message body is required" });
		return;
	}

	const config = getConfig();
	if (!config?.forms) {
		res.status(500).json({ success: false, error: "Contact form not configured" });
		return;
	}

	const formConfig = Object.hasOwn(config.forms, formName) ? config.forms[formName] : undefined;
	if (!formConfig) {
		res.status(404).json({ success: false, error: `Form "${formName}" not configured` });
		return;
	}

	// IP rate limiting
	if (isRateLimited(visitorIp)) {
		console.warn("[contact] rate limit hit", { ip: truncateIp(visitorIp) });
		res.status(429).json({ success: false, error: "Too many requests" });
		return;
	}

	// Keys that start with "__gd_" are reserved for values this route sets.
	// Drop them from visitor data so a visitor cannot set, for example,
	// __gd_override_email and redirect the notification email.
	// The one exception is the form heading: the form sends it as a string in
	// __gd_contact_form_title, and the inbox only displays it.
	const visitorData: unknown = body.conversation?.data;
	const safeVisitorData: Record<string, unknown> =
		visitorData && typeof visitorData === "object" && !Array.isArray(visitorData)
			? Object.fromEntries(
					Object.entries(visitorData).filter(
						([key, value]: [string, unknown]) =>
							!key.toLowerCase().startsWith("__gd_") ||
							(key === CONTACT_FORM_TITLE_KEY && typeof value === "string"),
					),
				)
			: {};

	// Remap to Inbox backend api/v2/conversations shape:
	//   browser sends: { conversation: { messages_attributes, data }, user }
	//   Inbox v2 expects: { conversation: { message, category_id, user, data } }
	const payload = {
		conversation: {
			message: { body: messageBody },
			category_id: formConfig.categoryId,
			// Only email and name. If user.mobile is sent, Inbox makes the phone
			// number the contact's login and drops the email, so replies fail.
			user: { email, name: body.user?.name },
			data: {
				[CONTACT_FORM_TITLE_KEY]: formName,
				...safeVisitorData,
				__gd_type: "contact",
				...(formConfig.overrideEmail && { __gd_override_email: formConfig.overrideEmail }),
			},
		},
	};

	const url = `https://${formConfig.brandId}.${inboxHost}/api/v2/contact`;

	// Pass-through for the agent's httpCheck tool: when present, the Inbox
	// backend short-circuits before persisting (full validation still runs,
	// so payload-shape bugs surface as 4xx). Rate limiting and all other
	// guards still apply on this path — the header gates only the
	// downstream persist step, not anything here.
	const isHttpCheck = req.headers["x-airo-httpcheck"] === "true";

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Airo-Contact-Form": "true",
				"X-Forwarded-For": visitorIp,
				...(isHttpCheck && { "X-Airo-HttpCheck": "true" }),
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			// The response body is not logged. The request above carries the visitor's
			// contact fields, and a validation rejection is the case most likely to quote
			// the offending one back. The status is what identifies the failure.
			console.error("[contact] inbox backend rejected submission", {
				status: response.status,
			});
			// Cancelled rather than left unread: an unread body holds its connection out
			// of the pool, so a run of rejections would starve later submissions.
			void response.body?.cancel().catch((cancelError: unknown) => {
				console.error("[contact] inbox backend response cleanup failed", {
					status: response.status,
					error: cancelError instanceof Error ? cancelError.name : typeof cancelError,
				});
			});
			res.status(502).json({ success: false, error: "Failed to submit contact form" });
			return;
		}

		res.status(200).json({ success: true });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		console.error("[contact] fetch error:", message);
		res.status(502).json({ success: false, error: "Failed to submit contact form" });
	}
}
