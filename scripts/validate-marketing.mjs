import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { preview } from 'vite';

const legacy = /Web Tasarım|website design|Digital Studio|\bPricing\b|paket|similar website|WhatsApp|wa\.me|\/api\/payment|request a similar|Know what matters|Prove what is real|Built in Türkiye|Designed for software teams everywhere|Türkiye’de geliştiriliyor|Dünyanın yazılım ekipleri|\bDigital businesses\b|\bDijital işletmeler\b/i;
const sections = ['platform', 'problem', 'how-it-works', 'trust', 'maturity', 'engineering', 'who-its-for', 'business-model', 'critical-systems', 'vision', 'design-partners', 'privacy'];
for (const lang of ['en', 'tr']) {
  const html = await readFile(`dist/${lang}.html`, 'utf8');
  assert.match(html, new RegExp(`<html lang="${lang}"`));
  const canonical = lang === 'en' ? 'https://velnar.studio' : 'https://velnar.studio/tr';
  assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
  for (const alternate of ['en', 'tr', 'x-default']) {
    const href = alternate === 'tr' ? 'https://velnar.studio/tr' : 'https://velnar.studio';
    assert.match(html, new RegExp(`hreflang="${alternate}" href="${href}"`));
  }
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.doesNotMatch(html, legacy);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /<fieldset disabled=""/); // No accidental native form submission without JavaScript.
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${lang}: unique IDs`);
  for (const section of sections) assert.ok(ids.includes(section), `${lang}: ${section}`);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `${lang}: anchor ${match[1]}`);
  for (const match of html.matchAll(/<label[^>]*for="([^"]+)"/g)) assert.ok(ids.includes(match[1]), `${lang}: labeled control ${match[1]}`);
  assert.equal((html.match(/<(?:input|select)[^>]+required=""/g) || []).length, 3);
  for (const value of ['110/110', '121/121', '427/427', '1191/1191']) assert.ok(html.includes(value));
  assert.match(html, lang === 'en' ? /Internal engineering regression results\. Not production accuracy metrics\./ : /Dahili mühendislik regresyon sonuçlarıdır\. Üretim ortamı doğruluk metrikleri değildir\./);
  assert.match(html, lang === 'en' ? /An AI model cannot directly grant VERIFIED authority/ : /doğrudan VERIFIED \(doğrulanmış\) yetkisi veremez/);
  assert.match(html, lang === 'en' ? /Finding Candidate ≠ Verified Finding/ : /Bulgu Adayı ≠ Doğrulanmış Bulgu/);
  assert.match(html, lang === 'en' ? /BUILT TODAY/ : /BUGÜN İNŞA EDİLEN/);
  assert.match(html, lang === 'en' ? /PROVING NEXT/ : /SIRADAKİ KANITLAMA AŞAMASI/);
  assert.match(html, lang === 'en' ? /SCALING LATER/ : /ÖLÇEKLENME MİMARİSİ/);
  assert.match(html, lang === 'en' ? /No current defense product, customer, deployment/ : /Mevcut savunma ürünü, müşterisi, kurulumu/);
  assert.match(html, lang === 'en' ? /Request Pilot Access/ : /Pilot Erişim Talep Edin/);
  console.log(`PASS ${lang}: localized SEO, 12 sections, anchors, form semantics, maturity and claim disclosures`);
}
for (const asset of await readdir('dist/assets')) {
  if (asset.endsWith('.js')) assert.doesNotMatch(await readFile(`dist/assets/${asset}`, 'utf8'), legacy, 'No agency copy or payment endpoint in the shipped JS');
}
console.log('PASS production JavaScript: no legacy marketing or payment endpoints');
const retiredRoutes = ['', '/en', '/tr'].flatMap(prefix => ['success', 'failed'].map(result => `${prefix}/payment/${result}`));
for (const route of retiredRoutes) {
  const html = await readFile(`dist${route}.html`, 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, follow"/);
  assert.doesNotMatch(html, /<form|\/api\/payment|payment successful|payment failed|ödeme başarılı|ödeme başarısız/i);
  assert.doesNotMatch(html, legacy);
}
console.log('PASS six retired payment pages: noindex, no transaction UI');
const server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true, open: false } });
try {
  for (const route of ['/', '/en', '/tr', ...retiredRoutes, '/sitemap.xml', '/robots.txt']) {
    const response = await fetch(`http://127.0.0.1:4173${route}`);
    assert.equal(response.status, 200, `HTTP ${route}`);
    const body = await response.text();
    if (route === '/' || route === '/en') assert.match(body, /<link rel="canonical" href="https:\/\/velnar\.studio"/);
    if (route === '/tr') assert.match(body, /<html lang="tr"/);
    if (retiredRoutes.includes(route)) assert.match(body, /noindex, follow/);
  }
  console.log('PASS local production HTTP: root, EN/TR, retired routes, sitemap, robots');
} finally {
  await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
}
