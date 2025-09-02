"use client";

import { useState, useEffect, useRef } from "react";
import NavigationIndicator from "@/components/NavigationIndicator";
import SocialLinks from "@/components/SocialLinks";
import LiquidGlassWindow from "@/components/LiquidGlassWindow";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const main = mainRef.current;
      if (!main) return;
      
      const scrollPosition = main.scrollTop + main.clientHeight / 2;
      
      // Set hasScrolled to true when user scrolls away from the top
      if (main.scrollTop > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
      
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });
    };

    const main = mainRef.current;
    if (main) {
      main.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => main.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSection = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavigationIndicator
        currentSection={currentSection}
        totalSections={4}
        onSectionClick={scrollToSection}
      />
      
      <SocialLinks />
      
      <div className="fixed top-12 left-8 z-50">
        <h1 className="text-2xl font-bold leading-tight">
          <span className="block">Federico</span>
          <span className="block">Tafur.</span>
        </h1>
      </div>
      
      <main ref={mainRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
        <section
          ref={(el) => { if (el) sectionsRef.current[0] = el; }}
          className="min-h-screen flex flex-col items-center justify-center p-24 bg-white relative snap-start"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Federico Tafur</h1>
            <p className="text-2xl text-gray-600">Full Stack Developer</p>
          </div>
          
          <div 
            className={`fixed bottom-8 left-8 flex flex-col items-center transition-all duration-1000 ease-out ${
              hasScrolled 
                ? 'transform translate-y-40 opacity-0 pointer-events-none' 
                : 'transform translate-y-0 opacity-100'
            }`}
            style={{ position: 'fixed' }}
          >
            <button
              onClick={() => scrollToSection(1)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <span className="text-xs tracking-widest writing-vertical transform rotate-180 mb-4">
                SCROLL DOWN
              </span>
              <div className="w-px h-24 bg-gray-900 transition-all duration-300 group-hover:h-28"></div>
            </button>
          </div>
        </section>

        <section
          ref={(el) => { if (el) sectionsRef.current[1] = el; }}
          className="min-h-screen flex flex-col items-center justify-center p-24 bg-white snap-start"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Passionate developer with expertise in modern web technologies.
              Building innovative solutions with Next.js, TypeScript, and more.
            </p>
          </div>
        </section>

        <section
          ref={(el) => { if (el) sectionsRef.current[2] = el; }}
          className="min-h-screen flex flex-col items-center justify-center p-24 bg-white snap-start"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Projects</h2>
            <p className="text-xl text-gray-600">
              Showcase of my recent work and achievements
            </p>
          </div>
        </section>

        <section
          ref={(el) => { if (el) sectionsRef.current[3] = el; }}
          className="min-h-screen flex flex-col items-center justify-center p-24 bg-white snap-start"
        >
          <div className="w-full">
            <LiquidGlassWindow />
          </div>
        </section>
      </main>
    </>
  );
}