import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import {
  RiReactjsLine,
  RiHtml5Line,
  RiCss3Line,
  RiJavascriptLine,
  RiTailwindCssLine,
  RiNodejsLine,
  RiDatabase2Line,
  RiGitBranchLine,
  RiGithubLine,
  RiCloudLine,
  RiFireLine,
  RiCodeSSlashLine,
  RiStackOverflowLine,
  RiServerLine,
  RiBarChart2Line,
  RiFunctionLine,
} from "@remixicon/react";
import { ScrollAnimation, TextReveal } from "./components/ScrollAnimations";
import { MagneticElement } from "./components/FloatingElements";

const svgMap = {
  "React js": "file-type-reactjs.svg",
  HTML: "html5.svg",
  CSS: "css3.svg",
  JavaScript: "javascript.svg",
  TailwindCSS: "tailwindcss-dark.svg",
  NodeJS: "nodejs.svg",
  MongoDB: "mongodb (1).svg",
  Express: "expressjs-dark.svg",
  MySql: "mysql.svg",
  "Next js": "nextjs.svg",
  "Framer Motion": "framermotion.svg",
  Git: "git.svg",
  Github: "github-fill-16.svg",
  Python: "python.svg",
  Java: "java.svg",
  Netlify: "netlify-dark.svg",
  Render: "render.svg",
  FireBase: "firebase.svg",
  MaterialUi: "materialui-dark.svg",
  Numpy: "numpy.svg",
  Pandas: "pandas.svg",
};

const skillIconMap = {
  "React js": RiReactjsLine,
  HTML: RiHtml5Line,
  CSS: RiCss3Line,
  JavaScript: RiJavascriptLine,
  TailwindCSS: RiTailwindCssLine,
  NodeJS: RiNodejsLine,
  MongoDB: RiDatabase2Line,
  Express: RiServerLine,
  MySql: RiDatabase2Line,
  "Next js": RiCodeSSlashLine,
  "Framer Motion": RiStackOverflowLine,
  Git: RiGitBranchLine,
  Github: RiGithubLine,
  Netlify: RiCloudLine,
  Render: RiCloudLine,
  FireBase: RiFireLine,
  MaterialUi: RiCodeSSlashLine,
  Numpy: RiFunctionLine,
  Pandas: RiBarChart2Line,
};

const skills = [
  "React js",
  "HTML",
  "CSS",
  "JavaScript",
  "TailwindCSS",
  "NodeJS",
  "MongoDB",
  "Express",
  "MySql",
  "Next js",
  "Framer Motion",
  "Git",
  "Github",
  "Python",
  "Java",
  "Netlify",
  "Render",
  "FireBase",
  "MaterialUi",
  "Numpy",
  "Pandas",
];

function ParallaxLoop({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-100, 0, v)}%`);
  const direction = React.useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) direction.current = -1;
    else if (velocityFactor.get() > 0) direction.current = 1;

    moveBy += direction.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap w-full py-6">
      <motion.div
        className="flex gap-6 text-white items-center"
        style={{ x }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <React.Fragment key={i}>{children}</React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

const SkillBadge = ({ skill }) => {
  const Icon = skillIconMap[skill];
  const svg = svgMap[skill];

  return (
    <span className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-[#18181b] rounded-full border border-[#232323] shadow text-white min-w-0">
      {svg ? (
        <img src={`/svgs/${svg}`} alt={skill} className="w-5 h-5 flex-shrink-0" />
      ) : Icon ? (
        <Icon size={20} className="flex-shrink-0" />
      ) : (
        <span className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-xs flex-shrink-0">
          {skill[0]}
        </span>
      )}
      <span className="text-xs font-medium truncate max-w-[120px]" title={skill}>
        {skill}
      </span>
    </span>
  );
};

const SkillsAndTechStack = () => {
  return (
    <section className="bg-black py-8 border-t border-b border-gray-300 flex flex-col items-center justify-center mb-8 shadow-2xl shadow-blue-800">
      <ScrollAnimation delay={0.2}>
        <TextReveal 
          text="Skills & Technologies"
          className="text-4xl font-bold mb-8 text-white text-center"
          delay={0.3}
        />
      </ScrollAnimation>
      
      <div className="w-full max-w-7xl mx-auto">
        <ParallaxLoop baseVelocity={-6}>
          {skills.map((skill, index) => (
            <MagneticElement key={skill + index} strength={0.1}>
              <SkillBadge skill={skill} />
            </MagneticElement>
          ))}
        </ParallaxLoop>
        <ParallaxLoop baseVelocity={6}>
          {[...skills].reverse().map((skill, index) => (
            <MagneticElement key={skill + index} strength={0.1}>
              <SkillBadge skill={skill} />
            </MagneticElement>
          ))}
        </ParallaxLoop>
      </div>
    </section>
  );
};

export default SkillsAndTechStack;
