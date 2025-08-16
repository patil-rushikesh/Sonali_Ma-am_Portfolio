"use client";

import { Navigation } from "@/components/navigation";
import SpotlightStrip from "@/components/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useEffect } from "react";
export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let scroll: any = null;
    let isMounted = true;
    async function initLoco() {
      if (typeof window !== "undefined" && scrollRef.current) {
        try {
          const LocomotiveScroll = (await import("locomotive-scroll")).default;
          if (!isMounted) return;
          scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            lerp: 0.08,
          });
          // Scroll capture event
          scroll.on("scroll", (obj: any) => {
            // You can log or use obj.scroll.y (vertical) or obj.scroll.x (horizontal)
            // For demo, log scroll position:
            // console.log("Scroll position:", obj.scroll.y);
          });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Locomotive Scroll failed to load:", err);
        }
      }
    }
    initLoco();
    return () => {
      isMounted = false;
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="min-h-screen relative overflow-hidden"
      data-scroll-container
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-black/3 to-transparent rounded-full animate-float animate-delay-200"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-black/4 to-transparent rounded-full animate-float animate-delay-500"></div>
      </div>

      <Navigation />

      <section className="relative py-20 px-4 overflow-hidden">
        {/* Blurred background image, content stays sharp */}
        <div
          className="pointer-events-none absolute inset-0 z-0 w-full h-full"
          aria-hidden="true"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/sonaliPatilherobg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.5)",
              width: "100%",
              height: "100%",
            }}
          />
          {/* Responsive override for mobile: background image on right */}
          <style>{`
            @media (max-width: 640px) {
              [aria-hidden="true"] > div {
                background-position: right center !important;
              }
            }
          `}</style>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="animate-fade-in-up ">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white animate-shimmer">Hello, I'm </span>
              <span className="block text-white animate-fade-in-up animate-delay-200">
                Dr. Sonali Patil
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-300">
              ACM Senior Member | Chair - IEEE Pune Blockchain Group Professor &
              Head, Computer Engineering Department, Pimpri Chinchwad College of
              Engineering (PCCOE), Pune
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
              <Button
                asChild
                size="lg"
                className="text-base btn-premium hover-lift"
              >
                <Link href="/about">Learn About Me</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base bg-transparent hover-glow"
              >
                <Link href="/talks">View My Talks</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className=" bg-muted/30 overflow-hidden">
            <SpotlightStrip/>
      </section>
      <section className="min-h-screen w-screen "></section>
    </div>
  );
}
