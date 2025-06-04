import { gsap } from 'gsap';
import * as THREE from 'three';

// Animation configuration constants
export const ANIMATION_CONFIG = {
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    verySlow: 1.5
  },
  easings: {
    smooth: 'power2.out',
    bounce: 'elastic.out(1, 0.8)',
    sharp: 'expo.out',
    gentle: 'power2.inOut'
  },
  delays: {
    stagger: 0.1,
    sequence: 0.2,
    section: 0.4
  }
};

// Advanced staggering utilities using GSAP
export const createStaggerAnimation = (
  targets: gsap.TweenTarget,
  properties: gsap.TweenVars,
  staggerConfig?: {
    delay?: number;
    direction?: 'normal' | 'reverse';
    easing?: string;
    from?: 'start' | 'center' | 'end' | 'edges' | number;
  }
) => {
  const config = staggerConfig || {};
  return gsap.to(targets, {
    ...properties,
    stagger: {
      amount: config.delay || ANIMATION_CONFIG.delays.stagger,
      from: config.from || 'start',
      ease: config.easing || ANIMATION_CONFIG.easings.smooth
    },
    ease: config.easing || ANIMATION_CONFIG.easings.smooth
  });
};

// Timeline creation utility
export const createTimeline = (config?: gsap.TimelineVars) => {
  return gsap.timeline({
    ease: ANIMATION_CONFIG.easings.smooth,
    ...config
  });
};

