"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Grid,
  Layers,
  Globe,
  Lock,
  ArrowUpRight,
} from "lucide-react";

// =========================================================================
// 1. LIVE CLIENT WEBSITES DATA
// =========================================================================
export interface LiveWebsite {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  displayUrl: string;
  role: string;
  badge: string;
  badgeColor: string;
  description: string;
  logo: string;
  tags: string[];
}

const LIVE_WEBSITES: LiveWebsite[] = [
  {
    id: "tida-sports",
    name: "TIDA Sports",
    subtitle: "India's one of the Biggest Sports Academies",
    url: "http://tidasports.com/",
    displayUrl: "tidasports.com",
    role: "Lead UI/UX Designer & SEO Executive",
    badge: "FULL TIME ROLE",
    badgeColor: "text-purple-700 bg-purple-50 border-purple-200",
    description:
      "Engineered the responsive official website & app UI architecture. Designed the fitness testing modules, authored SEO blogs, and created & scaled 30+ GMB academy locations.",
    logo: "/clients/tida-sports.png",
    tags: ["App UI/UX", "Web Platform", "Fitness Tests Module", "30+ GMBs Handled", "SEO Strategy"],
  },
  {
    id: "turfsquad",
    name: "Turfsquad Arena",
    subtitle: "Punjab's one of the Biggest Sports Arena",
    url: "https://turfsquad.in/",
    displayUrl: "turfsquad.in",
    role: "Web & SEO Consultant",
    badge: "FREELANCE CLIENT",
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    description:
      "Restructured and rewrote entire website content for peak engagement. Executed On-Page & Off-Page SEO, sports blogs, and created 2 GMB profiles for local sports bookings.",
    logo: "/clients/turfsquad.png",
    tags: ["Content Restructuring", "SEO & Sports Blogs", "2 GMBs Handled", "Booking UX"],
  },
  {
    id: "the-social-court",
    name: "The Social Court",
    subtitle: "Digital Hospitality & Sports Lounge",
    url: "https://www.thesocialcourt.online/",
    displayUrl: "thesocialcourt.online",
    role: "Web & SEO Consultant",
    badge: "FREELANCE CLIENT",
    badgeColor: "text-amber-800 bg-amber-50 border-amber-200",
    description:
      "Revamped website architecture and brand content narrative. Executed On-Page and Off-Page SEO while creating & handling 3 GMB profiles for local discovery.",
    logo: "/clients/the-social-court.png",
    tags: ["Hospitality Web", "Content Strategy", "3 GMB Profiles", "Local SEO"],
  },
  {
    id: "anees-school",
    name: "Anee's School",
    subtitle: "Group of Schools in Kharar and Mohali",
    url: "https://aneesschool.com/",
    displayUrl: "aneesschool.com",
    role: "UI/UX Designer & Web Lead (with TIDA)",
    badge: "WITH TIDA SPORTS",
    badgeColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    description:
      "Designed the UI of the official website, refined and structured academic content, and executed full On-Page and Off-Page SEO to maximize local admissions.",
    logo: "/clients/anees-school.png",
    tags: ["Website UI Design", "Content Refinement", "On/Off-Page SEO", "Admission Funnel"],
  },
  {
    id: "quantifiers",
    name: "Quantifiers CAT Academy",
    subtitle: "Chandigarh's Top CAT / MBA Exams Coaching",
    url: "https://quantifiers.in/",
    displayUrl: "quantifiers.in",
    role: "Web & SEO Consultant",
    badge: "FREELANCE CLIENT",
    badgeColor: "text-blue-700 bg-blue-50 border-blue-200",
    description:
      "Restructured and rewrote website content tailored for competitive exam aspirants. Spearheaded On-Page & Off-Page SEO and published ranking MBA preparation blogs.",
    logo: "/clients/quantifiers.png",
    tags: ["Content Strategy", "CAT / MBA Prep", "SEO Blogs", "Conversion Funnel"],
  },
];

// =========================================================================
// 2. CREATIVE PROJECT GALLERY (23 COMPRESSED DESIGNS)
// =========================================================================
export interface ShowcaseProject {
  id: string;
  filename: string;
  src: string;
  title: string;
  category: "Web & SaaS" | "Mobile UI/UX" | "E-Commerce" | "Brand & System" | "Interaction Design";
  tag: string;
  description: string;
}

