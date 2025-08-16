"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LocomotiveScroll from "locomotive-scroll";

export default function Stripe() {
  const stripRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [direction, setDirection] = useState<"right" | "left">("right");

  useEffect(() => {
    if (!stripRef.current) return;

    // Duplicate content for seamless loop
    const content = stripRef.current.innerHTML;
    stripRef.current.innerHTML = content + content;

    // Create infinite tween
    tweenRef.current = gsap.to(stripRef.current, {
      xPercent: -50, // move half the width since content is duplicated
      ease: "none",
      duration: 10,
      repeat: -1,
    });

    // Setup locomotive scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]") as HTMLElement,
      smooth: true,
    });

    let lastY = 0;

    scroll.on("scroll", (obj: any) => {
      const currentY = obj.scroll.y;
      if (currentY > lastY) {
        // scrolling down → forward
        tweenRef.current?.play();
        setDirection("right");
      } else if (currentY < lastY) {
        // scrolling up → reverse
        tweenRef.current?.reverse();
        setDirection("left");
      }
      lastY = currentY;
    });

    return () => {
      scroll.destroy();
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <section className="py-6 overflow-hidden font-serif bg-black flex items-center">
      <div
        ref={stripRef}
        className="flex whitespace-nowrap text-2xl font-bold text-white"
      >
        <span className="px-8">Spotlight</span>
        <span className="px-8">Infinite Scroll</span>
        <span className="px-8">Locomotive + GSAP</span>
        <span className="px-8">Reverse on Scroll</span>
      </div>
    </section>
  );
}
