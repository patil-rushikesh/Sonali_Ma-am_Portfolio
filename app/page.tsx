"use client";

import { Navigation } from "@/components/navigation";
import SpotlightStrip from "@/components/stripe";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import Footer from "@/components/footer";
interface Testimonial {
  _id: string;
  name: string;
  position: string;
  paragraph: string;
  image: {
    url: string;
    publicId: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = async () => {
    const testimonials = await axios.get("/api/testimonials");
    console.log(testimonials.data);
    setTestimonials(testimonials.data.data);
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
          scroll.on("scroll", (obj: any) => {});
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
      <section className="bg-muted/30 overflow-hidden">
        <SpotlightStrip />
      </section>

      {/* Highlight Section with 3 boxes */}
      <section className="py-20 px-4 flex justify-center items-center min-h-[60vh] bg-background">
        <div
          id="highlight-cards"
          className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Box 1 */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg text-lg">
                Talks
              </span>
            </div>
            <div className="rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 border border-border p-8 flex flex-col items-center gap-6">
              <h2 className="font-serif text-2xl font-bold text-center mb-2">
                Inspiring Talks
              </h2>
              <p className="text-muted-foreground text-center">
                Explore a collection of impactful talks delivered at national
                and international conferences, inspiring audiences across the
                globe.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/talks">View Talks</Link>
              </Button>
            </div>
          </div>
          {/* Box 2 */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg text-lg">
                IPR
              </span>
            </div>
            <div className="rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 border border-border p-8 flex flex-col items-center gap-6">
              <h2 className="font-serif text-2xl font-bold text-center mb-2">
                Intellectual Property
              </h2>
              <p className="text-muted-foreground text-center">
                Discover patents, copyrights, and innovative solutions that
                contribute to the advancement of technology and society.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/ipr">View IPR Portfolio</Link>
              </Button>
            </div>
          </div>
          {/* Box 3 */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg text-lg">
                Resources
              </span>
            </div>
            <div className="rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 border border-border p-8 flex flex-col items-center gap-6">
              <h2 className="font-serif text-2xl font-bold text-center mb-2">
                Learning Resources
              </h2>
              <p className="text-muted-foreground text-center">
                Access comprehensive educational materials including research
                papers, course materials, blockchain tutorials, AI/ML resources,
                and curated content for continuous learning and professional
                development in emerging technologies.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/resources">Explore Resources</Link>
              </Button>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials &&
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
              ))}
          </div>
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