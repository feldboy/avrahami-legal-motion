
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    // Content animation
    gsap.fromTo(content.children, 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image animation
    gsap.fromTo(image,
      {
        opacity: 0,
        scale: 0.8,
        rotationY: 15
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy-800 mb-6">
                אודות יוסי אברהמי
              </h2>
              <div className="w-24 h-1 gold-gradient rounded-full mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                עם יותר מ-15 שנות ניסיון בעולם המשפט, אני מתמחה במתן פתרונות משפטיים 
                מקיפים ומותאמים אישית ללקוחותיי. הגישה שלי משלבת מומחיות משפטית עמוקה 
                עם הבנה עסקית וחשיבה יצירתית.
              </p>
              
              <p>
                במהלך הקריירה שלי ייצגתי מגוון רחב של לקוחות - מיחידים פרטיים ועד 
                חברות גדולות, בתחומים מגוונים כמו דיני מקרקעין, חוזים מסחריים, 
                תביעות אזרחיות וליטיגציה מורכבת.
              </p>

              <div className="bg-white p-6 rounded-lg luxury-shadow">
                <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">
                  הערכים שמנחים אותי:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gold-600 ml-3 text-xl">•</span>
                    <span><strong>מקצועיות בלתי מתפשרת</strong> - כל תיק מקבל את מלא תשומת הלב</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-600 ml-3 text-xl">•</span>
                    <span><strong>שקיפות מלאה</strong> - תמיד תדעו במה אתם עומדים</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-600 ml-3 text-xl">•</span>
                    <span><strong>זמינות</strong> - אני כאן כשאתם צריכים אותי</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Image */}
          <div ref={imageRef} className="relative">
            <div className="relative z-10">
              <div className="w-full h-96 bg-gradient-to-br from-navy-800 to-navy-600 rounded-2xl luxury-shadow flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-gold-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-playfair font-bold text-navy-800">י.א</span>
                  </div>
                  <h3 className="text-2xl font-playfair font-bold">יוסי אברהמי</h3>
                  <p className="text-gold-400 mt-2">עורך דין מומחה</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold-600 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold-600 transform rotate-45 opacity-20 animate-bounce-gentle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
