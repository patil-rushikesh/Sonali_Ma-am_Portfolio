import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="animate-fade-in-up">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                <Image
                  src="/professional-headshot.png"
                  alt="Professional headshot"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Biography Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h1>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  Welcome to my professional journey. I am a passionate individual dedicated to sharing knowledge,
                  creating innovative solutions, and contributing to the advancement of technology and education.
                </p>
                <p>
                  With years of experience in delivering impactful talks, developing intellectual property, and curating
                  valuable learning resources, I strive to make complex concepts accessible and engaging for diverse
                  audiences.
                </p>
                <p>
                  My work spans across multiple domains, from technical presentations to educational content creation,
                  always with a focus on quality, clarity, and practical application.
                </p>
              </div>

              {/* Skills/Expertise Tags */}
              <div className="mt-8">
                <h3 className="font-serif text-xl font-semibold mb-4">Areas of Expertise</h3>
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
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Professional Journey</h2>
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
                className="animate-fade-in-up hover:shadow-md transition-shadow duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-32 flex-shrink-0">
                      <Badge variant="outline" className="text-sm font-medium">
                        {item.period}
                      </Badge>
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

      {/* Philosophy Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">My Philosophy</h2>
          <blockquote className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed max-w-3xl mx-auto">
            "Knowledge shared is knowledge multiplied. Every presentation, every resource created, and every innovation
            developed should serve to elevate others and contribute to collective growth."
          </blockquote>
          <div className="mt-8 w-16 h-0.5 bg-primary mx-auto"></div>
        </div>
      </section>
    </div>
  )
}
