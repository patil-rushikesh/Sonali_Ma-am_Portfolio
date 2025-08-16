"use client";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Footer from "@/components/footer";

// Loader component
const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <span className="inline-block w-10 h-10 rounded-full border-4 border-black border-t-transparent animate-spin"></span>
  </div>
);

const About = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bioSectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [experience, setExperience] = useState<any[] | null>(null);

  useEffect(() => {
    let scroll: any = null;
    let isMounted = true;

    gsap.registerPlugin(ScrollTrigger);

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

          // Locomotive + ScrollTrigger proxy
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
              scrub: false,
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

      ScrollTrigger.addEventListener("refresh", () => scroll && scroll.update());
      ScrollTrigger.refresh();
    });

    return () => {
      isMounted = false;
      if (scroll) scroll.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  // Fetch Experience data
  useEffect(() => {
    const getExp = async () => {
      const res = await axios.get("/api/getExperience");
      setExperience(res.data.data);
    };
    getExp();
  }, []);

  // Animate Experience cards when data is loaded
  useEffect(() => {
    if (!timelineRef.current || !experience || !Array.isArray(experience))
      return;

    const cards = timelineRef.current.querySelectorAll(".timeline-card");

    gsap.from(cards, {
      y: 80,
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: timelineRef.current,
        scroller: scrollRef.current,
        start: "top 75%",
        end: "bottom 25%",
      },
    });
  }, [experience]);

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
                  className=" bg-center rounded-lg shadow-lg"
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
                  Dr. Sonali Patil (IEEE Senior Member) is Professor and Head of
                  the Computer Engineering Department at PCCoE, SPPU, Pune, with
                  over two decades of academic experience. She holds a B.E. in
                  Computer Science, M.E. in Computer Engineering, and a Ph.D. in
                  Computer Engineering.
                </p>
                <p>
                  She has authored 70+ research papers, holds international and
                  national patents, and has been recognized with the IEEE
                  Innovator/Researcher of the Year Award (2021) and the Women
                  Researcher Award (2020). A noted speaker, she continues to
                  make significant contributions to IT and education.
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

      {/* Experience Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl" ref={timelineRef}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Professional Journey
          </h2>
          <div className="space-y-8">
            {!experience && <Loader />}
            {experience && experience.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No experience found.
              </div>
            )}
            {experience &&
              experience.map((item: any, index) => {
                const start =
                  item.startMonth && item.startYear
                    ? `${String(item.startMonth).padStart(2, "0")}/${item.startYear}`
                    : "";
                const end = item.currentlyWorking
                  ? "Present"
                  : item.endMonth && item.endYear
                    ? `${String(item.endMonth).padStart(2, "0")}/${item.endYear}`
                    : "";
                const period = start && end ? `${start} - ${end}` : "";

                return (
                  <Card
                    key={item._id || index}
                    className="timeline-card hover:shadow-md transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="md:w-48 flex-shrink-0">
                          <Badge
                            variant="outline"
                            className="text-sm font-medium"
                          >
                            {period}
                          </Badge>
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-serif text-xl font-semibold mb-2">
                            {item.position}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.shortDescription || item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
