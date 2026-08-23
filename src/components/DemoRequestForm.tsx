import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, getMailtoUrl } from '../config';
import { DemoFormData } from '../types';
import { 
  Send, 
  Mail, 
  CheckCircle2, 
  Phone, 
  Building2, 
  User, 
  Layers, 
  Globe, 
  Instagram, 
  FileText, 
  AlertCircle, 
  Copy, 
  Check 
} from 'lucide-react';

interface DemoRequestFormProps {
  selectedPackageFromPricing?: string;
  prefilledIndustry?: string;
}

export const DemoRequestForm: React.FC<DemoRequestFormProps> = ({ 
  selectedPackageFromPricing,
  prefilledIndustry 
}) => {
  const { t, lang } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);
  const formDataLocale = t.form;
  const f = formDataLocale.fields;

  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    businessName: '',
    industry: prefilledIndustry || '',
    phone: '',
    website: '',
    instagram: '',
    selectedPackage: selectedPackageFromPricing || (lang === 'en' ? 'Pro Studio' : 'Business'),
    note: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedMailtoUrl, setGeneratedMailtoUrl] = useState('');

  // Update package when changed externally or when language switches
  useEffect(() => {
    if (selectedPackageFromPricing) {
      setFormData(prev => ({ ...prev, selectedPackage: selectedPackageFromPricing }));
    }
  }, [selectedPackageFromPricing]);

  // Update industry if passed
  useEffect(() => {
    if (prefilledIndustry) {
      setFormData(prev => ({ ...prev, industry: prefilledIndustry }));
    }
  }, [prefilledIndustry]);

  const packageOptions = f.packageOptions || (lang === 'en' ? [
    { value: 'Essential', label: 'Essential ($490)' },
    { value: 'Pro Studio', label: 'Pro Studio ($890)' },
    { value: 'Custom Flagship', label: 'Custom Flagship ($1,490+)' },
    { value: 'Enterprise Bespoke', label: 'Enterprise Bespoke' }
  ] : [
    { value: 'Starter', label: 'Starter (6.900 TL)' },
    { value: 'Business', label: 'Business (10.900 TL)' },
    { value: 'AI Business', label: 'AI Business (16.900 TL)' },
    { value: 'Özel Proje', label: 'Özel Proje' }
  ]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DemoFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = lang === 'en' ? 'Please enter your name.' : 'Lütfen adınızı ve soyadınızı giriniz.';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = lang === 'en' ? 'Please enter your company or brand name.' : 'Lütfen işletmenizin veya markanızın adını giriniz.';
    }
    if (!formData.industry.trim()) {
      newErrors.industry = lang === 'en' ? 'Please enter your industry.' : 'Lütfen sektörünüzü belirtiniz.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      newErrors.phone = lang === 'en' ? 'Please enter a valid phone number.' : 'Lütfen geçerli bir telefon numarası giriniz.';
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = lang === 'en' ? 'Please accept the data protection terms.' : 'Lütfen aydınlatma metnini onaylayınız.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const constructMessage = (): string => {
    return formDataLocale.whatsappMessageTemplate({
      fullName: formData.fullName.trim(),
      businessName: formData.businessName.trim(),
      industry: formData.industry.trim(),
      phone: formData.phone.trim(),
      website: formData.website.trim() || '-',
      instagram: formData.instagram.trim() || '-',
      selectedPackage: formData.selectedPackage,
      note: formData.note.trim() || '-'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const rawMessage = constructMessage();
    const mailSubject = lang === 'en'
      ? `Concept Request: ${formData.businessName.trim() || formData.fullName.trim()} — VELNAR Studio`
      : `Demo Talebi: ${formData.businessName.trim() || formData.fullName.trim()} — VELNAR Studio`;
    const mailUrl = getMailtoUrl(mailSubject, rawMessage);
    setGeneratedMailtoUrl(mailUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      window.location.href = mailUrl;
    }, 600);
  };

  const copyMessageToClipboard = () => {
    const rawMessage = constructMessage();
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="demo-talep" className="py-16 md:py-20 bg-[#090A0A] border-t border-[#F3F0E8]/[0.06] relative overflow-hidden" ref={formRef}>
      
      {/* Background depth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[550px] h-[300px] bg-[#141514] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>{formDataLocale.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            {formDataLocale.heading}{' '}
            <span className="text-[#C6A76A]">
              {formDataLocale.headingHighlight}
            </span>
          </h2>

          <p className="text-[#AAA69D] text-xs sm:text-sm max-w-xl mx-auto">
            {formDataLocale.subtitle}
          </p>
        </div>

        {/* The Form Container */}
        <div className="rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] p-4.5 sm:p-7 md:p-8 shadow-2xl relative overflow-hidden w-full max-w-full">
          
          {submissionSuccess ? (
            /* Success State */
            <div className="py-6 text-center space-y-5 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-[#181918] border border-[#F3F0E8]/[0.15] text-[#C6A76A] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#F3F0E8]">
                  {formDataLocale.success.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#AAA69D] max-w-md mx-auto leading-relaxed">
                  {lang === 'en' 
                    ? `Your project details have been prepared for ${CONFIG.EMAIL}. You can review or send the email below.`
                    : `Proje detaylarınız ${CONFIG.EMAIL} adresine iletilmek üzere hazırlandı. Aşağıdan e-posta gönderebilir veya bilgileri kopyalayabilirsiniz.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generatedMailtoUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#111211]" />
                  <span>{lang === 'en' ? 'Send via Email App' : 'E-posta Uygulamasıyla Gönder'}</span>
                </a>

                <button
                  type="button"
                  onClick={copyMessageToClipboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] text-xs sm:text-sm font-medium border border-[#F3F0E8]/[0.15] transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-[#C6A76A]" /> : <Copy className="w-4 h-4 text-[#AAA69D]" />}
                  <span>{copied ? (lang === 'en' ? 'Copied' : 'Kopyalandı') : (lang === 'en' ? 'Copy Details' : 'Detayları Kopyala')}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSubmissionSuccess(false)}
                className="text-xs text-[#AAA69D] hover:text-[#F3F0E8] underline pt-2 cursor-pointer"
              >
                {formDataLocale.success.newRequestBtn}
              </button>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Submission loading notification */}
              {isSubmitting && (
                <div className="p-3.5 rounded-xl bg-[#181918] border border-[#C6A76A]/40 text-[#C6A76A] text-xs font-semibold flex items-center justify-center gap-2.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#C6A76A] animate-ping" />
                  <span>{formDataLocale.submitting}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                
                {/* Ad Soyad */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-fullname" className="text-xs font-semibold text-[#AAA69D] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#74716A]" />
                    <span>{f.fullName} *</span>
                  </label>
                  <input
                    type="text"
                    id="form-fullname"
                    placeholder={f.fullNamePlaceholder}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border text-base sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all ${
                      errors.fullName ? 'border-rose-500/80' : 'border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* İşletme Adı */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-businessname" className="text-xs font-semibold text-[#AAA69D] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#74716A]" />
                    <span>{f.businessName} *</span>
                  </label>
                  <input
                    type="text"
                    id="form-businessname"
                    placeholder={f.businessNamePlaceholder}
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border text-base sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all ${
                      errors.businessName ? 'border-rose-500/80' : 'border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18]'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.businessName}</span>
                    </p>
                  )}
                </div>

                {/* Sektör */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-industry" className="text-xs font-semibold text-[#AAA69D] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#74716A]" />
                    <span>{f.industry} *</span>
                  </label>
                  <input
                    type="text"
                    id="form-industry"
                    placeholder={f.industryPlaceholder}
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border text-base sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all ${
                      errors.industry ? 'border-rose-500/80' : 'border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18]'
                    }`}
                  />
                  {errors.industry && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.industry}</span>
                    </p>
                  )}
                </div>

                {/* Telefon */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-phone" className="text-xs font-semibold text-[#AAA69D] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#74716A]" />
                    <span>{f.phone} *</span>
                  </label>
                  <input
                    type="tel"
                    id="form-phone"
                    placeholder={f.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border text-base sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all ${
                      errors.phone ? 'border-rose-500/80' : 'border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Mevcut Web Sitesi (Optional) */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-website" className="text-xs font-semibold text-[#AAA69D] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#74716A]" />
                      <span>{f.website}</span>
                    </span>
                    <span className="text-[10px] text-[#74716A] font-normal">{lang === 'en' ? 'Optional' : 'İsteğe bağlı'}</span>
                  </label>
                  <input
                    type="text"
                    id="form-website"
                    placeholder={f.websitePlaceholder}
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] text-base sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all"
                  />
                </div>

                {/* Instagram (Optional) */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-instagram" className="text-xs font-semibold text-[#AAA69D] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-[#74716A]" />
                      <span>{f.instagram}</span>
                    </span>
                    <span className="text-[10px] text-[#74716A] font-normal">{lang === 'en' ? 'Optional' : 'İsteğe bağlı'}</span>
                  </label>
                  <input
                    type="text"
                    id="form-instagram"
                    placeholder={f.instagramPlaceholder}
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] text-base sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all"
                  />
                </div>

              </div>

              {/* İlgilendiğiniz Paket */}
              <div className="space-y-2 text-left pt-1">
                <label className="text-xs font-semibold text-[#AAA69D] block">
                  {f.package}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full">
                  {packageOptions.map((pkg) => (
                    <button
                      type="button"
                      key={pkg.value}
                      onClick={() => setFormData({ ...formData, selectedPackage: pkg.value })}
                      className={`w-full min-w-0 min-h-[44px] px-2 sm:px-2.5 py-2 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between gap-1 ${
                        formData.selectedPackage === pkg.value
                          ? 'bg-[#181918] border-[#C6A76A] text-[#F3F0E8] shadow-sm'
                          : 'bg-[#0E0F0F] border-[#F3F0E8]/[0.09] text-[#AAA69D] hover:text-[#F3F0E8] hover:border-[#F3F0E8]/[0.18]'
                      }`}
                    >
                      <span className="truncate text-[10.5px] sm:text-xs">{pkg.label}</span>
                      {formData.selectedPackage === pkg.value && (
                        <Check className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kısa Not (Optional) */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="form-note" className="text-xs font-semibold text-[#AAA69D] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#74716A]" />
                    <span>{f.note}</span>
                  </span>
                  <span className="text-[10px] text-[#74716A] font-normal">{lang === 'en' ? 'Optional' : 'İsteğe bağlı'}</span>
                </label>
                <textarea
                  id="form-note"
                  rows={2}
                  placeholder={f.notePlaceholder}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] text-base sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all resize-none"
                />
              </div>

              {/* Checkbox: İletişim İzni */}
              <div className="text-left pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none py-1">
                  <input
                    type="checkbox"
                    id="form-terms"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="mt-0.5 w-4 h-4 min-w-[16px] min-h-[16px] rounded bg-[#0E0F0F] border-[#F3F0E8]/[0.15] accent-[#C6A76A] transition-colors"
                  />
                  <span className="text-xs text-[#AAA69D] leading-tight">
                    {f.kvkkConsent}
                  </span>
                </label>
                {errors.termsAccepted && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.termsAccepted}</span>
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="form-submit-btn"
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] hover:text-[#111211] font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? formDataLocale.submitting : formDataLocale.submitCta}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};



