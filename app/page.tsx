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

export default function Home() {
  const workRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-start w-full">
      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#232323] rounded-2xl max-w-[800px] w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-t-2xl">
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
            <div className="p-8 -mt-16 relative">
              <h3 className="heading-4 text-white mb-2">{selectedProject.name}</h3>
              <p className="paragraph-small text-[#adadad] mb-4">{selectedProject.subtitle}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#1a1a1a] rounded-full text-sm text-[#adadad]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="paragraph-small text-white mb-6">{selectedProject.description}</p>

              {/* Specifications */}
              <h4 className="text-lg font-medium text-white mb-4">Key Features</h4>
              <ul className="space-y-3 mb-8">
                {selectedProject.specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d94100] mt-2.5 flex-shrink-0" />
                    <span className="paragraph-small text-[#adadad]">{spec}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              {selectedProject.url ? (
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#d94100] rounded-[8px] px-6 py-3 hover:bg-[#b93800] transition-colors"
                >
                  <span className="button-text text-white">View Project</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 bg-[#5f5f5f] rounded-[8px] px-6 py-3 cursor-not-allowed">
                  <span className="button-text text-white">Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#1a1a1a] h-[875px] overflow-hidden relative w-full">
        {/* Header */}
        <header className="absolute bg-[#1a1a1a] h-[100px] left-[3px] top-0 w-[1437px]">
          {/* Logo */}
          <div className="absolute left-[86px] top-1/2 -translate-y-1/2">
            <div className="relative h-[32px] w-[171px]">
              <p className="logo-text text-white absolute left-0 top-0">
                Federico Tafur
              </p>
              <p className="text-[10.971px] tracking-[-0.33px] text-white absolute left-[155px] top-[2px]">
                TM
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="absolute right-[86px] top-1/2 -translate-y-1/2 flex items-center gap-[40px]">
            <button
              onClick={() => scrollToSection(workRef)}
              className="nav-text text-white text-right hover:opacity-80 transition-opacity"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="nav-text text-white text-right hover:opacity-80 transition-opacity"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection(testimonialRef)}
              className="nav-text text-white text-right hover:opacity-80 transition-opacity"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="border border-white rounded-[8px] px-[24px] py-[12px] hover:bg-white/10 transition-colors"
            >
              <span className="nav-text text-white text-right tracking-[-0.2px]">
                Contact
              </span>
            </button>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="absolute left-[89px] top-[222px] w-[1100px]">
          <h1 className="heading-1 text-[#5f5f5f]">
            <span>Hi, </span>
            <span className="inline-block w-[160px] h-[96px] relative align-middle mx-2 bg-[#010101] overflow-hidden rounded-sm">
              {/* Profile image container */}
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
        </div>

        {/* Contact Me Button */}
        <button
          onClick={() => scrollToSection(contactRef)}
          className="absolute left-[89px] top-[720px] bg-[#d94100] rounded-[8px] px-[32px] py-[16px] hover:bg-[#b93800] transition-colors"
        >
          <span className="button-text text-white">Contact Me</span>
        </button>
      </section>

      {/* Work Section */}
      <section ref={workRef} className="bg-[#232323] min-h-[1200px] overflow-hidden relative w-full">
        {/* Section Title */}
        <h2 className="heading-1 text-white absolute left-[100px] top-[132px]">
          Work
        </h2>

        {/* View All Button */}
        <button className="absolute right-[100px] top-[185px] border border-white rounded-[8px] px-[32px] py-[16px] hover:bg-white/10 transition-colors">
          <span className="button-text text-white">View All</span>
        </button>

        {/* Projects Grid */}
        <div className="absolute left-[100px] right-[100px] top-[313px] grid grid-cols-3 gap-[24px]">
          {projects.map((project, index) => (
            <div key={project.id} className="flex flex-col gap-[20px]">
              <div
                className="bg-[#181818] h-[280px] w-full overflow-hidden relative cursor-pointer group"
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
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2">
                    <span className="text-white font-medium text-sm">View Details</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[24px] font-normal text-white tracking-[-0.48px]">{project.name}</p>
                <p className="text-[16px] font-light text-[#adadad] opacity-70 tracking-[0.16px]">{project.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section ref={servicesRef} className="bg-[#1a1a1a] min-h-[1300px] overflow-hidden relative w-full">
        {/* Section Title */}
        <h2 className="heading-1 text-white absolute left-[100px] top-[157px]">
          Experience
        </h2>

        {/* Experience Cards */}
        <div className="absolute left-[730px] top-[170px] flex flex-col gap-[20px]">
          {/* Experience 1 - NexaDev */}
          <div className="bg-[#232323] rounded-lg p-[32px] w-[610px]">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[16px] text-[#d94100] font-medium">01</p>
              <p className="text-[14px] text-[#adadad]">Feb 2024 - Present</p>
            </div>
            <h3 className="text-[28px] font-normal text-white tracking-[-0.56px] mb-1">NexaDev Software Solutions</h3>
            <p className="text-[16px] text-[#d94100] mb-3">Data Analyst & Lead Developer</p>
            <p className="text-[16px] text-[#adadad] leading-[1.5]">
              AI-powered CRM platform with predictive matching models. Led 4-person team, built Power BI dashboards—75% reduction in screening time.
            </p>
          </div>

          {/* Experience 2 - Oaklet */}
          <div className="bg-[#232323] rounded-lg p-[32px] w-[610px]">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[16px] text-[#d94100] font-medium">02</p>
              <p className="text-[14px] text-[#adadad]">Mar 2025 - Sep 2025</p>
            </div>
            <h3 className="text-[28px] font-normal text-white tracking-[-0.56px] mb-1">Oaklet</h3>
            <p className="text-[16px] text-[#d94100] mb-3">Co-Founder, Data Scientist & AI Engineer</p>
            <p className="text-[16px] text-[#adadad] leading-[1.5]">
              Demand forecasting with ARIMA & Prophet, executive KPI dashboards. 80% reduction in cloud spend, 50k+ daily API requests.
            </p>
          </div>

          {/* Experience 3 - TIMS */}
          <div className="bg-[#232323] rounded-lg p-[32px] w-[610px]">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[16px] text-[#d94100] font-medium">03</p>
              <p className="text-[14px] text-[#adadad]">May 2024 - Aug 2024</p>
            </div>
            <h3 className="text-[28px] font-normal text-white tracking-[-0.56px] mb-1">TIMS International</h3>
            <p className="text-[16px] text-[#d94100] mb-3">Software Engineering Intern</p>
            <p className="text-[16px] text-[#adadad] leading-[1.5]">
              Analyzed 500k+ operational records with Python, R, SQL. Built Tableau dashboards—15% reduction in query time.
            </p>
          </div>

          {/* Experience 4 - NCAA */}
          <div className="bg-[#232323] rounded-lg p-[32px] w-[610px]">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[16px] text-[#d94100] font-medium">04</p>
              <p className="text-[14px] text-[#adadad]">Jun 2022 - May 2024</p>
            </div>
            <h3 className="text-[28px] font-normal text-white tracking-[-0.56px] mb-1">NCAA Division I Athlete</h3>
            <p className="text-[16px] text-[#d94100] mb-3">Virginia Tech & UCF Varsity Soccer</p>
            <p className="text-[16px] text-[#adadad] leading-[1.5]">
              Managed 30-40 hrs/week training alongside full coursework. Top 3 conference finishes—discipline, teamwork, performance under pressure.
            </p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={testimonialRef} className="bg-[#1a1a1a] min-h-[900px] overflow-hidden relative w-full">
        {/* Section Title */}
        <h2 className="heading-1 text-white absolute left-[100px] top-[157px]">
          About Me
        </h2>

        {/* About Content */}
        <div className="absolute left-[100px] right-[100px] top-[300px] max-w-[1000px]">
          <p className="text-[20px] text-white leading-[1.8] mb-8">
            I&apos;m Federico Tafur—a Data Scientist & ML Engineer graduating in May 2026. I&apos;m passionate about the intersection of <span className="text-[#d94100]">computer science</span>, <span className="text-[#d94100]">finance</span>, and <span className="text-[#d94100]">data science</span>.
          </p>

          <p className="text-[20px] text-[#adadad] leading-[1.8] mb-8">
            Before tech, I played <span className="text-white">professional first-division soccer in Costa Rica</span> and competed in <span className="text-white">NCAA Division I</span> at Virginia Tech and UCF. That background built my discipline, teamwork, and drive to perform under pressure.
          </p>

          <p className="text-[20px] text-[#adadad] leading-[1.8]">
            I&apos;m driven by entrepreneurship—building products that are useful, fast, and trustworthy. I love taking ideas from research to production and creating real-world impact through data-driven solutions.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="bg-[#232323] h-[500px] overflow-hidden relative w-full">
        <div className="absolute left-1/2 -translate-x-1/2 top-[120px] text-center">
          <h2 className="heading-1 text-white leading-none">
            Contact
          </h2>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[280px] flex gap-[60px]">
          {/* GitHub */}
          <a
            href="https://github.com/tafurfede"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-white text-[18px]">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/tafurfede"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span className="text-white text-[18px]">LinkedIn</span>
          </a>

          {/* Email */}
          <a
            href="mailto:fedetafur3@gmail.com"
            className="flex flex-col items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
            </svg>
            <span className="text-white text-[18px]">Email</span>
          </a>

          {/* Resume */}
          <a
            href="/Resume .pdf"
            download
            className="flex flex-col items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm8-10h2v2h-2v-2zm-4 0h2v2h-2v-2zm0 4h6v2h-6v-2zm0 4h4v2h-4v-2z"/>
            </svg>
            <span className="text-white text-[18px]">Resume</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232323] h-[196px] overflow-hidden relative w-full">
        {/* Social Links */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[53px] flex gap-[40px]">
          <a href="https://github.com/tafurfede" target="_blank" rel="noopener noreferrer" className="nav-text text-white text-right tracking-[-0.2px] hover:opacity-80 transition-opacity">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/tafurfede" target="_blank" rel="noopener noreferrer" className="nav-text text-white text-right hover:opacity-80 transition-opacity">
            LinkedIn
          </a>
          <a href="mailto:fedetafur3@gmail.com" className="nav-text text-white text-right hover:opacity-80 transition-opacity">
            Email
          </a>
        </div>

        {/* Divider Line */}
        <div className="absolute left-[100px] top-[120px] w-[1240px] h-px bg-white/20"></div>

        {/* Copyright */}
        <p className="footer-text text-[#adadad] absolute left-[100px] top-[142px]">
          Federico Tafur. Data Scientist & ML Engineer
        </p>

        {/* Footer Links */}
        <div className="absolute right-[100px] top-[137px] flex gap-[16px]">
          <a href="/Resume .pdf" download className="footer-text text-[#adadad] hover:text-white transition-colors">
            Resume
          </a>
          <a href="https://github.com/tafurfede" target="_blank" rel="noopener noreferrer" className="footer-text text-[#adadad] hover:text-white transition-colors">
            Projects
          </a>
          <a href="mailto:fedetafur3@gmail.com" className="footer-text text-[#adadad] hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
