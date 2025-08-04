import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { usePerformanceOptimizer, throttle } from './PerformanceOptimizer';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const { shouldReduceAnimations, isMobile } = usePerformanceOptimizer();

  // Spring configurations for smooth trailing effect
  const cursorX = useSpring(mouseX, { 
    damping: shouldReduceAnimations ? 50 : 25, 
    stiffness: shouldReduceAnimations ? 400 : 700 
  });
  const cursorY = useSpring(mouseY, { 
    damping: shouldReduceAnimations ? 50 : 25, 
    stiffness: shouldReduceAnimations ? 400 : 700 
  });
  const dotX = useSpring(mouseX, { 
    damping: shouldReduceAnimations ? 100 : 50, 
    stiffness: shouldReduceAnimations ? 800 : 1000 
  });
  const dotY = useSpring(mouseY, { 
    damping: shouldReduceAnimations ? 100 : 50, 
    stiffness: shouldReduceAnimations ? 800 : 1000 
  });

  useEffect(() => {
    // Don't show custom cursor on mobile devices
    if (isMobile) {
      if (document && document.body) {
        document.body.style.cursor = 'auto';
      }
      return;
    }

    // Check if DOM is ready
    if (!document || !document.body) {
      return;
    }

    const handleMouseMove = throttle((e) => {
      try {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } catch (error) {
        console.warn('Mouse move error:', error);
      }
    }, shouldReduceAnimations ? 32 : 16);

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Handle hover states for interactive elements
    const handleMouseEnter = (e) => {
      try {
        const target = e.target;
        
        // Check if target is an element and has the required methods
        if (!target || typeof target.closest !== 'function') {
          return;
        }
        
        if (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[data-cursor="hover"]') ||
          target.classList.contains('clickable') ||
          target.classList.contains('social-link') ||
          target.classList.contains('card') ||
          target.closest('.card')
        ) {
          setIsHovering(true);
          setCursorVariant('hover');
        }
      } catch (error) {
        console.warn('Mouse enter error:', error);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    // Add event listeners with error handling
    try {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave, true);

      // Hide default cursor
      document.body.style.cursor = 'none';
    } catch (error) {
      console.warn('Error setting up cursor events:', error);
    }

    return () => {
      try {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseenter', handleMouseEnter, true);
        document.removeEventListener('mouseleave', handleMouseLeave, true);
        document.body.style.cursor = 'auto';
      } catch (error) {
        console.warn('Error cleaning up cursor events:', error);
      }
    };
  }, [mouseX, mouseY, isMobile, shouldReduceAnimations]);

  const cursorVariants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      scale: 1,
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(236, 110, 173, 0.2)',
      border: '1px solid rgba(236, 110, 173, 0.5)',
      scale: 1.2,
      mixBlendMode: 'screen',
    },
    clicking: {
      scale: 0.8,
      backgroundColor: 'rgba(236, 110, 173, 0.4)',
    },
  };

  const dotVariants = {
    default: {
      width: 4,
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    hover: {
      width: 8,
      height: 8,
      backgroundColor: 'rgba(236, 110, 173, 1)',
    },
  };

  // Don't render if DOM is not ready or on mobile
  if (typeof window === 'undefined' || isMobile) {
    return null;
  }

  return (
    <>
      {/* Don't render cursor on mobile */}
      {!isMobile && (
        <>
          {/* Main cursor */}
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            variants={cursorVariants}
            animate={isClicking ? 'clicking' : cursorVariant}
            transition={{ 
              duration: shouldReduceAnimations ? 0.1 : 0.2, 
              ease: 'easeOut' 
            }}
          />

          {/* Cursor dot */}
          <motion.div
            ref={cursorDotRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
            style={{
              x: dotX,
              y: dotY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            variants={dotVariants}
            animate={cursorVariant}
            transition={{ 
              duration: shouldReduceAnimations ? 0.05 : 0.1, 
              ease: 'easeOut' 
            }}
          />

          {/* Click ripple effect */}
          {isClicking && !shouldReduceAnimations && (
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-gradient-to-r from-[#EC6EAD] to-[#3494E6]"
              style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 100, height: 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onAnimationComplete={() => setIsClicking(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default CustomCursor; 