"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X, ZoomIn, Calendar, Tag } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const galleryItems = [
  {
    id: 1,
    title: "Innovation Summit Keynote",
    category: "Speaking",
    date: "2024-03-15",
    description: "Delivering keynote presentation on digital transformation at the Global Innovation Summit.",
    image: "/placeholder-r4c38.png",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    title: "Award Recognition Ceremony",
    category: "Achievement",
    date: "2024-02-20",
    description: "Receiving recognition for outstanding contribution to intellectual property development.",
    image: "/placeholder-w81p1.png",
    aspectRatio: "portrait",
  },
  {
    id: 3,
    title: "Workshop Facilitation",
    category: "Education",
    date: "2024-01-10",
    description: "Leading interactive workshop on innovation methodologies for corporate teams.",
    image: "/placeholder-x97yx.png",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    title: "Patent Documentation",
    category: "IPR",
    date: "2023-12-05",
    description: "Visual documentation of patented innovation in sustainable technology solutions.",
    image: "/placeholder-z8duy.png",
    aspectRatio: "portrait",
  },
  {
    id: 5,
    title: "Research Collaboration",
    category: "Research",
    date: "2023-11-18",
    description: "Collaborative research session with international team on emerging technologies.",
    image: "/placeholder-hz7su.png",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    title: "Publication Launch",
    category: "Publication",
    date: "2023-10-25",
    description: "Launch event for comprehensive guide on digital innovation strategies.",
    image: "/placeholder-lpgir.png",
    aspectRatio: "portrait",
  },
  {
    id: 7,
    title: "Technology Demonstration",
    category: "Innovation",
    date: "2023-09-12",
    description: "Live demonstration of breakthrough technology solution at industry expo.",
    image: "/professional-expo-demo.png",
    aspectRatio: "landscape",
  },
  {
    id: 8,
    title: "Mentorship Program",
    category: "Education",
    date: "2023-08-30",
    description: "Leading mentorship program for emerging professionals in technology sector.",
    image: "/placeholder-0wev4.png",
    aspectRatio: "portrait",
  },
  {
    id: 9,
    title: "International Conference",
    category: "Speaking",
    date: "2023-07-14",
    description: "Panel discussion on global trends in intellectual property and innovation.",
    image: "/international-conference-panel.png",
    aspectRatio: "landscape",
  },
]

const categories = ["All", "Speaking", "Achievement", "Education", "IPR", "Research", "Publication", "Innovation"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)

  const filteredItems = galleryItems.filter((item) => selectedCategory === "All" || item.category === selectedCategory)

  return (
    <div className="min-h-screen">
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

      {/* Category Filter */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card
                    className="group cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in-up break-inside-avoid"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={400}
                        height={item.aspectRatio === "portrait" ? 600 : 300}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/90 text-foreground">
                          {item.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl w-full p-0">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-grow">
                        <h2 className="font-serif text-2xl font-bold mb-2">{item.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            <span>{item.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  )
}
