import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Floating element with continuous animation
export const FloatingElement = ({ 
  children, 
  duration = 3, 
  y = 20, 
  x = 0,
  delay = 0,
  className = "" 
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, y, 0],
        x: [0, x, 0],
        rotate: [0, 5, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax element that moves based on cursor position
export const ParallaxElement = ({ 
  children, 
  speed = 0.1,
  className = "",
  enabled = true 
}) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 700 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 700 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize mouse position to -1 to 1
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;
      
      mouseX.set(normalizedX * speed * 50);
      mouseY.set(normalizedY * speed * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, mouseX, mouseY, speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: enabled ? springX : 0,
        y: enabled ? springY : 0,
      }}
    >
      {children}
    </motion.div>
  );
};

// Orbiting element that moves in a circular pattern
export const OrbitingElement = ({ 
  children, 
  radius = 50, 
  duration = 10,
  delay = 0,
  className = "" 
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, radius, 0, -radius, 0],
        y: [0, -radius, 0, radius, 0],
        rotate: [0, 90, 180, 270, 360]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

// Pulsing element with scale animation
export const PulsingElement = ({ 
  children, 
  scale = 1.1,
  duration = 2,
  delay = 0,
  className = "" 
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating particles background
export const FloatingParticles = ({ 
  count = 20,
  className = "" 
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
};

// Gradient orb with floating animation
export const GradientOrb = ({ 
  size = 200,
  colors = ["#EC6EAD", "#3494E6"],
  className = "" 
}) => {
  return (
    <FloatingElement duration={4} y={30} className={className}>
      <div
        className="rounded-full blur-xl opacity-20"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${colors[0]}, ${colors[1]})`,
        }}
      />
    </FloatingElement>
  );
};

// Magnetic hover effect for interactive elements
export const MagneticElement = ({ 
  children, 
  strength = 0.3,
  className = "" 
}) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) * strength);
    mouseY.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}; 