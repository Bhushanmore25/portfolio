import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Moving gradient background
export const MovingGradient = ({ 
  colors = ["#EC6EAD", "#3494E6", "#8B5CF6"],
  duration = 20,
  className = "" 
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 w-[200%] h-[200%] -top-1/2 -left-1/2"
        style={{
          background: `linear-gradient(45deg, ${colors.join(', ')})`,
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: [
            '0% 0%',
            '100% 0%',
            '100% 100%',
            '0% 100%',
            '0% 0%'
          ]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

// Interactive particle background
export const ParticleBackground = ({ 
  particleCount = 50,
  className = "" 
}) => {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[#EC6EAD]/30 to-[#3494E6]/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
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

// Wave background animation
export const WaveBackground = ({ 
  waveCount = 3,
  className = "" 
}) => {
  const waves = Array.from({ length: waveCount }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 8 + i * 2
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(236, 110, 173, 0.1) 50%, transparent 70%)`,
            transform: 'skewX(-20deg)'
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: wave.duration,
            repeat: Infinity,
            ease: "linear",
            delay: wave.delay
          }}
        />
      ))}
    </div>
  );
};

// Geometric pattern background
export const GeometricBackground = ({ 
  patternCount = 20,
  className = "" 
}) => {
  const patterns = Array.from({ length: patternCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 50,
    rotation: Math.random() * 360,
    duration: Math.random() * 15 + 10
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {patterns.map((pattern) => (
        <motion.div
          key={pattern.id}
          className="absolute border border-white/10"
          style={{
            left: `${pattern.x}%`,
            top: `${pattern.y}%`,
            width: `${pattern.size}px`,
            height: `${pattern.size}px`,
            transform: `rotate(${pattern.rotation}deg)`
          }}
          animate={{
            rotate: [pattern.rotation, pattern.rotation + 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: pattern.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Noise background effect
export const NoiseBackground = ({ 
  intensity = 0.1,
  className = "" 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const generateNoise = () => {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255 * intensity;
        data[i] = noise;     // R
        data[i + 1] = noise; // G
        data[i + 2] = noise; // B
        data[i + 3] = 255;   // A
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      generateNoise();
      requestAnimationFrame(animate);
    };

    animate();
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      width={100}
      height={100}
      className={`absolute inset-0 w-full h-full opacity-20 mix-blend-overlay ${className}`}
      style={{
        backgroundSize: '100px 100px',
        backgroundRepeat: 'repeat'
      }}
    />
  );
};

// Combined background with multiple effects
export const InteractiveBackground = ({ 
  enableGradient = true,
  enableParticles = true,
  enableWaves = false,
  enableGeometric = false,
  className = "" 
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {enableGradient && <MovingGradient />}
      {enableParticles && <ParticleBackground />}
      {enableWaves && <WaveBackground />}
      {enableGeometric && <GeometricBackground />}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}; 