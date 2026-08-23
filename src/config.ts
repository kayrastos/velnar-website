/**
 * Central Configuration for VELNAR Digital Studio
 * Modify these values to quickly update brand info, contact details, and pricing.
 */

export const CONFIG = {
  BRAND_NAME: "VELNAR",
  BRAND_DESCRIPTOR: "STUDIO",
  TAGLINE: "Websites · Digital Products · AI Systems",
  WHATSAPP_NUMBER: "905000000000", // Standard international format without '+' or spaces (e.g. 905XXXXXXXXX)
  WHATSAPP_DISPLAY: "+90 (500) 000 00 00",
  EMAIL: "hello@example.com",
  LOCATION: "İstanbul, Türkiye",
  INSTAGRAM_URL: "https://instagram.com",
  
  // Launch Campaign & Discount Settings
  LAUNCH_CAMPAIGN_ENABLED: true,
  LAUNCH_DISCOUNT_PERCENT: 20,
};

/**
 * Creates a valid WhatsApp link with pre-filled message text.
 */
export function getWhatsAppUrl(customMessage?: string, lang: 'tr' | 'en' = 'tr'): string {
  const defaultMsg = lang === 'en' 
    ? "Hello, I would like to request information and a free homepage concept for my business."
    : "Merhaba, işletmem için web sitesi ve ücretsiz demo hakkında bilgi almak istiyorum.";
  const msg = customMessage || defaultMsg;
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

