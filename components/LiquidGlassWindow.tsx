"use client";

import { useEffect, useRef, useState } from "react";

function TechIcon({ name, imageSrc }: { name: string; imageSrc?: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="w-24 h-24 bg-gray-400/30 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md transform transition-all hover:scale-105 hover:bg-gray-300/40 border border-white/30">
        {imageSrc ? (
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={imageSrc} alt={name} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center">
            <span className="text-xl text-gray-600">●</span>
          </div>
        )}
        <span className="text-[11px] text-gray-700 font-medium text-center px-1">{name}</span>
      </div>
    </div>
  );
}


export default function LiquidGlassWindow({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [id] = useState(`liquid-glass-${Math.random().toString(36).substr(2, 9)}`);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!container || !canvas || !svg) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 900;
    const height = 700;
    const canvasDPI = 1;

    canvas.width = width * canvasDPI;
    canvas.height = height * canvasDPI;

    function smoothStep(a: number, b: number, t: number): number {
      t = Math.max(0, Math.min(1, (t - a) / (b - a)));
      return t * t * (3 - 2 * t);
    }

    function length(x: number, y: number): number {
      return Math.sqrt(x * x + y * y);
    }

    function roundedRectSDF(x: number, y: number, width: number, height: number, radius: number): number {
      const qx = Math.abs(x) - width + radius;
      const qy = Math.abs(y) - height + radius;
      return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
    }

    let animTime = 0;
    
    function updateShader() {
      const w = width * canvasDPI;
      const h = height * canvasDPI;
      const data = new Uint8ClampedArray(w * h * 4);

      let maxScale = 0;
      const rawValues: number[] = [];

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % w;
        const y = Math.floor(i / 4 / w);
        
        const uvX = x / w;
        const uvY = y / h;
        
        const ix = uvX - 0.5;
        const iy = uvY - 0.5;
        
        const distanceToEdge = roundedRectSDF(ix, iy, 0.48, 0.48, 0.3);
        const displacement = smoothStep(1, -0.2, distanceToEdge);
        const scaled = smoothStep(0, 1, displacement) * 1.5;
        
        const mouseDistX = uvX - mouseRef.current.x;
        const mouseDistY = uvY - mouseRef.current.y;
        const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);
        const mouseInfluence = Math.exp(-mouseDist * 2) * 0.5;
        
        const waveX = Math.sin(uvY * 15 + animTime * 2) * 0.08;
        const waveY = Math.cos(uvX * 15 + animTime * 2) * 0.08;
        const ripple = Math.sin(mouseDist * 20 - animTime * 3) * 0.05 * Math.exp(-mouseDist * 2);
        
        const dx = ((ix * scaled + 0.5 + mouseDistX * mouseInfluence + waveX + ripple) * w - x) * 5;
        const dy = ((iy * scaled + 0.5 + mouseDistY * mouseInfluence + waveY + ripple) * h - y) * 5;
        
        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
      }

      maxScale *= 2;

      let index = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = rawValues[index++] / maxScale + 0.5;
        const g = rawValues[index++] / maxScale + 0.5;
        data[i] = r * 255;
        data[i + 1] = g * 255;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }

      ctx.putImageData(new ImageData(data, w, h), 0, 0);
      
      const feImage = svg.querySelector(`#${id}_map`) as SVGFEImageElement;
      const feDisplacementMap = svg.querySelector(`#${id}_displacement`) as SVGFEDisplacementMapElement;
      
      if (feImage && feDisplacementMap) {
        feImage.setAttribute("href", canvas.toDataURL());
        feDisplacementMap.setAttribute("scale", (maxScale / canvasDPI).toString());
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };

    const animate = () => {
      animTime += 0.1;
      updateShader();
      animationRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    
    // Initial update to establish the filter
    updateShader();
    
    // Start animation after a brief delay
    setTimeout(() => {
      animate();
    }, 100);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [id]);

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <defs>
          <filter
            id={`${id}_filter`}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width="900"
            height="700"
          >
            <feImage
              id={`${id}_map`}
              width="900"
              height="700"
            />
            <feDisplacementMap
              id={`${id}_displacement`}
              in="SourceGraphic"
              in2={`${id}_map`}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto"
      >
        <div 
          className="rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50 relative"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(200,200,200,0.2) 50%, rgba(255,255,255,0.1) 100%)",
            backdropFilter: "blur(20px) contrast(1.5) brightness(1.2) saturate(1.5)",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5), inset 0 0 50px rgba(255, 255, 255, 0.3), inset 0 -20px 30px rgba(0, 0, 0, 0.1)",
            transform: "perspective(1000px) rotateX(2deg)",
          }}
        >
          <div className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 h-10 flex items-center px-4 backdrop-blur-sm">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 backdrop-blur-sm"></div>
              <div className="w-3 h-3 rounded-full bg-gray-400/60 backdrop-blur-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 backdrop-blur-sm"></div>
            </div>
          </div>
          
          <div className="h-[700px] relative" style={{ filter: `url(#${id}_filter)` }}>
            <div className="w-full h-full bg-gradient-to-br from-gray-50/20 via-white/10 to-gray-100/20 relative backdrop-blur-sm px-6 py-4 overflow-y-auto">
              <h2 className="text-center text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">Technical Skills & Stack</h2>
              
              {/* Two Row Layout */}
              <div className="space-y-4">
                {/* Top Row - Languages, Frameworks, Tools */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Languages */}
                  <div className="bg-gray-200/10 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3 text-center uppercase">Languages</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <TechIcon name="Python" imageSrc="/python.png" />
                      <TechIcon name="TypeScript" imageSrc="/typescript.png" />
                      <TechIcon name="JavaScript" imageSrc="/js.png" />
                      <TechIcon name="SQL" imageSrc="/SQL.png" />
                      <TechIcon name="C++" imageSrc="/C++.png" />
                      <div className="w-24 h-24"></div>
                    </div>
                  </div>

                  {/* Frameworks & Libraries */}
                  <div className="bg-gray-200/10 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3 text-center uppercase">Frameworks & Libraries</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <TechIcon name="React" imageSrc="/react.png" />
                      <TechIcon name="Next.js" imageSrc="/nextjs.png" />
                      <TechIcon name="Vue.js" imageSrc="/vuejs.png" />
                      <TechIcon name="Node.js" imageSrc="/nodejs.png" />
                      <TechIcon name="FastAPI" imageSrc="/fastAPI.png" />
                      <div className="w-24 h-24"></div>
                    </div>
                  </div>

                  {/* Tools & DevOps */}
                  <div className="bg-gray-200/10 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3 text-center uppercase">Tools & DevOps</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <TechIcon name="Git" imageSrc="/git.png" />
                      <TechIcon name="GitHub" imageSrc="/github.svg" />
                      <TechIcon name="CI/CD" imageSrc="/githubactions.png" />
                      <TechIcon name="VS Code" imageSrc="/vscode.png" />
                      <TechIcon name="Postman" imageSrc="/postman.webp" />
                      <div className="w-24 h-24"></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - AI/ML/Data and Cloud/Infrastructure */}
                <div className="grid grid-cols-2 gap-3">
                  {/* AI/ML & Data Science */}
                  <div className="bg-gray-200/10 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3 text-center uppercase">AI/ML & Data Science</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <TechIcon name="GPT-4" imageSrc="/gpt4.png" />
                      <TechIcon name="LangChain" imageSrc="/langchain.webp" />
                      <TechIcon name="Bedrock" imageSrc="/bedrock.png" />
                      <TechIcon name="PyTorch" imageSrc="/pytorch.png" />
                      <TechIcon name="TensorFlow" imageSrc="/tensorflow.png" />
                      <TechIcon name="Pandas" imageSrc="/pandas.svg" />
                      <TechIcon name="NumPy" imageSrc="/numpy.png" />
                      <TechIcon name="Scikit-learn" imageSrc="/Scikitlearnpng.png" />
                      <div className="w-24 h-24"></div>
                    </div>
                  </div>

                  {/* Cloud & Infrastructure */}
                  <div className="bg-gray-200/10 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3 text-center uppercase">Cloud & Infrastructure</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <TechIcon name="AWS" imageSrc="/aws.png" />
                      <TechIcon name="Docker" imageSrc="/docker.png" />
                      <TechIcon name="Kubernetes" imageSrc="/kubernetes.png" />
                      <TechIcon name="PostgreSQL" imageSrc="/postgresql.png" />
                      <TechIcon name="MongoDB" imageSrc="/mongodb.webp" />
                      <TechIcon name="DynamoDB" imageSrc="/dynamodb.png" />
                      <TechIcon name="S3" imageSrc="/s3.png" />
                      <div className="w-24 h-24"></div>
                      <div className="w-24 h-24"></div>
                    </div>
                  </div>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />
    </>
  );
}