// Text animation utilities
export const animateTextReveal = (
  element: HTMLElement,
  options?: {
    splitBy?: 'chars' | 'words' | 'lines';
    staggerDelay?: number;
    animationType?: 'fadeUp' | 'fadeIn' | 'scale' | 'rotate';
  }
) => {
  const { splitBy = 'chars', staggerDelay = 0.05, animationType = 'fadeUp' } = options || {};
  
  // Split text into spans
  const text = element.textContent || '';
  const splitText = splitBy === 'chars' ? text.split('') : text.split(' ');
  
  element.innerHTML = splitText
    .map(char => `<span class="text-split">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');
  
  const spans = element.querySelectorAll('.text-split');
  
  // Set initial state and animate with GSAP
  const initialState = getInitialState(animationType);
  const finalState = getFinalState(animationType);
  
  gsap.set(spans, initialState);
  
  return gsap.to(spans, {
    ...finalState,
    stagger: staggerDelay,
    duration: ANIMATION_CONFIG.durations.normal,
    ease: ANIMATION_CONFIG.easings.smooth
  });
};

// Scroll-triggered animation utility
export const createScrollAnimation = (
  trigger: Element,
  animation: () => void,
  options?: {
    threshold?: number;
    rootMargin?: string;
  }
) => {
  const { threshold = 0.1, rootMargin = '0px 0px -10% 0px' } = options || {};
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animation();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin }
  );
  
  observer.observe(trigger);
  return observer;
};

// Interactive hover animations using GSAP
export const createHoverAnimation = (
  element: Element,
  hoverIn: gsap.TweenVars,
  hoverOut: gsap.TweenVars
) => {
  let isHovered = false;
  
  element.addEventListener('mouseenter', () => {
    if (!isHovered) {
      isHovered = true;
      gsap.to(element, {
        ...hoverIn,
        duration: ANIMATION_CONFIG.durations.fast,
        ease: ANIMATION_CONFIG.easings.sharp
      });
    }
  });
  
  element.addEventListener('mouseleave', () => {
    if (isHovered) {
      isHovered = false;
      gsap.to(element, {
        ...hoverOut,
        duration: ANIMATION_CONFIG.durations.fast,
        ease: ANIMATION_CONFIG.easings.smooth
      });
    }
  });
};

// Performance monitoring
export const AnimationPerformance = {
  frameCount: 0,
  lastTime: 0,
  fps: 0,
  
  start() {
    this.lastTime = performance.now();
    this.monitor();
  },
  
  monitor() {
    const now = performance.now();
    this.frameCount++;
    
    if (now - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
      this.frameCount = 0;
      this.lastTime = now;
      
      // Adjust animation quality based on performance
      if (this.fps < 30) {
        this.reduceAnimationQuality();
      }
    }
    
    requestAnimationFrame(() => this.monitor());
  },
  
  reduceAnimationQuality() {
    // Reduce animation complexity for better performance
    console.warn('Reducing animation quality due to low FPS:', this.fps);
  }
};

// Helper functions
function getInitialState(type: string): gsap.TweenVars {
  switch (type) {
    case 'fadeUp':
      return { opacity: 0, y: 30 };
    case 'fadeIn':
      return { opacity: 0 };
    case 'scale':
      return { opacity: 0, scale: 0.8 };
    case 'rotate':
      return { opacity: 0, rotationY: 90 };
    default:
      return { opacity: 0, y: 30 };
  }
}

function getFinalState(type: string): gsap.TweenVars {
  switch (type) {
    case 'fadeUp':
      return { opacity: 1, y: 0 };
    case 'fadeIn':
      return { opacity: 1 };
    case 'scale':
      return { opacity: 1, scale: 1 };
    case 'rotate':
      return { opacity: 1, rotationY: 0 };
    default:
      return { opacity: 1, y: 0 };
  }
}

// 3D Scene Management
export class ThreeJSManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animationId: number | null = null;
  
  constructor(container: HTMLElement, options?: {
    alpha?: boolean;
    antialias?: boolean;
  }) {
    const { alpha = true, antialias = true } = options || {};
    
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ alpha, antialias });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);
    
    // Handle resize
    window.addEventListener('resize', () => this.handleResize(container));
  }
  
  addLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    this.scene.add(directionalLight);
    
    // Point light for gold accent
    const pointLight = new THREE.PointLight(0xcda434, 1, 100);
    pointLight.position.set(0, 0, 10);
    this.scene.add(pointLight);
  }
  
  createLegalScales(): THREE.Group {
    const scalesGroup = new THREE.Group();
    
    // Create scales geometry
    const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 2);
    const poleMaterial = new THREE.MeshPhongMaterial({ color: 0xcda434 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    
    // Create scale pans
    const panGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05);
    const panMaterial = new THREE.MeshPhongMaterial({ color: 0xb08d57 });
    
    const leftPan = new THREE.Mesh(panGeometry, panMaterial);
    leftPan.position.set(-0.8, 0.5, 0);
    
    const rightPan = new THREE.Mesh(panGeometry, panMaterial);
    rightPan.position.set(0.8, 0.5, 0);
    
    // Create chains (simplified as lines)
    const chainMaterial = new THREE.LineBasicMaterial({ color: 0xcda434 });
    
    const leftChainGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(-0.8, 0.5, 0)
    ]);
    const leftChain = new THREE.Line(leftChainGeometry, chainMaterial);
    
    const rightChainGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(0.8, 0.5, 0)
    ]);
    const rightChain = new THREE.Line(rightChainGeometry, chainMaterial);
    
    scalesGroup.add(pole, leftPan, rightPan, leftChain, rightChain);
    return scalesGroup;
  }
  
  createFloatingParticles(count: number = 50): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;     // x
      positions[i + 1] = (Math.random() - 0.5) * 20; // y
      positions[i + 2] = (Math.random() - 0.5) * 20; // z
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0xcda434,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    
    return new THREE.Points(geometry, material);
  }
  
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // Rotate objects in scene
    this.scene.children.forEach(child => {
      if (child.userData.rotate) {
        child.rotation.y += 0.01;
      }
      if (child.userData.float) {
        child.position.y += Math.sin(Date.now() * 0.001) * 0.001;
      }
    });
    
    this.renderer.render(this.scene, this.camera);
  }
  
  private handleResize(container: HTMLElement) {
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer.dispose();
  }
  
  getScene() { return this.scene; }
  getCamera() { return this.camera; }
  getRenderer() { return this.renderer; }
}
