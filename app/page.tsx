"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// Project data
const projects = [
  {
    id: 1,
    name: "Nexus",
    subtitle: "Deep Learning Trading Research",
    image: "https://www.figma.com/api/mcp/asset/6f82514e-487a-4e2f-9862-6875266f83fe",
    url: "https://nexus-research-paper.vercel.app/NEXUS_RESEARCH_PAPER.html",
    description: "Research paper on a hybrid neural architecture (8.2M params) combining CNN, LSTM, and Transformer branches to process 200+ technical indicators and LLM-powered sentiment analysis for trading signal generation.",
    specs: [
      "CNN branch for candlestick pattern recognition",
      "LSTM branch for temporal sequence modeling",
      "Transformer branch with self-attention mechanisms",
      "LLM sentiment analysis from news, Twitter, Reddit, SEC filings",
      "Risk management with Kelly Criterion & CVaR protocols",
      "Backtesting framework with Sharpe ratio optimization"
    ],
    tags: ["Deep Learning", "Finance", "Research", "NLP"]
  },
  {
    id: 2,
    name: "Oaklet",
    subtitle: "AI Healthcare Platform",
    image: "https://www.figma.com/api/mcp/asset/fc018ae7-8ead-48b0-8f00-e5fede77ae40",
    url: "https://oaklet.com/",
    description: "AI-native EHR platform processing patient data through intelligent agents—automating documentation, treatment insights, and billing analytics to reduce admin overhead and improve care decisions.",
    specs: [
      "Multi-agent orchestration for clinical workflows",
      "Secure data ingestion and RAG pipelines",
      "HIPAA-aligned practices with ISO-style controls",
      "Real-time telemetry and monitoring",
      "Next.js + FastAPI full-stack architecture",
      "AWS cloud infrastructure with CI/CD"
    ],
    tags: ["AI/ML", "Healthcare", "Full-Stack", "AWS"]
  },
  {
    id: 3,
    name: "TIMS Suite",
    subtitle: "Enterprise SaaS Platform",
    image: "https://www.figma.com/api/mcp/asset/02eeb929-1790-4ffa-8473-a019ecf8e337",
    url: "https://marketing.timssuite.com/",
    description: "Full-stack platform handling 6-tier product sales with real-time campaign analytics—tracking customer journeys, conversion rates, and revenue metrics to optimize marketing spend and increase sales.",
    specs: [
      "Email campaign management with SES/SQS",
      "Stripe checkout with 6 product tiers",
      "Token-protected assessment system",
      "AWS Cognito authentication with MFA",
      "Real-time analytics dashboard",
      "React, Next.js 14, TypeScript, AWS"
    ],
    tags: ["Full-Stack", "AWS", "SaaS", "Analytics"]
  },
  {
    id: 4,
    name: "AI Social CRM",
    subtitle: "Intelligent Business Automation",
    image: "https://www.figma.com/api/mcp/asset/eb8ee860-9879-46a8-94a0-b34146e37210",
    url: null,
    description: "AI-powered CRM capturing customer interactions across channels—using ML to qualify leads, predict conversion likelihood, and automate responses from first touch to payment.",
    specs: [
      "Automated social media marketing campaigns",
      "AI-driven bot responses and lead qualification",
      "Conversion funnel optimization",
      "Client journey tracking from first contact to payment",
      "Unified inbox for all communication channels",
      "Predictive analytics for customer lifetime value"
    ],
    tags: ["AI", "CRM", "Automation", "Analytics"]
  },
  {
    id: 5,
    name: "Transalte",
    subtitle: "Serverless NLP Pipeline",
    image: "https://www.figma.com/api/mcp/asset/6f82514e-487a-4e2f-9862-6875266f83fe",
    url: "https://transalte-lemon.vercel.app/",
    description: "Document processing pipeline using AWS Translate and Comprehend—handles batch translations with auto language detection, preserving formatting while processing enterprise document workflows.",
    specs: [
      "Drag-and-drop file upload with presigned S3 URLs",
      "AWS Translate Document API for DOCX layout preservation",
      "Auto language detection via AWS Comprehend",
      "Serverless backend with Lambda + DynamoDB",
      "Real-time job status polling with download links",
      "React + Vite frontend, TypeScript + AWS SAM backend"
    ],
    tags: ["AWS", "Serverless", "NLP", "Data Pipeline"]
  },
  {
    id: 6,
    name: "Tradient",
    subtitle: "ML Trading System",
    image: "https://www.figma.com/api/mcp/asset/02eeb929-1790-4ffa-8473-a019ecf8e337",
    url: "https://github.com/tafurfede/Tradient",
    description: "Quantitative trading engine with 200+ engineered features—ensemble ML models (XGBoost, LightGBM, Neural Nets) for signal generation, backtesting, and risk-adjusted position sizing.",
    specs: [
      "200+ engineered features from market microstructure",
      "Multi-model ensemble (XGBoost, LightGBM, Neural Networks)",
      "Real-time risk management and position sizing",
      "Backtesting framework with walk-forward optimization",
      "Dockerized deployment with monitoring dashboards",
      "Python, pandas, scikit-learn, TensorFlow"
    ],
    tags: ["Machine Learning", "Finance", "Python", "Quantitative"]
  }
];

