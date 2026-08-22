/**
 * Central Configuration for VELNAR Digital Studio
 * Modify these values to quickly update brand info, contact details, and pricing.
 */

export const CONFIG = {
  BRAND_NAME: "VELNAR",
  BRAND_DESCRIPTOR: "DIGITAL STUDIO",
  TAGLINE: "Websites · Digital Products · AI Systems",
  WHATSAPP_NUMBER: "905000000000", // Standard international format without '+' or spaces (e.g. 905XXXXXXXXX)
  WHATSAPP_DISPLAY: "+90 (500) 000 00 00",
  EMAIL: "hello@example.com",
  LOCATION: "İstanbul, Türkiye",
  INSTAGRAM_URL: "https://instagram.com",
  
  PRICING: {
    STARTER: {
      name: "STARTER",
      price: "7.900 TL",
      period: "başlayan fiyatlarla",
      badge: null,
      description: "Hızlı, şık ve temel ihtiyaçları eksiksiz karşılayan tek sayfalık dijital vitrin.",
      features: [
        "Tek sayfalık profesyonel site",
        "Mobil uyumlu tasarım",
        "Hizmetler bölümü",
        "Hakkımızda",
        "İletişim",
        "WhatsApp entegrasyonu",
        "Google Maps",
        "Temel SEO",
        "SSL sertifikası",
        "Yayına alma desteği"
      ],
      ctaText: "Starter Demo İste",
      popular: false
    },
    BUSINESS: {
      name: "BUSINESS",
      price: "12.900 TL",
      period: "başlayan fiyatlarla",
      badge: "EN ÇOK TERCİH EDİLEN",
      description: "İşletmesini büyütmek, arama motorlarında öne çıkmak ve daha çok müşteri kazanmak isteyenler için.",
      features: [
        "Starter'daki her şey",
        "Çok sayfalı yapı",
        "Özel hizmet sayfaları",
        "Gelişmiş tasarım",
        "İletişim formları",
        "Analytics kurulumu",
        "Search Console kurulumu",
        "Gelişmiş SEO altyapısı",
        "Sosyal medya entegrasyonları",
        "Daha kapsamlı içerik desteği"
      ],
      ctaText: "Business Demo İste",
      popular: true
    },
    AI_BUSINESS: {
      name: "AI BUSINESS",
      price: "19.900 TL",
      period: "başlayan fiyatlarla",
      badge: "YAPAY ZEKÂ DESTEKLİ",
      description: "Web sitenizi 7/24 müşteri toplayan ve soruları yanıtlayan akıllı bir asistana dönüştürün.",
      features: [
        "Business'taki her şey",
        "İşletmeye özel AI özellikleri",
        "AI chatbot altyapısı",
        "Akıllı müşteri yönlendirme",
        "Lead toplama özellikleri",
        "Özel otomasyon seçenekleri"
      ],
      disclaimer: "AI/API kullanım ücretleri kullanım miktarına ve projeye göre ayrıca belirlenebilir.",
      ctaText: "AI Projesini Görüşelim",
      popular: false
    }
  }
};

/**
 * Creates a valid WhatsApp link with pre-filled message text.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg = "Merhaba, işletmem için web sitesi ve ücretsiz demo hakkında bilgi almak istiyorum.";
  const msg = customMessage || defaultMsg;
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
