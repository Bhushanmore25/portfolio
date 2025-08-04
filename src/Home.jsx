import React, { useEffect, useState } from "react";

import TiltedCard from "./TiltedCard";
import gsap from "gsap";
import SocialLinks from "./SocialLinks";
import SplashCursor from "./SplashCursor";
import { TextReveal, ScrollAnimation, StaggerContainer } from "./components/ScrollAnimations";
import { MagneticElement, ParallaxElement } from "./components/FloatingElements";
import { useAnimationSettings } from "./components/AnimationSettings";
const Home = ({ showContent }) => {
  const [showRibbons, setShowRibbons] = useState(false);
  const { shouldAnimate } = useAnimationSettings();
  useEffect(() => {
    // Animate the text on mount
    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: 0.2,
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    if (main) {
      const handleMouseMove = (e) => {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        const yMove = (e.clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".main .text", {
          x: `${xMove * 0.4}%`,
          y: `${-yMove * 0.4}%`,
        });
      };

      main.addEventListener("mousemove", handleMouseMove);

      return () => {
        main.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [showContent]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowRibbons(true);
      // Optionally, set a timeout to hide after inactivity
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="main relative w-full overflow-hidden">
      {/* <SplashCursor/> */}

      {/* Main content - sits above Ribbons */}
      <div className="relative z-10 flex flex-row">
        {/* Text content */}
        <div className="w-2/3 flex flex-col">
          <ScrollAnimation delay={0.2} y={30}>
            <h1 className="text-[4rem] leading-none text-white pt-32 pl-32">
              Hello... I am{" "}
            </h1>
          </ScrollAnimation>

          <div className="text text-white flex flex-col gap-3 justify-center scale-[1.4] rotate-[-10deg]">
            <TextReveal 
              text="Bhushan More.."
              className="text-[4rem] leading-none ml-96 py-6 bg-gradient-to-r from-[#EC6EAD] to-[#3494E6] bg-clip-text text-transparent transition-all duration-500 ease-in-out hover:scale-110 drop-shadow-[0_5px_25px_rgba(236,110,173,0.8)]"
              delay={0.5}
            />
          </div>

          <ScrollAnimation delay={0.8} y={20}>
            <h3 className="text-white pl-32 text-2xl pt-2 flex">
              I am a passionate{" "}
              <span className="w-96 bg-gradient-to-r from-[#EC6EAD] to-[#3494E6] bg-clip-text text-transparent pl-2">
                Web Developer.
              </span>
            </h3>
          </ScrollAnimation>

          <ScrollAnimation delay={1.0} y={20}>
            <h3 className="text-white pl-32 text-2xl">
              Currently pursuing B.Tech at{" "}
              <span className="w-96 bg-gradient-to-r from-[#EC6EAD] to-[#3494E6] bg-clip-text text-transparent pl-2">
                Yeshwantrao Chavan College of Engineering (YCCE), Nagpur
              </span>
            </h3>
          </ScrollAnimation>
          
          <ScrollAnimation delay={1.2} y={20}>
            <div className="pl-32">
              <SocialLinks />
            </div>
          </ScrollAnimation>
        </div>

        {/* Image card */}
        <div className="w-1/2 h-[91vh] flex justify-center py-28">
          <ParallaxElement speed={0.05}>
            <TiltedCard
              imageSrc="profile pic.jpg"
              altText="Bhushan More"
              captionText="Bhushan More"
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="350px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={<p className="text-white">Bhushan More</p>}
            />
          </ParallaxElement>
        </div>
      </div>
    </div>
  );
};

export default Home;
