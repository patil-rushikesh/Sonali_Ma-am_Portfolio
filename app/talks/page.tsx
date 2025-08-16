"use client";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Talk {
  _id: string;
  name: string;
  description: string;
  referenceLink: string;
  image: {
    url: string;
    publicId: string;
  };
  createdAt: string;
  updatedAt: string;
}

const categories = [
  "All",
  "Technology",
  "Leadership",
  "Education",
  "Analytics",
  "Sustainability",
  "Strategy",
];

export default function TalksPage() {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getTalks = async () => {
      try {
        const res = await axios("/api/talks");
        const data = res.data.data;
        if (Array.isArray(data)) {
          setTalks(data as Talk[]);
        } else if (Array.isArray(data.talks)) {
          setTalks(data.talks as Talk[]);
        } else {
          setTalks([]);
        }
      } catch (err) {
        setTalks([]);
        console.error("Failed to fetch talks:", err);
      }
    };
    getTalks();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Talks Delivered
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A collection of presentations, keynotes, and speaking engagements
            delivered across various conferences, summits, and professional
            gatherings worldwide.
          </p>
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
                key={talk._id}
                className="group hover:shadow-xl transition-all duration-300 animate-fade-in-up overflow-hidden cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  setSelectedTalk(talk);
                  setDialogOpen(true);
                }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={talk.image?.url || "/placeholder.svg"}
                    alt={talk.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {talk.name}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {talk.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(talk.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <a
                      href={talk.referenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Reference
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Talk Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedTalk && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTalk.name}</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col items-center gap-4 mt-2">
                    <Image
                      src={selectedTalk.image?.url || "/placeholder.svg"}
                      alt={selectedTalk.name}
                      width={320}
                      height={200}
                      className="rounded-lg object-cover border"
                    />
                    <div className="text-sm text-muted-foreground text-center">
                      {new Date(selectedTalk.createdAt).toLocaleString()}
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {selectedTalk.description}
                </p>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <a
                      href={selectedTalk.referenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Reference
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Speaking Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "25+",
                label: "Talks Delivered",
                description: "Across various conferences and events",
              },
              {
                number: "5,000+",
                label: "Total Audience",
                description: "Professionals reached worldwide",
              },
              {
                number: "15+",
                label: "Countries",
                description: "International speaking engagements",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