const ALL_PROJECTS: ShowcaseProject[] = [
  {
    id: "ai-hero",
    filename: "AI Hero Section-200kb.jpg",
    src: encodeURI("/Compressed Images/AI Hero Section-200kb.jpg"),
    title: "AI SaaS Autonomous Platform",
    category: "Web & SaaS",
    tag: "Hero Architecture",
    description: "Futuristic dark-mode landing interface with dynamic 3D elements and conversion-focused typography.",
  },
  {
    id: "adventure-login",
    filename: "Advanture Login Page-200kb.jpg",
    src: encodeURI("/Compressed Images/Advanture Login Page-200kb.jpg"),
    title: "Adventure Quest Auth Portal",
    category: "Interaction Design",
    tag: "Gamified Auth",
    description: "Immersive illustration-driven onboarding screen with ambient lighting and floating input fields.",
  },
  {
    id: "app-mockups-1",
    filename: "App Mockups 1-200kb.jpeg",
    src: encodeURI("/Compressed Images/App Mockups 1-200kb.jpeg"),
    title: "Fintech & Wealth Mobile App",
    category: "Mobile UI/UX",
    tag: "iOS & Android",
    description: "Modern financial management application featuring biometric security, spending metrics, and card management.",
  },
  {
    id: "car-company",
    filename: "Car Company-200kb.jpg",
    src: encodeURI("/Compressed Images/Car Company-200kb.jpg"),
    title: "Next-Gen Electric Vehicle Hub",
    category: "Web & SaaS",
    tag: "Automotive Web",
    description: "Luxury automotive showcase platform with 360-degree digital showroom and interactive spec comparisons.",
  },
  {
    id: "contact-form",
    filename: "Contact Form-200kb.jpg",
    src: encodeURI("/Compressed Images/Contact Form-200kb.jpg"),
    title: "Glassmorphic Contact Experience",
    category: "Interaction Design",
    tag: "Micro-Interactions",
    description: "Tactile glassmorphic contact form featuring validation micro-states, floating labels, and dynamic glow cues.",
  },
  {
    id: "flights-v2",
    filename: "Flights v2-200kb.jpg",
    src: encodeURI("/Compressed Images/Flights v2-200kb.jpg"),
    title: "Aero Flight Booking Platform",
    category: "Web & SaaS",
    tag: "Travel Tech",
    description: "Streamlined airline reservation booking portal with real-time seat selection and interactive route itineraries.",
  },
  {
    id: "food-delivery-2",
    filename: "Food Delivery App By Aryan Nair 2-200kb.jpg",
    src: encodeURI("/Compressed Images/Food Delivery App By Aryan Nair 2-200kb.jpg"),
    title: "Gourmet Food Delivery Ecosystem",
    category: "Mobile UI/UX",
    tag: "Mobile Commerce",
    description: "End-to-end on-demand culinary mobile experience with live GPS courier tracking and customized order flows.",
  },
  {
    id: "music-website",
    filename: "Music Website Post-200kb.jpg",
    src: encodeURI("/Compressed Images/Music Website Post-200kb.jpg"),
    title: "SoundWave Dynamic Audio Stream",
    category: "Web & SaaS",
    tag: "Media & Streaming",
    description: "High-energy music streaming interface with personalized audio waveforms, artist hubs, and dark aesthetics.",
  },
  {
    id: "plant-shop",
    filename: "Plant Shop Post-200kb.jpg",
    src: encodeURI("/Compressed Images/Plant Shop Post-200kb.jpg"),
    title: "Flora Botanical E-Commerce",
    category: "E-Commerce",
    tag: "Storefront UX",
    description: "Serene botanical e-commerce design with organic color schemes, plant care guides, and seamless checkout.",
  },
  {
    id: "sales-dashboard",
    filename: "Sales dashboard-200kb.jpg",
    src: encodeURI("/Compressed Images/Sales dashboard-200kb.jpg"),
    title: "Enterprise Revenue Analytics",
    category: "Web & SaaS",
    tag: "Data Visualization",
    description: "Executive sales analytics dashboard packed with predictive charts, conversion funnels, and real-time revenue KPIs.",
  },
  {
    id: "group-16",
    filename: "Group 16-200kb.jpg",
    src: encodeURI("/Compressed Images/Group 16-200kb.jpg"),
    title: "Creative Digital Studio Showcase",
    category: "Brand & System",
    tag: "Agency Portfolio",
    description: "Bold editorial digital agency layout with asymmetric grid compositions and strong typographic hierarchy.",
  },
  {
    id: "brand-identity-1",
    filename: "1-200kb.jpg",
    src: encodeURI("/Compressed Images/1-200kb.jpg"),
    title: "Modern Visual Identity System",
    category: "Brand & System",
    tag: "Brand Architecture",
    description: "Comprehensive brand identity system outlining logo geometry, color harmony, and digital touchpoints.",
  },
  {
    id: "app-mockups-2",
    filename: "App Mockups 2-200kb.jpeg",
    src: encodeURI("/Compressed Images/App Mockups 2-200kb.jpeg"),
    title: "Crypto & Trading Wallet Interface",
    category: "Mobile UI/UX",
    tag: "DeFi App",
    description: "Next-gen cryptocurrency trading mobile app featuring live candlestick charts and one-tap crypto swaps.",
  },
  {
    id: "app-mockups-3",
    filename: "App Mockups 3-200kb.jpeg",
    src: encodeURI("/Compressed Images/App Mockups 3-200kb.jpeg"),
    title: "Neomorphic Mobile Design Kit",
    category: "Mobile UI/UX",
    tag: "Component System",
    description: "Soft tactile neomorphic UI library tailored for smart home devices and IoT mobile control panels.",
  },
  {
    id: "food-delivery-3",
    filename: "Food Delivery App By Aryan Nair 3-200kb.jpg",
    src: encodeURI("/Compressed Images/Food Delivery App By Aryan Nair 3-200kb.jpg"),
    title: "Courier Logistics & Order Dispatch",
    category: "Mobile UI/UX",
    tag: "Logistics Flow",
    description: "Driver logistics interface for optimized delivery routes, real-time earnings tracker, and order batching.",
  },
  {
    id: "home-login",
    filename: "Home Company Login Page Post-200kb.jpg",
    src: encodeURI("/Compressed Images/Home Company Login Page Post-200kb.jpg"),
    title: "Smart Living Enterprise Portal",
    category: "Web & SaaS",
    tag: "Enterprise Portal",
    description: "Minimalist corporate tenant authentication portal with multi-factor biometric authentication support.",
  },
  {
    id: "travel-login",
    filename: "Travel Login Page post-200kb.jpg",
    src: encodeURI("/Compressed Images/Travel Login Page post-200kb.jpg"),
    title: "Wanderlust Travel Authentication",
    category: "Interaction Design",
    tag: "Travel Tech",
    description: "Vibrant travel lifestyle login screen showcasing breathtaking destination photography and social auth.",
  },
  {
    id: "final-masterpiece",
    filename: "Final-200kb.jpg",
    src: encodeURI("/Compressed Images/Final-200kb.jpg"),
    title: "Digital Experience Flagship",
    category: "Brand & System",
    tag: "Design System",
    description: "Comprehensive visual flagship composition exhibiting responsive grid scalability across screen sizes.",
  },
  {
    id: "group-3-1",
    filename: "Group 3 1-200kb.jpg",
    src: encodeURI("/Compressed Images/Group 3 1-200kb.jpg"),
    title: "Cloud Marketing & SaaS Landing",
    category: "Web & SaaS",
    tag: "Conversion Page",
    description: "High-converting cloud enterprise marketing website with interactive feature callouts and social proof.",
  },
  {
    id: "group-4-2",
    filename: "Group 4 2-200kb.jpg",
    src: encodeURI("/Compressed Images/Group 4 2-200kb.jpg"),
    title: "Apparel Lifestyle Mobile Store",
    category: "E-Commerce",
    tag: "Mobile Fashion",
    description: "Fashion-forward e-commerce mobile shopping experience with swipeable lookbooks and express checkout.",
  },
  {
    id: "rectangle-2",
    filename: "Rectangle 2-200kb.jpg",
    src: encodeURI("/Compressed Images/Rectangle 2-200kb.jpg"),
    title: "Editorial Magazine & Typography",
    category: "Brand & System",
    tag: "Editorial UX",
    description: "High-fashion digital magazine layout focusing on dramatic font pairings, whitespace, and micro-grid rhythm.",
  },
  {
    id: "minimalist-landing",
    filename: "2-200kb.jpg",
    src: encodeURI("/Compressed Images/2-200kb.jpg"),
    title: "Architectural Portfolio Experience",
    category: "Web & SaaS",
    tag: "Minimalist Web",
    description: "Monochrome architectural firm portfolio celebrating structural geometry and high-contrast photography.",
  },
  {
    id: "futuristic-landing",
    filename: "4-200kb.jpg",
    src: encodeURI("/Compressed Images/4-200kb.jpg"),
    title: "Next-Gen 3D Interactive Web",
    category: "Interaction Design",
    tag: "Interactive 3D",
    description: "Spatial computing concept page with floating dimensional widgets and immersive scroll animations.",
  },
];

