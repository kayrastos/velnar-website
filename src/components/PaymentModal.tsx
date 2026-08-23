import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG } from '../config';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard,
  Sparkles,
  Info
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  packageId: 'starter' | 'business' | 'ai-business';
  onClose: () => void;
}

interface PriceSummary {
  total: string;
  initial: string;
  remaining: string;
  currency: string;
}

const PRICE_CONFIG = {
  turkey: {
    starter: { total: '6.320 TL', initial: '3.160 TL', remaining: '3.160 TL', currency: 'TRY' },
    business: { total: '10.320 TL', initial: '5.160 TL', remaining: '5.160 TL', currency: 'TRY' },
    'ai-business': { total: '15.920 TL', initial: '7.960 TL', remaining: '7.960 TL', currency: 'TRY' },
  },
  international: {
    starter: { total: '$400', initial: '$200', remaining: '$200', currency: 'USD' },
    business: { total: '$640', initial: '$320', remaining: '$320', currency: 'USD' },
    'ai-business': { total: '$1,000', initial: '$500', remaining: '$500', currency: 'USD' },
  },
};

const PACKAGE_NAMES = {
  starter: 'STARTER',
  business: 'BUSINESS',
  'ai-business': 'AI BUSINESS',
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, packageId, onClose }) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const market = isEn ? 'international' : 'turkey';

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    city: isEn ? 'London' : 'İstanbul',
    country: isEn ? 'United Kingdom' : 'Türkiye',
    zipCode: isEn ? 'EC1A 1BB' : '34000',
    identityNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSandbox, setIsSandbox] = useState(true);

  const priceSummary: PriceSummary = PRICE_CONFIG[market][packageId] || PRICE_CONFIG[market].business;
  const packageName = PACKAGE_NAMES[packageId] || 'BUSINESS';

  // Check sandbox status from config
  useEffect(() => {
    fetch('/api/payment/config')
      .then((res) => res.json() as Promise<{ isSandbox?: boolean }>)
      .then((data) => {
        if (data.isSandbox !== undefined) {
          setIsSandbox(data.isSandbox);
        }
      })
      .catch(() => {
        // Fallback default is sandbox
        setIsSandbox(true);
      });
  }, []);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = isEn ? 'First name is required' : 'Ad alanı zorunludur';
    if (!formData.surname.trim()) newErrors.surname = isEn ? 'Last name is required' : 'Soyad alanı zorunludur';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isEn ? 'Valid email required' : 'Geçerli bir e-posta adresi giriniz';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = isEn ? 'Valid phone required' : 'Geçerli bir telefon numarası giriniz';
    }
    if (!formData.address.trim()) newErrors.address = isEn ? 'Address is required' : 'Adres bilgisi zorunludur';
    if (!formData.city.trim()) newErrors.city = isEn ? 'City is required' : 'Şehir zorunludur';
    if (!formData.country.trim()) newErrors.country = isEn ? 'Country is required' : 'Ülke zorunludur';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          market,
          language: lang,
          buyer: {
            name: formData.name.trim(),
            surname: formData.surname.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            country: formData.country.trim(),
            zipCode: formData.zipCode.trim() || '34000',
            identityNumber: formData.identityNumber.trim() || '11111111111',
          },
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        paymentPageUrl?: string;
        error?: string;
      };

      if (data.ok && data.paymentPageUrl) {
        // Redirect browser to iyzico Checkout Form
        window.location.href = data.paymentPageUrl;
      } else {
        setApiError(
          data.error ||
            (isEn
              ? 'Failed to initialize secure checkout. Please try again or contact support.'
              : 'Ödeme sayfası başlatılamadı. Lütfen tekrar deneyiniz veya destek ile iletişime geçiniz.')
        );
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setApiError(
        isEn
          ? 'Network error. Please check your connection and retry.'
          : 'Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-xl my-6 bg-[#111211] border border-[#F3F0E8]/[0.12] rounded-2xl shadow-2xl p-5 sm:p-7 overflow-hidden text-[#F3F0E8]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F3F0E8]/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#181918] border border-[#C6A76A]/40 flex items-center justify-center text-[#C6A76A]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 id="payment-modal-title" className="text-base sm:text-lg font-bold text-[#F3F0E8] tracking-tight">
                {isEn ? 'Secure Project Checkout' : 'Güvenli Proje Başlangıcı'}
              </h3>
              <p className="text-[11px] text-[#AAA69D]">
                {isEn ? '256-Bit SSL Encrypted iyzico Checkout Form' : '256-Bit SSL Korumalı iyzico Ödeme Altyapısı'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Kapat"
            className="w-8 h-8 rounded-lg bg-[#181918] hover:bg-[#222] text-[#AAA69D] hover:text-white flex items-center justify-center transition-colors border border-[#F3F0E8]/[0.08]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sandbox Visual Indicator (Requirement 10) */}
        {isSandbox && (
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#C6A76A]/10 border border-[#C6A76A]/30 text-[#C6A76A] text-[11px] font-mono flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SANDBOX / TEST PAYMENT
            </span>
            <span className="text-[10px] text-[#AAA69D]">{isEn ? 'Test Mode Active' : 'Test Modu Aktif'}</span>
          </div>
        )}

        {/* Payment Summary Box */}
        <div className="mt-4 p-4 rounded-xl bg-[#181918] border border-[#C6A76A]/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-bold text-[#C6A76A] tracking-wider uppercase">
              {packageName} {isEn ? 'PACKAGE' : 'PAKETİ'}
            </div>
            <div className="text-[11px] text-[#AAA69D] font-mono">
              {isEn ? 'Milestone Plan' : 'Aşamalı Ödeme'}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3F0E8]/[0.06] text-center">
            <div className="p-2 rounded-lg bg-[#111211]/80 border border-[#F3F0E8]/[0.05]">
              <div className="text-[10px] text-[#AAA69D] mb-0.5">{isEn ? 'Project Total' : 'Proje Toplamı'}</div>
              <div className="text-xs sm:text-sm font-bold text-[#F3F0E8] font-mono">{priceSummary.total}</div>
            </div>
            <div className="p-2 rounded-lg bg-[#C6A76A]/15 border border-[#C6A76A]/40">
              <div className="text-[10px] text-[#C6A76A] font-semibold mb-0.5">{isEn ? 'Initial Payment (50%)' : 'Başlangıç Bedeli (%50)'}</div>
              <div className="text-xs sm:text-sm font-bold text-[#C6A76A] font-mono">{priceSummary.initial}</div>
            </div>
            <div className="p-2 rounded-lg bg-[#111211]/80 border border-[#F3F0E8]/[0.05]">
              <div className="text-[10px] text-[#AAA69D] mb-0.5">{isEn ? 'Before Delivery (50%)' : 'Teslim Öncesi (%50)'}</div>
              <div className="text-xs sm:text-sm font-bold text-[#AAA69D] font-mono">{priceSummary.remaining}</div>
            </div>
          </div>

          {/* Mandatory Disclosure Text */}
          <div className="text-[11px] text-[#AAA69D] flex items-start gap-1.5 leading-relaxed pt-1">
            <Info className="w-3.5 h-3.5 text-[#C6A76A] shrink-0 mt-0.5" />
            <span>
              {isEn
                ? 'This is the initial project payment and represents 50% of the total project fee.'
                : "Bu ödeme proje başlangıç bedelidir ve toplam proje ücretinin %50'sini oluşturur."}
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {apiError && (
          <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">{apiError}</div>
          </div>
        )}

        {/* Buyer Details Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#AAA69D]">
            {isEn ? 'Billing & Customer Details' : 'Fatura & İletişim Bilgileri'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-[#AAA69D] mb-1">{isEn ? 'First Name *' : 'Ad *'}</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isEn ? 'John' : 'Ahmet'}
                  className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.12] text-xs text-[#F3F0E8] focus:border-[#C6A76A] focus:outline-none"
                />
              </div>
              {errors.name && <span className="text-[10px] text-red-400 mt-0.5 block">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-[11px] text-[#AAA69D] mb-1">{isEn ? 'Last Name *' : 'Soyad *'}</label>
              <input
                type="text"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                placeholder={isEn ? 'Doe' : 'Yılmaz'}
                className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.12] text-xs text-[#F3F0E8] focus:border-[#C6A76A] focus:outline-none"
              />
              {errors.surname && <span className="text-[10px] text-red-400 mt-0.5 block">{errors.surname}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-[#AAA69D] mb-1">{isEn ? 'Email *' : 'E-posta *'}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.12] text-xs text-[#F3F0E8] focus:border-[#C6A76A] focus:outline-none"
              />
              {errors.email && <span className="text-[10px] text-red-400 mt-0.5 block">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-[11px] text-[#AAA69D] mb-1">{isEn ? 'Phone *' : 'Telefon *'}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={isEn ? '+44 7123 456789' : '+90 555 123 45 67'}
                className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.12] text-xs text-[#F3F0E8] focus:border-[#C6A76A] focus:outline-none"
              />
              {errors.phone && <span className="text-[10px] text-red-400 mt-0.5 block">{errors.phone}</span>}
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#AAA69D] mb-1">{isEn ? 'Billing Address *' : 'Fatura Adresi *'}</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder={isEn ? '10 Baker Street, Suite 4' : 'Levent Mah. Çamlık Cad. No: 12'}
              className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.12] text-xs text-[#F3F0E8] focus:border-[#C6A76A] focus:outline-none"
            />
            {errors.address && <span className="text-[10px] text-red-400 mt-0.5 block">{errors.address}</span>}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] text-[#AAA69D] mb-1">{isEn ? 'City *' : 'Şehir *'}</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={isEn ? 'London' : 'İstanbul'}
                className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.12] text-xs text-[#F3F0E8] focus:border-[#C6A76A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#AAA69D] mb-1">{isEn ? 'Country *' : 'Ülke *'}</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder={isEn ? 'UK' : 'Türkiye'}
                className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.12] text-xs text-[#F3F0E8] focus:border-[#C6A76A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#AAA69D] mb-1">{isEn ? 'Postal Code' : 'Posta Kodu'}</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="34000"
                className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.12] text-xs text-[#F3F0E8] focus:border-[#C6A76A] focus:outline-none"
              />
            </div>
          </div>

          {/* Privacy & Card Security Guarantee */}
          <div className="pt-2 text-[10.5px] text-[#AAA69D] flex items-center gap-1.5 leading-tight">
            <ShieldCheck className="w-4 h-4 text-[#C6A76A] shrink-0" />
            <span>
              {isEn
                ? 'Card entry takes place entirely on iyzico Checkout Form. VELNAR never sees or stores card numbers.'
                : 'Kart bilgileri yalnızca iyzico Güvenli Ödeme Ekranında girilir; VELNAR hiçbir kart verisini kaydetmez.'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 min-h-[46px] px-5 py-3 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#111211]" />
                  <span>{isEn ? 'Connecting to iyzico...' : 'iyzico Güvenli Sayfasına Bağlanıyor...'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#111211]" />
                  <span>
                    {isEn
                      ? `Proceed to Payment (${priceSummary.initial})`
                      : `Ödemeye İlerle (${priceSummary.initial})`}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#111211]" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto min-h-[46px] px-4 py-3 rounded-xl bg-[#181918] hover:bg-[#222] text-[#AAA69D] hover:text-white text-xs font-medium border border-[#F3F0E8]/[0.1] transition-colors"
            >
              {isEn ? 'Cancel' : 'Vazgeç'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
