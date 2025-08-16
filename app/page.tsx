"use client"

import { Navigation } from "@/components/navigation"
import SpotlightStrip from "@/components/stripe"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"

interface Testimonial {
  id: number
  name: string
  role: string
  organization: string
  content: string
  rating: number
}

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  const fetchTestimonials = async () => {
    // TODO: Replace with actual database call when integration is added
    // Example: const response = await fetch('/api/testimonials');
    // const data = await response.json();
    // setTestimonials(data);

    // Mock data for now
    const mockTestimonials: Testimonial[] = [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        role: "Professor",
        organization: "IIT Bombay",
        content:
          "Dr. Sonali Patil's expertise in blockchain technology and her engaging presentation style make her talks truly inspiring. Her research contributions have significantly advanced our understanding of distributed systems.",
        rating: 5,
      },
      {
        id: 2,
        name: "Priya Sharma",
        role: "Software Engineer",
        organization: "Microsoft India",
        content:
          "Attending Dr. Patil's workshop on emerging technologies was a game-changer for my career. Her practical approach to complex concepts and real-world applications provided invaluable insights.",
        rating: 5,
      },
      {
        id: 3,
        name: "Prof. Amit Desai",
        role: "Head of Department",
        organization: "Pune University",
        content:
          "Dr. Sonali's leadership in the IEEE Pune Blockchain Group has fostered incredible collaboration in our academic community. Her vision for technology education is truly commendable.",
        rating: 5,
      },
    ]
    setTestimonials(mockTestimonials)
  }

  useEffect(() => {
    let scroll: any = null
    let isMounted = true
    async function initLoco() {
      if (typeof window !== "undefined" && scrollRef.current) {
        try {
          const LocomotiveScroll = (await import("locomotive-scroll")).default
          if (!isMounted) return
          scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            lerp: 0.08,
          })
          // Scroll capture event
          scroll.on("scroll", (obj: any) => {})
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Locomotive Scroll failed to load:", err)
        }
      }
    }
    initLoco()

    fetchTestimonials()

    return () => {
      isMounted = false
      if (scroll) {
        scroll.destroy()
      }
    }
  }, [])

  return (
    <div ref={scrollRef} className="min-h-screen relative overflow-hidden" data-scroll-container>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-black/3 to-transparent rounded-full animate-float animate-delay-200"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-black/4 to-transparent rounded-full animate-float animate-delay-500"></div>
      </div>

      <Navigation />

      <section className="relative py-20 px-4 overflow-hidden">
        {/* Blurred background image, content stays sharp */}
        <div className="pointer-events-none absolute inset-0 z-0 w-full h-full" aria-hidden="true">
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
              <span className="block text-white animate-fade-in-up animate-delay-200">Dr. Sonali Patil</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-300">
              ACM Senior Member | Chair - IEEE Pune Blockchain Group Professor & Head, Computer Engineering Department,
              Pimpri Chinchwad College of Engineering (PCCOE), Pune
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
              <Button asChild size="lg" className="text-base btn-premium hover-lift">
                <Link href="/about">Learn About Me</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent hover-glow">
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
        <div id="highlight-cards" className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg text-lg">
                Talks
              </span>
            </div>
            <div className="rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 border border-border p-8 flex flex-col items-center gap-6">
              <h2 className="font-serif text-2xl font-bold text-center mb-2">Inspiring Talks</h2>
              <p className="text-muted-foreground text-center">
                Explore a collection of impactful talks delivered at national and international conferences, inspiring
                audiences across the globe.
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
              <h2 className="font-serif text-2xl font-bold text-center mb-2">Intellectual Property</h2>
              <p className="text-muted-foreground text-center">
                Discover patents, copyrights, and innovative solutions that contribute to the advancement of technology
                and society.
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
              <h2 className="font-serif text-2xl font-bold text-center mb-2">Learning Resources</h2>
              <p className="text-muted-foreground text-center">
                Access comprehensive educational materials including research papers, course materials, blockchain
                tutorials, AI/ML resources, and curated content for continuous learning and professional development in
                emerging technologies.
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">What People Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from colleagues, students, and industry professionals about their experiences with Dr. Sonali Patil's
              work and contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.organization}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-background border-t border-border">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="lg:col-span-2">
              <h3 className="font-serif text-2xl font-bold mb-4">Dr. Sonali Patil</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                ACM Senior Member and Chair of IEEE Pune Blockchain Group, dedicated to advancing technology education
                and research in blockchain, AI, and emerging technologies. Professor & Head at PCCOE, Pune.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/talks" className="text-muted-foreground hover:text-primary transition-colors">
                    Talks
                  </Link>
                </li>
                <li>
                  <Link href="/ipr" className="text-muted-foreground hover:text-primary transition-colors">
                    IPR Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/publications" className="text-muted-foreground hover:text-primary transition-colors">
                    Publications
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>PCCOE, Pune</p>
                <p>Maharashtra, India</p>
                <p className="mt-4">
                  <Link href="mailto:contact@sonalipatil.com" className="hover:text-primary transition-colors">
                    contact@sonalipatil.com
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Dr. Sonali Patil. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
  )
}
