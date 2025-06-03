
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

    if (!section || !form || !contactInfo) return;

    // Animate form fields
    gsap.fromTo(form.querySelectorAll('.form-field'),
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: form,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate contact info
    gsap.fromTo(contactInfo.children,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactInfo,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "הודעתכם נשלחה בהצלחה!",
      description: "נחזור אליכם בתוך 24 שעות",
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });

    // Animate success
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <section ref={sectionRef} className="py-20 luxury-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            מוכנים להתקדם?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            בואו נבחן יחד איך אוכל לסייע לכם להשיג את המטרות שלכם
          </p>
          <div className="w-24 h-1 gold-gradient rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-playfair font-bold text-white mb-6">
              שלחו לנו הודעה
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-field">
                <Label htmlFor="name" className="text-white mb-2 block">
                  שם מלא *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 transition-all duration-300"
                  placeholder="הזינו את שמכם המלא"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-field">
                  <Label htmlFor="phone" className="text-white mb-2 block">
                    טלפון *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 transition-all duration-300"
                    placeholder="054-123-4567"
                    required
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="email" className="text-white mb-2 block">
                    אימייל *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <Label htmlFor="subject" className="text-white mb-2 block">
                  נושא הפנייה
                </Label>
                <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="בחרו נושא" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">דיני מקרקעין</SelectItem>
                    <SelectItem value="contracts">חוזים מסחריים</SelectItem>
                    <SelectItem value="civil">תביעות אזרחיות</SelectItem>
                    <SelectItem value="litigation">ליטיגציה</SelectItem>
                    <SelectItem value="other">אחר</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-field">
                <Label htmlFor="message" className="text-white mb-2 block">
                  הודעה
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 transition-all duration-300 min-h-[120px]"
                  placeholder="פרטו את הנושא שבו תרצו לקבל ייעוץ..."
                />
              </div>

              <Button
                type="submit"
                className="w-full gold-gradient text-navy-800 hover:opacity-90 transition-all duration-300 hover:scale-105 font-assistant font-semibold text-lg py-3"
              >
                שליחת הודעה
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={contactInfoRef} className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-playfair font-bold text-white mb-6">
                פרטי התקשרות
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <span className="text-navy-800 text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-assistant font-semibold text-white">טלפון</h4>
                    <p className="text-gray-200">054-123-4567</p>
                    <p className="text-gray-300 text-sm">זמין 24/7 למקרי חירום</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <span className="text-navy-800 text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-assistant font-semibold text-white">אימייל</h4>
                    <p className="text-gray-200">office@yossi-law.co.il</p>
                    <p className="text-gray-300 text-sm">מענה תוך 4 שעות</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <span className="text-navy-800 text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-assistant font-semibold text-white">כתובת</h4>
                    <p className="text-gray-200">רחוב הרצל 15, תל אביב</p>
                    <p className="text-gray-300 text-sm">קומה 12, משרד 1204</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <span className="text-navy-800 text-xl">🕒</span>
                  </div>
                  <div>
                    <h4 className="font-assistant font-semibold text-white">שעות פעילות</h4>
                    <p className="text-gray-200">א'-ה': 8:00-18:00</p>
                    <p className="text-gray-300 text-sm">יום ו' ולפי תיאום מראש</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <h3 className="text-xl font-playfair font-bold text-white mb-6">
                מדוע לבחור בנו?
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-gold-400">15+</div>
                  <div className="text-gray-200 text-sm">שנות ניסיון</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-gold-400">500+</div>
                  <div className="text-gray-200 text-sm">תיקים בוצעו</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-gold-400">95%</div>
                  <div className="text-gray-200 text-sm">שיעור הצלחה</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-gold-400">24/7</div>
                  <div className="text-gray-200 text-sm">זמינות</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
