import { useEffect, useState } from 'react';

// Performance optimization utilities
export const usePerformanceOptimizer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /mobile|android|iphone|ipad|phone/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // Check for low-end devices
    const checkLowEnd = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      setIsLowEnd(hardwareConcurrency < 4 || memory < 4);
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Initial checks
    checkMobile();
    checkLowEnd();
    checkReducedMotion();

    // Listen for changes
    const handleResize = () => {
      checkMobile();
    };

    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', handleMotionChange);
    };
  }, []);

  return {
    isMobile,
    isLowEnd,
    prefersReducedMotion,
    shouldReduceAnimations: isMobile || isLowEnd || prefersReducedMotion
  };
};

// Throttle function for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Intersection Observer hook for performance
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isIntersecting];
};

// Memory management for animations
export const useAnimationCleanup = () => {
  useEffect(() => {
    return () => {
      // Clean up any running animations when component unmounts
      const animations = document.querySelectorAll('[style*="animation"]');
      animations.forEach(el => {
        el.style.animation = 'none';
      });
    };
  }, []);
};

// Device capability detection
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    supportsWebGL: false,
    supportsTouch: false,
    supportsPointer: false,
    supportsIntersectionObserver: false
  });

  useEffect(() => {
    const checkCapabilities = () => {
      // Check WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      // Check touch support
      const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check pointer support
      const supportsPointer = 'onpointerdown' in window;
      
      // Check Intersection Observer support
      const supportsIntersectionObserver = 'IntersectionObserver' in window;

      setCapabilities({
        supportsWebGL: !!gl,
        supportsTouch,
        supportsPointer,
        supportsIntersectionObserver
      });
    };

    checkCapabilities();
  }, []);

  return capabilities;
}; 