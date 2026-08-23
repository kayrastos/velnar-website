import { LocaleDictionary } from './types';
import { CONFIG } from '../config';

export const en: LocaleDictionary = {
  seo: {
    title: "VELNAR Studio | Websites, Digital Products & AI Solutions",
    description: "Premium websites and digital solutions built to help modern businesses look stronger, convert visitors and generate opportunities.",
    ogTitle: "VELNAR Studio | Websites, Digital Products & AI Solutions",
    ogDescription: "Premium websites and digital solutions built to help modern businesses look stronger, convert visitors and generate opportunities.",
    canonical: "https://velnar.studio/en",
    keywords: "web design, boutique digital studio, business websites, high conversion landing page, AI solutions, velnar"
  },
  nav: {
    work: "Live Work",
    services: "Services",
    process: "How It Works",
    whyUs: "Why Us",
    pricing: "Pricing",
    faq: "FAQ",
    ctaButton: "Get Free Concept",
    ariaMenu: "Open Menu",
    ariaClose: "Close Menu",
    switchLang: "Language Selection"
  },
  hero: {
    eyebrow: "WEBSITES · DIGITAL PRODUCTS · AI SOLUTIONS",
    headlinePart1: "Digital experiences that make your business ",
    headlineHighlight: "look stronger.",
    headlinePart2: "",
    description: "We design fast, refined and conversion-focused websites for modern businesses. See a personalized homepage concept before deciding to work with us.",
    trustBullet1: "We create your custom concept first",
    trustBullet2: "Start the project only if you love the direction",
    trustBullet3: "See it first. Decide after.",
    primaryCta: "Get My Free Concept",
    secondaryCta: "View Our Work",
    conceptPill: "LIVE PREVIEW CONCEPT",
    conceptTitle: "Interactive Experience Tailored for Your Brand",
    conceptSubtitle: "Responsive, ultra-fast architecture engineered for engagement.",
    conceptBadge: "LIVE DEPLOYMENT",
    deviceDesktop: "Desktop",
    deviceMobile: "Mobile",
    liveBadge: "Live Production",
    viewLiveButton: "Open Live Demo"
  },
  trustBanner: {
    tagline: "See it first. Decide after.",
    guaranteeTitle: "Zero Risk, No Upfront Commitment",
    guaranteeSubtitle: "Review a bespoke homepage concept tailored for your business before making any contractual commitment."
  },
  problemValue: {
    eyebrow: "VALUE & CONVERSION",
    heading: "Generic templates lose visitors. ",
    headingHighlight: "We build digital assets that convert.",
    subtitle: "We craft clear, high-performing websites engineered to elevate your brand perception and turn clicks into loyal clients.",
    items: [
      {
        id: 'pv-problem-1',
        problem: 'Slow, cluttered and dated templates',
        solution: 'Ultra-fast, modern and refined user interfaces',
        impact: 'Dramatically improves visitor time-on-site and builds instant credibility.'
      },
      {
        id: 'pv-problem-2',
        problem: 'Static pages with zero lead capture',
        solution: 'One-click WhatsApp & streamlined inquiry flows',
        impact: 'Directs qualified prospects immediately into active sales conversations.'
      },
      {
        id: 'pv-problem-3',
        problem: 'Broken layouts on mobile devices',
        solution: '100% mobile-first precision engineering',
        impact: 'Delivers a frictionless experience for the 85%+ of visitors browsing on mobile.'
      },
      {
        id: 'pv-problem-4',
        problem: 'Invisible search footprint & duplicate code',
        solution: 'Semantic structure, metadata & Google profile sync',
        impact: 'Ensures target customers can discover and trust your business easily.'
      }
    ]
  },
  portfolio: {
    eyebrow: "FEATURED WORK",
    heading: "Live concepts built for ",
    headingHighlight: "demanding industries.",
    subtitle: "Not mockups or static screenshots — test our live, interactive concepts deployed directly in production.",
    liveBadge: "LIVE PRODUCTION DEMO",
    viewLiveCta: "View Live Demo",
    requestCustomCta: "Request Similar Concept",
    modalTrigger: "Explore Concept",
    trustNote: "These are live, production-grade interactive concepts. Click any link to test their speed and layout in a new tab.",
    items: [
      {
        id: 'demo-aurel',
        category: 'Automotive & Luxury Fleet',
        title: 'AUREL Motors',
        description: 'High-prestige digital showcase for luxury chauffeur, VIP fleet and premium rental services.',
        demoUrl: 'https://aurel-motors.ai.studio',
        features: ['VIP Fleet Catalog', 'Fast WhatsApp Booking', 'Dark Luxury Typography', 'Mobile Performance Tuning'],
        mockupTheme: {
          accent: '#C6A76A',
          bg: '#0E0F0F',
          badge: 'PREMIUM AUTOMOTIVE'
        },
        mockContent: {
          headline: 'Prestige Chauffeur & Exotic Fleet',
          subheadline: 'Bespoke airport transfers and executive vehicle charter.',
          cta: 'Explore Fleet',
          highlights: ['S-Class & Maybach', 'VIP Airport Transfer', '24/7 Concierge']
        }
      },
      {
        id: 'demo-lumera',
        category: 'Aesthetic, Clinic & Spa',
        title: 'LUMERA Beauty & Wellness',
        description: 'Warm, elegant appointment-oriented digital experience for premium aesthetic clinics and spas.',
        demoUrl: 'https://lumera-beauty-wellness.ai.studio',
        features: ['Treatment Menu & Pricing', 'Direct WhatsApp Scheduling', 'Warm Earthy Palette', 'Practitioner Profiles'],
        mockupTheme: {
          accent: '#D4AF37',
          bg: '#141210',
          badge: 'WELLNESS & CLINIC'
        },
        mockContent: {
          headline: 'Reveal Your Natural Radiance',
          subheadline: 'Personalized clinical skincare, medical aesthetics and wellness rituals.',
          cta: 'Book Consultation',
          highlights: ['Hydrafacial Sessions', 'Laser Specialists', 'Board Certified MDs']
        }
      },
      {
        id: 'demo-sera',
        category: 'Hospitality & Dining',
        title: 'SERA Restaurant Concept',
        description: 'Atmospheric digital menu and table reservation infrastructure for artisan restaurants and lounges.',
        demoUrl: 'https://sera-restaurant-concept.ai.studio',
        features: ['Interactive Digital Menu', 'Table Booking Flow', 'Chef Special Highlights', 'Location & Maps Integration'],
        mockupTheme: {
          accent: '#C6A76A',
          bg: '#0B0D0C',
          badge: 'DINING & HOSPITALITY'
        },
        mockContent: {
          headline: 'Seasonal Flavors & Artisan Hospitality',
          subheadline: 'Mediterranean-inspired dining paired with handcrafted cocktails.',
          cta: 'Reserve a Table',
          highlights: ['Tasting Menu', 'Open Terrace', 'Private Events']
        }
      }
    ]
  },
  whyUs: {
    eyebrow: "OUR PRINCIPLES",
    heading: "Bespoke digital execution, ",
    headingHighlight: "tailored to your business.",
    subtitle: "Every business has unique goals and customers. We eliminate bloat and focus entirely on clean, high-converting results.",
    differentiators: [
      {
        id: 'why-custom-design',
        title: 'Bespoke design approach',
        desc: 'We craft authentic interfaces reflecting your brand character, colors, and audience to set you apart from competitors.',
        badge: 'Custom Architecture'
      },
      {
        id: 'why-mobile-speed',
        title: 'Mobile-first speed & performance',
        desc: 'Lightweight, ultra-optimized codebases that open instantaneously and scroll smoothly on all modern smartphones.',
        badge: 'Lightning Fast'
      },
      {
        id: 'why-no-bloat',
        title: 'Zero bloat, high precision',
        desc: 'No heavy plugins or unnecessary software layers. We build only what directly accelerates your business growth.',
        badge: 'Clean Code'
      },
      {
        id: 'why-transparent-pricing',
        title: 'Transparent pricing & scope',
        desc: 'Clear, upfront proposals with no hidden fees or unexpected post-launch invoices throughout the entire journey.',
        badge: 'Transparent Terms'
      },
      {
        id: 'why-aftercare',
        title: 'Ongoing support & maintenance',
        desc: 'We stay by your side after launch for seamless content updates, technical maintenance, and ongoing enhancements.',
        badge: 'Continuous Support'
      },
      {
        id: 'why-ai-speed',
        title: 'Modern AI-assisted development workflow',
        desc: 'We utilize state-of-the-art AI tooling to speed up engineering cycles while meticulously perfecting every detail by hand.',
        badge: 'Modern Technology'
      }
    ]
  },
  services: {
    eyebrow: "CAPABILITIES",
    heading: "Everything your business needs, ",
    headingHighlight: "under one roof.",
    subtitle: "We eliminate complex agency hierarchies to deliver polished digital products that elevate your brand.",
    requestDemoText: "Request a concept for this service",
    items: [
      {
        id: 'srv-web-tasarim',
        title: 'Web Design',
        description: 'Bespoke user interfaces tailored to your visual identity.',
        highlights: ['Intuitive UX/UI', 'Refined typography & palettes', 'Elevated brand prestige']
      },
      {
        id: 'srv-web-gelistirme',
        title: 'Web Development',
        description: 'Fast, responsive and scalable modern web builds.',
        highlights: ['Sub-second load times', 'Flawless responsive layouts', 'Clean modern code']
      },
      {
        id: 'srv-landing-page',
        title: 'Landing Pages',
        description: 'Conversion-optimized pages engineered for marketing campaigns.',
        highlights: ['Direct response structure', 'A/B testing readiness', 'High-impact CTA placement']
      },
      {
        id: 'srv-seo-temelleri',
        title: 'SEO Foundations',
        description: 'Technical architecture, metadata, and search engine readiness.',
        highlights: ['Semantic HTML5 tags', 'Open Graph & rich cards', 'Search Console integration']
      },
      {
        id: 'srv-whatsapp-lead',
        title: 'WhatsApp & Lead Capture',
        description: 'Frictionless customer contact pathways and inquiry routing.',
        highlights: ['One-tap messaging', 'Pre-filled inquiry templates', 'Zero lead drop-off']
      },
      {
        id: 'srv-ai-cozumleri',
        title: 'AI Solutions',
        description: 'Smart chatbots, workflow automations, and intelligent routing.',
        highlights: ['24/7 Smart response bot', 'Automated lead qualification', 'Custom business routing']
      }
    ]
  },
  howItWorks: {
    eyebrow: "PROCESS & TIMELINE",
    heading: "How we ",
    headingHighlight: "work together.",
    subtitle: "No endless meetings or bureaucratic delays. 4 clear steps from initial concept to live launch.",
    steps: [
      {
        step: '01',
        title: 'Submit Your Details',
        description: 'Share a few brief details about your business and goals.',
        badge: '1 Minute'
      },
      {
        step: '02',
        title: 'Receive Your Free Concept',
        description: 'We design and deliver an interactive homepage concept within 24-48 hours.',
        badge: '24-48 Hours'
      },
      {
        step: '03',
        title: 'Review & Confirm',
        description: 'Explore the live concept, provide feedback, and confirm project kickoff.',
        badge: 'Decision Stage'
      },
      {
        step: '04',
        title: 'Launch & Handover',
        description: 'We finalize pages, configure domain settings, and take your site live.',
        badge: 'Live Launch'
      }
    ],
    bottomBox: {
      title: "See it first. Decide after.",
      description: "Request your free interactive homepage concept with zero upfront commitment.",
      cta: "Request Free Concept"
    }
  },
  pricing: {
    eyebrow: "TRANSPARENT PRICING",
    heading: "Clear packages tailored for ",
    headingHighlight: "growing businesses.",
    subtitle: "No hidden fees or unexpected recurring costs. Choose the tier that matches your goals.",
    launchBadgeText: "LAUNCH OFFER · 20% OFF",
    launchSubtext: "Introductory pricing available for a limited launch period.",
    customScopeNote: "Final pricing may vary for custom scope, integrations or additional requirements.",
    includedHeading: "WHAT'S INCLUDED",
    popularScopeHeading: "SCOPE & FEATURES",
    plans: [
      {
        id: 'starter',
        name: 'STARTER',
        standardPrice: '$500',
        launchPrice: '$400',
        period: 'starting from',
        badge: null,
        description: 'Fast, elegant and focused single-page digital showcase for establishing your online presence.',
        features: [
          'Professional single-page site',
          '100% responsive design',
          'Services showcase',
          'About us story',
          'Direct contact pathways',
          'WhatsApp integration',
          'Google Maps integration',
          'SEO foundations',
          'SSL certificate setup',
          'Deployment assistance'
        ],
        ctaText: 'Request Starter Concept',
        popular: false
      },
      {
        id: 'business',
        name: 'BUSINESS',
        standardPrice: '$800',
        launchPrice: '$640',
        period: 'starting from',
        badge: 'MOST POPULAR',
        description: 'For growing businesses seeking multi-page depth, higher search visibility, and maximum conversion.',
        features: [
          'Everything in Starter',
          'Multi-page architecture',
          'Dedicated service pages',
          'Advanced UI styling',
          'Inquiry & lead forms',
          'Analytics setup',
          'Search Console verification',
          'Enhanced SEO architecture',
          'Social media links',
          'Expanded content curation'
        ],
        ctaText: 'Request Business Concept',
        popular: true
      },
      {
        id: 'ai-business',
        name: 'AI BUSINESS',
        standardPrice: '$1,250',
        launchPrice: '$1,000',
        period: 'starting from',
        badge: 'AI-POWERED',
        description: 'Transform your website into an intelligent 24/7 assistant that answers questions and captures leads.',
        features: [
          'Everything in Business',
          'Custom business AI capabilities',
          'AI chatbot infrastructure',
          'Intelligent visitor routing',
          'Automated lead capture',
          'Custom workflow integrations'
        ],
        disclaimer: 'Third-party AI API usage charges may be determined separately based on project volume.',
        ctaText: 'Discuss AI Project',
        popular: false
      }
    ],
    paymentPlan: {
      items: ['Free Concept', '50% to Start / 50% Before Delivery', 'Satisfaction Promise'],
      copy: 'Projects begin with a 50% initial payment. The remaining 50% is due before final delivery of the approved project.'
    },
    satisfactionPromise: {
      badge: 'TRUST & GUARANTEE',
      heading: 'VELNAR Satisfaction Promise',
      p1: "See the initial concept created for your business before committing. If you choose to start the project, only a 50% initial payment is required.",
      p2: "If, during the first personalized design stage, you decide we're not the right fit, your initial payment will be refunded.",
      note: 'Non-refundable third-party costs approved in advance, such as domains, licenses or external services, may be excluded. Full terms are provided in writing before the project begins.',
      highlights: [
        {
          title: 'Free Initial Concept',
          desc: 'Test a tailored interactive concept built for your brand before making any financial commitment.'
        },
        {
          title: 'Milestone-Based Security',
          desc: '50% to start the project; the remaining 50% is due only prior to final delivery of the approved site.'
        },
        {
          title: 'Clear Written Terms',
          desc: 'Milestones, timelines, and deliverables are defined upfront with zero hidden ambiguity.'
        }
      ]
    }
  },
  faq: {
    eyebrow: "COMMON QUESTIONS",
    heading: "Frequently asked ",
    headingHighlight: "questions.",
    subtitle: "Find answers to key questions about our workflow, deliverables, and guarantees.",
    stillHaveQuestion: "Have another question?",
    askWhatsApp: "Ask via WhatsApp",
    items: [
      {
        question: 'How does the free concept process work?',
        answer: 'After you submit the form, we analyze your industry and prepare a personalized, interactive homepage concept within 24-48 hours. If you love the direction, we kick off the full project; if not, there is zero obligation.'
      },
      {
        question: 'What is the payment structure and guarantee?',
        answer: "Projects begin with a 50% initial payment. The remaining 50% is due before final delivery of the approved project. If, during the first personalized design stage, you decide we're not the right fit, your initial payment will be refunded. Approved non-refundable third-party costs (e.g., custom domains or software licenses) may be excluded."
      },
      {
        question: 'What is the typical turnaround timeline?',
        answer: 'Starter single-page projects are typically delivered within 3-5 business days. Business and multi-page builds average 7-10 business days including thorough cross-device QA and testing.'
      },
      {
        question: 'How are domain names and hosting handled?',
        answer: 'If you already have a domain, we connect it smoothly. If you need a new domain or hosting setup, we guide you through acquiring full ownership under your own account.'
      },
      {
        question: 'Can I update the website after launch?',
        answer: 'Yes. We offer continuous maintenance and support packages, and you can also request ad-hoc updates whenever needed.'
      },
      {
        question: 'How does the AI Business assistant work?',
        answer: 'We train a custom AI chat assistant on your business services, FAQs, hours, and pricing guidelines. It operates 24/7 on your website, greeting visitors, answering queries, and routing qualified leads directly to your email or WhatsApp.'
      }
    ]
  },
  form: {
    eyebrow: "GET STARTED",
    heading: "Request your ",
    headingHighlight: "free concept.",
    subtitle: "We will prepare and deliver an interactive homepage concept tailored to your business within 24-48 hours. Zero upfront commitment.",
    trustNote: "See it first. Decide after.",
    fields: {
      fullName: "Name",
      fullNamePlaceholder: "e.g. Alexander Wright",
      businessName: "Business Name",
      businessNamePlaceholder: "e.g. Aurel Motors, Nova Clinic...",
      industry: "Industry",
      industryPlaceholder: "e.g. Automotive, Aesthetics, Dining, Law...",
      phone: "Phone / WhatsApp",
      phonePlaceholder: "+1 (555) 000-0000 or international format",
      website: "Current Website (If Any)",
      websitePlaceholder: "www.yourbusiness.com",
      instagram: "Instagram Profile (If Any)",
      instagramPlaceholder: "@yourbusiness",
      package: "Package of Interest",
      packageOptions: [
        { label: "Starter (Single Page)", value: "Starter (Single Page)" },
        { label: "Business (Multi-Page)", value: "Business (Multi-Page)" },
        { label: "AI Business", value: "AI Business" },
        { label: "Not Sure / Recommend", value: "Not Sure / Recommend" }
      ],
      note: "Project Notes",
      notePlaceholder: "Key services to highlight, aesthetic preferences, or reference websites you admire...",
      kvkkConsent: "I agree to the processing of my inquiry data according to the",
      kvkkLink: "Privacy & Data Policy."
    },
    submitCta: "Request My Free Concept",
    submitting: "Submitting...",
    success: {
      title: "Concept Request Received!",
      message: "We are initiating preparations for your bespoke concept. We will reach out via WhatsApp / phone within 24-48 hours with your interactive preview.",
      whatsappBtn: "Contact Directly via WhatsApp",
      newRequestBtn: "Submit Another Request"
    },
    directWhatsAppHelper: "Or connect directly with our studio via WhatsApp:",
    directWhatsAppBtn: "Message via WhatsApp",
    whatsappMessageTemplate: (data) => {
      return `📋 *NEW CONCEPT REQUEST*

*Name:* ${data.fullName || '-'}
*Business:* ${data.businessName || '-'}
*Industry:* ${data.industry || '-'}
*Phone / WhatsApp:* ${data.phone || '-'}
*Current Website:* ${data.website || '-'}
*Instagram:* ${data.instagram || '-'}
*Selected Package:* ${data.selectedPackage || '-'}
*Project Notes:* ${data.note || '-'}`;
    }
  },
  finalCta: {
    badge: "SEE IT FIRST. DECIDE AFTER.",
    heading: "Take the first step toward a ",
    headingHighlight: "stronger digital presence.",
    subtitle: "Receive an interactive homepage concept tailored to your brand within 24-48 hours with zero upfront commitment.",
    primaryCta: "Get My Free Concept",
    secondaryCta: "Message on WhatsApp",
    guaranteeText: "100% Free Concept Preview · 50% to Start / 50% Before Delivery · Satisfaction Promise"
  },
  footer: {
    descriptor: "STUDIO",
    tagline: "Websites · Digital Products · AI Solutions for modern businesses looking to scale their digital footprint.",
    quickLinksTitle: "Quick Navigation",
    servicesTitle: "Services",
    contactTitle: "Contact & Availability",
    remoteNotice: "Available remotely for international and domestic client engagements.",
    copyright: `© ${new Date().getFullYear()} ${CONFIG.BRAND_NAME} Studio. All rights reserved.`,
    kvkkText: "Data Notice",
    privacyText: "Privacy Policy"
  },
  modals: {
    demo: {
      liveStatusBadge: "Live Production Demo",
      interactiveTitle: "Live Interactive Concept",
      interactiveDesc: "Test this production deployment in a new tab, or request a bespoke concept customized for your own business within 24-48 hours.",
      keyFeaturesTitle: "Key Capabilities in This Concept:",
      mobileSpeedBadge: "100% Mobile Optimized",
      whatsappBadge: "WhatsApp Inquiry Flow",
      sslBadge: "SSL & Secure Architecture",
      openLiveBtn: "Open Live Demo",
      askWhatsAppBtn: "Ask via WhatsApp",
      requestCustomBtn: "Request Similar Concept",
      whatsAppAskMessage: (title: string) => `Hello, I reviewed your ${title} concept. Could you create a similar bespoke concept for my business?`
    },
    legal: {
      kvkkTitle: `${CONFIG.BRAND_NAME} Data Processing Notice`,
      kvkkBadge: "Data Notice",
      kvkkP1: "Under applicable data protection guidelines, VELNAR processes your submitted name, phone number, business details and project notes solely to prepare a personalized website concept and respond to your inquiry.",
      kvkkP2: "Your information is never sold, leased to third parties, or used for unsolicited marketing.",
      kvkkP3: `You may request the deletion or update of your submitted details at any time by contacting ${CONFIG.EMAIL}.`,
      privacyTitle: `${CONFIG.BRAND_NAME} Privacy Policy`,
      privacyBadge: "Privacy & Security Policy",
      privacyP1: "VELNAR values the digital privacy and security of our visitors and clients.",
      privacyP2: "Information shared through our website is solely used to deliver the requested digital design services and concept previews. We do not use intrusive third-party trackers.",
      privacyP3: `For any inquiries regarding data handling or project privacy, please reach out directly to ${CONFIG.EMAIL}.`,
      closeBtn: "Understood & Close"
    }
  },
  floatingWhatsApp: {
    tooltip: "Message us for a free concept or any quick questions",
    ariaLabel: "Send direct WhatsApp message",
    defaultMessage: "Hello, I would like to request information and a free homepage concept for my business."
  }
};
