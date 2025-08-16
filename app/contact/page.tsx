"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Footer from "@/components/footer";

// Loader component
const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <span className="inline-block w-10 h-10 rounded-full border-4 border-black border-t-transparent animate-spin"></span>
  </div>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSuccess("Your message has been sent successfully!")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        const data = await res.json()
        setError(data.error || "Failed to send message. Please try again.")
      }
    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={scrollRef} data-scroll-container className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className=" px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Contact</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to collaborate, discuss opportunities, or share ideas? I'd love to hear from you. Reach out for
              speaking engagements, consulting, or any professional inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <Card className="shadow-lg">
                <CardHeader>
                  <h2 className="font-serif text-2xl font-bold mb-2">Send a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me more about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>

                    {success && (
                      <div className="text-green-600 text-sm">{success}</div>
                    )}
                    {error && (
                      <div className="text-red-600 text-sm">{error}</div>
                    )}

                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1" disabled={loading}>
                        <Send className="w-4 h-4 mr-2" />
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                          })
                        }
                        className="bg-transparent"
                        disabled={loading}
                      >
                        Clear
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <h3 className="font-serif text-xl font-semibold mb-2">Get in Touch</h3>
                    <p className="text-muted-foreground">Multiple ways to reach me for different types of inquiries.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">contact@portfolio.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">Pune, Maharashtra</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Embedded Google Map */}
                <div className="rounded-lg overflow-hidden shadow relative min-h-[300px]">
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/70 z-10">
                      <Loader />
                    </div>
                  )}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.273282914894!2d73.75906487507767!3d18.65172878246744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76c8fa205%3A0x1b210131915734fd!2sPCCOE%20-%20Pimpri%20Chinchwad%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1755375230996!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setLoading(false)}
                  ></iframe>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}