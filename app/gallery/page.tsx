"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Fragment, useRef, useEffect, useState } from "react"
import Footer from "@/components/footer"

interface GalleryItem {
  _id: string;
  title: string;
  shortDescription: string;
  location: string;
  image: {
    url: string;
    publicId: string;
  };
  createdAt: string;
  updatedAt: string;
}

const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <span className="inline-block w-10 h-10 rounded-full border-4 border-black border-t-transparent animate-spin"></span>
  </div>
);

export default function GalleryPage() {
  

  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const response = await fetch("/api/gallery")
      const data = await response.json();
      console.log(data.data);
      setGallery(data.data)
    }

    fetchGalleryItems()
  }, [])

  useEffect(() => {
    let scroll: any
    import("locomotive-scroll").then((LocomotiveScroll) => {
      if (!scrollRef.current) return
      scroll = new LocomotiveScroll.default({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.08,
      })
    })
    return () => {
      if (scroll) scroll.destroy()
    }
  }, [])

  return (
    <div ref={scrollRef} data-scroll-container className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Gallery</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Visual showcase of professional achievements, speaking engagements, innovations, and memorable moments
              from conferences, workshops, and collaborative projects.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4">
        <div className="container mx-auto max-w-6xl">
          {!gallery.length ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item, index) => (
                <Card
                  key={item._id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image?.url || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      {/* Optionally add an overlay icon here */}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-background/90 text-foreground px-2 py-1 rounded text-xs font-medium shadow">
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                      {item.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for Image Card */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            ref={modalRef}
            className="bg-background rounded-3xl shadow-xl max-w-lg w-full p-6 relative animate-modal-fade-in"
            onClick={e => e.stopPropagation()}
          >
            {/* <button
              className="absolute top-3 right-3 text-4xl text-muted-foreground hover:text-foreground transition"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              &times;
            </button> */}
            <img
              src={selectedItem.image?.url || "/placeholder.svg"}
              alt={selectedItem.title}
              className="w-full h-80 object-cover rounded mb-4"
            />
            <div>
              <h3 className="font-serif text-2xl font-bold mb-2">{selectedItem.title}</h3>
              <span className="inline-block bg-muted px-2 py-1 rounded text-xs font-medium mb-2">{selectedItem.location}</span>
              <p className="text-muted-foreground mb-3">{selectedItem.shortDescription}</p>
              <div className="text-xs text-muted-foreground">
                Created: {new Date(selectedItem.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          {/* Animation styles */}
          <style jsx global>{`
            .animate-modal-fade-in {
              animation: modal-fade-in 0.3s cubic-bezier(0.4,0,0.2,1);
            }
            @keyframes modal-fade-in {
              0% { opacity: 0; transform: scale(0.95);}
              100% { opacity: 1; transform: scale(1);}
            }
          `}</style>
        </div>
      )}

      {/* Gallery Statistics */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Gallery Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50+", label: "Professional Photos", description: "Documenting key moments" },
              { number: "25+", label: "Events Covered", description: "Conferences and workshops" },
              { number: "10+", label: "Countries", description: "International engagements" },
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
      <Footer/>
    </div>
  )
}
