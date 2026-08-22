import React, { useState } from 'react';
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
import { DemoItem } from './types';

export default function App() {
  const [selectedDemo, setSelectedDemo] = useState<DemoItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>('Business');
  const [prefilledIndustry, setPrefilledIndustry] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'kvkk' | 'gizlilik' | null>(null);

  const scrollToDemoForm = () => {
    const el = document.getElementById('demo-talep');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPackageFromPricing = (pkgName: string) => {
    setSelectedPackage(pkgName);
    scrollToDemoForm();
  };

  const handleRequestSimilarDemo = (industry: string) => {
    setPrefilledIndustry(industry);
    scrollToDemoForm();
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#090A0A] text-[#F3F0E8] flex flex-col font-sans selection:bg-[#C6A76A]/30 selection:text-[#F3F0E8] antialiased">
      {/* Sticky Header */}
      <Navbar onDemoClick={scrollToDemoForm} />

      {/* Main Content Sections - Reordered and Shortened */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 1. Hero */}
        <Hero onDemoClick={scrollToDemoForm} />
        
        {/* 2. Portfolio / Demos (Visual proof immediately after Hero) */}
        <DemoPortfolio 
          onSelectDemo={(demo) => setSelectedDemo(demo)} 
          onDemoClick={scrollToDemoForm} 
        />
        
        {/* 3. Core Benefits (Compact 4-column layout) */}
        <ProblemValue />
        
        {/* 4. How It Works (Horizontal 4-step timeline) */}
        <HowItWorks onDemoClick={scrollToDemoForm} />
        
        {/* 5. Pricing (3 transparent tiers) */}
        <Pricing onSelectPackage={handleSelectPackageFromPricing} />
        
        {/* 6. Free Demo CTA (High-impact conversion strip) */}
        <FinalCTA onDemoClick={scrollToDemoForm} />
        
        {/* 7. FAQ & Demo Request Form */}
        <FAQ />
        
        <DemoRequestForm 
          selectedPackageFromPricing={selectedPackage}
          prefilledIndustry={prefilledIndustry}
        />
      </main>

      {/* 8. Footer */}
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

      <FloatingWhatsApp />
    </div>
  );
}
