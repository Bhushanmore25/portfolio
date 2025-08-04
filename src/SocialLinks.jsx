// SocialLinks.jsx
import React from 'react';
import './SocialLinks.css'; // Include the custom CSS for animations

const SocialLinks = () => {
  return (
    <div className="gap-5 text-center md:text-left">
      <div className="socials my-6 flex items-center justify-center md:justify-start mx-auto">
        <ul className="flex gap-6 text-2xl">
          <li className="item">
            <a href="https://www.instagram.com/" className="social-link block">
              <i className="fab fa-instagram icon hover:text-pink-500" />
            </a>
          </li>
          <li className="item">
            <a href="https://www.linkedin.com/in/morebhushan/" className="social-link block">
              <i className="fab fa-linkedin icon hover:text-blue-400" />
            </a>
          </li>
          <li className="item">
            <a href="https://github.com/Bhushanmore25" className="social-link block">
              <i className="fab fa-github icon hover:text-amber-500" />
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Me Button with Deepesh Sharma Animation */}
      <a
        href="#contact"
        className="deepesh-button inline-block mr-7 px-10 py-2 text-white font-bold text-xl cursor-pointer border border-[#3498db] bg-transparent relative overflow-hidden transition-all duration-500 ease-in-out hover:text-[#3498db] hover:font-bold rounded-full"
      >
        Contact Me
      </a>

      {/* Check Resume Button with Deepesh Sharma Animation */}
      <a
        download="Girish_Nandanwar_Resume.pdf"
        href="resume/GIRISH_NANDANWAR.pdf"
        title="Download"
        className="deepesh-button inline-block px-10 py-2 text-white font-bold text-xl cursor-pointer border border-[#3498db] bg-transparent relative overflow-hidden transition-all duration-500 ease-in-out hover:text-[#3498db] hover:font-bold rounded-full"
      >
        My Resume
      </a>
    </div>
  );
};

export default SocialLinks;
