"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X, CheckCircle2, Share2, Sparkles, ShieldCheck } from "lucide-react";

export interface GoogleBadge {
  id: string;
  title: string;
  category: string;
  earnedDate: string;
  description: string;
  icon: string;
  accentColor: string;
  cardBg: string;
  cardBorder: string;
  tag: string;
  issuer: string;
  partner?: string;
  verifyUrl: string;
  activities?: { name: string; date: string }[];
}

const GOOGLE_BADGES: GoogleBadge[] = [
  {
    id: "google-dev-program",
    title: "Google Developer Program premium tier",
    category: "Developer Program",
    earnedDate: "May 12, 2026",
    description: "I am subscribed to the Google Developer Program premium tier",
    icon: "/badges/google-dev-program.png",
    accentColor: "#1a73e8",
    cardBg: "from-[#e8f0fe] via-[#f4f7fe] to-[#ffffff]",
    cardBorder: "border-[#bfdbfe]",
    tag: "Premium Tier",
    issuer: "Google Developers",
    verifyUrl: "https://developers.google.com/profile/badges/community/innovators/cloud/innovators_plus",
  },
  {
    id: "gemini-agent-ready",
    title: "Gemini Enterprise Agent Ready",
    category: "Generative AI & Vertex AI",
    earnedDate: "Feb 24, 2026",
    description: "Level up your agent building skills with GEAR. Go from prototyping with Gemini to deploying secure, enterprise-grade agents on Vertex AI with hands-on training and guidance from Google experts.",
    icon: "/badges/gemini-agent-ready.png",
    accentColor: "#f29900",
    cardBg: "from-[#fef7e0] via-[#fffbf0] to-[#ffffff]",
    cardBorder: "border-[#fde68a]",
    tag: "Gemini AI",
    issuer: "Google Cloud",
    verifyUrl: "https://developers.google.com/profile/badges/community/gear",
  },
  {
    id: "cloud-innovator",
    title: "Google Cloud Innovator",
    category: "Cloud Architecture",
    earnedDate: "Feb 24, 2026",
    description: "Joined the Google Cloud Innovators program.",
    icon: "/badges/cloud-innovator.png",
    accentColor: "#1a73e8",
    cardBg: "from-[#e0f2fe] via-[#f0f9ff] to-[#ffffff]",
    cardBorder: "border-[#bae6fd]",
    tag: "Cloud Innovator",
    issuer: "Google Cloud",
    verifyUrl: "https://developers.google.com/profile/badges/community/innovators/cloud/2021_member",
  },
  {
    id: "io-2026",
    title: "I/O 2026 - Registered",
    category: "Developer Keynote",
    earnedDate: "Apr 15, 2026",
    description: "Registered for Google I/O 2026 digital event",
    icon: "/badges/io-2026.png",
    accentColor: "#ea4335",
    cardBg: "from-[#fce8e6] via-[#fff1f0] to-[#ffffff]",
    cardBorder: "border-[#fecdd3]",
    tag: "Google I/O 2026",
    issuer: "Google I/O",
    verifyUrl: "https://developers.google.com/profile/badges/events/io/2026/registered",
  },
  {
    id: "chrome-devtools-user",
    title: "Chrome DevTools User",
    category: "Web Engineering",
    earnedDate: "Jul 2, 2026",
    description: "Opened Chrome DevTools and inspected a website",
    icon: "/badges/chrome-devtools-user.png",
    accentColor: "#188038",
    cardBg: "from-[#e6f4ea] via-[#f3faf5] to-[#ffffff]",
    cardBorder: "border-[#bbf7d0]",
    tag: "DevTools Expert",
    issuer: "Google Chrome",
    verifyUrl: "https://developers.google.com/profile/badges/activity/chrome-devtools/chrome-devtools-user",
  },
  {
    id: "first-learning-pathway",
    title: "First Learning Pathway and Quiz badge",
    category: "Developer Knowledge",
    earnedDate: "Aug 17, 2026",
    description: "Completed first learning pathway and quiz",
    icon: "/badges/first-learning-pathway.png",
    accentColor: "#1a73e8",
    cardBg: "from-[#eff6ff] via-[#f5f8ff] to-[#ffffff]",
    cardBorder: "border-[#bfdbfe]",
    tag: "Verified Pathway",
    issuer: "Google Developers",
    verifyUrl: "https://developers.google.com/profile/badges/playlists/first-playlist",
  },
  {
    id: "gpu-data-analytics",
    title: "Speed Up Data Analytics with GPUs",
    category: "Accelerated Computing",
    earnedDate: "Aug 17, 2026",
    description: "Completed the Speed Up Data Analytics with GPUs learning pathway and quiz.",
    icon: "/badges/gpu-data-analytics.png",
    accentColor: "#57a400",
    cardBg: "from-[#f0f9eb] via-[#f6fcf3] to-[#ffffff]",
    cardBorder: "border-[#d9f99d]",
    tag: "Google × NVIDIA",
    issuer: "Google Cloud",
    partner: "NVIDIA",
    verifyUrl: "https://developers.google.com/profile/badges/playlists/speed-up-data-analytics-GPUs",
  },
  {
    id: "builder-journey",
    title: "Completed Builder Journey",
    category: "Developer Ecosystem",
    earnedDate: "Aug 31, 2026",
    description: "Completed the Builder journey in the Google Developer Program.",
    icon: "/badges/builder-journey.png",
    accentColor: "#a54823",
    cardBg: "from-[#fbeee4] via-[#fdf6f1] to-[#ffffff]",
    cardBorder: "border-[#fed7aa]",
    tag: "Builder Journey",
    issuer: "Google Developers",
    verifyUrl: "https://developers.google.com/profile/badges/builder/milestone1",
  },
  {
    id: "learning-activities",
    title: "Learning",
    category: "Google Ecosystem",
    earnedDate: "Aug 31, 2026",
    description: "Completed Learning Activities across Google's developer ecosystem",
    icon: "/badges/learning-activities.png",
    accentColor: "#8430ce",
    cardBg: "from-[#f3e8fd] via-[#fbf7ff] to-[#ffffff]",
    cardBorder: "border-[#e9d5ff]",
    tag: "9 Activities Completed",
    issuer: "Google Developers",
    verifyUrl: "https://developers.google.com/profile/badges/recognitions/learnings",
    activities: [
      { name: "Launch your to-do web app with AI", date: "Aug 31, 2026" },
      { name: "A Tour of Gemini Code Assist Standard and Enterprise for", date: "Aug 31, 2026" },
      { name: "Build a Gemini AI Chatbot with Firebase Genkit", date: "Aug 29, 2026" },
    ],
  },
  {
    id: "nvidia-community",
    title: "Google Cloud & NVIDIA community member",
    category: "Community & Ecosystem",
    earnedDate: "Apr 3, 2026",
    description: "I am a Google Cloud & NVIDIA community member.",
    icon: "/badges/nvidia-community.png",
    accentColor: "#57a400",
    cardBg: "from-[#ecfdf5] via-[#f4fcf7] to-[#ffffff]",
    cardBorder: "border-[#a7f3d0]",
    tag: "Cloud & NVIDIA",
    issuer: "Google Cloud",
    partner: "NVIDIA",
    verifyUrl: "https://developers.google.com/profile/badges/nvidia-developer",
  },
  {
    id: "google-skills",
    title: "Google Skills",
    category: "Skills Foundation",
    earnedDate: "Mar 5, 2026",
    description: "Earn this badge when you start your journey on Google Skills.",
    icon: "/badges/google-skills.png",
    accentColor: "#1967d2",
    cardBg: "from-[#eff6ff] via-[#f8fafd] to-[#ffffff]",
    cardBorder: "border-[#bfdbfe]",
    tag: "Google Skills",
    issuer: "Google Skills",
    verifyUrl: "https://developers.google.com/profile/badges/skillsboost/earned-badge",
  },
];

