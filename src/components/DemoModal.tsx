import React from 'react';
import { DemoItem } from '../types';
import { getWhatsAppUrl } from '../config';
import { X, CheckCircle2, MessageCircle, ExternalLink, ArrowRight, Smartphone, ShieldCheck } from 'lucide-react';

interface DemoModalProps {
  demo: DemoItem | null;
  onClose: () => void;
  onRequestSimilar: (industry: string) => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ demo, onClose, onRequestSimilar }) => {
  if (!demo) return null;

  return (
    <div
      id="demo-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="demo-detail-modal-card"
        className="relative w-full max-w-2xl bg-[#141514] border border-[#F3F0E8]/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          id="close-demo-modal-btn"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-[#AAA69D] hover:text-[#F3F0E8] hover:bg-[#181918] flex items-center justify-center transition-colors cursor-pointer border border-transparent hover:border-[#F3F0E8]/[0.09]"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6 overflow-y-auto pr-1">
          
          {/* Header Tag */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#181918] border border-[#C6A76A]/30 text-[#C6A76A] text-[10px] font-mono uppercase tracking-[0.14em] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
              Canlı Demo Yayında
            </span>
            <span className="text-xs text-[#AAA69D] font-medium">
              {demo.category}
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-[#F3F0E8] tracking-tight">
              {demo.title}
            </h3>
            <p className="text-sm text-[#AAA69D] mt-2 leading-relaxed">
              {demo.description}
            </p>
          </div>

          {/* Interactive Demo Status Notification */}
          <div className="p-4 rounded-xl bg-[#181918] border border-[#C6A76A]/30 flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C6A76A] shrink-0 mt-1.5" />
            <div className="space-y-1">
              <div className="text-sm font-semibold text-[#F3F0E8] flex items-center gap-2">
                <span>İnteraktif Canlı Demo Yayında</span>
              </div>
              <p className="text-xs text-[#AAA69D] leading-relaxed">
                Bu canlı çalışmayı yeni sekmede doğrudan test edebilir veya kendi işletmeniz için birebir uyarlanmış ücretsiz ana sayfa demosunu 24-48 saat içinde talep edebilirsiniz.
              </p>
            </div>
          </div>

          {/* Key Features included in this concept */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#AAA69D] uppercase tracking-wider">
              Bu Konseptteki Öne Çıkan Özellikler:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {demo.features.map((feat, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.06] flex items-start gap-2.5 text-xs text-[#AAA69D]">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A76A] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Architecture Highlights */}
          <div className="p-3.5 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-[#AAA69D]">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#C6A76A]" />
              <span>%100 Mobil Hız Odaklı</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Dönüşüm Akışı</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C6A76A]" />
              <span>SSL & Güvenli Altyapı</span>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="pt-5 mt-5 border-t border-[#F3F0E8]/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
          {demo.demoUrl && (
            <a
              href={demo.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] border border-[#F3F0E8]/[0.15] text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Canlı Sayfayı Aç</span>
            </a>
          )}

          <a
            href={getWhatsAppUrl(`Merhaba, ${demo.title} konseptinizi inceledim. Benim işletmem için de benzer bir ücretsiz demo hazırlayabilir misiniz?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white border border-[#F3F0E8]/[0.15] text-xs font-medium flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp ile Sor</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onRequestSimilar(demo.category);
            }}
            id="modal-request-demo-btn"
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <span>İşletmeme Özel Demo İste</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

