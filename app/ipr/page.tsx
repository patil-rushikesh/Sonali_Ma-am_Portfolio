"use client";
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Shield, Lightbulb, Award, Calendar, ExternalLink } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Footer from '@/components/footer';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setPublicationData,
  setPatentData,
  setCopyrightData,
  setStartupData,
  setResearchGrantData,
  setLoading,
} from "@/store/iprSlice";

const iprTypes = [
	{
		icon: <FileText className="w-8 h-8" />,
		title: "Patents",
		description: "Exclusive rights to inventions and innovative solutions that provide competitive advantages.",
		count: "12+",
	},
	{
		icon: <Shield className="w-8 h-8" />,
		title: "Trademarks",
		description: "Protected brand elements and distinctive signs that identify products and services.",
		count: "5+",
	},
	{
		icon: <Lightbulb className="w-8 h-8" />,
		title: "Trade Secrets",
		description: "Confidential business information that provides economic value through secrecy.",
		count: "8+",
	},
	{
		icon: <Award className="w-8 h-8" />,
		title: "Copyrights",
		description: "Protection for original works of authorship including written and creative content.",
		count: "15+",
	},
]

const mainTabs = [
	{ label: "Publication", value: "publication" },
	{ label: "Patents", value: "patents" },
	{ label: "Copyrights", value: "copyrights" },
	{ label: "Startups", value: "startups" },
	{ label: "Research Grant", value: "research-grant" },
]

const publicationSubTabs = [
	{ label: "Journal", value: "journal" },
	{ label: "Book", value: "book" },
]

const patentsSubTabs = [
	{ label: "International", value: "international" },
	{ label: "National", value: "national" },
]


// Loader component
const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <span className="inline-block w-10 h-10 rounded-full border-4 border-black border-t-transparent animate-spin"></span>
  </div>
);

