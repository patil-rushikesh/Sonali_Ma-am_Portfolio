"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Fragment, useRef, useEffect, useState } from "react"
import Footer from "@/components/footer"
import { ElegantCarousel } from "@/components/elegant-carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const certificateItems = [
  {
    id: 1,
    logo: "/sonaliPatilherobg.jpg",
    image: "/sonaliPatilherobg.jpg",
    headline: "AWS Solutions Architect",
    description: "Professional certification in cloud architecture and solutions design",
  },
  {
    id: 2,
    logo: "/sonaliPatilherobg.jpg",
    image: "/sonaliPatilherobg.jpg",
    headline: "Microsoft Azure Expert",
    description: "Advanced certification in Azure cloud services and implementation",
  },
  {
    id: 3,
    logo: "/sonaliPatilherobg.jpg",
    image: "/sonaliPatilherobg.jpg",
    headline: "Google Cloud Professional",
    description: "Expert-level certification in Google Cloud Platform technologies",
  }
];

const awardItems = [
  {
    id: 1,
    image: "/sonaliPatilherobg.jpg",
    headline: "Innovation Excellence Award",
    description: "Recognition for groundbreaking contributions to software development",
  },
  {
    id: 2,
    image: "/sonaliPatilherobg.jpg",
    headline: "Tech Leadership Award",
    description: "Honored for exceptional leadership in technology transformation",
  },
  {
    id: 3,
    image: "/sonaliPatilherobg.jpg",
    headline: "Industry Pioneer Award",
    description: "Acknowledged for pioneering work in emerging technologies",
  }
];

const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <span className="inline-block w-10 h-10 rounded-full border-4 border-black border-t-transparent animate-spin"></span>
  </div>
);

export default function GalleryPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollInstance = useRef<any>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificateItems[0] | null>(null);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [selectedRecognition, setSelectedRecognition] = useState<any>(null);
  const [recognitionDialogOpen, setRecognitionDialogOpen] = useState(false);

  useEffect(() => {
    let scroll: any
    import("locomotive-scroll").then((LocomotiveScroll) => {
      if (!scrollRef.current) return
      scroll = new LocomotiveScroll.default({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.08,
      })
      locomotiveScrollInstance.current = scroll
    })
    return () => {
      if (scroll) scroll.destroy()
    }
  }, [])

  const handleViewCertificate = (cert: typeof certificateItems[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCertificate(cert);
    setCertificateDialogOpen(true);
  };

  const handleViewRecognition = (recognition: any) => {
    setSelectedRecognition(recognition);
    setRecognitionDialogOpen(true);
  };

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="min-h-screen"
    >
      {/* <Navigation /> */}
      {/* Certificates Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Professional Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry-recognized certifications demonstrating expertise in cloud technologies, 
              software development, and enterprise solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificateItems.map((cert, index) => (
              <Card
                key={cert.id}
                className="group hover:shadow-xl transition-all duration-300 animate-fade-in-up border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <img src={cert.image} alt={cert.headline} className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
                      <h3 className="font-serif text-lg font-bold text-blue-800">{cert.headline}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {cert.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-blue-600 font-medium">
                      Verified Certificate
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => handleViewCertificate(cert, e)}
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Popup Dialog */}
      <Dialog open={certificateDialogOpen} onOpenChange={setCertificateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-serif">{selectedCertificate.headline}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="flex justify-center">
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.headline}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-muted-foreground">
                    {selectedCertificate.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Awards Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Awards & Honors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Distinguished awards recognizing excellence in innovation, leadership, 
              and significant contributions to the technology industry.
            </p>
          </div>
          <ElegantCarousel items={awardItems} autoPlay={true} autoPlayInterval={3000} />
        </div>
      </section>

      {/* Recognitions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Industry Recognitions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notable mentions, features, and recognitions from industry publications, 
              conferences, and professional organizations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                year: "2024",
                title: "Featured Speaker at Tech Summit 2024",
                organization: "Global Technology Conference",
                description: "Keynote presentation on 'Future of Cloud Computing and AI Integration'",
                hasImage: true,
                image: "/sonaliPatilherobg.jpg"
              },
              {
                year: "2023",
                title: "Top 40 Under 40 in Technology",
                organization: "Tech Leaders Magazine",
                description: "Recognized for innovative contributions to enterprise software solutions",
                hasImage: false
              },
              {
                year: "2023",
                title: "Best Paper Award",
                organization: "International Software Engineering Conference",
                description: "Research paper on scalable microservices architecture patterns",
                hasImage: true,
                image: "/sonaliPatilherobg.jpg"
              },
              {
                year: "2022",
                title: "Women in Tech Leadership Award",
                organization: "Technology Excellence Foundation",
                description: "Honored for mentoring and promoting diversity in technology leadership",
                hasImage: false
              }
            ].map((recognition, index) => (
              <Card
                key={index}
                className="animate-fade-in-up hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{recognition.year}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                        {recognition.title}
                      </h3>
                      <div className="text-primary font-medium mb-2 text-sm">
                        {recognition.organization}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                        {recognition.description}
                      </p>
                      {recognition.hasImage && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewRecognition(recognition)}
                          className="text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Image Popup Dialog */}
      <Dialog open={recognitionDialogOpen} onOpenChange={setRecognitionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedRecognition && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-serif">{selectedRecognition.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="flex justify-center">
                  <img
                    src={selectedRecognition.image}
                    alt={selectedRecognition.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                  />
                </div>
                <div className="mt-4 text-center">
                  <div className="text-primary font-medium mb-2">
                    {selectedRecognition.organization}
                  </div>
                  <p className="text-muted-foreground">
                    {selectedRecognition.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Recognition Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Recognition Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "15+", label: "Professional Certifications", description: "Industry-recognized credentials" },
              { number: "8+", label: "Awards Received", description: "Excellence and innovation honors" },
              { number: "20+", label: "Speaking Engagements", description: "Conference presentations" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{stat.label}</h3>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
