import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { 
  createTimeline, 
  animateTextReveal, 
  createHoverAnimation,
  ThreeJSManager,
  ANIMATION_CONFIG,
  AnimationPerformance
} from '@/lib/animations';

const EnhancedHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const threeDContainerRef = useRef<HTMLDivElement>(null);
  const scalesIconRef = useRef<SVGSVGElement>(null);
  const threeManagerRef = useRef<ThreeJSManager | null>(null);

  useEffect(() => {
    // Start performance monitoring
    AnimationPerformance.start();

    // Initialize 3D scene
    if (threeDContainerRef.current) {
      threeManagerRef.current = new ThreeJSManager(threeDContainerRef.current, {
        alpha: true,
        antialias: true
      });

      // Add lighting
      threeManagerRef.current.addLighting();

      // Create and add 3D legal scales
      const scales = threeManagerRef.current.createLegalScales();
      scales.position.set(2, 0, 0);
      scales.userData.rotate = true;
      scales.userData.float = true;
      threeManagerRef.current.getScene().add(scales);

      // Create floating particles
      const particles = threeManagerRef.current.createFloatingParticles(30);
      particles.userData.float = true;
      threeManagerRef.current.getScene().add(particles);

      // Start animation loop
      threeManagerRef.current.animate();
    }

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let mainTl: gsap.core.Timeline | null = null;
    let reducedMotionTl: gsap.core.Timeline | null = null;
    let scalesIconTween: gsap.core.Tween | null = null;
    let scrollIndicatorTween: gsap.core.Tween | null = null;

    if (prefersReducedMotion) {
      // Reduced motion animations
      if (threeDContainerRef.current) {
        threeDContainerRef.current.style.opacity = '0.05'; // Minimal 3D bg visibility
        // Do not call threeManagerRef.current.animate()
      }

      // Simple fade-in for text and CTAs
      reducedMotionTl = gsap.timeline();
      const elementsToFade = [];
      if (titleRef.current) elementsToFade.push(titleRef.current);
      if (subtitleRef.current) elementsToFade.push(subtitleRef.current);
      if (ctaRef.current) {
        const ctaButtons = ctaRef.current.querySelectorAll('.cta-button');
        elementsToFade.push(...Array.from(ctaButtons));
         // Apply hover animations even in reduced motion, as they are user-initiated
        ctaButtons.forEach(button => {
          createHoverAnimation(
            button,
            { scale: 1.05, translateY: -5, boxShadow: '0 20px 40px rgba(205, 164, 52, 0.3)' },
            { scale: 1, translateY: 0, boxShadow: '0 10px 20px rgba(205, 164, 52, 0.1)' }
          );
        });
      }

      if (elementsToFade.length > 0) {
        reducedMotionTl.to(elementsToFade, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.1, // Slight stagger for a bit of separation
        });
      }
      // No continuous animations (SVG icon rotation, scroll indicator bounce)

    } else {
      // Full animation experience
      if (threeManagerRef.current) {
        threeManagerRef.current.animate(); // Start 3D animation loop
      }

      mainTl = gsap.timeline();

      // Animate background elements
      if (threeDContainerRef.current) {
        mainTl.fromTo(threeDContainerRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 0.2, scale: 1, duration: 0.8 }
        );
      }
      if (heroRef.current) {
        const backgroundPatternDiv = heroRef.current.querySelector('div.absolute.inset-0.opacity-10');
        if (backgroundPatternDiv) {
          mainTl.fromTo(backgroundPatternDiv,
            { opacity: 0, scale: 0.95 },
            { opacity: 0.1, scale: 1, duration: 0.8 },
            "<"
          );
        }
      }

      // Animate title
      if (titleRef.current) {
        mainTl.fromTo(titleRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
          "+=0.2"
        );
      }

      // Animate subtitle
      if (subtitleRef.current) {
        mainTl.fromTo(subtitleRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
          "-=0.5"
        );
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        const ctaButtons = ctaRef.current.querySelectorAll('.cta-button');
        ctaButtons.forEach((button) => {
          createHoverAnimation(
            button,
            { scale: 1.05, translateY: -5, boxShadow: '0 20px 40px rgba(205, 164, 52, 0.3)' },
            { scale: 1, translateY: 0, boxShadow: '0 10px 20px rgba(205, 164, 52, 0.1)' }
          );
        });
        mainTl.fromTo(ctaButtons, {
          opacity: 0, y: 50, scale: 0.8
        }, {
          opacity: 1, y: 0, scale: 1,
          duration: ANIMATION_CONFIG.durations.normal,
          ease: ANIMATION_CONFIG.easings.bounce,
          stagger: 0.2
        }, "+=0.3");
      }

      // SVG rotation animation for scales icon
      if (scalesIconRef.current) {
        scalesIconTween = gsap.to(scalesIconRef.current, {
          rotation: 360, duration: 10, repeat: -1, ease: "none"
        });
      }

      // Floating animation for scroll indicator
      // Using a timeout to ensure it starts after the main sequence.
      // Could also be added to mainTl with a delay: mainTl.to('.scroll-indicator', {...}, '+=1');
      setTimeout(() => {
        // Check if component is still mounted and scroll indicator exists
        if (heroRef.current) {
          scrollIndicatorTween = gsap.to('.scroll-indicator', {
            y: 15, opacity: 0.7, duration: 2, repeat: -1, yoyo: true, ease: ANIMATION_CONFIG.easings.gentle
          });
        }
      }, 3500);
    }

    // Cleanup function
    return () => {
      if (threeManagerRef.current) {
        threeManagerRef.current.dispose();
      }
      if (mainTl) {
        mainTl.kill();
      }
      if (reducedMotionTl) {
        reducedMotionTl.kill();
      }
      if (scalesIconTween) {
        scalesIconTween.kill();
      }
      if (scrollIndicatorTween) {
        scrollIndicatorTween.kill();
      }
      // Ensure any other individual tweens created outside timelines are also killed if necessary.
      // For example, if scroll-indicator click animation was a global tween not tied to component lifecycle.
      // However, the click animation for scroll-indicator is short-lived and likely okay.
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
    
    // Add click animation feedback
    gsap.to('.scroll-indicator', {
      scale: 0.9,
      duration: 0.15,
      ease: ANIMATION_CONFIG.easings.sharp,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center luxury-gradient overflow-hidden">
      {/* 3D Background Scene */}
      <div 
        ref={threeDContainerRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Enhanced Background Pattern with SVG */}
      <div className="absolute inset-0 opacity-10" style={{ zIndex: 2 }}>
        <div className="absolute top-10 left-10 w-32 h-32">
          <svg ref={scalesIconRef} viewBox="0 0 24 24" className="w-full h-full text-gold-600">
            <path 
              className="scales-path"
              d="M12 2L13.09 8.26L22 9L17 14L18.18 23L12 19.77L5.82 23L7 14L2 9L10.91 8.26L12 2Z" 
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="absolute top-1/4 right-20 w-24 h-24 border border-gold-600 transform rotate-45 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border-2 border-gold-600 rounded-lg animate-float animation-delay-400"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/3 left-1/3 w-16 h-16 border border-gold-600 rounded-full animate-float animation-delay-600"></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border-2 border-gold-600 transform rotate-12 animate-bounce-gentle animation-delay-800"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Main Title */}
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
            style={{ opacity: 0 }}
          >
            יוסי אברהמי
            <br />
            <span className="text-gradient text-4xl md:text-6xl">
              עורך דין
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-assistant"
            style={{ opacity: 0 }}
          >
            15 שנות ניסיון במקרקעין, חוזים מסחריים ותביעות אזרחיות
            <br />
            <span className="text-gold-400 font-medium">
              אסטרטגיה משפטית מותאמת אישית • תוצאות יוצאות דופן
            </span>
          </p>

          {/* Enhanced CTA Section */}
          <div ref={ctaRef} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="cta-button gold-gradient text-navy-800 hover:opacity-90 transition-all duration-300 font-assistant font-semibold text-lg px-8 py-4 rounded-lg luxury-shadow"
                style={{ opacity: 0 }}
              >
                לייעוץ ראשוני
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="cta-button border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-800 transition-all duration-300 font-assistant font-semibold text-lg px-8 py-4 rounded-lg"
                style={{ opacity: 0 }}
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

        {/* Enhanced Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-indicator"
          onClick={scrollToNext}
          style={{ zIndex: 20 }}
        >
          <div className="flex flex-col items-center space-y-2 text-gold-400 hover:text-gold-300 transition-colors">
            <span className="text-sm font-assistant">גלה עוד</span>
            <ChevronDown size={24} />
            <div className="w-1 h-8 bg-gradient-to-b from-gold-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 text-white text-xs bg-black bg-opacity-50 p-2 rounded">
          FPS: <span id="fps-counter">--</span>
        </div>
      )}
    </section>
  );
};

export default EnhancedHeroSection;
