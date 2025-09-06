"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CarouselItem {
  id: number
  image: string
  headline: string
  description?: string
}

interface ElegantCarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function ElegantCarousel({ items, autoPlay = false, autoPlayInterval = 5000 }: ElegantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, items.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1)
  }


  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious()
      }
      if (event.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  return (
    <>
      <div className="relative w-full max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-8">
        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0">
                <Card
                  className="group cursor-pointer border-border bg-card hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.headline}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                </Card>
                {/* Headline below image */}
                <div className="mt-3 sm:mt-4 text-center px-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-balance">
                    {item.headline}
                  </h2>
                  {item.description && (
                    <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2 text-pretty">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-1 sm:left-2 rounded-full top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 w-8 h-8 sm:w-10 sm:h-10"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-1 sm:right-2 rounded-full top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 w-8 h-8 sm:w-10 sm:h-10"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-1.5 sm:space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-primary scale-125" : "bg-muted hover:bg-accent"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
