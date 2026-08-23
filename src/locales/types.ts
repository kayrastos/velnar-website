export type Language = 'tr' | 'en';

export interface SEOConfig {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  keywords: string;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  standardPrice: string;
  launchPrice: string;
  period: string;
  badge: string | null;
  description: string;
  features: string[];
  disclaimer?: string;
  ctaText: string;
  popular: boolean;
}

export interface LocaleDictionary {
  seo: SEOConfig;
  nav: {
    work: string;
    services: string;
    process: string;
    whyUs: string;
    pricing: string;
    faq: string;
    ctaButton: string;
    ariaMenu: string;
    ariaClose: string;
    switchLang: string;
  };
  hero: {
    eyebrow: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    description: string;
    trustBullet1: string;
    trustBullet2: string;
    trustBullet3: string;
    primaryCta: string;
    secondaryCta: string;
    conceptPill: string;
    conceptTitle: string;
    conceptSubtitle: string;
    conceptBadge: string;
    deviceDesktop: string;
    deviceMobile: string;
    liveBadge: string;
    viewLiveButton: string;
  };
  trustBanner: {
    tagline: string;
    guaranteeTitle: string;
    guaranteeSubtitle: string;
  };
  problemValue: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    items: Array<{
      id: string;
      problem: string;
      solution: string;
      impact: string;
    }>;
  };
  portfolio: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    liveBadge: string;
    viewLiveCta: string;
    requestCustomCta: string;
    modalTrigger: string;
    trustNote: string;
    items: Array<{
      id: string;
      category: string;
      title: string;
      description: string;
      demoUrl: string;
      features: string[];
      mockupTheme: {
        accent: string;
        bg: string;
        badge: string;
      };
      mockContent: {
        headline: string;
        subheadline: string;
        cta: string;
        highlights: string[];
      };
    }>;
  };
  whyUs: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    differentiators: Array<{
      id: string;
      title: string;
      desc: string;
      badge: string;
    }>;
  };
  services: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    requestDemoText: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      highlights: string[];
    }>;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      description: string;
      badge: string;
    }>;
    bottomBox: {
      title: string;
      description: string;
      cta: string;
    };
  };
  pricing: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    launchBadgeText: string;
    launchSubtext: string;
    customScopeNote?: string;
    includedHeading?: string;
    popularScopeHeading?: string;
    plans: PricingPlanItem[];
    paymentPlan: {
      items: string[];
      copy: string;
    };
    satisfactionPromise: {
      badge: string;
      heading: string;
      p1: string;
      p2: string;
      note: string;
      highlights: Array<{
        title: string;
        desc: string;
      }>;
    };
  };
  faq: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    stillHaveQuestion: string;
    askWhatsApp: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  form: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    trustNote: string;
    fields: {
      fullName: string;
      fullNamePlaceholder: string;
      businessName: string;
      businessNamePlaceholder: string;
      industry: string;
      industryPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      website: string;
      websitePlaceholder: string;
      instagram: string;
      instagramPlaceholder: string;
      package: string;
      packageOptions: Array<{
        label: string;
        value: string;
      }>;
      note: string;
      notePlaceholder: string;
      kvkkConsent: string;
      kvkkLink: string;
    };
    submitCta: string;
    submitting: string;
    success: {
      title: string;
      message: string;
      whatsappBtn: string;
      newRequestBtn: string;
    };
    directWhatsAppHelper: string;
    directWhatsAppBtn: string;
    whatsappMessageTemplate: (data: any) => string;
  };
  finalCta: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    guaranteeText: string;
  };
  footer: {
    descriptor: string;
    tagline: string;
    quickLinksTitle: string;
    servicesTitle: string;
    contactTitle: string;
    remoteNotice: string;
    copyright: string;
    kvkkText: string;
    privacyText: string;
  };
  modals: {
    demo: {
      liveStatusBadge: string;
      interactiveTitle: string;
      interactiveDesc: string;
      keyFeaturesTitle: string;
      mobileSpeedBadge: string;
      whatsappBadge: string;
      sslBadge: string;
      openLiveBtn: string;
      askWhatsAppBtn: string;
      requestCustomBtn: string;
      whatsAppAskMessage: (title: string) => string;
    };
    legal: {
      kvkkTitle: string;
      kvkkBadge: string;
      kvkkP1: string;
      kvkkP2: string;
      kvkkP3: string;
      privacyTitle: string;
      privacyBadge: string;
      privacyP1: string;
      privacyP2: string;
      privacyP3: string;
      closeBtn: string;
    };
  };
  floatingWhatsApp: {
    tooltip: string;
    ariaLabel: string;
    defaultMessage: string;
  };
}