// Experience data
const experiences = [
  {
    id: "01",
    company: "NexaDev Software Solutions",
    role: "Data Analyst & Lead Developer",
    period: "Feb 2024 - Present",
    description: "AI-powered CRM platform with predictive matching models. Led 4-person team, built Power BI dashboards—75% reduction in screening time."
  },
  {
    id: "02",
    company: "Oaklet",
    role: "Co-Founder, Data Scientist & AI Engineer",
    period: "Mar 2025 - Sep 2025",
    description: "Demand forecasting with ARIMA & Prophet, executive KPI dashboards. 80% reduction in cloud spend, 50k+ daily API requests."
  },
  {
    id: "03",
    company: "TIMS International",
    role: "Software Engineering Intern",
    period: "May 2024 - Aug 2024",
    description: "Analyzed 500k+ operational records with Python, R, SQL. Built Tableau dashboards—15% reduction in query time."
  },
  {
    id: "04",
    company: "NCAA Division I Athlete",
    role: "Virginia Tech & UCF Varsity Soccer",
    period: "Jun 2022 - May 2024",
    description: "Managed 30-40 hrs/week training alongside full coursework. Top 3 conference finishes—discipline, teamwork, performance under pressure."
  }
];

export default function Home() {
  const workRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col w-full min-w-0 overflow-x-hidden">
      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#232323] rounded-2xl max-w-[800px] w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden rounded-t-2xl">
              <Image
                src={selectedProject.image}
                alt={selectedProject.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#232323] to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 -mt-16 relative">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">{selectedProject.name}</h3>
              <p className="text-sm md:text-base text-[#adadad] mb-4">{selectedProject.subtitle}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#1a1a1a] rounded-full text-xs md:text-sm text-[#adadad]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm md:text-base text-white mb-6">{selectedProject.description}</p>

              {/* Specifications */}
              <h4 className="text-lg font-medium text-white mb-4">Key Features</h4>
              <ul className="space-y-3 mb-8">
                {selectedProject.specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d94100] mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-[#adadad]">{spec}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              {selectedProject.url ? (
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#d94100] rounded-lg px-6 py-3 hover:bg-[#b93800] transition-colors"
                >
                  <span className="text-white font-medium">View Project</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 bg-[#5f5f5f] rounded-lg px-6 py-3 cursor-not-allowed">
                  <span className="text-white font-medium">Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="text-white text-lg md:text-xl font-medium tracking-tight">Federico Tafur</span>
            <span className="text-white text-[8px] md:text-[10px] align-super">TM</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <button onClick={() => scrollToSection(workRef)} className="text-white text-sm hover:opacity-80 transition-opacity">
              Work
            </button>
            <button onClick={() => scrollToSection(experienceRef)} className="text-white text-sm hover:opacity-80 transition-opacity">
              Experience
            </button>
            <button onClick={() => scrollToSection(aboutRef)} className="text-white text-sm hover:opacity-80 transition-opacity">
              About
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="border border-white rounded-lg px-5 py-2 hover:bg-white/10 transition-colors"
            >
              <span className="text-white text-sm">Contact</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-t border-white/10 px-6 py-4">
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection(workRef)} className="text-white text-left py-2 hover:opacity-80">
                Work
              </button>
              <button onClick={() => scrollToSection(experienceRef)} className="text-white text-left py-2 hover:opacity-80">
                Experience
              </button>
              <button onClick={() => scrollToSection(aboutRef)} className="text-white text-left py-2 hover:opacity-80">
                About
              </button>
              <button onClick={() => scrollToSection(contactRef)} className="text-white text-left py-2 hover:opacity-80">
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-[#1a1a1a] min-h-screen flex flex-col justify-center pt-16 md:pt-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full py-12 md:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[#5f5f5f] leading-tight">
            <span>Hi, </span>
            <span className="inline-block w-[80px] h-[48px] sm:w-[100px] sm:h-[60px] md:w-[120px] md:h-[72px] lg:w-[140px] lg:h-[84px] xl:w-[160px] xl:h-[96px] relative align-middle mx-1 md:mx-2 bg-[#010101] overflow-hidden rounded-sm">
              <Image
                src="/fede.png"
                alt="Federico Tafur"
                fill
                className="object-cover object-top"
              />
            </span>
            <span> I&apos;m </span>
            <span className="text-white">Federico Tafur, </span>
            <span>a </span>
            <span className="text-white">Data Scientist & ML Engineer</span>
          </h1>

          <button
            onClick={() => scrollToSection(contactRef)}
            className="mt-10 md:mt-16 bg-[#d94100] rounded-lg px-6 md:px-8 py-3 md:py-4 hover:bg-[#b93800] transition-colors"
          >
            <span className="text-white font-medium text-sm md:text-base">Contact Me</span>
          </button>
        </div>
      </section>

      {/* Work Section */}
      <section ref={workRef} className="bg-[#232323] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white">Work</h2>
            <button className="self-start sm:self-auto border border-white rounded-lg px-6 py-3 hover:bg-white/10 transition-colors">
              <span className="text-white font-medium text-sm">View All</span>
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col gap-4">
                <div
                  className="bg-[#181818] aspect-[4/3] w-full overflow-hidden relative cursor-pointer group rounded-lg"
                  onClick={() => setSelectedProject(project)}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-white font-medium text-sm">View Details</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-lg md:text-xl lg:text-2xl font-normal text-white">{project.name}</p>
                  <p className="text-sm md:text-base text-[#adadad] opacity-70">{project.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="bg-[#1a1a1a] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-20">
            {/* Section Title */}
            <div className="lg:w-1/3 mb-10 lg:mb-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white sticky top-24">Experience</h2>
            </div>

            {/* Experience Cards */}
            <div className="lg:w-2/3 flex flex-col gap-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-[#232323] rounded-lg p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                    <p className="text-sm md:text-base text-[#d94100] font-medium">{exp.id}</p>
                    <p className="text-xs md:text-sm text-[#adadad]">{exp.period}</p>
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-[28px] font-normal text-white mb-1">{exp.company}</h3>
                  <p className="text-sm md:text-base text-[#d94100] mb-3">{exp.role}</p>
                  <p className="text-sm md:text-base text-[#adadad] leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={aboutRef} className="bg-[#1a1a1a] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-10 md:mb-16">About Me</h2>

          <div className="max-w-3xl space-y-6 md:space-y-8">
            <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed">
              I&apos;m Federico Tafur—a Data Scientist & ML Engineer graduating in May 2026. I&apos;m passionate about the intersection of <span className="text-[#d94100]">computer science</span>, <span className="text-[#d94100]">finance</span>, and <span className="text-[#d94100]">data science</span>.
            </p>

            <p className="text-base md:text-lg lg:text-xl text-[#adadad] leading-relaxed">
              Before tech, I played <span className="text-white">professional first-division soccer in Costa Rica</span> and competed in <span className="text-white">NCAA Division I</span> at Virginia Tech and UCF. That background built my discipline, teamwork, and drive to perform under pressure.
            </p>

            <p className="text-base md:text-lg lg:text-xl text-[#adadad] leading-relaxed">
              I&apos;m driven by entrepreneurship—building products that are useful, fast, and trustworthy. I love taking ideas from research to production and creating real-world impact through data-driven solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="bg-[#232323] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-12 md:mb-16">Contact</h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
            {/* GitHub */}
            <a
              href="https://github.com/tafurfede"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-white text-sm md:text-base">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/tafurfede"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="white">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="text-white text-sm md:text-base">LinkedIn</span>
            </a>

            {/* Email */}
            <a
              href="mailto:fedetafur3@gmail.com"
              className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="white">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
              </svg>
              <span className="text-white text-sm md:text-base">Email</span>
            </a>

            {/* Resume */}
            <a
              href="/Resume .pdf"
              download
              className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="white">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm8-10h2v2h-2v-2zm-4 0h2v2h-2v-2zm0 4h6v2h-6v-2zm0 4h4v2h-4v-2z"/>
              </svg>
              <span className="text-white text-sm md:text-base">Resume</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232323] border-t border-white/10 py-8 md:py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Social Links */}
          <div className="flex justify-center gap-6 md:gap-10 mb-8">
            <a href="https://github.com/tafurfede" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:opacity-80 transition-opacity">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/tafurfede" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:opacity-80 transition-opacity">
              LinkedIn
            </a>
            <a href="mailto:fedetafur3@gmail.com" className="text-white text-sm hover:opacity-80 transition-opacity">
              Email
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 mb-6"></div>

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-center sm:text-left">
            <p className="text-[#adadad] text-xs md:text-sm">
              Federico Tafur. Data Scientist & ML Engineer
            </p>
            <div className="flex justify-center sm:justify-end gap-4">
              <a href="/Resume .pdf" download className="text-[#adadad] text-xs md:text-sm hover:text-white transition-colors">
                Resume
              </a>
              <a href="https://github.com/tafurfede" target="_blank" rel="noopener noreferrer" className="text-[#adadad] text-xs md:text-sm hover:text-white transition-colors">
                Projects
              </a>
              <a href="mailto:fedetafur3@gmail.com" className="text-[#adadad] text-xs md:text-sm hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
