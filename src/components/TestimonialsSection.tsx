
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "יוסי ליווה אותנו בעסקת נדל\"ן מורכבת בצורה מקצועית ויעילה. הוא הציל לנו זמן יקר ומניע אותנו מבעיות שלא צפינו מראש.",
    author: "ד\"ר מ. כהן",
    role: "עסקת מקרקעין - 12 מיליון ש\"ח",
    rating: 5
  },
  {
    quote: "הייעוץ המשפטי שקיבלנו היה ברמה הגבוהה ביותר. יוסי הבין את הצרכים העסקיים שלנו ונתן פתרונות מעשיים ויצירתיים.",
    author: "ש. לוי",
    role: "מנכ\"ל חברת טכנולוגיה",
    rating: 5
  },
  {
    quote: "בתיק הליטיגציה שלנו, יוסי הפגין מקצועיות יוצאת דופן ומחויבות מלאה. התוצאה עלתה על כל הציפיות.",
    author: "א. רוזנברג",
    role: "תביעה אזרחית - 800,000 ש\"ח",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate cards in sequence
    gsap.fromTo(cardsRef.current,
      {
        opacity: 0,
        y: 100,
        rotationX: -15
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate quotes with typing effect
    cardsRef.current.forEach((card, index) => {
      const quoteElement = card?.querySelector('.quote-text');
      if (quoteElement) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            const text = quoteElement.textContent || '';
            quoteElement.textContent = '';
            
            anime({
              targets: quoteElement,
              duration: text.length * 30,
              delay: index * 200,
              update: function(anim) {
                const progress = Math.round(anim.progress);
                const currentLength = Math.round((text.length * progress) / 100);
                quoteElement.textContent = text.substring(0, currentLength);
              }
            });
          }
        });
      }
    });

  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy-800 mb-6">
            מה הלקוחות שלנו אומרים
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            הוכחה חברתית לאיכות השירות והתוצאות שאנו מביאים
          </p>
          <div className="w-24 h-1 gold-gradient rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => addToRefs(el, index)}
              className="bg-white p-8 rounded-xl luxury-shadow hover-lift cursor-pointer group"
            >
              {/* Quote Icon */}
              <div className="text-gold-600 text-4xl font-playfair mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                "
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gold-600 text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                <span className="quote-text">{testimonial.quote}</span>
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-600 to-gold-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-playfair font-bold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-assistant font-semibold text-navy-800">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-xl luxury-shadow max-w-2xl mx-auto">
            <h3 className="text-2xl font-playfair font-bold text-navy-800 mb-4">
              רוצים להיות הלקוח המרוצה הבא?
            </h3>
            <p className="text-gray-600 mb-6">
              בואו נדבר על איך אוכל לסייע לכם להשיג את המטרות שלכם
            </p>
            <button className="gold-gradient text-navy-800 font-assistant font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105">
              קביעת פגישת ייעוץ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
