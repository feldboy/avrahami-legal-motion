import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import anime from 'animejs';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Initial setup - hide elements
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate in sequence
    timeline
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    // Animate title letters
    if (titleRef.current) {
      anime({
        targets: titleRef.current?.querySelectorAll('.letter'),
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100, {start: 500}),
        duration: 800,
        easing: 'easeOutQuart'
      });
    }

    // Floating animation for chevron
    gsap.to('.scroll-indicator', {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 3
    });

  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center luxury-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold-600 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 border border-gold-600 transform rotate-45 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border-2 border-gold-600 rounded-lg animate-float animation-delay-400"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
          >
            {splitText('יוסי אברהמי')}
            <br />
            <span className="text-gradient text-4xl md:text-6xl">
              {splitText('עורך דין')}
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-assistant"
          >
            15 שנות ניסיון במקרקעין, חוזים מסחריים ותביעות אזרחיות
            <br />
            <span className="text-gold-400 font-medium">
              אסטרטגיה משפטית מותאמת אישית • תוצאות יוצאות דופן
            </span>
          </p>

          {/* CTA Section */}
          <div ref={ctaRef} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="gold-gradient text-navy-800 hover:opacity-90 transition-all duration-300 hover:scale-105 font-assistant font-semibold text-lg px-8 py-4 rounded-lg luxury-shadow"
              >
                לייעוץ ראשוני
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-800 transition-all duration-300 font-assistant font-semibold text-lg px-8 py-4 rounded-lg"
              >
                לצפייה בתיק עבודות
              </Button>
            </div>

            <div className="text-gray-300 space-y-2">
              <p className="text-lg">📞 054-123-4567</p>
              <p className="text-lg">✉️ office@yossi-law.co.il</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-indicator"
          onClick={scrollToNext}
        >
          <div className="flex flex-col items-center space-y-2 text-gold-400 hover:text-gold-300 transition-colors">
            <span className="text-sm font-assistant">גלה עוד</span>
            <ChevronDown size={24} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
