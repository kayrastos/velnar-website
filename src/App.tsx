import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Fingerprint, GitBranch, LockKeyhole, Menu, ScanLine, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from './security/LanguageContext';
import { DesignPartnerForm, CONTACT_EMAIL } from './security/DesignPartnerForm';
import { VelnarMonogram } from './components/VelnarLogo';

const sectionIds = ['platform', 'how-it-works', 'maturity', 'who-its-for', 'vision', 'design-partners'];
const stagesIcons = [Braces, ScanLine, ShieldCheck, Fingerprint, GitBranch];
function SectionHeading({ eyebrow, title, highlight, description }: { eyebrow: string; title: string; highlight?: string; description?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}{highlight && <><br /><span>{highlight}</span></>}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
function Brand() {
  return <span className="brand"><span className="brand-icon"><VelnarMonogram size={28} /></span><span>VELNAR<span className="brand-dot">.</span></span></span>;
}
function Languages() {
  const { lang, t } = useLanguage();
  return <nav className="languages" aria-label={t.language}>{(['en', 'tr'] as const).map(language => <a key={language} href={language === 'en' ? '/' : '/tr'} hrefLang={language} lang={language} aria-current={lang === language ? 'page' : undefined}>{language.toUpperCase()}</a>)}</nav>;
}
export default function App({ path }: { path?: string }) {
  const { lang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const currentPath = path ?? (typeof window === 'undefined' ? `/${lang}` : window.location.pathname);
  const retired = !/^\/(?:en\/?|tr\/?)?$/.test(currentPath);
  useEffect(() => {
    document.title = retired ? `${t.retired.title} | VELNAR` : t.seo.title;
    const meta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attr, name); document.head.appendChild(element); }
      element.content = content;
    };
    meta('description', t.seo.description);
    meta('robots', retired ? 'noindex, follow' : 'index, follow');
    meta('og:title', document.title, true); meta('og:description', t.seo.description, true);
    meta('og:locale', lang === 'tr' ? 'tr_TR' : 'en_US', true);
    const publicUrl = lang === 'en' ? 'https://velnar.studio' : 'https://velnar.studio/tr';
    meta('og:url', publicUrl, true);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', publicUrl);
  }, [lang, t, retired]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);
  const homeHref = lang === 'en' ? '/' : '/tr';
  if (retired) return <main className="retired-page"><a href={homeHref}><Brand /></a><h1>{t.retired.title}</h1><p>{t.retired.body}</p><a className="button primary" href={homeHref}>{t.retired.cta}<ArrowRight size={18} aria-hidden="true" /></a></main>;
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header"><div className="nav-shell">
      <a className="home-link" href={homeHref} aria-label="VELNAR"><Brand /></a>
      <nav className="desktop-nav" aria-label={lang === 'en' ? 'Main navigation' : 'Ana gezinme'}>{sectionIds.map((id, i) => <a key={id} href={`#${id}`}>{t.nav[i]}</a>)}</nav>
      <Languages />
      <button ref={menuButton} className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </div>
      <nav id="mobile-nav" className="mobile-nav" hidden={!menuOpen} aria-label={lang === 'en' ? 'Mobile navigation' : 'Mobil gezinme'}>{sectionIds.map((id, i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{t.nav[i]}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</nav>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="hero section-shell" id="platform">
        <div className="hero-topline"><p className="eyebrow">{t.hero.eyebrow}</p><span className="development-status"><span />{t.hero.status}</span></div>
        <div className="hero-grid"><div className="hero-copy"><h1>{t.hero.line1}<br /><span>{t.hero.line2}</span></h1><p className="hero-description">{t.hero.description}</p><div className="button-row"><a className="button primary" href="#design-partners">{t.primary}<ArrowUpRight size={18} aria-hidden="true" /></a><a className="button secondary" href="#how-it-works">{t.secondary}<ArrowDown size={18} aria-hidden="true" /></a></div><p className="wedge"><span className="line" />{t.hero.wedge}</p></div>
          <figure className="hero-diagram"><figcaption className="diagram-caption"><span className="tiny-index">V / 01</span>{t.hero.figure}</figcaption><div className="diagram-track"><div className="diagram-node candidate"><ScanLine aria-hidden="true" /><span>{t.hero.candidate}</span><span className="node-marker">01</span></div><div className="diagram-connector" aria-hidden="true" /><div className="diagram-boundary"><LockKeyhole size={20} aria-hidden="true" /><span>{t.hero.boundary}</span></div><div className="diagram-connector future" aria-hidden="true" /><div className="diagram-node future"><ShieldCheck aria-hidden="true" /><span>{t.hero.evidence}</span><span className="node-marker">02</span></div></div><p className="diagram-note">{t.hero.note}</p><p className="diagram-maturity">{t.hero.figureLabel}</p></figure>
        </div>
        <a className="hero-bottom" href="#problem"><span>VELNAR / {lang === 'en' ? 'An evidence-first approach' : 'Kanıtı esas alan yaklaşım'}</span><ArrowDown size={18} aria-hidden="true" /></a>
      </section>
      <section id="problem" className="section-shell section"><SectionHeading {...t.problem} /><div className="problem-grid">{t.problem.items.map((item, i) => <article key={item.title}><span className="item-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
      <section id="how-it-works" className="section-shell section"><SectionHeading {...t.workflow} /><ol className="stages">{t.workflow.stages.map((stage, i) => { const Icon = stagesIcons[i]; const maturity = i < 2 ? 'foundation' : i === 2 ? 'proving' : 'planned'; return <li className={`stage ${maturity}`} key={stage.verb}><div className="stage-top"><Icon size={24} aria-hidden="true" /><span>0{i + 1}</span></div><p className="stage-verb">{stage.verb}</p><h3>{stage.title}</h3><p>{stage.body}</p><span className={`maturity ${maturity}`}>{i < 2 ? t.workflow.current : i === 2 ? t.workflow.proving : t.workflow.roadmap}</span></li>; })}</ol></section>
      <section id="trust" className="trust-section section"><div className="section-shell"><div className="trust-heading"><SectionHeading {...t.trust} /><div className="authority-statement"><LockKeyhole size={22} aria-hidden="true" /><strong>{t.trust.distinction}</strong></div></div><ol className="evidence-flow">{t.trust.flow.map((label, i) => <li className={i === 3 ? 'boundary-step' : ''} key={label}><span className="flow-index">0{i + 1}</span><span>{label}</span>{i < 5 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol><p className="flow-caption">{t.trust.caption}</p><div className="trust-rules">{t.trust.rules.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
      <section id="maturity" className="maturity-section section"><div className="section-shell"><SectionHeading {...t.capability} /><div className="capability-grid">{t.capability.levels.map((level, i) => <article className={`capability-level level-${i}`} key={level.label}><p className="capability-label">{level.label}</p><h3>{level.title}</h3><p>{level.body}</p><ul>{level.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
      <section id="engineering" className="section-shell section engineering-evidence"><SectionHeading {...t.engineering} /><aside className="regression-panel" aria-labelledby="regression-title"><h3 id="regression-title">{t.engineering.regression}</h3><dl className="metrics">{['110/110', '121/121', '427/427', '1191/1191'].map((metric, i) => <div key={metric}><dt>{t.engineering.metrics[i]}</dt><dd>{metric}</dd></div>)}</dl><div className="evidence-copy"><p className="evidence-disclaimer">{t.engineering.disclaimer}</p><p className="form-hint">{t.engineering.limits}</p></div></aside></section>
      <section id="who-its-for" className="section-shell section"><SectionHeading {...t.audience} /><div className="audience-grid">{t.audience.groups.map((group, i) => <article className={i === 0 ? 'first-audience' : ''} key={group.title}><p className="eyebrow">{group.stage}</p><h3>{group.title}</h3><p>{group.body}</p><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>{i === 0 && <a className="text-link" href="#design-partners">{t.primary}<ArrowUpRight size={17} aria-hidden="true" /></a>}</article>)}</div></section>
      <section id="business-model" className="section-shell section"><SectionHeading {...t.business} /><div className="business-grid">{t.business.layers.map((layer, i) => <article className={`business-layer layer-${i}`} key={layer.title}><span className={`maturity ${i === 0 ? 'foundation' : i === 1 ? 'proving' : 'planned'}`}>{layer.badge}</span><h3>{layer.title}</h3><p>{layer.body}</p><ul>{layer.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
      <section id="critical-systems" className="section-shell section"><div className="critical-panel"><SectionHeading {...t.critical} /><div className="critical-grid"><div><h3>{t.critical.label}</h3><ul className="capabilities">{t.critical.capabilities.map(item => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul></div><div><h3>{t.critical.environmentLabel}</h3><ul className="capabilities environments">{t.critical.environments.map(item => <li key={item}><span aria-hidden="true">→</span>{item}</li>)}</ul></div></div><p className="maturity-note">{t.critical.maturity}</p></div></section>
      <section id="vision" className="section-shell section vision-section"><SectionHeading {...t.vision} /><ul className="vision-list">{t.vision.items.map(item => <li key={item}><ArrowUpRight size={18} aria-hidden="true" />{item}</li>)}</ul><div className="vision-conclusion"><p>{t.vision.conclusion1}</p><p>{t.vision.conclusion2}</p></div></section>
      <section id="design-partners" className="partner-section section"><div className="section-shell partner-grid"><div><SectionHeading {...t.partner} /><p className="partner-detail">{t.partner.detail}</p><a className="contact-link" href={`mailto:${CONTACT_EMAIL}`}><span>{t.partner.emailLabel}</span>{CONTACT_EMAIL}<ArrowUpRight size={18} aria-hidden="true" /></a></div><DesignPartnerForm /></div></section>
    </main>
    <footer className="section-shell footer"><div className="footer-main"><div><a href={homeHref} aria-label="VELNAR"><Brand /></a><p className="footer-positioning">{t.footer.lines.map(line => <span key={line}>{line}<br /></span>)}</p></div><nav aria-label={lang === 'en' ? 'Footer navigation' : 'Alt gezinme'}>{['#platform', '#trust', '#design-partners', `mailto:${CONTACT_EMAIL}`, '#privacy'].map((href, i) => <a key={href} href={href}>{t.footer.links[i]}</a>)}</nav><Languages /></div><details id="privacy" className="privacy"><summary>{t.privacy.title}</summary><p>{t.privacy.body} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p><p>{t.privacy.caution}</p></details><div className="footer-bottom"><span>© {new Date().getFullYear()} VELNAR</span><span>{t.footer.note}</span><span>İstanbul, Türkiye</span></div></footer>
  </>;
}
