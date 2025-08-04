import React from "react";
import MagicBento from "./MagicBento";
import DarkVeil from './DarkVeil';
import { ScrollAnimation } from "./components/ScrollAnimations";

const AboutMe = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      {/* Only this container has the animated background */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background for About Me section only */}
        <div className="absolute inset-0 w-100vw h-100vh z-0 pointer-events-none">
          <DarkVeil />
        </div>
        {/* Foreground: MagicBento */}
        <ScrollAnimation delay={0.3}>
          <div className="relative z-10 w-full flex items-center justify-center">
            <MagicBento />
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default AboutMe;
