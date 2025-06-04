import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseItem {
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

const expertiseData: ExpertiseItem[] = [
  {
    title: "דיני מקרקעין",
    description: "ייעוץ מקיף בעסקאות נדל\"ן, רישוי והסדרת מקרקעין",
    icon: "🏢",
    features: ["עסקאות נדל\"ן", "רישוי בנייה", "הסדרת מקרקעין", "זכויות בנייה"],
    color: "from-blue-600 to-blue-800"
  },
  {
    title: "חוזים מסחריים",
    description: "ניסוח וביקורת חוזים עסקיים מורכבים",
    icon: "📋",
    features: ["חוזי שותפות", "הסכמי שירות", "חוזי אספקה", "הסכמי סודיות"],
    color: "from-green-600 to-green-800"
  },
  {
    title: "תביעות אזרחיות",
    description: "ייצוג בתביעות אזרחיות ומסחריות מורכבות",
    icon: "⚖️",
    features: ["תביעות נזיקין", "הפרת חוזה", "סכסוכים מסחריים", "גישור ובוררות"],
    color: "from-purple-600 to-purple-800"
  },
  {
    title: "ייעוץ עסקי",
    description: "ליווי משפטי שוטף לעסקים וחברות",
    icon: "💼",
    features: ["הקמת חברות", "ממשל תאגידי", "עסקאות מיזוג", "ציות רגולטורי"],
    color: "from-orange-600 to-orange-800"
  }
];

const EnhancedExpertiseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial states
    gsap.set(titleRef.current, { opacity: 0, y: 50 });
    gsap.set('.expertise-card', { opacity: 0, y: 80 });

    // Create scroll trigger for the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        // Animate title
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        });

        // Animate cards with stagger
        gsap.to('.expertise-card', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.3
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-playfair font-bold text-navy-800 mb-6"
          >
            תחומי התמחות
          </h2>
          <div className="w-24 h-1 gold-gradient rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            שירותים משפטיים מקיפים המותאמים לצרכים הייחודיים של כל לקוח
          </p>
        </div>

        {/* Expertise Cards */}
        <div ref={cardsContainerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              className="expertise-card bg-white rounded-2xl p-8 luxury-shadow hover-lift transition-all duration-500 relative overflow-hidden group"
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon with animation */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-playfair font-bold text-navy-800 mb-4 group-hover:text-gold-600 transition-colors duration-300">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {item.description}
              </p>
              
              {/* Features List */}
              <ul className="space-y-3">
                {item.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className="feature-item flex items-center text-sm text-gray-700 transform transition-transform duration-200"
                  >
                    <span className="w-2 h-2 bg-gold-600 rounded-full ml-3 flex-shrink-0"></span>
                    <span className="group-hover:text-navy-800 transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* Hover effect overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 luxury-shadow max-w-4xl mx-auto">
            <h3 className="text-3xl font-playfair font-bold text-navy-800 mb-4">
              זקוק לייעוץ משפטי מקצועי?
            </h3>
            <p className="text-xl text-gray-600 mb-6">
              בואו נדבר על האתגרים המשפטיים שלכם ונמצא יחד את הפתרון המתאים
            </p>
            <button className="gold-gradient text-navy-800 font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 luxury-shadow">
              קבעו פגישת ייעוץ
            </button>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-20 h-20 border border-gold-600 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 border-2 border-gold-600 transform rotate-45 opacity-20 animate-bounce-gentle"></div>
    </section>
  );
};

export default EnhancedExpertiseSection;
