"use client";

import { useEffect, useRef } from "react";

export default function LiquidGlass() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();

    // Liquid glass parameters
    const params = {
      viscosity: 0.05,
      refraction: 1.5,
      waveSpeed: 0.02,
      transparency: 0.7,
    };

    // Particle class
    class LiquidParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      life: number;
      decay: number;
      phase: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 20 + 8;
        this.life = 1;
        this.decay = Math.random() * 0.005 + 0.001;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        // Apply viscosity
        this.vx *= 1 - params.viscosity;
        this.vy *= 1 - params.viscosity;

        // Apply wave motion
        this.x += this.vx + Math.sin(this.phase) * params.waveSpeed * 10;
        this.y += this.vy + Math.cos(this.phase) * params.waveSpeed * 10;

        // Update phase for wave effect
        this.phase += params.waveSpeed;

        // Boundary reflection with refraction effect
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
          this.vx *= -params.refraction;
          this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.vy *= -params.refraction;
          this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }

        // Life decay
        this.life -= this.decay;

        // Respawn if dead
        if (this.life <= 0) {
          this.respawn();
        }
      }

      respawn() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.radius = Math.random() * 20 + 8;
        this.phase = Math.random() * Math.PI * 2;
      }

      draw() {
        ctx.save();

        // Create glass effect with multiple layers
        const alpha = this.life * params.transparency;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 2
        );
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.3})`);
        glowGradient.addColorStop(0.5, `rgba(200, 230, 255, ${alpha * 0.2})`);
        glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Main glass body
        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(200, 230, 255, ${alpha * 0.6})`);
        gradient.addColorStop(0.7, `rgba(150, 200, 255, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(100, 150, 255, ${alpha * 0.2})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner reflection
        const reflectionGradient = ctx.createRadialGradient(
          this.x - this.radius * 0.5,
          this.y - this.radius * 0.5,
          0,
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.5
        );
        reflectionGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
        reflectionGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = reflectionGradient;
        ctx.beginPath();
        ctx.arc(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Edge highlight
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }
    }

    // Create particle system
    const particles: LiquidParticle[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new LiquidParticle(Math.random() * canvas.width, Math.random() * canvas.height)
      );
    }

    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Mouse interaction
        if (mouseActive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.5;
            particle.vy += (dy / distance) * force * 0.5;
          }
        }

        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = `rgba(255, 255, 255, ${params.transparency * 0.1})`;
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Handle window resize
    window.addEventListener("resize", resizeCanvas);

    // Start animation
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}