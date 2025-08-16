"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { XIcon, MenuIcon } from "lucide-react"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Talks Delivered", href: "/talks" },
  { name: "IPR", href: "/ipr" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border glass-effect animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-serif text-xl font-bold text-foreground gradient-text group-hover:animate-shimmer transition-all duration-300">
              Dr. Sonali Patil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "ghost" : "ghost"}
                asChild
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover-lift btn-premium animate-fade-in-down",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-foreground/60 hover:text-foreground hover-glow",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
              className="focus:outline-none"
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Drawer */}
      {/* Only render the overlay and drawer when mobileOpen is true */}
      {mobileOpen && (
        <>
          <div
            className={cn(
              "fixed inset-0 z-40 bg-background transition-opacity md:hidden"
            )}
            aria-hidden={!mobileOpen}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={cn(
              "fixed top-0 right-0 z-50 w-64 h-full bg-background shadow-lg transform transition-transform md:hidden",
              mobileOpen ? "translate-x-0" : "translate-x-full"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <span className="font-serif text-xl font-bold text-foreground">Dr. Sonali Patil</span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="focus:outline-none"
                >
                  <XIcon />
                </Button>
              </div>
              <MobileNavigation onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

function MobileNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-2 p-4 bg-white rounded-lg">
      {navigationItems.map((item, index) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "default" : "ghost"}
          asChild
          className={cn(
            "justify-start text-sm font-medium transition-all duration-300 hover-scale animate-fade-in-left",
            pathname === item.href
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-foreground/60 hover:text-foreground hover-glow",
          )}
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={onNavigate}
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}
    </nav>
  )
}
