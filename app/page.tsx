"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
            <p className="text-2xl text-gray-600">AI/ML Engineer & Data Scientist</p>
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
          className="min-h-screen flex items-center justify-center p-24 bg-white snap-start"
        >
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            {/* Left image */}
            <div className="md:col-span-2">
              <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src="/fede.png"
                  alt="Federico Tafur portrait"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Right content */}
            <div className="md:col-span-3">
              <h2 className="text-4xl font-bold mb-4">About Me</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  I’m an <span className="font-semibold">AI/ML Engineer & Data Scientist</span> passionate about the intersection of
                  <span className="font-medium"> computer science</span>, <span className="font-medium">finance</span>, and
                  <span className="font-medium"> data-driven systems</span>. I love translating complex problems into elegant,
                  production-ready solutions that create real-world meaning.
                </p>
                <p>
                  Recently, I built <span className="font-semibold">Chronos</span>, an ML-driven trading algorithm focused on signal
                  generation, risk-aware execution, and robust evaluation. Chronos combines feature engineering,
                  modern model architectures, and careful validation to turn market structure into actionable strategies.
                </p>
                <p>
                  Beyond individual projects, I’m driven by <span className="font-semibold">entrepreneurship</span>—bootstrapping
                  products that feel revolutionary: useful, fast, and trustworthy. I enjoy the full stack of building
                  from research to deployment: experiment design, modeling, API/product integration, and iteration with users.
                </p>
                <p>
                  Before tech, I pursued sports at an elite level: I played <span className="font-semibold">professional
                  first-division soccer in Costa Rica</span> and later moved to the United States to compete in
                  <span className="font-semibold"> NCAA Division I college soccer</span>. That background shaped my
                  commitment to discipline, teamwork, and performance under pressure—values I bring to every build.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => { if (el) sectionsRef.current[2] = el; }}
          className="min-h-screen flex flex-col items-center justify-center p-24 bg-white snap-start"
        >
          <div className="w-full max-w-6xl">
            <h2 className="text-4xl font-bold mb-6 text-center">Projects & Experience</h2>
            <p className="text-lg text-gray-600 text-center mb-10">Selected projects and experience across AI/ML, data, and product.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chronos */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Chronos — ML Trading System</h3>
                  <a
                    href="https://github.com/tafurfede/Tradient"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-700 hover:underline"
                  >
                    GitHub
                  </a>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  Ensemble-driven trading engine with 200+ engineered features, risk-aware execution, and
                  real-time decisioning. Backtesting, monitoring, and Dockerized deployment.
                </p>
              </div>

              {/* Oaklet */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Oaklet</h3>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  AI‑native healthcare platform where intelligent agents power an EHR, documentation,
                  treatment planning, billing, and analytics. As <span className="font-semibold">Founder & Lead Engineer</span>,
                  I led product and architecture: multi‑agent orchestration, secure data ingestion and RAG,
                  HIPAA‑aligned practices, ISO‑style controls, and a Next.js + FastAPI stack deployed to cloud
                  infrastructure with real‑time telemetry.
                </p>
              </div>

              {/* Nexus Research Paper */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Nexus Research Paper</h3>
                  <a
                    href="https://nexus-research-paper.vercel.app/NEXUS_RESEARCH_PAPER.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-700 hover:underline"
                  >
                    Read
                  </a>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  Research on a modular AI systems framework—Nexus—for composing agents, retrieval, and
                  control layers into reliable end‑to‑end workflows. Covers design principles, evaluation
                  methodology, and practical deployments across finance and healthcare.
                </p>
              </div>

              {/* Experience Timeline */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Experience Timeline</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gray-900"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Software Engineer (Lead Developer) — NexaDev Software Solutions</p>
                      <p className="text-xs text-gray-600">Feb 2024 – Present · San José, Costa Rica · AI career‑matching platform; full SDLC, data pipelines</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gray-900"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Software Engineer (AI/ML Engineer) — Oaklet</p>
                      <p className="text-xs text-gray-600">Mar 2025 – Sep 2025 · Remote · Architected AI‑native EHR; multi‑agent platform and SLOs</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gray-900"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Software Engineering Intern — TIMS International</p>
                      <p className="text-xs text-gray-600">May 2024 – Aug 2024 · San José, Costa Rica · Optimized C/C++/Python; 20+ APIs</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gray-900"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Varsity Soccer Student‑Athlete — Virginia Tech & UCF (NCAA Division I)</p>
                      <p className="text-xs text-gray-600">Jun 2022 – May 2024 · Blacksburg, VA & Orlando, FL · Leadership and high‑performance teamwork</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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