/**
 * Static export for Cloudflare Pages, Vercel or Netlify.
 *
 * Run after `npm run build`. It starts the production SSR server once,
 * fetches every public page, and writes the fully rendered HTML (titles,
 * meta tags, structured data, canonical links) into dist/client:
 *
 *   /          -> dist/client/index.html
 *   /services  -> dist/client/services.html   (served at /services)
 *   unknown    -> dist/client/404.html
 *
 * It also writes sitemap.xml and llms.txt. Deploy the dist/client folder.
 */
import { spawn } from 'node:child_process';
import { writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_HOST = 'automationgod.ca';
const PORT = 4789;
const ROUTES = ['/', '/services', '/projects', '/book', '/contact'];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'dist', 'client');
const serverBundle = join(root, 'dist', 'server.bundle.mjs');

if (!existsSync(serverBundle)) {
  console.error('dist/server.bundle.mjs not found. Run `npm run build` first.');
  process.exit(1);
}

const server = spawn(process.execPath, [serverBundle], {
  env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'inherit'],
});

const stop = () => {
  try { server.kill(); } catch { /* already stopped */ }
};
process.on('exit', stop);

async function get(path) {
  return fetch(`http://127.0.0.1:${PORT}${path}`, {
    redirect: 'manual',
    // Make the server render the public https URLs in canonical / sitemap.
    headers: { Host: SITE_HOST, 'X-Forwarded-Proto': 'https', 'X-Forwarded-Host': SITE_HOST },
  });
}

async function waitForServer() {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await get('/');
      // 503 = server is up but the SSR module is still loading.
      if (res.status === 200) return;
    } catch { /* not listening yet */ }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('Production server did not start in time.');
}

try {
  await waitForServer();

  // The SPA shell is no longer needed as index.html: "/" gets the rendered home page.
  for (const route of ROUTES) {
    const res = await get(route);
    if (res.status !== 200) throw new Error(`${route} returned ${res.status}`);
    const html = await res.text();
    const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    writeFileSync(join(outDir, file), html);
    console.log(`  ✓ ${route.padEnd(10)} -> ${file}`);
  }

  const notFound = await get('/__not-found__');
  writeFileSync(join(outDir, '404.html'), await notFound.text());
  console.log('  ✓ 404        -> 404.html');

  for (const file of ['sitemap.xml', 'llms.txt', 'robots.txt']) {
    const res = await get(`/${file}`);
    if (res.status === 200) {
      writeFileSync(join(outDir, file), await res.text());
      console.log(`  ✓ /${file}`);
    }
  }

  // Server-only files that should not be published.
  for (const f of ['airo-media.json']) rmSync(join(outDir, f), { force: true });

  console.log(`\nStatic site ready in dist/client — deploy that folder.`);
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  stop();
}
