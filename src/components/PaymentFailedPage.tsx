import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, getMailtoUrl } from '../config';
import { AlertCircle, RotateCcw, Mail, ArrowRight, Home } from 'lucide-react';

interface PaymentFailedPageProps {
  onRetry: () => void;
  onGoHome: () => void;
}

export const PaymentFailedPage: React.FC<PaymentFailedPageProps> = ({ onRetry, onGoHome }) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const mailSubject = isEn
    ? 'Assistance with Project Payment — VELNAR Studio'
    : 'Ödeme İşlemi Hakkında Destek — VELNAR Studio';

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-lg bg-[#111211] border border-red-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-[#F3F0E8] relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

        {/* Failed Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#181918] border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow-lg mb-5">
          <AlertCircle className="w-8 h-8" />
        </div>

        {/* Headings */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F3F0E8] tracking-tight mb-3">
          {isEn ? 'Payment could not be completed.' : 'Ödeme tamamlanamadı.'}
        </h1>

        <p className="text-xs sm:text-sm text-[#AAA69D] leading-relaxed max-w-md mx-auto mb-6">
          {isEn
            ? 'No successful payment was received from your card. You can try again or contact us directly at hello@velnar.studio.'
            : 'Kartınızdan başarılı bir ödeme alınmadı. Tekrar deneyebilir veya hello@velnar.studio üzerinden bizimle iletişime geçebilirsiniz.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <button
            onClick={onRetry}
            className="w-full sm:flex-1 min-h-[46px] px-5 py-3 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isEn ? 'Try Again' : 'Tekrar Dene'}</span>
          </button>

          <a
            href={getMailtoUrl(mailSubject)}
            className="w-full sm:flex-1 min-h-[46px] px-5 py-3 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white font-medium text-xs sm:text-sm border border-[#F3F0E8]/[0.15] hover:border-[#C6A76A]/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#C6A76A]" />
            <span>{isEn ? 'Contact VELNAR' : 'VELNAR ile İletişim'}</span>
          </a>
        </div>

        <button
          onClick={onGoHome}
          className="text-xs text-[#AAA69D] hover:text-[#F3F0E8] inline-flex items-center gap-1.5 transition-colors pt-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>{isEn ? 'Return to Homepage' : 'Ana Sayfaya Dön'}</span>
        </button>

      </div>
    </div>
  );
};
