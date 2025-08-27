"use client";
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setGuides, setLoading } from "@/store/phdGuideSlice";

// Loader component
const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <span className="inline-block w-10 h-10 rounded-full border-4 border-black border-t-transparent animate-spin"></span>
  </div>
);

interface PhdGuide {
  _id: string;
  supervisor: string;
  researchCenter: string;
  title: string;
  researchScholar: string;
  result: string;
  declaration: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export default function PhdGuidePage() {
  const dispatch = useDispatch();
  const guides = useSelector((state: RootState) => state.phdGuide.items);
  const loading = useSelector((state: RootState) => state.phdGuide.loading);
  const [selectedItem, setSelectedItem] = React.useState<PhdGuide | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      dispatch(setLoading(true));
      const res = await fetch("/api/phd-guide");
      const data = await res.json();
      dispatch(setGuides(data.data || []));
      dispatch(setLoading(false));
    };
    fetchData();
  }, [dispatch]);

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

  return (
    <div ref={scrollRef} data-scroll-container className="min-h-screen">
      {/* <Navigation /> */}
      <div className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-8">
            PhD Guide
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-center leading-relaxed">
            List of PhD guides, research scholars, and their research details.
          </p>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guides.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center">
                    No PhD guide records found.
                  </CardContent>
                </Card>
              )}
              {guides.map((item) => (
                <Card
                  key={item._id}
                  className="animate-fade-in-up hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium uppercase">
                        {item.researchCenter}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-2 line-clamp-2">
                      Supervisor: {item.supervisor}
                    </p>
                    <p className="text-muted-foreground mb-2 line-clamp-2">
                      Research Scholar: {item.researchScholar}
                    </p>
                    <div className="text-xs text-muted-foreground mb-2">
                      Result: {item.result}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Declaration: {item.declaration}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Added: {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Modal for full details */}
          {selectedItem && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <div
                ref={modalRef}
                className="bg-background rounded-3xl shadow-xl max-w-lg w-[90%] p-6 relative animate-modal-fade-in outline-none"
                onClick={(e) => e.stopPropagation()}
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
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {selectedItem.title}
                </h3>
                <div className="mb-2">
                  <span className="font-semibold">Supervisor:</span>{" "}
                  {selectedItem.supervisor}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Research Center:</span>{" "}
                  {selectedItem.researchCenter}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Research Scholar:</span>{" "}
                  {selectedItem.researchScholar}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Result:</span>{" "}
                  {selectedItem.result}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Declaration:</span>{" "}
                  {selectedItem.declaration}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  Added:{" "}
                  {new Date(selectedItem.createdAt).toLocaleDateString()}
                </div>
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
      <Footer />
    </div>
  );
}