const ROW_1_PROJECTS = ALL_PROJECTS.slice(0, 12);
const ROW_2_PROJECTS = ALL_PROJECTS.slice(12);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const categories = [
    "ALL",
    "Web & SaaS",
    "Mobile UI/UX",
    "E-Commerce",
    "Brand & System",
    "Interaction Design",
  ];

  const filteredAll =
    activeFilter === "ALL"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeFilter);

  const row1Filtered =
    activeFilter === "ALL"
      ? ROW_1_PROJECTS
      : ROW_1_PROJECTS.filter((p) => p.category === activeFilter);

  const row2Filtered =
    activeFilter === "ALL"
      ? ROW_2_PROJECTS
      : ROW_2_PROJECTS.filter((p) => p.category === activeFilter);

  const row1Items =
    row1Filtered.length > 0
      ? [...row1Filtered, ...row1Filtered, ...row1Filtered]
      : [];
  const row2Items =
    row2Filtered.length > 0
      ? [...row2Filtered, ...row2Filtered, ...row2Filtered]
      : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (e.key === "ArrowRight") {
        navigateModal(1);
      } else if (e.key === "ArrowLeft") {
        navigateModal(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const navigateModal = (direction: number) => {
    if (!selectedProject) return;
    const currentIndex = ALL_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + ALL_PROJECTS.length) % ALL_PROJECTS.length;
    setSelectedProject(ALL_PROJECTS[nextIndex]);
  };

  return (
    <section id="projects" className="relative w-full py-20 sm:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* SECTION 1: LIVE WORK WEBSITES (PLACED DIRECTLY ON TOP OF GALLERY) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div data-aos="fade-up" className="flex flex-col mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
              <Globe className="w-3.5 h-3.5 text-[#6d28d9]" />
              // 04 · LIVE CLIENT WEBSITES
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
                <span className="block">
                  <span className="font-syne font-black text-slate-950">PRODUCTION</span>{" "}
                  <span className="font-playfair italic font-bold text-[#6d28d9]">WEBSITES</span>{" "}
                  <span className="font-courier font-bold tracking-[0.08em] text-slate-800">&amp;</span>
                </span>
                <span className="block mt-0.5 sm:mt-1 font-space-grotesk font-black text-[#6d28d9] tracking-tight">
                  LIVE DEPLOYMENTS.
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-3" />
            </div>

            <p className="max-w-md text-xs sm:text-sm text-slate-500 font-['Raleway']">
              Commercial live client websites engineered with high-impact UI/UX architecture, technical On/Off-Page SEO, and seamless user experiences.
            </p>
          </div>
        </div>

        {/* Live Websites Grid: 2 Featured Top Cards + 3 Bottom Cards */}
        <div className="space-y-6 sm:space-y-7">
          {/* Top Row: 2 Major Flagship Platforms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {LIVE_WEBSITES.slice(0, 2).map((site, idx) => (
              <LiveWebsiteCard key={site.id} site={site} isLarge={true} delay={idx * 80} />
            ))}
          </div>

          {/* Bottom Row: 3 Responsive Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {LIVE_WEBSITES.slice(2).map((site, idx) => (
              <LiveWebsiteCard key={site.id} site={site} isLarge={false} delay={(idx + 2) * 80} />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: CREATIVE DESIGN VAULT (2-ROW MOVING CAROUSEL GALLERY) */}
      {/* ========================================================================= */}
      <div className="relative w-full">
        {/* Gallery Sub-Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div data-aos="fade-up" className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-[#6d28d9]" />
                // 05 · CREATIVE DESIGN VAULT
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
                  <span className="block">
                    <span className="font-syne font-black text-slate-950">FEATURED</span>{" "}
                    <span className="font-playfair italic font-bold text-[#6d28d9]">PROJECTS</span>{" "}
                    <span className="font-courier font-bold tracking-[0.08em] text-slate-800">&amp;</span>
                  </span>
                  <span className="block mt-0.5 sm:mt-1 font-space-grotesk font-black text-[#6d28d9] tracking-tight">
                    DESIGN SHOWCASE.
                  </span>
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-2.5" />
              </div>

              {/* Interactive Control Deck */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Play / Pause Toggle Button */}
                {viewMode === "carousel" && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:text-[#6d28d9] transition-all shadow-xs"
                    title={isPlaying ? "Pause Carousel Animation" : "Resume Carousel Animation"}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#6d28d9]" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                )}

                {/* View Switcher: 2-Row Carousel vs Full Grid */}
                <div className="flex items-center p-1 bg-slate-100 rounded-full border border-slate-200">
                  <button
                    onClick={() => setViewMode("carousel")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      viewMode === "carousel"
                        ? "bg-[#6d28d9] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>2-Row Carousel</span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      viewMode === "grid"
                        ? "bg-[#6d28d9] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Grid ({ALL_PROJECTS.length})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-6 font-mono">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-[#6d28d9] text-white shadow-md shadow-purple-600/20"
                      : "bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:border-purple-300 shadow-xs"
                  }`}
                >
                  [{cat === "ALL" ? `ALL WORKS (${ALL_PROJECTS.length})` : cat}]
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Row Carousel Content */}
        {viewMode === "carousel" ? (
          <div className="relative w-full space-y-3.5 sm:space-y-4 select-none">
            {/* Row 1: Leftward moving stream */}
            <div className="relative w-full overflow-hidden py-1">
              <div
                className="animate-marquee-forward flex items-center gap-3 sm:gap-4"
                style={{
                  animationPlayState: isPlaying ? "running" : "paused",
                  animationDuration: "50s",
                }}
              >
                {row1Items.map((project, index) => (
                  <ProjectCard
                    key={`r1-${project.id}-${index}`}
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Rightward moving stream */}
            <div className="relative w-full overflow-hidden py-1">
              <div
                className="animate-marquee-backward flex items-center gap-3 sm:gap-4"
                style={{
                  animationPlayState: isPlaying ? "running" : "paused",
                  animationDuration: "54s",
                }}
              >
                {row2Items.map((project, index) => (
                  <ProjectCard
                    key={`r2-${project.id}-${index}`}
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Static Image Grid View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredAll.map((project) => (
                <ProjectCard
                  key={`grid-${project.id}`}
                  project={project}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* HIGH-RESOLUTION CREATIVE LIGHTBOX MODAL (WHITE BACKGROUND THEME) */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                  {selectedProject.category}
                </span>
                <h3 className="font-['Raleway'] font-bold text-base sm:text-lg text-slate-900 truncate">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  ESC to close
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Main Image Stage (Pure White Background) */}
            <div className="relative flex-1 bg-white p-3 sm:p-6 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[460px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateModal(-1);
                }}
                className="absolute left-3 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-[#6d28d9] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-400 shadow-md hover:scale-105 transition-all"
                aria-label="Previous Design"
                title="Previous Design (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <img
                src={selectedProject.src}
                alt={selectedProject.title}
                className="max-h-[64vh] max-w-full object-contain rounded-xl shadow-lg border border-slate-100 transition-all duration-300"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateModal(1);
                }}
                className="absolute right-3 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-[#6d28d9] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-400 shadow-md hover:scale-105 transition-all"
                aria-label="Next Design"
                title="Next Design (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer Bar */}
            <div className="px-5 sm:px-6 py-3.5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="min-w-0 text-center sm:text-left">
                <p className="text-xs sm:text-sm text-slate-600 font-['Raleway']">
                  {selectedProject.description}
                </p>
                <p className="text-[11px] font-mono text-purple-700 mt-0.5">
                  #{selectedProject.tag} • High-Resolution Portfolio Asset
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs text-slate-400">
                  {String(
                    ALL_PROJECTS.findIndex((p) => p.id === selectedProject.id) + 1
                  ).padStart(2, "0")}{" "}
                  / {String(ALL_PROJECTS.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// =========================================================================
// 3. REUSABLE LIVE WEBSITE CARD (BROWSER CHROME MOCKUP)
// =========================================================================
function LiveWebsiteCard({
  site,
  isLarge = false,
  delay = 0,
}: {
  site: LiveWebsite;
  isLarge?: boolean;
  delay?: number;
}) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="group relative rounded-3xl border border-slate-200/90 bg-white/95 shadow-[0_2px_14px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_22px_50px_-10px_rgba(109,40,217,0.18)] hover:border-purple-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
    >
      {/* Corner Ambient Glow on Card */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Browser Chrome Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-slate-50/90 border-b border-slate-100">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>

          {/* Centered URL Capsule */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 text-[11px] font-mono text-slate-500 shadow-2xs max-w-[210px] sm:max-w-[260px] truncate">
            <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate">{site.displayUrl}</span>
          </div>

          {/* Live Status Indicator */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 hidden sm:inline">
              LIVE
            </span>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-5 sm:p-7">
          {/* Logo & Headline */}
          <div className="flex items-start justify-between gap-4 mb-3.5">
            <div className="flex items-start gap-3.5">
              {/* Logo Dock */}
              <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-2 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-purple-200 transition-all duration-300">
                <img
                  src={site.logo}
                  alt={site.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#6d28d9] transition-colors font-['Raleway'] leading-tight">
                  {site.name}
                </h4>
                <p className="text-xs text-purple-700 font-semibold mt-0.5 font-['Raleway']">
                  {site.subtitle}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 font-['Raleway']">
                  {site.role}
                </p>
              </div>
            </div>

            {/* Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shrink-0 ${site.badgeColor}`}
            >
              {site.badge}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Raleway'] mt-3 mb-4">
            {site.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {site.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono font-medium bg-slate-50 text-slate-600 border border-slate-200/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Full-Width Direct Launch Button */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-[#6d28d9] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md group/btn"
        >
          <span>VISIT WEBSITE</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}

// =========================================================================
// 4. REUSABLE PROJECT SHOWCASE CARD (FOR GALLERY CAROUSEL)
// =========================================================================
function ProjectCard({
  project,
  onOpen,
}: {
  project: ShowcaseProject;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="group relative w-[220px] sm:w-[260px] md:w-[295px] aspect-[16/10.5] shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-950 shadow-[0_3px_12px_-3px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(109,40,217,0.25)] hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Background Project Image */}
      <img
        src={project.src}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Top Floating Glass Badge */}
      <div className="absolute top-2 sm:top-2.5 inset-x-2 sm:inset-x-2.5 flex items-center justify-between pointer-events-none z-10">
        <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-900 border border-white/60 shadow-xs">
          {project.category}
        </span>

        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-xs">
          <Maximize2 className="w-3 h-3" />
        </span>
      </div>

      {/* Bottom Frosted Gradient HUD Bar */}
      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-transparent transition-all duration-300 flex items-end justify-between gap-2 z-10">
        <div className="min-w-0">
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-purple-300 block truncate">
            #{project.tag}
          </span>
          <h4 className="font-['Raleway'] font-bold text-white text-xs sm:text-[13px] leading-tight drop-shadow-md truncate mt-0.5 group-hover:text-purple-200 transition-colors">
            {project.title}
          </h4>
        </div>

        {/* Action Pill Button */}
        <div className="px-2 py-0.5 rounded-full bg-purple-600/90 group-hover:bg-[#6d28d9] text-white text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase transition-colors shrink-0 shadow-xs flex items-center gap-1">
          <span>PREVIEW</span>
          <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </div>
      </div>
    </div>
  );
}
