import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DemoPortfolio } from './components/DemoPortfolio';
import { ProblemValue } from './components/ProblemValue';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { FinalCTA } from './components/FinalCTA';
import { FAQ } from './components/FAQ';
import { DemoRequestForm } from './components/DemoRequestForm';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { LegalModal } from './components/LegalModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PaymentModal } from './components/PaymentModal';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { PaymentFailedPage } from './components/PaymentFailedPage';
import { DemoItem } from './types';

export default function App() {
  const { lang } = useLanguage();
  const [selectedDemo, setSelectedDemo] = useState<DemoItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>('Business');
  const [prefilledIndustry, setPrefilledIndustry] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'kvkk' | 'gizlilik' | null>(null);
  const [paymentModalPackage, setPaymentModalPackage] = useState<'starter' | 'business' | 'ai-business' | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToDemoForm = () => {
    if (currentPath.includes('/payment/')) {
      navigateTo(`/${lang}#demo-talep`);
      setTimeout(() => {
        const el = document.getElementById('demo-talep');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }
    const el = document.getElementById('demo-talep');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPackageFromPricing = (pkgName: string) => {
    setSelectedPackage(pkgName);
    scrollToDemoForm();
  };

  const handleStartPayment = (pkgId: 'starter' | 'business' | 'ai-business') => {
    setPaymentModalPackage(pkgId);
  };

  const handleRequestSimilarDemo = (industry: string) => {
    setPrefilledIndustry(industry);
    scrollToDemoForm();
  };

  const isSuccessRoute = currentPath.includes('/payment/success');
  const isFailedRoute = currentPath.includes('/payment/failed');

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#090A0A] text-[#F3F0E8] flex flex-col font-sans selection:bg-[#C6A76A]/30 selection:text-[#F3F0E8] antialiased">
      {/* Sticky Header */}
      <Navbar onDemoClick={scrollToDemoForm} />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {isSuccessRoute ? (
          <PaymentSuccessPage onGoHome={() => navigateTo(`/${lang}`)} />
        ) : isFailedRoute ? (
          <PaymentFailedPage
            onRetry={() => {
              navigateTo(`/${lang}#paketler`);
              setPaymentModalPackage('business');
            }}
            onGoHome={() => navigateTo(`/${lang}`)}
          />
        ) : (
          <>
            {/* 1. Hero */}
            <Hero onDemoClick={scrollToDemoForm} />

            {/* 2. Portfolio / Demos */}
            <DemoPortfolio
              onSelectDemo={(demo) => setSelectedDemo(demo)}
              onDemoClick={scrollToDemoForm}
            />

            {/* 3. Core Benefits */}
            <ProblemValue />

            {/* 4. How It Works */}
            <HowItWorks onDemoClick={scrollToDemoForm} />

            {/* 5. Pricing */}
            <Pricing
              onSelectPackage={handleSelectPackageFromPricing}
              onStartPayment={handleStartPayment}
            />

            {/* 6. Free Demo CTA */}
            <FinalCTA onDemoClick={scrollToDemoForm} />

            {/* 7. FAQ & Demo Request Form */}
            <FAQ />

            <DemoRequestForm
              selectedPackageFromPricing={selectedPackage}
              prefilledIndustry={prefilledIndustry}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onDemoClick={scrollToDemoForm}
      />

      {/* Modals & Floating Widgets */}
      <DemoModal
        demo={selectedDemo}
        onClose={() => setSelectedDemo(null)}
        onRequestSimilar={handleRequestSimilarDemo}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {paymentModalPackage && (
        <PaymentModal
          isOpen={true}
          packageId={paymentModalPackage}
          onClose={() => setPaymentModalPackage(null)}
        />
      )}

      <FloatingWhatsApp />
    </div>
  );
}
