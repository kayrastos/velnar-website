/**
 * Central Configuration for VELNAR Digital Studio
 * Modify these values to quickly update brand info, contact details, and pricing.
 */

export const CONFIG = {
  BRAND_NAME: "VELNAR",
  BRAND_DESCRIPTOR: "STUDIO",
  TAGLINE: "Websites · Digital Products · AI Systems",
  WHATSAPP_ENABLED: false, // Set to true once the real business number is ready
  WHATSAPP_NUMBER: "", // Real number will be configured here
  WHATSAPP_DISPLAY: "",
  EMAIL: "hello@velnar.studio",
  LOCATION: "İstanbul, Türkiye",
  INSTAGRAM_URL: "https://instagram.com",
  
  // Launch Campaign & Discount Settings
  LAUNCH_CAMPAIGN_ENABLED: true,
  LAUNCH_DISCOUNT_PERCENT: 20,
};

/**
 * Creates a valid mailto link with optional subject and body.
 */
export function getMailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  const queryString = params.toString();
  return `mailto:${CONFIG.EMAIL}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Creates a valid WhatsApp link with pre-filled message text.
 * When WhatsApp is disabled, safely falls back to direct mailto action.
 */
export function getWhatsAppUrl(customMessage?: string, lang: 'tr' | 'en' = 'tr'): string {
  if (!CONFIG.WHATSAPP_ENABLED || !CONFIG.WHATSAPP_NUMBER) {
    const defaultSubject = lang === 'en' ? 'Project Inquiry — VELNAR Studio' : 'Proje Talebi — VELNAR Studio';
    return getMailtoUrl(defaultSubject, customMessage);
  }
  const defaultMsg = lang === 'en' 
    ? "Hello, I would like to request information and a free homepage concept for my business."
    : "Merhaba, işletmem için web sitesi ve ücretsiz demo hakkında bilgi almak istiyorum.";
  const msg = customMessage || defaultMsg;
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

