import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG } from '../config';
import { CheckCircle2, ShieldCheck, Mail, ArrowRight, Home, Sparkles } from 'lucide-react';

interface PaymentSuccessPageProps {
  onGoHome: () => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ onGoHome }) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  // Read safe reference ID from verified server redirect
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const rawRef = urlParams.get('ref') || '';
  const reference = rawRef.slice(0, 100).replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-lg bg-[#111211] border border-[#C6A76A]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-[#F3F0E8] relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#C6A76A]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#181918] border border-[#C6A76A]/50 text-[#C6A76A] flex items-center justify-center mx-auto shadow-lg mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Headings */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F3F0E8] tracking-tight mb-3">
          {isEn ? 'Payment successfully verified.' : 'Ödeme başarıyla doğrulandı.'}
        </h1>

        <p className="text-xs sm:text-sm text-[#AAA69D] leading-relaxed max-w-md mx-auto mb-6">
          {isEn
            ? 'Your initial project payment is confirmed. The VELNAR team will contact you shortly to initiate the kickoff.'
            : 'Başlangıç ödemeniz doğrulandı. VELNAR ekibi proje başlangıcı için sizinle kısa süre içinde iletişime geçecektir.'}
        </p>

        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.08] text-left space-y-2.5 mb-6 text-xs">
          {reference && (
            <div className="flex items-center justify-between pb-2 border-b border-[#F3F0E8]/[0.06]">
              <span className="text-[#AAA69D]">{isEn ? 'Reference ID' : 'Referans Kodu'}</span>
              <span className="text-[#F3F0E8] font-mono text-[11px] font-semibold">{reference}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[#AAA69D]">{isEn ? 'Direct Contact' : 'Doğrudan İletişim'}</span>
            <a href={`mailto:${CONFIG.EMAIL}`} className="text-[#C6A76A] hover:underline font-mono text-[11px]">
              {CONFIG.EMAIL}
            </a>
          </div>
        </div>

        {/* Next Step Assurance */}
        <div className="p-3 rounded-xl bg-[#141514] border border-[#C6A76A]/20 text-[11px] text-[#AAA69D] flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="w-4 h-4 text-[#C6A76A] shrink-0" />
          <span>
            {isEn
              ? 'Our senior design team prepares your kickoff timeline within 24 hours.'
              : 'Tasarım ekibimiz 24 saat içinde proje yol haritanızı oluşturacaktır.'}
          </span>
        </div>

        {/* Return Button */}
        <button
          onClick={onGoHome}
          className="w-full min-h-[46px] px-6 py-3 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>{isEn ? 'Return to Homepage' : 'Ana Sayfaya Dön'}</span>
        </button>

      </div>
    </div>
  );
};
