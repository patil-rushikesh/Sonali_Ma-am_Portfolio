"use client";
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";

// Loader component
const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <span className="inline-block w-10 h-10 rounded-full border-4 border-black border-t-transparent animate-spin"></span>
  </div>
);

interface LearningResource {
  _id: string;
  title: string;
  description: string;
  type: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export default function LearningResourcesPage() {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<LearningResource | null>(null);
  const [tab, setTab] = useState<"all" | "video" | "drive">("all");
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Locomotive Scroll effect (like ipr section)
  useEffect(() => {
    let scroll: any;
    import("locomotive-scroll").then((LocomotiveScroll) => {
      if (!scrollRef.current) return;
      scroll = new LocomotiveScroll.default({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.08,
      });
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/learning-resources");
      const data = await res.json();
      setResources(data.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Helper to render media preview
  function renderPreview(item: LearningResource) {
    if (item.type === "video" && item.link.includes("youtu")) {
      // YouTube video embed
      const videoId =
        item.link.split("v=")[1]?.split("&")[0] ||
        item.link.split("/").pop();
      return (
        <div className="mb-4 rounded overflow-hidden aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-60"
          />
        </div>
      );
    }
    if (item.link.includes("drive.google.com")) {
      // Google Drive preview
      let embedUrl = item.link;
      if (embedUrl.includes("/view")) {
        embedUrl = embedUrl.replace("/view", "/preview");
      } else if (!embedUrl.includes("/preview")) {
        embedUrl = embedUrl + "/preview";
      }
      return (
        <div className="mb-4 rounded overflow-hidden aspect-video">
          <iframe
            src={embedUrl}
            title={item.title}
            allow="autoplay"
            className="w-full h-60"
          />
        </div>
      );
    }
    return null;
  }

  // Modal logic: prevent background scroll and focus trap
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedItem(null);
        if (modalRef.current && selectedItem) {
          modalRef.current.focus();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      if (modalRef.current) modalRef.current.focus();
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedItem]);

  // Tab filter logic
  const filteredResources = resources.filter((item) => {
    if (tab === "all") return true;
    if (tab === "video") return item.type === "video" || item.link.includes("youtu");
    if (tab === "drive") return item.link.includes("drive.google.com");
    return true;
  });

  return (
    <div ref={scrollRef} data-scroll-container className="min-h-screen">
      <Navigation />
      <div className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-8">
            Learning Resources
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-center leading-relaxed">
            Curated talks, videos, articles, and more to help you learn and grow.
          </p>
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-primary/10"
              }`}
              onClick={() => setTab("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === "video"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-primary/10"
              }`}
              onClick={() => setTab("video")}
            >
              Video
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === "drive"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-primary/10"
              }`}
              onClick={() => setTab("drive")}
            >
              Drive
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center">
                    No learning resources found.
                  </CardContent>
                </Card>
              )}
              {filteredResources.map((item) => (
                <Card
                  key={item._id}
                  className="animate-fade-in-up hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium uppercase">
                        {item.type}
                      </span>
                    </div>
                    {renderPreview(item)}
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="text-xs text-muted-foreground mb-4">
                      Added: {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    {item.link && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full mt-auto bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors pointer-events-none"
                        tabIndex={-1}
                      >
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={-1}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Resource
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Modal for full description and preview */}
          {selectedItem && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <div
                ref={modalRef}
                className="bg-background rounded-3xl shadow-xl max-w-lg w-[90%] p-6 relative animate-modal-fade-in outline-none"
                onClick={e => e.stopPropagation()}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
                tabIndex={-1}
              >
                <button
                  className="absolute top-3 right-3 text-2xl text-muted-foreground hover:text-foreground transition"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                {renderPreview(selectedItem)}
                <h3 className="font-serif text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium uppercase mb-2">
                  {selectedItem.type}
                </span>
                <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
                <div className="text-xs text-muted-foreground mb-4">
                  Added: {new Date(selectedItem.createdAt).toLocaleDateString()}
                </div>
                {selectedItem.link && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-auto bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Resource
                    </a>
                  </Button>
                )}
              </div>
              <style jsx global>{`
                .animate-modal-fade-in {
                  animation: modal-fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes modal-fade-in {
                  from {
                    opacity: 0;
                    transform: scale(0.95);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
  