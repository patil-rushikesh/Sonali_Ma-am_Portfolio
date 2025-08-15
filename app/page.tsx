"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/scroll-reveal";
import Link from "next/link";
import LocomotiveScroll from "locomotive-scroll";
import { useRef, useEffect } from "react";
import Image from "next/image";
export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let scroll: LocomotiveScroll | null = null;
    if (typeof window !== "undefined" && scrollRef.current) {
      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0,
      });
    }
    return () => {
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

      {/* Hero Section */}
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
              <span className="gradient-text animate-shimmer">Hello, I'm </span>
              <span className="block text-muted-foreground animate-fade-in-up animate-delay-200">
                Dr. Sonali Patil
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-300">
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
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Explore My Work
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Talks Delivered",
                description:
                  "Presentations and speaking engagements across various topics and conferences.",
                href: "/talks",
                icon: "🎤",
              },
              {
                title: "IPR Portfolio",
                description:
                  "Intellectual property rights, patents, and innovative solutions developed.",
                href: "/ipr",
                icon: "⚖️",
              },
              {
                title: "Learning Resources",
                description:
                  "Curated educational materials, courses, and knowledge-sharing content.",
                href: "/resources",
                icon: "📚",
              },
              {
                title: "Gallery",
                description:
                  "Visual showcase of projects, achievements, and creative endeavors.",
                href: "/gallery",
                icon: "🖼️",
              },
              {
                title: "About Me",
                description:
                  "Personal background, expertise, and professional journey overview.",
                href: "/about",
                icon: "👤",
              },
              {
                title: "Contact",
                description:
                  "Get in touch for collaborations, inquiries, or professional connections.",
                href: "/contact",
                icon: "📧",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.href} delay={index * 100}>
                <Card className="group hover-lift hover-glow transition-all duration-500 animate-scale-in border-0 shadow-lg">
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                    <div className="relative z-10">
                      <div className="text-3xl mb-4 animate-bounce-subtle group-hover:animate-float">
                        {item.icon}
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent btn-premium hover-scale"
                      >
                        <Link href={item.href}>Explore</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
