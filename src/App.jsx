import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import Home from "./Home"
import AboutMe from './AboutMe'
import SkillsAndTechStack from './SkillsAndTechStack'
import Projects from './Projects'
import CustomCursor from './components/CustomCursor'
import { AnimationProvider, AnimationSettings } from './components/AnimationSettings'
import ErrorBoundary from './components/ErrorBoundary'
const App = () => {
  
  const [showContent,setShowContent] = useState(false);
  useGSAP(()=>{
    const tl=gsap.timeline();
    tl.to('.vi-mask-group', {
      rotate:10,
      duration: 2,
      ease: 'power4.easeInOut',
      transformOrigin: '50% 50%',
    })

    tl.to('.vi-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: 'Expo.easeInOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate:function () {
          if(this.progress()>= .9)
          {
            document.querySelector('.svg').remove();
            setShowContent(true);
            this.kill();
          }
      }
    })

  })
  return (
    <AnimationProvider>
      <div>
        {/* Custom cursor */}
        <ErrorBoundary>
          <CustomCursor />
        </ErrorBoundary>
        
        {/* loading start animation */}
        <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
            <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <mask id="viMask">
                  <rect width="100%" height="100%" fill="black" />
                  <g className="vi-mask-group">
                    <text
                      x="50%"
                      y="50%"
                      fontSize="250"
                      textAnchor="middle"
                      fill="white"
                      dominantBaseline="middle"
                      fontFamily="Arial Black"
                    >
                      BM
                    </text>
                  </g>
                </mask>
              </defs>
              <image
                href="./bg.png"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                mask="url(#viMask)"
              />
            </svg>
        </div>
        

        
        <div className='flex flex-row h-16 justify-between min-w-full relative z-10'>
          <div className=' h-full w-1/2 px-7 py-1'>
              <img src="/loho.png" alt="logo" className='rounded-full w-16'/>
          </div>
          <div className='text-white pr-5'>
              <ul className='flex gap-8'>
              <li className='py-6 px-2 hover:border-b-2 cursor-pointer'>Home</li>
              <li className='py-6 px-2 hover:border-b-2 cursor-pointer'>About Me</li>
              <li className='py-6 px-2 hover:border-b-2 cursor-pointer'>Skills</li>
              <li className='py-6 px-2 hover:border-b-2 cursor-pointer'>Projects</li>
              <li className='py-6 px-2 hover:border-b-2 cursor-pointer'>Education</li>
              <li className='py-6 px-2 hover:border-b-2 cursor-pointer'>Contact Me</li>
              </ul>
          </div>
      </div>
      {/* Main content */}
      <Home showContent={showContent}/>
      <AboutMe/>
      <SkillsAndTechStack/>
      <Projects/>
      
      {/* Animation settings */}
      <AnimationSettings />
      </div>
    </AnimationProvider>
  )
}

export default App  