// Duplicated array for seamless infinite auto-scroll
const DISPLAY_BADGES = [...GOOGLE_BADGES, ...GOOGLE_BADGES];

export default function GoogleBadgesCarousel() {
  const [selectedBadge, setSelectedBadge] = useState<GoogleBadge | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  isPausedRef.current = isPaused || Boolean(selectedBadge);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;

    const step = () => {
      if (!isPausedRef.current && container) {
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        } else {
          container.scrollLeft += 0.85;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      setIsPaused(true);
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 2500);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(selectedBadge?.verifyUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="google-badges" className="relative w-full py-10 sm:py-14 bg-[#fafbfc] overflow-hidden border-y border-slate-200/80">
      {/* Decorative Google Colored Ambient Lighting */}
      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6d28d9]" />
                // 01.5 · VERIFIED CREDENTIALS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
              <span className="block">
                <span className="font-syne font-black text-slate-950">GOOGLE</span>{" "}
                <span className="font-playfair italic font-bold text-[#6d28d9]">DEVELOPER</span>{" "}
                <span className="font-courier font-bold tracking-[0.08em] text-slate-800">BADGES.</span>
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-3" />
          </div>

          {/* Carousel Left / Right Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous badge"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-[#1a73e8] text-slate-700 hover:text-[#1a73e8] flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next badge"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-[#1a73e8] text-slate-700 hover:text-[#1a73e8] flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Compact, Colorful Auto-Moving Carousel Track */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 px-1 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DISPLAY_BADGES.map((badge, idx) => (
            <div
              key={`${badge.id}-${idx}`}
              onClick={() => setSelectedBadge(badge)}
              className={`group relative shrink-0 w-[205px] sm:w-[220px] bg-gradient-to-b ${badge.cardBg} rounded-2xl border ${badge.cardBorder} p-4 flex flex-col justify-between shadow-[0_2px_12px_-3px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none`}
            >
              {/* Top Tag & Date Row */}
              <div className="flex items-center justify-between gap-1.5 mb-2.5">
                <span
                  className="text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-white/90 shadow-2xs border border-black/5 truncate max-w-[125px]"
                  style={{ color: badge.accentColor }}
                >
                  {badge.tag}
                </span>

                <span className="text-[10px] font-mono text-slate-400 font-medium shrink-0">
                  {badge.earnedDate.split(",")[0]}
                </span>
              </div>

              {/* Center Circular Badge Icon */}
              <div className="relative w-full py-2.5 flex items-center justify-center">
                <div
                  className="absolute w-20 h-20 rounded-full blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-300"
                  style={{ backgroundColor: badge.accentColor }}
                />
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 transition-transform duration-300 group-hover:scale-108 drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)]">
                  <Image
                    src={badge.icon}
                    alt={badge.title}
                    width={256}
                    height={256}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-1 mb-2.5 flex-1 flex flex-col">
                <h3 className="font-['Raleway'] font-bold text-[13px] sm:text-[13.5px] text-slate-900 group-hover:text-[#1a73e8] transition-colors leading-snug line-clamp-2 min-h-[36px]">
                  {badge.title}
                </h3>
                <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 mt-1">
                  {badge.description}
                </p>
              </div>

              {/* Card Footer: Verify Link & Details */}
              <div className="pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span className="flex items-center gap-1 group-hover:text-[#1a73e8] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.accentColor }} />
                  <span>Details</span>
                </span>
                
                <a
                  href={badge.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Verify on Google Developers"
                  className="inline-flex items-center gap-1 text-[10.5px] text-[#1a73e8] hover:text-[#174ea6] font-medium bg-white/80 hover:bg-white px-2 py-0.5 rounded-full border border-blue-200/80 shadow-2xs hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-2.5 h-2.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Badge Interactive Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="relative w-full max-w-[420px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Decorative Header with Google Arches Graphic */}
            <div className="relative w-full h-32 bg-gradient-to-br from-slate-50 via-blue-50/40 to-emerald-50/30 overflow-hidden flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" viewBox="0 0 440 144" fill="none">
                <circle cx="90" cy="50" r="70" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                <circle cx="220" cy="40" r="70" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                <circle cx="350" cy="50" r="70" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                <path d="M40 70 Q 220 -20 400 70" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.25" fill="none" />
              </svg>

              {/* Close Button */}
              <button
                onClick={() => setSelectedBadge(null)}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-sm cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Center Floating Badge Icon */}
              <div className="relative translate-y-6 z-10">
                <div
                  className="w-22 h-22 sm:w-24 sm:h-24 rounded-full p-2 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] flex items-center justify-center"
                  style={{
                    boxShadow: `0 8px 24px -3px ${selectedBadge.accentColor}35`,
                  }}
                >
                  <Image
                    src={selectedBadge.icon}
                    alt={selectedBadge.title}
                    width={256}
                    height={256}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="pt-10 pb-5 px-6 text-center flex flex-col items-center">
              <h3 className="font-['Raleway'] font-black text-lg sm:text-xl text-slate-900 leading-tight mb-1.5">
                {selectedBadge.title}
              </h3>

              <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Earned {selectedBadge.earnedDate}</span>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed max-w-[320px] mb-3.5">
                {selectedBadge.description}
              </p>

              {/* Optional Activities List Box for Learning Badge */}
              {selectedBadge.activities && selectedBadge.activities.length > 0 && (
                <div className="w-full mb-4 text-left border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/70 shadow-xs">
                  <div className="px-4 py-2 bg-slate-100/80 border-b border-slate-200/80 text-[10.5px] font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>Learning</span>
                    <span className="text-[10px] text-slate-400">Activity Log</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-32 overflow-y-auto">
                    {selectedBadge.activities.map((act, i) => (
                      <div key={i} className="px-4 py-2 flex items-center justify-between text-[11.5px]">
                        <span className="text-[#1a73e8] font-medium hover:underline cursor-pointer pr-2 line-clamp-1">
                          {act.name}
                        </span>
                        <span className="text-slate-400 text-[10.5px] whitespace-nowrap">
                          {act.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Verification Link Button matching Google Developer UI */}
              <div className="w-full mb-5">
                <a
                  href={selectedBadge.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-slate-300 hover:border-[#1a73e8] text-xs font-semibold text-slate-700 hover:text-[#1a73e8] bg-white hover:bg-blue-50/50 shadow-xs active:scale-95 transition-all"
                >
                  <span>Badge details</span>
                  <ExternalLink className="w-3 h-3 stroke-[2.2]" />
                </a>
              </div>

              {/* Social Share Icons Row */}
              <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100 w-full">
                {/* X (Twitter) */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my verified Google Developer badge: ${selectedBadge.title}!`)}&url=${encodeURIComponent(selectedBadge.verifyUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-black flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedBadge.verifyUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-[#1877F2] flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(selectedBadge.verifyUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-[#0A66C2] flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy verification link"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-[#1a73e8] flex items-center justify-center transition-colors relative cursor-pointer"
                >
                  <Share2 className="w-3 h-3" />
                  {copied && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9.5px] px-2 py-0.5 rounded-md whitespace-nowrap shadow-md">
                      Link copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
