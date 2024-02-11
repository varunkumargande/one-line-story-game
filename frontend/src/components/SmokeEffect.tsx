// SmokeEffect.tsx
import React, { useEffect, useRef } from "react";

interface ParticleInterface {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  update: () => void;
  draw: () => void;
}

const SmokeEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles: ParticleInterface[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Could not get 2D context");
      return;
    }

    let animationFrameId: number;

    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFA500", "#FF00FF"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Resize the canvas when the window is resized
    window.addEventListener("resize", resizeCanvas);

    // Initial resize
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.color = color;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
      }

      draw() {
        if (!ctx) {
          console.error("Could not get 2D context");
          return;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticles = (x: number, y: number) => {
      for (let i = 0; i < 5; i++) {
        particles.push(
          new Particle(x, y, colors[Math.floor(Math.random() * colors.length)])
        );
      }
    };

    const animateParticles = () => {
      if (!ctx) {
        console.error("Could not get 2D context");
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.size <= 0.2) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      createParticles(e.clientX, e.clientY);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animateParticles);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particles]);

  return (
    <div className="relative h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full " />
    </div>
  );
};

export default SmokeEffect;
