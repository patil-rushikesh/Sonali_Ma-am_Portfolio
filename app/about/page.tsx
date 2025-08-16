"use client";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bioSectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const philosophyRef = useRef<HTMLDivElement | null>(null);

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

          // Tell ScrollTrigger to use LocomotiveScroll
          scroll.on("scroll", ScrollTrigger.update);
          ScrollTrigger.scrollerProxy(scrollRef.current, {
            scrollTop(value) {
              return arguments.length
                ? scroll.scrollTo(value, 0, 0)
                : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
            pinType: scrollRef.current.style.transform ? "transform" : "fixed",
          });
        } catch (err) {
          console.error("Locomotive Scroll failed to load:", err);
        }
      }
    }

    gsap.registerPlugin(ScrollTrigger);

    initLoco().then(() => {
      // Bio Section Animation
      if (bioSectionRef.current) {
        gsap.fromTo(
          bioSectionRef.current,
          { x: 200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bioSectionRef.current,
              scroller: scrollRef.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      }

      // Image Animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          x: -150,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            scroller: scrollRef.current,
            start: "top 85%",
          },
        });
      }

      // Timeline Cards Animation
      if (timelineRef.current) {
        gsap.from(timelineRef.current.querySelectorAll(".timeline-card"), {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            scroller: scrollRef.current,
            start: "top 85%",
          },
        });
      }

      // Philosophy Section Animation
      if (philosophyRef.current) {
        gsap.from(philosophyRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            scroller: scrollRef.current,
            start: "top 80%",
          },
        });
      }

      ScrollTrigger.addEventListener("refresh", () => scroll && scroll.update());
      ScrollTrigger.refresh();
    });

    return () => {
      isMounted = false;
      if (scroll) scroll.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="min-h-screen relative overflow-hidden"
      data-scroll-container
    >
      <Navigation />

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div ref={imageRef}>
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                <Image
                  src="/professional-headshot.png"
                  alt="Professional headshot"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  data-scroll
                  data-scroll-speed="10"
                  data-scroll-direction="horizontal"
                />
              </div>
            </div>

            {/* Biography Section */}
            <div ref={bioSectionRef}>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Me
              </h1>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  Welcome to my professional journey. I am a passionate
                  individual dedicated to sharing knowledge, creating innovative
                  solutions, and contributing to the advancement of technology
                  and education.
                </p>
                <p>
                  With years of experience in delivering impactful talks,
                  developing intellectual property, and curating valuable
                  learning resources, I strive to make complex concepts
                  accessible and engaging for diverse audiences.
                </p>
                <p>
                  My work spans across multiple domains, from technical
                  presentations to educational content creation, always with a
                  focus on quality, clarity, and practical application.
                </p>
              </div>

              {/* Skills */}
              <div className="mt-8 relative">
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Public Speaking",
                    "Technical Writing",
                    "Innovation",
                    "Education",
                    "Research",
                    "Content Creation",
                    "Leadership",
                    "Strategy",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 px-4 bg-muted/30">
        <div
          className="container mx-auto max-w-4xl"
          ref={timelineRef}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Professional Journey
          </h2>
          <div className="space-y-8">
            {[
              {
                period: "2020 - Present",
                title: "Senior Professional",
                description:
                  "Leading innovative projects and delivering high-impact presentations to diverse audiences worldwide.",
              },
              {
                period: "2018 - 2020",
                title: "Subject Matter Expert",
                description:
                  "Developed comprehensive learning resources and established thought leadership in key areas of expertise.",
              },
              {
                period: "2015 - 2018",
                title: "Research & Development",
                description:
                  "Focused on intellectual property development and creating solutions that address real-world challenges.",
              },
              {
                period: "2012 - 2015",
                title: "Early Career",
                description:
                  "Built foundational expertise through hands-on experience and continuous learning in various domains.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="timeline-card hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-32 flex-shrink-0">
                      <Badge variant="outline" className="text-sm font-medium">
                        {item.period}
                      </Badge>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        <section className="py-16 px-4" ref={philosophyRef}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
            My Philosophy
          </h2>
          <blockquote className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed max-w-3xl mx-auto">
            "Knowledge shared is knowledge multiplied. Every presentation, every
            resource created, and every innovation developed should serve to
            elevate others and contribute to collective growth."
          </blockquote>
          <div className="mt-8 w-16 h-0.5 bg-primary mx-auto"></div>
        </div>
      </section>
    </div>
  );
};

export default About;
