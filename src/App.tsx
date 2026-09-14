import React, { useState, useEffect } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { syncAllLocalVideosToServer } from './lib/videoStorage';
import { BrandHeader } from './components/navigation/BrandHeader';
import { BrandFooter } from './components/navigation/BrandFooter';
import { ColorPaletteSection } from './components/design-system/ColorPaletteSection';
import { TypographySection } from './components/design-system/TypographySection';
import { ButtonShowcaseSection } from './components/design-system/ButtonShowcaseSection';
import { CardShowcaseSection } from './components/design-system/CardShowcaseSection';
import { BadgeShowcaseSection } from './components/design-system/BadgeShowcaseSection';
import { ImageryShowcaseSection } from './components/design-system/ImageryShowcaseSection';
import { LayoutGridSection } from './components/design-system/LayoutGridSection';
import { SectionTemplatePreview } from './components/design-system/SectionTemplatePreview';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { BeforeAfterSection } from './components/sections/BeforeAfterSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { InspectionModal } from './components/modals/InspectionModal';
import { CallModal } from './components/modals/CallModal';
import { FloatingContactBar } from './components/navigation/FloatingContactBar';
import { AdminControlBar } from './components/admin/AdminControlBar';

export default function App() {
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  useEffect(() => {
    // Automatically upload any previously stored browser video to the server
    syncAllLocalVideosToServer();
  }, []);

  const handleOpenInspection = (servicePrefill?: string) => {
    setSelectedService(servicePrefill);
    setIsInspectionOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A2433] flex flex-col selection:bg-[#0A2540] selection:text-white overflow-x-hidden">
      
      {/* 1. Global Brand Header with Official Dr. Fixit Asset & Primary Actions */}
      <BrandHeader
        onOpenInspectionModal={() => handleOpenInspection()}
        onCallNow={() => setIsCallOpen(true)}
      />

      {/* 2. Hero Section: Core Problem Solving & Conversion Engine */}
      <HeroSection
        onOpenInspectionModal={() => handleOpenInspection()}
        onCallNow={() => setIsCallOpen(true)}
      />

      {/* 3. Services Section: 6 Professional Core Waterproofing Solutions */}
      <ServicesSection
        onOpenInspectionModal={handleOpenInspection}
        onCallNow={() => setIsCallOpen(true)}
      />

      {/* 4. Projects / Our Work Section: Photographic Project Gallery */}
      <ProjectsSection
        onOpenInspectionModal={handleOpenInspection}
      />

      {/* 5. Before & After Section: See the Difference Proper Waterproofing Can Make */}
      <BeforeAfterSection
        onOpenInspectionModal={handleOpenInspection}
      />

      {/* 6. Why Choose Us Section: Protection That Starts With the Right Solution */}
      <WhyChooseUsSection />

      {/* 7. Process Section: From Inspection to Protection */}
      <ProcessSection
        onOpenInspectionModal={() => handleOpenInspection()}
      />

      {/* 8. Customer Testimonials Section: Authentic Feedback Placeholders */}
      <TestimonialsSection
        onOpenInspectionModal={handleOpenInspection}
      />

      {/* 9. About Section: Waterproofing Focused on Long-Term Property Protection */}
      <AboutSection
        onCallNow={() => setIsCallOpen(true)}
        onOpenInspectionModal={handleOpenInspection}
      />

      {/* 10. Contact / Free Inspection Section: High-Conversion Problem Assessment */}
      <ContactSection
        onCallModalOpen={() => setIsCallOpen(true)}
      />

      {/* Engineering Design System Specs Accordion Bar */}
      <section className="bg-slate-100 border-t border-slate-200 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A2540]" />
            <span className="font-semibold text-slate-700">Aquaseal Brand Foundation & Technical Design System</span>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-xs border border-slate-300 text-slate-500 hidden sm:inline">
              Tokens & Components
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowDesignSystem(!showDesignSystem)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-[#0A2540] hover:bg-slate-50 text-[#0A2540] rounded-sm font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer shadow-2xs"
            aria-expanded={showDesignSystem}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showDesignSystem ? 'Hide Design Tokens' : 'View Design System Modules (8)'}</span>
            {showDesignSystem ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </section>

      {/* Optional Design System Documentation Modules */}
      {showDesignSystem && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10 animate-in fade-in duration-200">
          <div className="mb-8 p-4 bg-blue-50/70 border border-blue-200 rounded-sm text-xs text-[#0A2540]">
            <p className="font-bold uppercase tracking-wider mb-1">Architectural Design System Specifications</p>
            <p className="text-slate-600">
              The following modules document the typography scale, geometric balance color tokens, card depth rules, and component states established for the Aquaseal Waterproofing web experience.
            </p>
          </div>

          {/* Module 1: Colors */}
          <ColorPaletteSection />

          {/* Module 2: Typography */}
          <TypographySection />

          {/* Module 3: Buttons & CTAs */}
          <ButtonShowcaseSection
            onOpenInspectionModal={() => setIsInspectionOpen(true)}
            onCallNow={() => setIsCallOpen(true)}
          />

          {/* Module 4: Cards & Depth */}
          <CardShowcaseSection />

          {/* Module 5: Labels & Tags */}
          <BadgeShowcaseSection />

          {/* Module 6: Imagery & Official Logo Asset */}
          <ImageryShowcaseSection />

          {/* Module 7: Spacing & Responsive Grid Rules */}
          <LayoutGridSection />

          {/* Module 8: Live Template Section Preview */}
          <SectionTemplatePreview
            onOpenInspectionModal={() => setIsInspectionOpen(true)}
            onCallNow={() => setIsCallOpen(true)}
          />
        </main>
      )}

      {/* Official Brand Footer */}
      <BrandFooter
        onOpenInspectionModal={handleOpenInspection}
        onCallModalOpen={() => setIsCallOpen(true)}
      />

      {/* Interactive Modals for Testing Button CTAs */}
      <InspectionModal
        isOpen={isInspectionOpen}
        onClose={() => {
          setIsInspectionOpen(false);
          setSelectedService(undefined);
        }}
        initialProblemArea={selectedService}
      />

      <CallModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
      />

      {/* Floating Instant Contact Actions (Call & WhatsApp) */}
      <FloatingContactBar />

      {/* Owner / Admin Control Bar for AI Studio & Video Access */}
      <AdminControlBar />

    </div>
  );
}
