"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BookOpen, Video, FileText, Download, ExternalLink, Search, ChevronDown, Clock, Star } from "lucide-react"
import { useState } from "react"

const resources = [
  {
    id: 1,
    title: "Complete Guide to Digital Innovation",
    type: "Article",
    category: "Technology",
    description: "Comprehensive guide covering the fundamentals of digital transformation and innovation strategies.",
    duration: "15 min read",
    rating: 4.8,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Innovation", "Digital", "Strategy"],
  },
  {
    id: 2,
    title: "Leadership in the Modern Workplace",
    type: "Video Course",
    category: "Leadership",
    description: "Video series exploring effective leadership techniques for remote and hybrid work environments.",
    duration: "2.5 hours",
    rating: 4.9,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Leadership", "Management", "Remote Work"],
  },
  {
    id: 3,
    title: "Data Analytics Fundamentals",
    type: "PDF Guide",
    category: "Analytics",
    description: "Essential concepts and practical applications of data analytics for business decision making.",
    duration: "45 min read",
    rating: 4.7,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Data", "Analytics", "Business Intelligence"],
  },
  {
    id: 4,
    title: "Sustainable Technology Practices",
    type: "Webinar",
    category: "Sustainability",
    description: "Recording of live webinar discussing sustainable approaches to technology implementation.",
    duration: "1 hour",
    rating: 4.6,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Sustainability", "Green Tech", "Environment"],
  },
  {
    id: 5,
    title: "Educational Technology Toolkit",
    type: "Resource Kit",
    category: "Education",
    description: "Collection of tools, templates, and best practices for implementing educational technology.",
    duration: "Multiple resources",
    rating: 4.8,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["EdTech", "Teaching", "Learning"],
  },
  {
    id: 6,
    title: "Innovation Workshop Templates",
    type: "Templates",
    category: "Innovation",
    description: "Ready-to-use templates for conducting innovation workshops and brainstorming sessions.",
    duration: "Instant access",
    rating: 4.5,
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Workshop", "Templates", "Innovation"],
  },
]

const categories = ["All", "Technology", "Leadership", "Analytics", "Sustainability", "Education", "Innovation"]

const resourceTypes = [
  { type: "Article", icon: <FileText className="w-5 h-5" />, count: 12 },
  { type: "Video Course", icon: <Video className="w-5 h-5" />, count: 8 },
  { type: "PDF Guide", icon: <BookOpen className="w-5 h-5" />, count: 15 },
  { type: "Templates", icon: <Download className="w-5 h-5" />, count: 6 },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<string[]>(["featured"])

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Learning Resources</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Curated collection of educational materials, guides, courses, and tools designed to accelerate learning
              and professional development across various domains.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Types Overview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Resource Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceTypes.map((type, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-primary">{type.icon}</div>
                  <div className="font-serif text-3xl font-bold text-primary mb-2">{type.count}</div>
                  <h3 className="font-serif text-lg font-semibold">{type.type}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
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
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Collapsible open={expandedSections.includes("featured")} onOpenChange={() => toggleSection("featured")}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto mb-6">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Featured Resources</h2>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${
                    expandedSections.includes("featured") ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredResources.slice(0, 3).map((resource, index) => (
                  <Card
                    key={resource.id}
                    className="group hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="outline">{resource.type}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-current text-yellow-500" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{resource.description}</p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="w-4 h-4" />
                        <span>{resource.duration}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Access
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* All Resources */}
          <Collapsible open={expandedSections.includes("all")} onOpenChange={() => toggleSection("all")}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto mb-6">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">All Resources</h2>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${expandedSections.includes("all") ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource, index) => (
                  <Card
                    key={resource.id}
                    className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{resource.type}</Badge>
                            <Badge variant="secondary">{resource.category}</Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                              <Star className="w-4 h-4 fill-current text-yellow-500" />
                              <span>{resource.rating}</span>
                            </div>
                          </div>
                          <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                            {resource.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-2">
                        {resource.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Resource Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50+", label: "Resources Available", description: "Across multiple categories" },
              { number: "10,000+", label: "Downloads", description: "By professionals worldwide" },
              { number: "4.7", label: "Average Rating", description: "Based on user feedback" },
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
