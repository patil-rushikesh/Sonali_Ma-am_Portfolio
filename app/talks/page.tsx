import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Users, ExternalLink } from "lucide-react"
import Image from "next/image"

const talks = [
  {
    id: 1,
    title: "The Future of Digital Innovation",
    description: "Exploring emerging technologies and their impact on modern business practices and society.",
    venue: "Tech Conference 2024",
    date: "March 15, 2024",
    audience: "500+ attendees",
    category: "Technology",
    image: "/tech-conference-presentation.png",
    link: "#",
  },
  {
    id: 2,
    title: "Sustainable Development in the Digital Age",
    description: "How technology can drive environmental sustainability and create positive global impact.",
    venue: "Green Tech Summit",
    date: "February 8, 2024",
    audience: "300+ attendees",
    category: "Sustainability",
    image: "/sustainability-presentation.png",
    link: "#",
  },
  {
    id: 3,
    title: "Leadership in Remote Teams",
    description: "Strategies for effective leadership and team management in distributed work environments.",
    venue: "Leadership Forum",
    date: "January 22, 2024",
    audience: "200+ attendees",
    category: "Leadership",
    image: "/leadership-presentation.png",
    link: "#",
  },
  {
    id: 4,
    title: "Data-Driven Decision Making",
    description: "Leveraging analytics and insights to make informed strategic business decisions.",
    venue: "Business Analytics Conference",
    date: "December 10, 2023",
    audience: "400+ attendees",
    category: "Analytics",
    image: "/data-analytics-presentation.png",
    link: "#",
  },
  {
    id: 5,
    title: "Innovation in Education Technology",
    description: "Transforming learning experiences through cutting-edge educational technologies.",
    venue: "EdTech Symposium",
    date: "November 18, 2023",
    audience: "350+ attendees",
    category: "Education",
    image: "/education-technology-presentation.png",
    link: "#",
  },
  {
    id: 6,
    title: "Building Resilient Organizations",
    description: "Creating adaptive and resilient organizational structures for uncertain times.",
    venue: "Corporate Strategy Summit",
    date: "October 5, 2023",
    audience: "250+ attendees",
    category: "Strategy",
    image: "/business-strategy-presentation.png",
    link: "#",
  },
]

const categories = ["All", "Technology", "Leadership", "Education", "Analytics", "Sustainability", "Strategy"]

export default function TalksPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Talks Delivered</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              A collection of presentations, keynotes, and speaking engagements delivered across various conferences,
              summits, and professional gatherings worldwide.
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
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Talks Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {talks.map((talk, index) => (
              <Card
                key={talk.id}
                className="group hover:shadow-xl transition-all duration-300 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={talk.image || "/placeholder.svg"}
                    alt={talk.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {talk.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {talk.title}
                  </h3>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{talk.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{talk.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4" />
                      <span>{talk.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{talk.audience}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
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

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Speaking Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "25+", label: "Talks Delivered", description: "Across various conferences and events" },
              { number: "5,000+", label: "Total Audience", description: "Professionals reached worldwide" },
              { number: "15+", label: "Countries", description: "International speaking engagements" },
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
