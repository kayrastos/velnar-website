import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { dictionaries, LanguageProvider } from '../src/security/LanguageContext';
import type { Language } from '../src/security/en';

const output = path.resolve('dist');
const template = await readFile(path.join(output, 'index.html'), 'utf8');
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

async function renderPage(file: string, lang: Language, route: string, retired = false) {
  const t = dictionaries[lang];
  const publicUrl = lang === 'en' ? 'https://velnar.studio' : 'https://velnar.studio/tr';
  let html = template.replace('<html lang="en"', `<html lang="${lang}"`);
  const title = retired ? `${t.retired.title} | VELNAR` : t.seo.title;
  html = html.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`);
  const meta = (name: string, content: string, property = false) => {
    const attr = property ? 'property' : 'name';
    html = html.replace(new RegExp(`<meta ${attr}="${name}" content="[^"]*"`), `<meta ${attr}="${name}" content="${escape(content)}"`);
  };
  meta('description', t.seo.description);
  meta('robots', retired ? 'noindex, follow' : 'index, follow');
  meta('og:title', title, true);
  meta('og:description', t.seo.description, true);
  meta('og:locale', lang === 'tr' ? 'tr_TR' : 'en_US', true);
  meta('og:url', publicUrl, true);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${publicUrl}"`);
  html = html.replace('<div id="root"></div>', () => `<div id="root" data-language="${lang}" data-page="${retired ? 'retired' : 'marketing'}">${renderToString(<LanguageProvider initialLang={lang}><App path={route} /></LanguageProvider>)}</div>`);
  const destination = path.join(output, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
  console.log(`Rendered ${route} (${lang}${retired ? ', noindex' : ''}) → ${file}`);
}

await renderPage('index.html', 'en', '/');
for (const lang of ['en', 'tr'] as const) {
  await renderPage(`${lang}.html`, lang, `/${lang}`);
  for (const result of ['success', 'failed']) {
    await renderPage(`${lang}/payment/${result}.html`, lang, `/${lang}/payment/${result}`, true);
  }
}
for (const result of ['success', 'failed']) {
  await renderPage(`payment/${result}.html`, 'en', `/payment/${result}`, true);
}
