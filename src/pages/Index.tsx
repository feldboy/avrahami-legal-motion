
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Page load animation
    gsap.set("body", { overflow: "hidden" });
    
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set("body", { overflow: "auto" });
      }
    });

    // Initial page load effect
    tl.from(".page-content", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    // Smooth scrolling behavior
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger when page loads
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="page-content">
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-playfair font-bold mb-2">יוסי אברהמי</h3>
              <p className="text-gold-400">עורך דין מומחה</p>
            </div>
            
            <div className="flex justify-center space-x-8 rtl:space-x-reverse mb-6">
              <a href="tel:054-123-4567" className="hover:text-gold-400 transition-colors">
                📞 054-123-4567
              </a>
              <a href="mailto:office@yossi-law.co.il" className="hover:text-gold-400 transition-colors">
                ✉️ office@yossi-law.co.il
              </a>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                © 2024 יוסי אברהמי - עורך דין. כל הזכויות שמורות.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                האתר נבנה עם טכנולוגיות מתקדמות לחוויית משתמש מיטבית
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
