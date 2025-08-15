"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Talks Delivered", href: "/talks" },
  { name: "IPR", href: "/ipr" },
  { name: "Learning Resources", href: "/resources" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border glass-effect animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-serif text-xl font-bold text-foreground gradient-text group-hover:animate-shimmer transition-all duration-300">
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
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
          <div className="md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileNavigation() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-2 p-4 glass-effect rounded-lg">
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
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}
    </div>
  )
}
