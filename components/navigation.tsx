"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { XIcon, MenuIcon, ChevronDown } from "lucide-react"
// shadcn dropdown imports
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

// Define grouped navigation structure for dropdowns
const groupedNavigation = [
	{
		label: "About",
		items: [
			{ name: "About Me", href: "/about" },
			{ name: "Recognitions", href: "/recognitions" },
		],
	},
	{
		label: "Academic Contributions",
		items: [
			{ name: "Talks Delivered", href: "/talks" },
			{ name: "IPR", href: "/ipr" },
			{ name: "PhD Guide", href: "/PhdGuide" },
		],
	},
	{
		label: "Resources",
		items: [
			{ name: "Learning Resources", href: "/learning-resources" },
			{ name: "Gallery", href: "/gallery" },
			{ name: "Calendar", href: "/calendar" },
		],
	},
	{
		label: "Connect",
		items: [
			{ name: "Contact", href: "/contact" },
			{ name: "Live Chat", href: "/live-chat" },
		],
	},
]

export function Navigation() {
	const pathname = usePathname()
	const [mobileOpen, setMobileOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1036)
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

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

					{/* Desktop Navigation with shadcn Dropdowns */}
					{!isMobile && (
						<div className="flex items-center space-x-2">
							<Button
								asChild
								variant={pathname === "/" ? "default" : "ghost"}
								className={cn(
									"text-sm font-medium transition-all duration-300 hover-lift btn-premium animate-fade-in-down",
									pathname === "/"
										? "bg-primary text-primary-foreground shadow-lg"
										: "text-foreground/60 hover:text-foreground hover-glow",
								)}
							>
								<Link href="/">Home</Link>
							</Button>
							{groupedNavigation.map((group, idx) => (
								<DropdownMenu key={group.label}>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className={cn(
												"text-sm font-medium transition-all duration-300 hover-lift btn-premium animate-fade-in-down flex items-center gap-1",
												group.items.some((item) => pathname === item.href)
													? "bg-primary text-primary-foreground shadow-lg"
													: "text-foreground/60 hover:text-foreground hover-glow",
											)}
											style={{ animationDelay: `${(idx + 1) * 50}ms` }}
										>
											{group.label}
											<ChevronDown className="w-4 h-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start">
										{group.items.map((item) => (
											<DropdownMenuItem asChild key={item.href}>
												<Link
													href={item.href}
													className={cn(
														"w-full px-2 py-1.5 rounded text-sm transition-colors",
														pathname === item.href
															? "font-semibold text-primary"
															: "text-foreground",
													)}
												>
													{item.name}
												</Link>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							))}
						</div>
					)}

					{/* Mobile Navigation Button */}
					{isMobile && (
						<div className="flex items-center">
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
					)}
				</div>
			</div>
			{/* Mobile Navigation Drawer */}
			{isMobile && mobileOpen && (
				<>
					<div
						className={cn(
							"fixed inset-0 z-40 bg-background transition-opacity",
						)}
						aria-hidden={!mobileOpen}
						onClick={() => setMobileOpen(false)}
					/>
					<div
						className={cn(
							"fixed top-0 right-0 z-50 w-64 h-full bg-background shadow-lg transform transition-transform",
							mobileOpen ? "translate-x-0" : "translate-x-full",
						)}
						role="dialog"
						aria-modal="true"
						aria-label="Mobile navigation"
					>
						<div className="flex flex-col h-full">
							<div className="flex items-center justify-between px-4 py-4 border-b">
								<span className="font-serif text-xl font-bold text-foreground">
									Dr. Sonali Patil
								</span>
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

// Mobile navigation with grouped dropdowns as sections
function MobileNavigation({ onNavigate }: { onNavigate?: () => void }) {
	const pathname = usePathname()

	return (
		<nav className="flex flex-col space-y-4 p-4 bg-white rounded-lg">
			<Button
				asChild
				variant={pathname === "/" ? "default" : "ghost"}
				className={cn(
					"justify-start text-sm font-medium transition-all duration-300 hover-scale animate-fade-in-left",
					pathname === "/"
						? "bg-primary text-primary-foreground shadow-lg"
						: "text-foreground/60 hover:text-foreground hover-glow",
				)}
				onClick={onNavigate}
			>
				<Link href="/">Home</Link>
			</Button>
			{groupedNavigation.map((group, idx) => (
				<div key={group.label}>
					<div className="font-semibold text-primary mb-2">{group.label}</div>
					<div className="flex flex-col space-y-1 mb-2">
						{group.items.map((item) => (
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
								style={{ animationDelay: `${idx * 100}ms` }}
								onClick={onNavigate}
							>
								<Link href={item.href}>{item.name}</Link>
							</Button>
						))}
					</div>
				</div>
			))}
		</nav>
	)
}
