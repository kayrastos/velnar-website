export interface DemoItem {
  id: string;
  category: string;
  title: string;
  description: string;
  previewImage?: string;
  demoUrl?: string; // Real external demo URL when available
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
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details?: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DemoFormData {
  fullName: string;
  businessName: string;
  industry: string;
  phone: string;
  website: string;
  instagram: string;
  selectedPackage: string;
  note: string;
  termsAccepted: boolean;
}
