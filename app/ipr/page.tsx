"use client";
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Shield, Lightbulb, Award, Calendar, ExternalLink } from "lucide-react"

const iprPortfolio = [
  {
    id: 1,
    title: "Advanced Data Processing Algorithm",
    type: "Patent",
    status: "Granted",
    date: "2023-08-15",
    description: "Novel algorithm for efficient processing of large-scale datasets with improved performance metrics.",
    category: "Technology",
    patentNumber: "US11,234,567",
  },
  {
    id: 2,
    title: "Sustainable Energy Management System",
    type: "Patent Application",
    status: "Pending",
    date: "2023-12-10",
    description: "Innovative system for optimizing energy consumption in smart buildings and industrial facilities.",
    category: "Sustainability",
    patentNumber: "US17,890,123",
  },
  {
    id: 3,
    title: "Educational Content Framework",
    type: "Copyright",
    status: "Registered",
    date: "2023-06-20",
    description: "Comprehensive framework for creating and delivering interactive educational content.",
    category: "Education",
    patentNumber: "TX0009876543",
  },
  {
    id: 4,
    title: "Digital Innovation Methodology",
    type: "Trade Secret",
    status: "Protected",
    date: "2023-03-05",
    description: "Proprietary methodology for accelerating digital transformation in organizations.",
    category: "Business",
    patentNumber: "Confidential",
  },
]

const iprTypes = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Patents",
    description: "Exclusive rights to inventions and innovative solutions that provide competitive advantages.",
    count: "12+",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Trademarks",
    description: "Protected brand elements and distinctive signs that identify products and services.",
    count: "5+",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Trade Secrets",
    description: "Confidential business information that provides economic value through secrecy.",
    count: "8+",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Copyrights",
    description: "Protection for original works of authorship including written and creative content.",
    count: "15+",
  },
]

export default function IPRPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Intellectual Property Rights
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              A comprehensive portfolio of patents, trademarks, copyrights, and trade secrets representing years of
              innovation and creative development across multiple domains.
            </p>
          </div>
        </div>
      </section>

      {/* IPR Types Overview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">IPR Portfolio Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {iprTypes.map((type, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-primary">{type.icon}</div>
                  <div className="font-serif text-3xl font-bold text-primary mb-2">{type.count}</div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{type.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* IPR Portfolio */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Featured IP Assets</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {iprPortfolio.map((item, index) => (
              <Card
                key={item.id}
                className="hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="font-serif text-xl font-semibold mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <Badge
                          variant={
                            item.status === "Granted" ? "default" : item.status === "Pending" ? "secondary" : "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Filed: {new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>Reference: {item.patentNumber}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* IPR Importance Section */}
      <section className="py-16 px-4 bg-muted/30">
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

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">IPR Development Process</h2>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Innovation & Research",
                description: "Identify novel solutions and conduct thorough prior art research to ensure uniqueness.",
              },
              {
                step: "02",
                title: "Documentation & Filing",
                description: "Prepare comprehensive documentation and file applications with relevant IP offices.",
              },
              {
                step: "03",
                title: "Examination & Prosecution",
                description: "Navigate the examination process and respond to office actions to secure rights.",
              },
              {
                step: "04",
                title: "Protection & Enforcement",
                description: "Monitor for infringement and take appropriate action to protect IP assets.",
              },
            ].map((item, index) => (
              <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
