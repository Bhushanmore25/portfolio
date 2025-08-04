import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation context
const AnimationContext = createContext();

export const useAnimationSettings = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationSettings must be used within AnimationProvider');
  }
  return context;
};

// Animation provider
export const AnimationProvider = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('animationsEnabled');
    if (saved !== null) {
      setAnimationsEnabled(JSON.parse(saved));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
  };

  const shouldAnimate = animationsEnabled && !reducedMotion;

  return (
    <AnimationContext.Provider value={{
      animationsEnabled,
      reducedMotion,
      shouldAnimate,
      toggleAnimations
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

// Animation settings toggle component
export const AnimationSettings = () => {
  const { animationsEnabled, reducedMotion, shouldAnimate, toggleAnimations } = useAnimationSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings button */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>

      {/* Settings panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4 min-w-[250px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-3">Animation Settings</h3>
            
            {/* Animations toggle */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 text-sm">Enable Animations</span>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  animationsEnabled ? 'bg-gradient-to-r from-[#EC6EAD] to-[#3494E6]' : 'bg-gray-600'
                }`}
                onClick={toggleAnimations}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: animationsEnabled ? 24 : 2 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>

            {/* Reduced motion indicator */}
            {reducedMotion && (
              <div className="flex items-center gap-2 text-yellow-400 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Reduced motion preferred
              </div>
            )}

            {/* Status indicator */}
            <div className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${shouldAnimate ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-white/60">
                {shouldAnimate ? 'Animations active' : 'Animations disabled'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Conditional animation wrapper
export const ConditionalAnimation = ({ 
  children, 
  fallback = null,
  ...props 
}) => {
  const { shouldAnimate } = useAnimationSettings();

  if (!shouldAnimate) {
    return fallback || children;
  }

  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
};

// Performance optimized animation wrapper
export const OptimizedAnimation = ({ 
  children, 
  threshold = 0.1,
  ...props 
}) => {
  const { shouldAnimate } = useAnimationSettings();

  if (!shouldAnimate) {
    return children;
  }

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}; 