export default function IPRPage() {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [activeTab, setActiveTab] = useState("publication")
	const [activeSubTab, setActiveSubTab] = useState({
		publication: "journal",
		patents: "international",
	})

	const dispatch = useDispatch();
	const publicationData = useSelector((state: RootState) => state.ipr.publicationData);
	const patentData = useSelector((state: RootState) => state.ipr.patentData);
	const copyrightData = useSelector((state: RootState) => state.ipr.copyrightData);
	const startupData = useSelector((state: RootState) => state.ipr.startupData);
	const researchGrantData = useSelector((state: RootState) => state.ipr.researchGrantData);

	useEffect(() => {
		const getPublicationData = async () => {
			dispatch(setLoading(true));
			const response = await fetch("/api/publications")
			const data = await response.json()
			dispatch(setPublicationData(
				(data.data || []).map((pub: any) => ({
					...pub,
					type: pub.type || "journal",
				}))
			));
			dispatch(setLoading(false));
		}
		getPublicationData()
	}, [dispatch])

	useEffect(() => {
		const getPatentsData = async () => {
			dispatch(setLoading(true));
			const response = await fetch("/api/patents")
			const data = await response.json()
			dispatch(setPatentData(
				(data.data || []).map((pat: any) => ({
					...pat,
					type: pat.type === "International" ? "International" : "National"
				}))
			));
			dispatch(setLoading(false));
		}
		getPatentsData()
	}, [dispatch])

	useEffect(() => {
		const getTradeSecretsData = async () => {
			dispatch(setLoading(true));
			const response = await fetch("/api/startup")
			const data = await response.json()
			dispatch(setStartupData(data.data || []));
			dispatch(setLoading(false));
		}
		getTradeSecretsData()
	}, [dispatch])

	useEffect(() => {
		const getCopyrightsData = async () => {
			dispatch(setLoading(true));
			const response = await fetch("/api/copyrights")
			const data = await response.json()
			dispatch(setCopyrightData(data.data || []));
			dispatch(setLoading(false));
		}
		getCopyrightsData();
	}, [dispatch])

	useEffect(() => {
		const ResearchGrants = async () => {
			dispatch(setLoading(true));
			const response = await fetch("/api/research-grants")
			const data = await response.json()
			dispatch(setResearchGrantData(data.data || []));
			dispatch(setLoading(false));
		}
		ResearchGrants();
	}, [dispatch])

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

	// Helper to render sub-tabs
	function renderSubTabs() {
		if (activeTab === "publication") {
			return (
				<div className="flex gap-2 mb-6 justify-center">
					{publicationSubTabs.map((tab) => (
						<Button
							key={tab.value}
							variant={activeSubTab.publication === tab.value ? "default" : "outline"}
							className="rounded-full"
							onClick={() => setActiveSubTab((prev) => ({ ...prev, publication: tab.value }))}
						>
							{tab.label}
						</Button>
					))}
				</div>
			)
		}
		if (activeTab === "patents") {
			return (
				<div className="flex gap-2 mb-6 justify-center">
					{patentsSubTabs.map((tab) => (
						<Button
							key={tab.value}
							variant={activeSubTab.patents === tab.value ? "default" : "outline"}
							className="rounded-full"
							onClick={() => setActiveSubTab((prev) => ({ ...prev, patents: tab.value }))}
						>
							{tab.label}
						</Button>
					))}
				</div>
			)
		}
		return null
	}

	// Helper to render content for each tab/sub-tab
	function renderTabContent() {
		if (activeTab === "publication") {
			if (!publicationData.length) {
				return (
					<Card className="mb-4">
						<CardContent className="p-6 text-center">
							No Publication data found.
						</CardContent>
					</Card>
				);
			}
			const filtered = publicationData.filter(
				(pub) => pub.type === activeSubTab.publication
			);
			if (activeSubTab.publication === "journal" || activeSubTab.publication === "book") {
				return (
					<div>
						{filtered.length === 0 && (
							<Card className="mb-4">
								<CardContent className="p-6 text-center">
									No {activeSubTab.publication === "journal" ? "Journal" : "Book"} Publications found.
								</CardContent>
							</Card>
						)}
						{filtered.map((pub) => (
							<Card key={pub._id} className="mb-4">
								<CardContent className="p-6">
									<h3 className="font-serif text-xl font-semibold mb-2">{pub.name}</h3>
									<p className="text-muted-foreground mb-2">{pub.description}</p>
									<div className="text-xs text-muted-foreground mb-2">
										Published: {new Date(pub.createdAt).toLocaleDateString()}
									</div>
									{pub.link && (
										<a
											href={pub.link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary underline text-sm"
										>
											View Publication
										</a>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				)
			}
		}
		if (activeTab === "patents") {
			if (!patentData.length) {
				return (
					<Card className="mb-4">
						<CardContent className="p-6 text-center">
							No Patent data found.
						</CardContent>
					</Card>
				);
			}
			const filtered = patentData.filter(
				(pat) =>
					(activeSubTab.patents === "international" && pat.type === "International") ||
					(activeSubTab.patents === "national" && pat.type === "National")
			)
			return (
				<div>
					{filtered.length === 0 && (
						<Card className="mb-4">
							<CardContent className="p-6 text-center">
								No {activeSubTab.patents === "international" ? "International" : "National"} Patents found.
							</CardContent>
						</Card>
					)}
					{filtered.map((pat) => (
						<Card key={pat._id} className="mb-4">
							<CardContent className="p-6">
								<h3 className="font-serif text-xl font-semibold mb-2">{pat.title}</h3>
								<div className="flex flex-wrap gap-2 mb-2">
									<Badge variant="outline">{pat.type}</Badge>
									<Badge variant={pat.status === "Granted" ? "default" : "outline"}>{pat.status}</Badge>
								</div>
								<div className="text-xs text-muted-foreground mb-2">
									Filed: {new Date(pat.date).toLocaleDateString()}
								</div>
								<div className="text-xs text-muted-foreground mb-2">
									Patent Number: {pat.number}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)
		}
		if (activeTab === "copyrights") {
			if (!copyrightData.length) {
				return (
					<Card className="mb-4">
						<CardContent className="p-6 text-center">
							No Copyright data found.
						</CardContent>
					</Card>
				);
			}
			return (
				<div>
					{copyrightData.length === 0 && (
						<Card className="mb-4">
							<CardContent className="p-6 text-center">
								No Copyrights found.
							</CardContent>
						</Card>
					)}
					{copyrightData.map((cr) => (
						<Card key={cr._id} className="mb-4">
							<CardContent className="p-6">
								<h3 className="font-serif text-xl font-semibold mb-2">{cr.title}</h3>
								<div className="flex flex-wrap gap-2 mb-2">
									<Badge variant="outline">{cr.copyrightRegOf}</Badge>
									<Badge variant={cr.status === "Granted" ? "default" : "outline"}>{cr.status}</Badge>
								</div>
								<div className="text-xs text-muted-foreground mb-2">
									Diary Number: {cr.diaryNumber}
								</div>
								<div className="text-xs text-muted-foreground mb-2">
									Registered: {new Date(cr.createdAt).toLocaleDateString()}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)
		}
		if (activeTab === "startups") {
			if (!startupData.length) {
				return (
					<Card className="mb-4">
						<CardContent className="p-6 text-center">
							No Startup data found.
						</CardContent>
					</Card>
				);
			}
			return (
				<div>
					{startupData.length === 0 && (
						<Card className="mb-4">
							<CardContent className="p-6 text-center">
								No Startups found.
							</CardContent>
						</Card>
					)}
					{startupData.map((startup) => (
						<div key={startup._id} className="mb-4">
							<Card className="flex flex-col md:flex-row items-center gap-6 p-4">
								{startup.image?.url && (
									<div className="w-full md:w-48 flex-shrink-0">
										<img
											src={startup.image.url}
											alt={startup.name}
											className="rounded-lg object-cover "
										/>
									</div>
								)}
								<CardContent className="flex-1 p-0">
									<h3 className="font-serif text-xl font-semibold mb-2">{startup.name}</h3>
									<p className="text-muted-foreground mb-2">{startup.description}</p>
									{startup.status && (
										<div className="mb-2">
											<Badge variant="outline">{startup.status}</Badge>
										</div>
									)}
									<div className="text-xs text-muted-foreground mb-2">
										Created: {new Date(startup.createdAt).toLocaleDateString()}
									</div>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			)
		}
		if (activeTab === "research-grant") {
			if (!researchGrantData.length) {
				return (
					<Card className="mb-4">
						<CardContent className="p-6 text-center">
							No Research Grant data found.
						</CardContent>
					</Card>
				);
			}
			return (
				<div>
					{researchGrantData.length === 0 && (
						<Card className="mb-4">
							<CardContent className="p-6 text-center">
								No Research Grants found.
							</CardContent>
						</Card>
					)}
					{researchGrantData.map((grant) => (
						<Card key={grant._id} className="mb-4">
							<CardContent className="p-6">
								<h3 className="font-serif text-xl font-semibold mb-2">{grant.title}</h3>
								<div className="flex flex-wrap gap-2 mb-2">
									<Badge variant="outline">{grant.grantAgency}</Badge>
									<Badge variant="outline">{grant.currency} {grant.fundReceived.toLocaleString()}</Badge>
								</div>
								<div className="text-xs text-muted-foreground mb-2">
									Duration: {grant.startYear} - {grant.endYear}
								</div>
								<div className="text-xs text-muted-foreground mb-2">
									Granted: {new Date(grant.createdAt).toLocaleDateString()}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)
		}
		return null
	}

	return (
		<div ref={scrollRef} data-scroll-container className="min-h-screen">
			{/* <Navigation /> */}

			{/* Hero Section */}
			<section className="py-16 px-4">
				<div className="container mx-auto max-w-6xl text-center">
					<div className="animate-fade-in-up">
						<h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
							Intellectual Property Rights
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
							A comprehensive portfolio of patents, trademarks, copyrights, and trade secrets representing years of
							innovation and creative development across multiple domains.
						</p>
					</div>
				</div>
			</section>

			{/* Tabs Section */}
			<section className="py-8 px-4">
				<div className="container mx-auto max-w-6xl">
					<div className="flex flex-wrap gap-2 justify-center mb-4">
						{mainTabs.map((tab) => (
							<Button
								key={tab.value}
								variant={activeTab === tab.value ? "default" : "outline"}
								className="rounded-full"
								onClick={() => setActiveTab(tab.value)}
							>
								{tab.label}
							</Button>
						))}
					</div>
					{renderSubTabs()}
					{renderTabContent()}
				</div>
			</section>

			{/* IPR Types Overview */}
			<section className="py-16 px-4 bg-muted/30">
				<div className="container mx-auto max-w-6xl">
					<h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">IPR Portfolio Overview</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{iprTypes.map((type, index) => (
							<Card
								key={index}
								className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<CardContent className="p-6">
									<div className="flex justify-center mb-4 text-primary">{type.icon}</div>
									<div className="font-serif text-3xl font-bold text-primary mb-2">{type.count}</div>
									<h3 className="font-serif text-xl font-semibold mb-3">{type.title}</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* IPR Portfolio */}
			{/* <section className="py-16 px-4">
				<div className="container mx-auto max-w-6xl">
					<h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Featured IP Assets</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{iprPortfolio.map((item, index) => (
							<Card
								key={item.id}
								className="hover:shadow-xl transition-all duration-300 animate-fade-in-up"
								style={{ animationDelay: `${index * 150}ms` }}
							>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-grow">
											<h3 className="font-serif text-xl font-semibold mb-2 line-clamp-2">{item.title}</h3>
											<div className="flex flex-wrap gap-2 mb-2">
												<Badge variant="outline">{item.type}</Badge>
												<Badge
													variant={
														item.status === "Granted" ? "default" : item.status === "Pending" ? "secondary" : "outline"
													}
												>
													{item.status}
												</Badge>
												<Badge variant="outline">{item.category}</Badge>
											</div>
										</div>
									</div>
								</CardHeader>

								<CardContent className="pt-0">
									<p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

									<div className="space-y-2 mb-4">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Calendar className="w-4 h-4" />
											<span>Filed: {new Date(item.date).toLocaleDateString()}</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<FileText className="w-4 h-4" />
											<span>Reference: {item.patentNumber}</span>
										</div>
									</div>

									<Button
										variant="outline"
										className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
									>
										<ExternalLink className="w-4 h-4 mr-2" />
										View Details
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section> */}


			<Footer/>
		</div>
	)
}
