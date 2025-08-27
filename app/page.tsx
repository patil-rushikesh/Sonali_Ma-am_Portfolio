"use client";

import { Navigation } from "@/components/navigation";
import SpotlightStrip from "@/components/stripe";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import { Award, Shield, Lightbulb } from "lucide-react"
import { useRef, useEffect, useState } from "react";
import Footer from "@/components/footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTestimonials, setLoading } from "@/store/testimonialsSlice";
import { ElegantCarousel } from "@/components/elegant-carousel";
const carouselItems = [
  {
    id: 1,
    image: "/sonaliPatilherobg.jpg",
    headline: "Modern Architecture",
    description: "Exploring the intersection of form and function in contemporary design",
  },
  {
    id: 2,
    image: "/sonaliPatilherobg.jpg",
    headline: "Portrait Studies",
    description: "Capturing the essence of human emotion through minimalist composition",
  },
  {
    id: 3,
    image: "/sonaliPatilherobg.jpg",
    headline: "Abstract Geometry",
    description: "Finding beauty in the simplicity of geometric forms and patterns",
  }
]

// Loader component
const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <span className="inline-block w-10 h-10 rounded-full border-4 border-black border-t-transparent animate-spin"></span>
  </div>
);

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const testimonials = useSelector((state: RootState) => state.testimonials.items);
  const loading = useSelector((state: RootState) => state.testimonials.loading);

  const fetchTestimonials = async () => {
    dispatch(setLoading(true));
    const testimonials = await axios.get("/api/testimonials");
    dispatch(setTestimonials(testimonials.data.data));
    dispatch(setLoading(false));
  };

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
          scroll.on("scroll", (obj: any) => { });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Locomotive Scroll failed to load:", err);
        }
      }
    }
    initLoco();

    fetchTestimonials();

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

      {/* <Navigation /> */}

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
                className="text-white bg-transparent hover-glow"
              >
                <Link href="/talks">View My Talks</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="bg-muted/30 overflow-hidden">
        <SpotlightStrip />
      </section>

      <section className=" px-40 bg-muted/30">
        <ElegantCarousel items={carouselItems} autoPlay={true} autoPlayInterval={6000} />
      </section>
      
      {/* IPR Importance Section */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Why IPR Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation Protection",
                description:
                  "Safeguards creative works and inventions from unauthorized use, ensuring inventors can benefit from their innovations.",
                icon: <Shield className="w-6 h-6" />,
              },
              {
                title: "Economic Value",
                description:
                  "Creates tangible business assets that can be licensed, sold, or used as collateral for financing.",
                icon: <Award className="w-6 h-6" />,
              },
              {
                title: "Competitive Advantage",
                description:
                  "Provides market exclusivity and prevents competitors from copying successful innovations.",
                icon: <Lightbulb className="w-6 h-6" />,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-primary">{item.icon}</div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from colleagues, students, and industry professionals about
              their experiences with Dr. Sonali Patil's work and contributions.
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {!testimonials.length ? (
                <Loader />
              ) : (
                testimonials.map((testimonial) => (
                  <Card
                    key={testimonial._id}
                    className="bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex mb-4 items-center gap-4">
                        {testimonial.image?.url && (
                          <img
                            src={testimonial.image.url}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        "{testimonial.paragraph}"
                      </p>
                      <div className="border-t pt-4 text-xs text-muted-foreground">
                        Added:{" "}
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
      {/* GSAP animation for highlight boxes */}
      <script suppressHydrationWarning>{`
        if (typeof window !== 'undefined') {
          import('gsap').then(gsap => {
            gsap.default.fromTo('#highlight-cards > div .rounded-2xl',
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.1, stagger: 0.18, ease: 'power3.out' }
            );
          });
        }
      `}</script>
    </div>
  );
}