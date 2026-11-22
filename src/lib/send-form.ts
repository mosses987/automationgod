/**
 * Sends a website form submission.
 *
 * If an access key is available, the form is emailed through Web3Forms
 * (https://web3forms.com). The access key is public by design: it can only
 * send submissions to the email address it was created for.
 *
 * If no key is set, it falls back to the built-in /api/contact/* route.
 */
// Web3Forms public access key (safe in client code). Submissions are emailed to the
// address this key was registered with. VITE_WEB3FORMS_KEY overrides it if set.
const WEB3FORMS_ACCESS_KEY = '0fe88022-e993-44eb-8631-c14591fdebb2';

export interface FormSubmission {
  /** Route name used by the built-in fallback, e.g. "contact". */
  formName: string;
  /** Shown as the email subject / inbox title. */
  title: string;
  name: string;
  email: string;
  message: string;
  /** Extra labelled answers, e.g. { Company: 'Acme' }. */
  fields?: Record<string, string>;
}

export async function sendForm(s: FormSubmission): Promise<void> {
  const key = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || WEB3FORMS_ACCESS_KEY;
  const fields = s.fields ?? {};

  if (key) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `${s.title} — ${s.name}`,
        from_name: 'Automation God website',
        name: s.name,
        email: s.email,
        message: s.message,
        ...fields,
      }),
    });
    const json = (await res.json()) as { success: boolean; message?: string };
    if (!json.success) throw new Error(json.message || 'Something went wrong.');
    return;
  }

  const res = await fetch(`/api/contact/${s.formName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conversation: {
        messages_attributes: [{ body: s.message }],
        data: { __gd_contact_form_title: s.title, ...fields },
      },
      user: { email: s.email, name: s.name },
    }),
  });
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error || 'Something went wrong.');
}
