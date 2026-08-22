import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import { DemoFormData } from '../types';
import { 
  Send, 
  MessageCircle, 
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
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    businessName: '',
    industry: prefilledIndustry || '',
    phone: '',
    website: '',
    instagram: '',
    selectedPackage: selectedPackageFromPricing || 'Business',
    note: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Update package when changed externally
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

  const packageOptions = [
    { value: 'Starter', label: 'Starter (7.900 TL)' },
    { value: 'Business', label: 'Business (12.900 TL)' },
    { value: 'AI Business', label: 'AI Business (19.900 TL)' },
    { value: 'Özel Proje', label: 'Özel Proje' }
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DemoFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Lütfen adınızı ve soyadınızı giriniz.';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Lütfen işletme adınızı giriniz.';
    }
    if (!formData.industry.trim()) {
      newErrors.industry = 'Lütfen faaliyet gösterdiğiniz sektörü belirtiniz.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      newErrors.phone = 'Lütfen geçerli bir telefon numarası giriniz.';
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Devam etmek için iletişim iznini onaylamanız gerekmektedir.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const constructWhatsAppMessage = (): string => {
    return `Merhaba, ücretsiz web sitesi demosu talep etmek istiyorum.

Ad Soyad: ${formData.fullName.trim()}
İşletme: ${formData.businessName.trim()}
Sektör: ${formData.industry.trim()}
Telefon: ${formData.phone.trim()}
Web Sitesi: ${formData.website.trim() || '-'}
Instagram: ${formData.instagram.trim() || '-'}
İlgilendiğim Paket: ${formData.selectedPackage}
Not: ${formData.note.trim() || '-'}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const rawMessage = constructWhatsAppMessage();
    const encodedMessage = encodeURIComponent(rawMessage);
    const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
    setGeneratedWhatsAppUrl(waUrl);

    // Show status message before redirecting
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  const copyMessageToClipboard = () => {
    const rawMessage = constructWhatsAppMessage();
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="demo-talep" className="py-16 md:py-20 bg-[#090A0A] border-t border-[#F3F0E8]/[0.06] relative" ref={formRef}>
      
      {/* Background depth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#141514] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>Ücretsiz Demo Talebi</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            İşletmenizin yeni web sitesini{' '}
            <span className="text-[#C6A76A]">
              satın almadan önce görün.
            </span>
          </h2>

          <p className="text-[#AAA69D] text-xs sm:text-sm max-w-xl mx-auto">
            Formu doldurun, işletmenize özel hazırlayacağımız örnek ana sayfa konseptini WhatsApp üzerinden iletelim.
          </p>
        </div>

        {/* The Form Container */}
        <div className="rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {submissionSuccess ? (
            /* Success State */
            <div className="py-6 text-center space-y-5 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-[#181918] border border-[#F3F0E8]/[0.15] text-[#25D366] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#F3F0E8]">
                  Talebiniz WhatsApp'a Yönlendirildi!
                </h3>
                <p className="text-xs sm:text-sm text-[#AAA69D] max-w-md mx-auto leading-relaxed">
                  WhatsApp açılmadıysa aşağıdaki butona tıklayarak mesajınızı doğrudan iletebilirsiniz.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp ile Gönder</span>
                </a>

                <button
                  type="button"
                  onClick={copyMessageToClipboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] text-xs sm:text-sm font-medium border border-[#F3F0E8]/[0.15] transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-[#C6A76A]" /> : <Copy className="w-4 h-4 text-[#AAA69D]" />}
                  <span>{copied ? 'Mesaj Kopyalandı' : 'Mesaj Metnini Kopyala'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSubmissionSuccess(false)}
                className="text-xs text-[#AAA69D] hover:text-[#F3F0E8] underline pt-2 cursor-pointer"
              >
                Yeni bir talep oluştur
              </button>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Submission loading notification */}
              {isSubmitting && (
                <div className="p-3.5 rounded-xl bg-[#181918] border border-[#C6A76A]/40 text-[#C6A76A] text-xs font-semibold flex items-center justify-center gap-2.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#C6A76A] animate-ping" />
                  <span>Talebiniz WhatsApp üzerinden gönderilmeye hazırlanıyor...</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                
                {/* Ad Soyad */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-fullname" className="text-xs font-semibold text-[#AAA69D] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#74716A]" />
                    <span>Ad Soyad *</span>
                  </label>
                  <input
                    type="text"
                    id="form-fullname"
                    placeholder="Örn: Ahmet Yılmaz"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border text-xs sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all ${
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
                    <span>İşletme Adı *</span>
                  </label>
                  <input
                    type="text"
                    id="form-businessname"
                    placeholder="Örn: Yılmaz Otomotiv / Aura Klinik"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border text-xs sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all ${
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
                    <span>Sektör *</span>
                  </label>
                  <input
                    type="text"
                    id="form-industry"
                    placeholder="Örn: Restoran, Oto Galeri, Sağlık, Hukuk"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border text-xs sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all ${
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
                    <span>Telefon Numarası *</span>
                  </label>
                  <input
                    type="tel"
                    id="form-phone"
                    placeholder="Örn: 05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border text-xs sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all ${
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
                      <span>Mevcut Web Sitesi</span>
                    </span>
                    <span className="text-[10px] text-[#74716A] font-normal">İsteğe Bağlı</span>
                  </label>
                  <input
                    type="text"
                    id="form-website"
                    placeholder="Örn: www.isletmeniz.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] text-xs sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all"
                  />
                </div>

                {/* Instagram (Optional) */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-instagram" className="text-xs font-semibold text-[#AAA69D] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-[#74716A]" />
                      <span>Instagram Hesabı</span>
                    </span>
                    <span className="text-[10px] text-[#74716A] font-normal">İsteğe Bağlı</span>
                  </label>
                  <input
                    type="text"
                    id="form-instagram"
                    placeholder="Örn: @isletmeniz"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] text-xs sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all"
                  />
                </div>

              </div>

              {/* İlgilendiğiniz Paket */}
              <div className="space-y-2 text-left pt-1">
                <label className="text-xs font-semibold text-[#AAA69D] block">
                  İlgilendiğiniz Paket:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {packageOptions.map((pkg) => (
                    <button
                      type="button"
                      key={pkg.value}
                      onClick={() => setFormData({ ...formData, selectedPackage: pkg.value })}
                      className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                        formData.selectedPackage === pkg.value
                          ? 'bg-[#181918] border-[#C6A76A] text-[#F3F0E8] shadow-sm'
                          : 'bg-[#0E0F0F] border-[#F3F0E8]/[0.09] text-[#AAA69D] hover:text-[#F3F0E8] hover:border-[#F3F0E8]/[0.18]'
                      }`}
                    >
                      <span className="truncate">{pkg.label}</span>
                      {formData.selectedPackage === pkg.value && (
                        <Check className="w-3.5 h-3.5 text-[#C6A76A] shrink-0 ml-1" />
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
                    <span>Özel İstekler / Not</span>
                  </span>
                  <span className="text-[10px] text-[#74716A] font-normal">İsteğe Bağlı</span>
                </label>
                <textarea
                  id="form-note"
                  rows={2}
                  placeholder="Örnek: Sitemizde online randevu butonu ve WhatsApp danışma hattı olmasını istiyoruz..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] text-xs sm:text-sm text-[#F3F0E8] placeholder-[#74716A] focus:outline-none focus:border-[#C6A76A] transition-all resize-none"
                />
              </div>

              {/* Checkbox: İletişim İzni */}
              <div className="text-left pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="form-terms"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded bg-[#0E0F0F] border-[#F3F0E8]/[0.15] accent-[#C6A76A] transition-colors"
                  />
                  <span className="text-xs text-[#AAA69D] leading-tight">
                    İşletmem için ücretsiz web sitesi demosu hazırlanması amacıyla WhatsApp veya telefon üzerinden benimle iletişime geçilmesini kabul ediyorum.
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
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] hover:text-[#111211] font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Talebiniz Hazırlanıyor...' : 'Ücretsiz Demo Talep Et'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

