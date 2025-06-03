
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseArea {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const expertiseAreas: ExpertiseArea[] = [
  {
    title: "דיני מקרקעין",
    description: "ייעוץ מקיף בעסקאות נדל\"ן, הסכמי מכר, תכנון ובנייה, ובעיות זכויות במקרקעין",
    icon: "🏢",
    color: "#cda434"
  },
  {
    title: "חוזים מסחריים",
    description: "ניסוח וליווי חוזים עסקיים, הסכמי שיתוף פעולה, וייעוץ במשא ומתן מסחרי",
    icon: "📋",
    color: "#b08d57"
  },
  {
    title: "תביעות אזרחיות",
    description: "ייצוג בתביעות נזיקין, הפרת חוזה, וסכסוכים אזרחיים מורכבים",
    icon: "⚖️",
    color: "#1a4173"
  },
  {
    title: "ליטיגציה אסטרטגית",
    description: "ייצוג משפטי מתקדם בבתי המשפט, בוררות, ופתרון חלופי של סכסוכים",
    icon: "🎯",
    color: "#0a1931"
  }
];

const ExpertiseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedArea, setSelectedArea] = useState<number>(0);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cubeRef = useRef<THREE.Mesh>();
  const frameId = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Create cube geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Create materials for each face
    const materials = expertiseAreas.map((area, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d')!;
      
      // Background
      context.fillStyle = area.color;
      context.fillRect(0, 0, 512, 512);
      
      // Border
      context.strokeStyle = '#ffffff';
      context.lineWidth = 8;
      context.strokeRect(0, 0, 512, 512);
      
      // Icon
      context.font = '120px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#ffffff';
      context.fillText(area.icon, 256, 180);
      
      // Title
      context.font = 'bold 36px Arial';
      context.fillText(area.title, 256, 320);
      
      const texture = new THREE.CanvasTexture(canvas);
      return new THREE.MeshBasicMaterial({ map: texture });
    });

    // Add two more materials for remaining faces
    materials.push(
      new THREE.MeshBasicMaterial({ color: 0x1a4173, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0x1a4173, transparent: true, opacity: 0.8 })
    );

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    cubeRef.current = cube;

    camera.position.z = 5;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      
      if (cube) {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // GSAP ScrollTrigger animation
    gsap.fromTo(canvasRef.current,
      {
        opacity: 0,
        scale: 0.5
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      renderer.dispose();
    };
  }, []);

  const handleAreaClick = (index: number) => {
    setSelectedArea(index);
    
    if (cubeRef.current) {
      // Rotate cube to show selected face
      gsap.to(cubeRef.current.rotation, {
        y: (index * Math.PI) / 2,
        duration: 1,
        ease: "power2.out"
      });
    }
  };

  return (
    <section ref={containerRef} className="py-20 luxury-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            תחומי ההתמחות שלנו
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            דיוק משפטי, פתרונות יצירתיים ותוצאות מוכחות בכל תחום
          </p>
          <div className="w-24 h-1 gold-gradient rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* 3D Cube */}
          <div className="flex justify-center">
            <div className="relative">
              <canvas 
                ref={canvasRef}
                className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                style={{ width: '400px', height: '400px' }}
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-gold-600 rounded-full opacity-60 animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border border-gold-600 transform rotate-45 opacity-40 animate-bounce-gentle"></div>
            </div>
          </div>

          {/* Expertise Cards */}
          <div className="space-y-6">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 hover-lift ${
                  selectedArea === index 
                    ? 'bg-white luxury-shadow scale-105' 
                    : 'glass-effect hover:bg-white/10'
                }`}
                onClick={() => handleAreaClick(index)}
              >
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className={`text-4xl ${selectedArea === index ? '' : 'opacity-70'}`}>
                    {area.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-playfair font-bold mb-2 ${
                      selectedArea === index ? 'text-navy-800' : 'text-white'
                    }`}>
                      {area.title}
                    </h3>
                    <p className={`${
                      selectedArea === index ? 'text-gray-700' : 'text-gray-200'
                    }`}>
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
