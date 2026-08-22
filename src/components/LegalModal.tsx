import React from 'react';
import { CONFIG } from '../config';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'kvkk' | 'gizlilik' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      id="legal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="legal-modal-card"
        className="relative w-full max-w-2xl bg-[#141514] border border-[#F3F0E8]/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-[#AAA69D] hover:text-[#F3F0E8] hover:bg-[#181918] flex items-center justify-center transition-colors cursor-pointer border border-transparent hover:border-[#F3F0E8]/[0.09]"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto pr-2 space-y-4 text-left">
          
          <div className="flex items-center gap-2 text-[#C6A76A]">
            {type === 'kvkk' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider">
              {type === 'kvkk' ? 'Aydınlatma Metni' : 'Gizlilik ve Güvenlik Politikası'}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#F3F0E8] tracking-tight">
            {type === 'kvkk' 
              ? `${CONFIG.BRAND_NAME} KVKK Aydınlatma Metni`
              : `${CONFIG.BRAND_NAME} Gizlilik Politikası`
            }
          </h3>

          <div className="text-xs sm:text-sm text-[#AAA69D] space-y-3 leading-relaxed border-t border-[#F3F0E8]/[0.06] pt-4 font-normal">
            {type === 'kvkk' ? (
              <>
                <p>
                  <strong className="text-[#F3F0E8]">6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</strong> kapsamında; {CONFIG.BRAND_NAME} olarak, demo talep formu ve iletişim kanalları aracılığıyla bizimle paylaştığınız ad, soyad, telefon numarası, işletme adı ve sektörel bilgileriniz yalnızca size özel web sitesi demosu hazırlamak ve bilgilendirme sağlamak amacıyla işlenmektedir.
                </p>
                <p>
                  Verileriniz açık rızanız olmaksızın üçüncü taraflara aktarılmaz, ticari amaçla satılmaz ve kanuni zorunluluklar haricinde gizli tutulur.
                </p>
                <p>
                  Verilerinizin silinmesini veya güncellenmesini talep etmek için dilediğiniz zaman <strong className="text-[#F3F0E8]">{CONFIG.EMAIL}</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.
                </p>
              </>
            ) : (
              <>
                <p>
                  {CONFIG.BRAND_NAME} olarak ziyaretçilerimizin ve müşterilerimizin dijital gizliliğine ve bilgi güvenliğine azami önem vermekteyiz.
                </p>
                <p>
                  Sitemiz üzerinden paylaştığınız iletişim verileri sadece talep ettiğiniz hizmet ve demo çalışmasının yürütülmesi amacıyla kullanılmaktadır. Sitemizde gereksiz üçüncü taraf izleyiciler bulunmamaktadır.
                </p>
                <p>
                  Her türlü soru, görüş ve veri silme talebiniz için <strong className="text-[#F3F0E8]">{CONFIG.EMAIL}</strong> üzerinden bize ulaşabilirsiniz.
                </p>
              </>
            )}
          </div>

        </div>

        <div className="pt-4 mt-4 border-t border-[#F3F0E8]/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] border border-[#F3F0E8]/[0.15] text-[#F3F0E8] text-xs font-semibold cursor-pointer transition-all flex items-center justify-center"
          >
            Anladım & Kapat
          </button>
        </div>

      </div>
    </div>
  );
};

