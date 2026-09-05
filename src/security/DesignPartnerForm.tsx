import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const CONTACT_EMAIL = 'hello@velnar.studio';
const keys = ['name', 'email', 'company', 'role', 'type', 'size', 'message'] as const;
const empty = { name: '', email: '', company: '', role: '', type: '', size: '', message: '' };

export function DesignPartnerForm() {
  const { t } = useLanguage();
  const p = t.partner;
  const [values, setValues] = useState(empty);
  const [prepared, setPrepared] = useState(false);
  const [interactive, setInteractive] = useState(false);
  useEffect(() => setInteractive(true), []);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const draftHeading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const wasPrepared = useRef(false);
  useEffect(() => {
    if (prepared) draftHeading.current?.focus();
    else if (wasPrepared.current) nameInput.current?.focus();
    wasPrepared.current = prepared;
  }, [prepared]);
  const draft = `${p.subject}\n\n${keys.map((key, index) => {
    const value = key === 'type' ? (values.type === '' ? '' : p.types[Number(values.type)]) : key === 'size' ? (values.size === '' ? '' : p.sizes[Number(values.size)]) : values[key].trim();
    return `${p.fields[index]}: ${value || '—'}`;
  }).join('\n')}`;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(draft)}`;
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCopyState('idle');
    setPrepared(true);
  }
  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  return <div className="partner-form" id="partner-form"><noscript><p>{p.noScript} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></noscript>
    <form onSubmit={prepare} hidden={prepared} aria-labelledby="form-heading" aria-describedby="form-note form-privacy">
      <fieldset disabled={!interactive}><h3 id="form-heading">{p.cta}</h3>
      <p id="form-note">{p.note}</p>
      <p className="form-hint">{p.required}</p>
      <div className="form-grid">
        {keys.slice(0, 4).map((key, index) => { const required = index < 3; return <label key={key} htmlFor={`partner-${key}`}>
          <span>{p.fields[index]} {required ? '*' : <small>({p.optional})</small>}</span>
          <input ref={key === 'name' ? nameInput : undefined} id={`partner-${key}`} name={key} type={key === 'email' ? 'email' : 'text'} autoComplete={['name', 'email', 'organization', 'organization-title'][index]} required={required} maxLength={key === 'email' ? 160 : 100} value={values[key]} onChange={event => {
            event.target.setCustomValidity(!required || event.target.value.trim() ? '' : p.invalid);
            setValues({ ...values, [key]: event.target.value });
          }} />
        </label>; })}
        {(['type', 'size'] as const).map((key, index) => <label key={key} htmlFor={`partner-${key}`}>
          <span>{p.fields[index + 4]} <small>({p.optional})</small></span>
          <select id={`partner-${key}`} name={key} value={values[key]} onChange={event => setValues({ ...values, [key]: event.target.value })}>
            <option value="">{p.select}</option>
            {(key === 'type' ? p.types : p.sizes).map((option, i) => <option key={i} value={i}>{option}</option>)}
          </select>
        </label>)}
        <label className="full-width" htmlFor="partner-message"><span>{p.fields[6]} <small>({p.optional})</small></span>
          <textarea id="partner-message" name="message" rows={4} maxLength={800} value={values.message} onChange={event => setValues({ ...values, message: event.target.value })} />
        </label>
      </div>
      <button className="button primary" type="submit">{p.prepare}<ArrowUpRight size={18} aria-hidden="true" /></button>
      <p id="form-privacy" className="form-hint">{p.privacy} <a href="#privacy">{t.footer.links[4]}</a></p>
    </fieldset></form>
    {prepared && <div className="draft-panel">
      <h3 ref={draftHeading} tabIndex={-1}>{p.draftTitle}</h3>
      <p>{p.draftNote} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      <label htmlFor="email-draft">{p.draftLabel}</label>
      <textarea id="email-draft" readOnly value={draft} rows={12} onFocus={event => event.target.select()} />
      <div className="button-row">
        <a className="button primary" href={mailto}><Mail size={18} aria-hidden="true" />{p.open}</a>
        <button className="button secondary" type="button" onClick={copyDraft}>{copyState === 'copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}{p.copy}</button>
      </div>
      <p role="status">{copyState === 'copied' ? p.copied : copyState === 'failed' ? p.copyFailed : ''}</p>
      <button className="text-link" type="button" onClick={() => setPrepared(false)}>{p.edit}</button>
    </div>}
  </div>;
}
