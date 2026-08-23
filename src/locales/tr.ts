import { LocaleDictionary } from './types';
import { CONFIG } from '../config';

export const tr: LocaleDictionary = {
  seo: {
    title: "VELNAR Studio | Web Tasarım & Dijital Çözümler",
    description: "Modern işletmeler için satış ve müşteri kazanımına odaklı premium web siteleri ve dijital çözümler.",
    ogTitle: "VELNAR Studio | Web Tasarım & Dijital Çözümler",
    ogDescription: "Modern işletmeler için satış ve müşteri kazanımına odaklı premium web siteleri ve dijital çözümler.",
    canonical: "https://velnar.studio/tr",
    keywords: "web tasarım, dijital çözümler, işletme web sitesi, landing page, istanbul web tasarım, yapay zeka web çözümleri, velnar"
  },
  nav: {
    work: "Canlı Demolar",
    services: "Hizmetler",
    process: "Nasıl Çalışır?",
    whyUs: "Neden Biz?",
    pricing: "Paketler",
    faq: "S.S.S",
    ctaButton: "Ücretsiz Demo İste",
    ariaMenu: "Menüyü Aç",
    ariaClose: "Menüyü Kapat",
    switchLang: "Dil Seçimi"
  },
  hero: {
    eyebrow: "WEBSİTELERİ · DİJİTAL ÜRÜNLER · AI ÇÖZÜMLERİ",
    headlinePart1: "Müşteri kazandıran, ",
    headlineHighlight: "güçlü ve modern",
    headlinePart2: " web siteleri üretiyoruz.",
    description: "İşletmenizin dijitalde güven vermesi, rakiplerinden ayrışması ve doğrudan ziyaretçiyi müşteriye dönüştürmesi için özel tasarlanmış web siteleri.",
    trustBullet1: "Önce ücretsiz demo ana sayfanızı hazırlıyoruz",
    trustBullet2: "Beğenirseniz projeyi başlatıyoruz",
    trustBullet3: "Önce görün. Sonra karar verin.",
    primaryCta: "Ücretsiz Demo İste",
    secondaryCta: "Canlı Demoları İncele",
    conceptPill: "ÖN İZLEME KONSEPTİ",
    conceptTitle: "İşletmenize Özel Canlı Önizleme",
    conceptSubtitle: "Masaüstü ve mobil uyumlu, yüksek hız ve dönüşüm odaklı mimari.",
    conceptBadge: "CANLI YAYINDA",
    deviceDesktop: "Masaüstü",
    deviceMobile: "Mobil",
    liveBadge: "Canlı Yayında",
    viewLiveButton: "Canlı Sayfayı Aç"
  },
  trustBanner: {
    tagline: "Önce görün. Sonra karar verin.",
    guaranteeTitle: "Risk Yok, Peşin Taahhüt Yok",
    guaranteeSubtitle: "İşletmeniz için hazırlanan ücretsiz ana sayfa konseptini inceledikten sonra birlikte çalışıp çalışmayacağınıza karar verin."
  },
  problemValue: {
    eyebrow: "DÖNÜŞÜM & ETKİ",
    heading: "Eski tip siteler ziyaretçi kaybettirir. ",
    headingHighlight: "Biz kazandırıyoruz.",
    subtitle: "Ziyaretçiyi müşteriye dönüştüren, modern ve net bir dijital varlık inşa ediyoruz.",
    items: [
      {
        id: 'pv-problem-1',
        problem: 'Yavaş, karmaşık ve eski tasarımlar',
        solution: 'Ultra hızlı, modern ve temiz arayüzler',
        impact: 'Ziyaretçilerin sitede kalma süresini ve güven duygusunu 3 kata kadar artırır.'
      },
      {
        id: 'pv-problem-2',
        problem: 'İletişim kurdurmayan ölü sayfalar',
        solution: 'Tek tıkla WhatsApp ve doğrudan randevu/lead akışı',
        impact: 'Ziyaretçinin beklemeden doğrudan WhatsApp hattınıza ulaşmasını sağlar.'
      },
      {
        id: 'pv-problem-3',
        problem: 'Telefonda bozulan, okunmayan şablonlar',
        solution: '%100 mobil öncelikli responsive kodlama',
        impact: 'Trafiğinizin %85\'ini oluşturan mobil kullanıcılara kusursuz deneyim sunar.'
      },
      {
        id: 'pv-problem-4',
        problem: 'Arama motorlarında görünmeyen kopya yapılar',
        solution: 'Temiz semantik kod, yerel SEO ve Google harita uyumu',
        impact: 'Hedef kitlenizin işletmenizi Google\'da kolayca bulmasını destekler.'
      }
    ]
  },
  portfolio: {
    eyebrow: "CANLI VİTRİN",
    heading: "Farklı sektörler için ",
    headingHighlight: "hazır canlı demolar.",
    subtitle: "Rastgele şablonlar değil; doğrudan test edebileceğiniz, canlı yayındaki gerçek konsept çalışmalarımız.",
    liveBadge: "CANLI DEMO YAYINDA",
    viewLiveCta: "Canlı Demoyu Gör",
    requestCustomCta: "Benzer Demo İste",
    modalTrigger: "İncele & Test Et",
    trustNote: "Bu çalışmalar gerçek konsept demolarımızdır. Dilediğiniz bağlantıya tıklayarak canlı performanslarını yeni sekmede test edebilirsiniz.",
    items: [
      {
        id: 'demo-aurel',
        category: 'Otomotiv & Premium Araç',
        title: 'AUREL Motors',
        description: 'Lüks araç kiralama, filo ve VIP transfer işletmeleri için koyu tonlu, yüksek prestijli dijital vitrin.',
        demoUrl: 'https://aurel-motors.ai.studio',
        features: ['VIP Filo Kataloğu', 'WhatsApp Hızlı Rezervasyon', 'Koyu Lüks Tipografi', 'Mobil Hız Optimizasyonu'],
        mockupTheme: {
          accent: '#C6A76A',
          bg: '#0E0F0F',
          badge: 'PREMIUM OTOMOTİV'
        },
        mockContent: {
          headline: 'Lüks & Prestijli Sürüş Deneyimi',
          subheadline: 'Özel şoförlü transfer ve seçkin filo kiralama.',
          cta: 'Filoyu İncele',
          highlights: ['S-Class & Maybach', 'Havalimanı VIP', '7/24 Rezervasyon']
        }
      },
      {
        id: 'demo-lumera',
        category: 'Güzellik, Klinik & Spa',
        title: 'LUMERA Beauty & Wellness',
        description: 'Güzellik merkezleri, estetik klinikleri ve butik spa salonları için sıcak, zarif ve randevu odaklı konsept.',
        demoUrl: 'https://lumera-beauty-wellness.ai.studio',
        features: ['Hizmet Listesi & Fiyatlandırma', 'WhatsApp Doğrudan Randevu', 'Zarif & Sıcak Renk Paleti', 'Uzman Kadro Tanıtımı'],
        mockupTheme: {
          accent: '#D4AF37',
          bg: '#141210',
          badge: 'GÜZELLİK & KLİNİK'
        },
        mockContent: {
          headline: 'Doğal Işıltınızı Keşfedin',
          subheadline: 'Kişiselleştirilmiş cilt bakımı, medikal estetik ve spa.',
          cta: 'Randevu Oluştur',
          highlights: ['Hydrafacial Seansı', 'Lazer Epilasyon', 'Uzman Dermatologlar']
        }
      },
      {
        id: 'demo-sera',
        category: 'Restoran, Kafe & Gastronomi',
        title: 'SERA Restaurant Concept',
        description: 'Şık restoranlar, artisan kafeler ve gastronomi mekanları için dijital menü ve masa rezervasyon altyapısı.',
        demoUrl: 'https://sera-restaurant-concept.ai.studio',
        features: ['İnteraktif Dijital Menü', 'Masa Rezervasyon Akışı', 'Şefin Özel Seçkisi', 'Konum & Google Maps'],
        mockupTheme: {
          accent: '#C6A76A',
          bg: '#0B0D0C',
          badge: 'RESTORAN & GASTRONOMİ'
        },
        mockContent: {
          headline: 'Mevsimsel Lezzetler & Zarif Sofra',
          subheadline: 'Akdeniz mutfağının en seçkin tatları ve imza kokteyller.',
          cta: 'Masa Ayırt',
          highlights: ['Tadım Menüsü', 'Açık Teras', 'Özel Etkinlikler']
        }
      }
    ]
  },
  whyUs: {
    eyebrow: "FARKIMIZ & İLKELERİMİZ",
    heading: "Hazır şablon değil, ",
    headingHighlight: "işletmenize göre tasarım.",
    subtitle: "Her işletmenin hikayesi ve müşterisi farklıdır. Kalıplara sıkışmadan, size özel bir dijital çözüm üretiyoruz.",
    differentiators: [
      {
        id: 'why-custom-design',
        title: 'İşletmenize özel tasarım yaklaşımı',
        desc: 'Rakiplerinizden sıyrılmanız için markanızın karakterini, renklerini ve hedef kitlesini yansıtan özgün arayüzler üretiyoruz.',
        badge: 'Kişiselleştirilmiş Çözüm'
      },
      {
        id: 'why-mobile-speed',
        title: 'Mobil ve hız odaklı geliştirme',
        desc: 'Müşterilerinizin beklemediği, anında açılan ve telefonlarda pürüzsüz kayan hafif ve optimize bir kod tabanı kuruyoruz.',
        badge: 'Hızlı & Akıcı'
      },
      {
        id: 'why-no-bloat',
        title: 'Gereksiz özelliklerle şişirilmemiş yapı',
        desc: 'Kullanılmayan eklentiler ve ağır sistemler yerine, sadece işletmenizin büyümesine doğrudan katkı sunan işlevlere odaklanıyoruz.',
        badge: 'Temiz Mimari'
      },
      {
        id: 'why-transparent-pricing',
        title: 'Net fiyatlandırma',
        desc: 'Süreç boyunca gizli maliyet veya sürpriz masraflar olmadan, neyi ne kadara aldığınızı en baştan net şekilde biliyorsunuz.',
        badge: 'Şeffaf Süreç'
      },
      {
        id: 'why-aftercare',
        title: 'Yayın sonrası destek seçeneği',
        desc: 'Siteniz canlıya geçtikten sonra yalnız değilsiniz. İçerik güncellemeleri, teknik bakım ve geliştirmeler için yanınızdayız.',
        badge: 'Sürekli Destek'
      },
      {
        id: 'why-ai-speed',
        title: 'Modern AI araçlarından yararlanan hızlı üretim süreci',
        desc: 'Yapay zekâyı tasarım ve geliştirme süreçlerimizi hızlandırmak için bir araç olarak kullanıyor, her detayı insan gözüyle titizlikle özelleştiriyoruz.',
        badge: 'Modern Teknoloji'
      }
    ]
  },
  services: {
    eyebrow: "HİZMET YELPAZESİ",
    heading: "İhtiyacınız olan dijital temel, ",
    headingHighlight: "tek yerde.",
    subtitle: "Karmaşık süreçleri ve gereksiz maliyetleri ortadan kaldırarak işletmenizi dijitale en doğru şekilde taşıyoruz.",
    requestDemoText: "Bu hizmet için demo isteyin",
    items: [
      {
        id: 'srv-web-tasarim',
        title: 'Web Tasarım',
        description: 'Markanıza özel modern kullanıcı arayüzleri.',
        highlights: ['Kullanıcı dostu UX/UI', 'Özgün tipografi & renkler', 'Yüksek marka algısı']
      },
      {
        id: 'srv-web-gelistirme',
        title: 'Web Geliştirme',
        description: 'Hızlı, responsive ve sürdürülebilir web siteleri.',
        highlights: ['Ultra hızlı yükleme', 'Mobil & tablet kusursuzluğu', 'Temiz ve modern kodlama']
      },
      {
        id: 'srv-landing-page',
        title: 'Landing Page',
        description: 'Reklam ve kampanyalar için dönüşüm odaklı sayfalar.',
        highlights: ['Doğrudan satış odaklı', 'A/B testine uygun yapı', 'Net harekete geçirici mesajlar']
      },
      {
        id: 'srv-seo-temelleri',
        title: 'SEO Temelleri',
        description: 'Teknik yapı, metadata ve arama motoru görünürlüğü için sağlam başlangıç.',
        highlights: ['Semantik HTML etiketleri', 'Open Graph & meta veriler', 'Google Search Console uyumu']
      },
      {
        id: 'srv-whatsapp-lead',
        title: 'WhatsApp & Lead Akışı',
        description: 'Ziyaretçileri mümkün olduğunca hızlı iletişime yönlendiren akışlar.',
        highlights: ['Tek tıkla WhatsApp hattı', 'Hazır mesaj şablonları', 'Kayba yer bırakmayan iletişim']
      },
      {
        id: 'srv-ai-cozumleri',
        title: 'AI Çözümleri',
        description: 'İhtiyaca göre chatbot, otomasyon ve yapay zekâ destekli özellikler.',
        highlights: ['7/24 Müşteri yanıt botu', 'Otomatik lead toplama', 'İşletmeye özel akıllı yönlendirme']
      }
    ]
  },
  howItWorks: {
    eyebrow: "SÜREÇ & ADIMLAR",
    heading: "Nasıl ",
    headingHighlight: "çalışıyoruz?",
    subtitle: "Karmaşık toplantılar ve aylar süren beklemeler yok. 4 net adımda sitenizi yayına alıyoruz.",
    steps: [
      {
        step: '01',
        title: 'Formu Doldurun',
        description: 'İşletmeniz ve sektörünüz hakkında birkaç temel bilgiyi iletin.',
        badge: '1 Dakika'
      },
      {
        step: '02',
        title: 'Ücretsiz Demo Hazırlayalım',
        description: '24-48 saat içinde markanıza özel interaktif ana sayfa demosunu hazırlayıp sunalım.',
        badge: '24-48 Saat'
      },
      {
        step: '03',
        title: 'İnceleyin & Onaylayın',
        description: 'Hazırlanan demoyu inceleyin, geri bildirimlerinizi verin ve birlikte ilerleme kararı alın.',
        badge: 'Karar Aşaması'
      },
      {
        step: '04',
        title: 'Yayına Alalım',
        description: 'Tüm sayfaları, formları ve domain ayarlarını tamamlayıp sitenizi canlıya alalım.',
        badge: 'Canlıya Geçiş'
      }
    ],
    bottomBox: {
      title: "Önce görün, sonra karar verin.",
      description: "Hiçbir peşin taahhütte bulunmadan işletmenize özel tasarlanmış ücretsiz demoyu talep edebilirsiniz.",
      cta: "Hemen Demo İste"
    }
  },
  pricing: {
    eyebrow: "ŞEFFAF FİYATLANDIRMA",
    heading: "İşletmenizin ihtiyacına uygun ",
    headingHighlight: "net paketler.",
    subtitle: "Gizli maliyetler veya beklenmeyen sürprizler yok. İhtiyacınıza en uygun çözümü seçin.",
    launchBadgeText: "LANSMANA ÖZEL · %20",
    launchSubtext: "Lansman dönemine özel sınırlı süreli fiyatlandırma.",
    includedHeading: "DAHİL OLANLAR",
    popularScopeHeading: "KAPSAM & ÖZELLİKLER",
    plans: [
      {
        id: 'starter',
        name: 'STARTER',
        standardPrice: '7.900 TL',
        launchPrice: '6.320 TL',
        period: 'başlayan fiyatlarla',
        badge: null,
        description: 'Hızlı, şık ve temel ihtiyaçları eksiksiz karşılayan tek sayfalık dijital vitrin.',
        features: [
          'Tek sayfalık profesyonel site',
          'Mobil uyumlu tasarım',
          'Hizmetler bölümü',
          'Hakkımızda',
          'İletişim',
          'WhatsApp entegrasyonu',
          'Google Maps',
          'Temel SEO',
          'SSL sertifikası',
          'Yayına alma desteği'
        ],
        ctaText: 'Starter Demo İste',
        popular: false
      },
      {
        id: 'business',
        name: 'BUSINESS',
        standardPrice: '12.900 TL',
        launchPrice: '10.320 TL',
        period: 'başlayan fiyatlarla',
        badge: 'EN ÇOK TERCİH EDİLEN',
        description: 'İşletmesini büyütmek, arama motorlarında öne çıkmak ve daha çok müşteri kazanmak isteyenler için.',
        features: [
          'Starter\'daki her şey',
          'Çok sayfalı yapı',
          'Özel hizmet sayfaları',
          'Gelişmiş tasarım',
          'İletişim formları',
          'Analytics kurulumu',
          'Search Console kurulumu',
          'Gelişmiş SEO altyapısı',
          'Sosyal medya entegrasyonları',
          'Daha kapsamlı içerik desteği'
        ],
        ctaText: 'Business Demo İste',
        popular: true
      },
      {
        id: 'ai-business',
        name: 'AI BUSINESS',
        standardPrice: '19.900 TL',
        launchPrice: '15.920 TL',
        period: 'başlayan fiyatlarla',
        badge: 'YAPAY ZEKÂ DESTEKLİ',
        description: 'Web sitenizi 7/24 müşteri toplayan ve soruları yanıtlayan akıllı bir asistana dönüştürün.',
        features: [
          'Business\'taki her şey',
          'İşletmeye özel AI özellikleri',
          'AI chatbot altyapısı',
          'Akıllı müşteri yönlendirme',
          'Lead toplama özellikleri',
          'Özel otomasyon seçenekleri'
        ],
        disclaimer: 'AI/API kullanım ücretleri kullanım miktarına ve projeye göre ayrıca belirlenebilir.',
        ctaText: 'AI Projesini Görüşelim',
        popular: false
      }
    ],
    paymentPlan: {
      items: ['Ücretsiz Demo', '%50 Başlangıç / %50 Teslim', 'Memnuniyet Güvencesi'],
      copy: 'Projeler %50 başlangıç ödemesiyle başlar. Kalan %50, onaylanan proje tesliminden önce tamamlanır.'
    },
    satisfactionPromise: {
      badge: 'GÜVEN & TAAHHÜT SİSTEMİ',
      heading: 'VELNAR Memnuniyet Güvencesi',
      p1: 'Önce işletmeniz için hazırlanan ücretsiz konsepti görün. Projeyi başlatmaya karar verdiğinizde yalnızca %50 başlangıç ödemesi yaparsınız.',
      p2: 'İlk kişiselleştirilmiş tasarım aşamasında birlikte ilerlememe kararı alınırsa başlangıç ödemeniz iade edilir.',
      note: 'Onayla satın alınmış domain, lisans veya üçüncü taraf hizmet bedelleri gibi geri alınamayan dış maliyetler iade kapsamı dışında olabilir. Kesin kapsam proje başlangıcında yazılı olarak paylaşılır.',
      highlights: [
        {
          title: 'Ücretsiz Ön İzleme',
          desc: 'Herhangi bir ödeme yapmadan önce markanıza özel hazırlanan çalışan demoyu test edersiniz.'
        },
        {
          title: 'Aşamalı Ödeme Güvencesi',
          desc: '%50 başlangıç ile başlanır, kalan %50 yalnızca onaylanan proje tesliminden önce ödenir.'
        },
        {
          title: 'Şeffaf İletişim',
          desc: 'Tüm adımlar, teslimat takvimi ve proje kapsamı en baştan yazılı ve net olarak belirlenir.'
        }
      ]
    }
  },
  faq: {
    eyebrow: "MERAK EDİLENLER",
    heading: "Sıkça sorulan ",
    headingHighlight: "sorular.",
    subtitle: "Aklınıza takılan soruların yanıtlarını aşağıda bulabilir, detaylar için bize doğrudan yazabilirsiniz.",
    stillHaveQuestion: "Başka bir sorunuz mu var?",
    askWhatsApp: "WhatsApp'tan Sorun",
    items: [
      {
        question: 'Ücretsiz demo süreci tam olarak nasıl işliyor?',
        answer: 'Formu doldurduktan sonra işletmenizin sektörüne, renklerine ve hizmetlerine uygun interaktif bir ana sayfa konsepti hazırlıyoruz (24-48 saat içinde). Bu demoyu inceleyip beğenirseniz projeyi başlatıyoruz; beğenmezseniz hiçbir ücret ödemiyorsunuz.'
      },
      {
        question: 'Proje ödeme planı ve güvencesi nasıldır?',
        answer: 'Projeler %50 başlangıç ödemesiyle başlar. Kalan %50, onaylanan proje tesliminden önce tamamlanır. İlk kişiselleştirilmiş tasarım aşamasında birlikte ilerlememe kararı alınırsa başlangıç ödemeniz iade edilir. Önceden onaylanmış domain/lisans gibi geri alınamayan harici maliyetler hariç tutulabilir.'
      },
      {
        question: 'Web sitem ne kadar sürede tamamlanır?',
        answer: 'Starter paketler için ortalama 3-5 iş günü, Business ve çok sayfalı projeler için ortalama 7-10 iş günü içerisinde tüm içerik yerleşimi ve testler tamamlanarak site yayına hazır hale getirilir.'
      },
      {
        question: 'Domain (alan adı) ve hosting süreçleri nasıl yönetiliyor?',
        answer: 'Mevcut bir alan adınız varsa sitenizi ona bağlıyoruz. Henüz bir alan adınız yoksa firmanız adına en uygun domaini seçmeniz ve kurulumunu yapmanız konusunda baştan sona rehberlik ediyoruz.'
      },
      {
        question: 'Sitem yayına alındıktan sonra güncelleme yapabilir miyim?',
        answer: 'Evet. İster aylık bakım ve güncelleme desteğimizden yararlanabilir, isterseniz de içerik güncellemeleri için dilediğiniz an bizimle iletişime geçebilirsiniz.'
      },
      {
        question: 'AI Business paketindeki yapay zekâ entegrasyonu ne işe yarar?',
        answer: 'İşletmenizin hizmetlerini, çalışma saatlerini, sık sorulan sorularını ve fiyat aralıklarını öğrenen akıllı bir sohbet asistanı sitenize entegre edilir. 7/24 gelen ziyaretçilerin sorularını yanıtlar ve randevu/iletişim bilgilerini toplayarak size iletir.'
      }
    ]
  },
  form: {
    eyebrow: "HEMEN BAŞLAYIN",
    heading: "İşletmeniz için ",
    headingHighlight: "ücretsiz demo isteyin.",
    subtitle: "24-48 saat içinde işletmenize özel tasarlanmış interaktif ana sayfa konseptinizi hazırlayıp size iletelim. Hiçbir peşin taahhüt gerekmez.",
    trustNote: "Önce görün. Sonra karar verin.",
    fields: {
      fullName: "Ad Soyad",
      fullNamePlaceholder: "Örn: Ahmet Yılmaz",
      businessName: "İşletme Adı",
      businessNamePlaceholder: "Örn: Yılmaz Otomotiv, Vera Klinik...",
      industry: "Sektör",
      industryPlaceholder: "Örn: Otomotiv, Güzellik, Restoran, Hukuk...",
      phone: "Telefon / WhatsApp",
      phonePlaceholder: "05XX XXX XX XX",
      website: "Mevcut Web Sitesi (Varsa)",
      websitePlaceholder: "www.isletmeniz.com",
      instagram: "Instagram Hesabı (Varsa)",
      instagramPlaceholder: "@isletmeniz",
      package: "İlgilendiğiniz Paket",
      packageOptions: [
        { label: "Starter (Tek Sayfa)", value: "Starter (Tek Sayfa)" },
        { label: "Business (Çok Sayfalı)", value: "Business (Çok Sayfalı)" },
        { label: "AI Business", value: "AI Business" },
        { label: "Emin Değilim / Öneri İstiyorum", value: "Emin Değilim" }
      ],
      note: "Kısa Not / Eklemek İstedikleriniz",
      notePlaceholder: "Sitenizde özellikle yer almasını istediğiniz hizmetler veya örnek beğendiğiniz siteler...",
      kvkkConsent: "Demo talebimin işlenmesi için",
      kvkkLink: "KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum."
    },
    submitCta: "Ücretsiz Demomu İste",
    submitting: "İletiliyor...",
    success: {
      title: "Talebiniz Başarıyla Alındı!",
      message: "İşletmeniz için özel demo hazırlıklarına başlıyoruz. 24-48 saat içinde belirttiğiniz telefon/WhatsApp numarası üzerinden sizinle iletişime geçeceğiz.",
      whatsappBtn: "WhatsApp'tan Hızlıca İletişime Geç",
      newRequestBtn: "Yeni Bir Talep Gönder"
    },
    directWhatsAppHelper: "Veya formu doldurmak yerine doğrudan WhatsApp hattımızdan yazabilirsiniz:",
    directWhatsAppBtn: "WhatsApp Hattımızdan Yazın",
    whatsappMessageTemplate: (data) => {
      return `📋 *YENİ DEMO TALEBİ*

*Ad Soyad:* ${data.fullName || '-'}
*İşletme:* ${data.businessName || '-'}
*Sektör:* ${data.industry || '-'}
*Telefon:* ${data.phone || '-'}
*Mevcut Site:* ${data.website || '-'}
*Instagram:* ${data.instagram || '-'}
*İlgilenilen Paket:* ${data.selectedPackage || '-'}
*Not:* ${data.note || '-'}`;
    }
  },
  finalCta: {
    badge: "ÖNCE GÖRÜN, SONRA KARAR VERİN",
    heading: "İşletmenizi dijitale taşımak için ",
    headingHighlight: "ilk adımı atın.",
    subtitle: "Hiçbir peşin ödeme veya taahhütte bulunmadan markanıza özel tasarlanmış demoyu 24-48 saat içinde hazırlayalım.",
    primaryCta: "Ücretsiz Demo İste",
    secondaryCta: "E-posta ile Hemen Yazın",
    guaranteeText: "%100 Ücretsiz Demo Önizleme · %50 Başlangıç / %50 Teslim · Memnuniyet Güvencesi"
  },
  footer: {
    descriptor: "STUDIO",
    tagline: "Modern işletmeler için müşteri kazandırmaya odaklı premium web siteleri ve dijital çözümler.",
    quickLinksTitle: "Hızlı Bağlantılar",
    servicesTitle: "Hizmetlerimiz",
    contactTitle: "İletişim & Konum",
    remoteNotice: "Türkiye geneli ve uluslararası uzaktan proje teslimi yapılmaktadır.",
    copyright: `© ${new Date().getFullYear()} ${CONFIG.BRAND_NAME} Studio. Tüm hakları saklıdır.`,
    kvkkText: "KVKK Aydınlatma Metni",
    privacyText: "Gizlilik Politikası"
  },
  modals: {
    demo: {
      liveStatusBadge: "Canlı Demo Yayında",
      interactiveTitle: "İnteraktif Canlı Demo Yayında",
      interactiveDesc: "Bu canlı çalışmayı yeni sekmede doğrudan test edebilir veya kendi işletmeniz için birebir uyarlanmış ücretsiz ana sayfa demosunu 24-48 saat içinde talep edebilirsiniz.",
      keyFeaturesTitle: "Bu Konseptteki Öne Çıkan Özellikler:",
      mobileSpeedBadge: "%100 Mobil Hız Odaklı",
      whatsappBadge: "Hızlı İletişim & Yanıt",
      sslBadge: "SSL & Güvenli Altyapı",
      openLiveBtn: "Canlı Sayfayı Aç",
      askWhatsAppBtn: "E-posta ile Sor",
      requestCustomBtn: "İşletmeme Özel Demo İste",
      whatsAppAskMessage: (title: string) => `Merhaba, ${title} konseptinizi inceledim. Benim işletmem için de benzer bir ücretsiz demo hazırlayabilir misiniz?`
    },
    legal: {
      kvkkTitle: `${CONFIG.BRAND_NAME} KVKK Aydınlatma Metni`,
      kvkkBadge: "Aydınlatma Metni",
      kvkkP1: "6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında; VELNAR olarak, demo talep formu ve iletişim kanalları aracılığıyla bizimle paylaştığınız ad, soyad, telefon numarası, işletme adı ve sektörel bilgileriniz yalnızca size özel web sitesi demosu hazırlamak ve bilgilendirme sağlamak amacıyla işlenmektedir.",
      kvkkP2: "Verileriniz açık rızanız olmaksızın üçüncü taraflara aktarılmaz, ticari amaçla satılmaz ve kanuni zorunluluklar haricinde gizli tutulur.",
      kvkkP3: `Verilerinizin silinmesini veya güncellenmesini talep etmek için dilediğiniz zaman ${CONFIG.EMAIL} adresi üzerinden bizimle iletişime geçebilirsiniz.`,
      privacyTitle: `${CONFIG.BRAND_NAME} Gizlilik Politikası`,
      privacyBadge: "Gizlilik ve Güvenlik Politikası",
      privacyP1: "VELNAR olarak ziyaretçilerimizin ve müşterilerimizin dijital gizliliğine ve bilgi güvenliğine azami önem vermekteyiz.",
      privacyP2: "Sitemiz üzerinden paylaştığınız iletişim verileri sadece talep ettiğiniz hizmet ve demo çalışmasının yürütülmesi amacıyla kullanılmaktadır. Sitemizde gereksiz üçüncü taraf izleyiciler bulunmamaktadır.",
      privacyP3: `Her türlü soru, görüş ve veri silme talebiniz için ${CONFIG.EMAIL} üzerinden bize ulaşabilirsiniz.`,
      closeBtn: "Anladım & Kapat"
    }
  },
  floatingWhatsApp: {
    tooltip: "Ücretsiz demo veya sorularınız için hello@velnar.studio adresine yazın",
    ariaLabel: "E-posta ile doğrudan mesaj gönderin",
    defaultMessage: "Merhaba, işletmem için web sitesi ve ücretsiz demo hakkında bilgi almak istiyorum."
  }
};
