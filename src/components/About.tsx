"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import {
  ArrowUpRight,
  Code2,
  Palette,
  Zap,
  UserCheck,
  Layers,
  Sparkles,
  Compass,
  CheckCircle,
} from "lucide-react";

/**
 * AnimatedWordText
 * Splits a sentence into individual words wrapped in overflow-hidden containers.
 * Each word uses data-aos="fade-up" with staggered delays so words rise smoothly
 * from bottom to top sequentially.
 */
function AnimatedWordText({
  text,
  baseDelay = 0,
  stagger = 28,
  highlights = [],
  bolds = [],
  wordStyles = [],
  className = "",
}: {
  text: string;
  baseDelay?: number;
  stagger?: number;
  highlights?: string[];
  bolds?: string[];
  wordStyles?: string[];
  className?: string;
}) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

  const highlightSet = useMemo(
    () => new Set(highlights.map(clean)),
    [highlights]
  );
  const boldSet = useMemo(() => new Set(bolds.map(clean)), [bolds]);

  return (
    <span className={`inline ${className}`}>
      {words.map((word, index) => {
        const cleaned = clean(word);
        const isHighlight = highlightSet.has(cleaned);
        const isBold = boldSet.has(cleaned);
        const customStyle = wordStyles[index] || "";

        const delay = baseDelay + index * stagger;
        const aosDelay = Math.min(3000, Math.round(delay / 50) * 50);

        return (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-baseline mr-[0.35em] sm:mr-[0.42em] leading-none"
          >
            <span
              data-aos="fade-up"
              data-aos-delay={aosDelay}
              data-aos-duration="550"
              data-aos-easing="ease-out-cubic"
              data-aos-once="false"
              style={{
                transitionDelay: `${delay}ms`,
              }}
              className={`word-rise inline-block transform will-change-transform ${customStyle} ${
                customStyle
                  ? ""
                  : isHighlight
                  ? "text-[#6d28d9] font-bold"
                  : isBold
                  ? "text-slate-900 font-bold"
                  : ""
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default function About() {
  useEffect(() => {
    // Refresh AOS so newly rendered word nodes are registered
    AOS.refresh();
  }, []);

  const stats = [
    { value: "2+", label: "Years", detail: "UI/UX & Frontend" },
    { value: "15+", label: "Projects Shipped", detail: "Websites & Web Apps" },
    { value: "500+", label: "Users Tested", detail: "Real-World Testing" },
  ];

  const pillars = [
    {
      icon: Palette,
      title: "UI/UX Design Systems",
      desc: "Creating modular design systems, intuitive wireframes, and user-focused prototypes in Figma.",
    },
    {
      icon: Code2,
      title: "Creative Frontend Development",
      desc: "Transforming thoughtful designs into responsive, interactive interfaces with Next.js, React & Tailwind.",
    },
    {
      icon: Zap,
      title: "Product & Experience Design",
      desc: "Designing intuitive user journeys, interactions, and digital experiences that solve real user and business needs.",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden font-['Raleway']"
    >
      {/* Subtle Purple Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-purple-100/60 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-[420px] h-[420px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Header Badge */}
      <div data-aos="fade-up" className="flex items-center gap-2 mb-4 sm:mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
          <UserCheck className="w-3.5 h-3.5 text-[#6d28d9]" />
          // 01 · ABOUT THE DESIGNER
        </span>
      </div>

      {/* Section Title with Word-by-Word Bottom-to-Top AOS Animation */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
          <span className="block">
            <AnimatedWordText
              text="Where Design Meets"
              baseDelay={0}
              stagger={35}
              highlights={["Design"]}
              wordStyles={[
                "font-syne font-black tracking-tight text-slate-950",
                "font-playfair italic font-bold tracking-normal text-[#6d28d9]",
                "font-courier font-bold tracking-[0.08em] text-slate-800",
              ]}
            />
          </span>
          <span className="block mt-0.5 sm:mt-1">
            <AnimatedWordText
              text="Engineering."
              baseDelay={110}
              stagger={35}
              highlights={["Engineering."]}
              wordStyles={[
                "font-space-grotesk font-black tracking-tight text-[#6d28d9]",
              ]}
            />
          </span>
        </h2>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-3"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Persona Profile Card */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <div className="relative rounded-3xl overflow-hidden bg-white p-4 sm:p-5 shadow-xl shadow-purple-900/5 border border-slate-200/90 group">
            {/* Image Frame */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
              <Image
                src="/images/hero-avatar.jpg"
                alt="Aryan Nair portrait"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* ID Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-black/75 text-purple-300 backdrop-blur-md border border-purple-400/30">
                ID: AN-2026
              </div>

              {/* Bottom Persona Tags */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                <div className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-semibold bg-white/95 text-slate-800 backdrop-blur-md border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6d28d9] animate-pulse" />
                  <span>INDIA · REMOTE WORLDWIDE</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg font-mono text-[10px] font-bold bg-[#6d28d9] text-white shadow-sm">
                  DEV // DESIGN
                </div>
              </div>
            </div>

            {/* Live Availability Status */}
            <div className="mt-4 p-3 rounded-xl border border-slate-200/90 bg-slate-50/80 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                  STATUS: AVAILABLE
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase text-[#6d28d9] tracking-wider">
                [FULL_TIME // CONTRACT]
              </span>
            </div>

            {/* Core Tool Badges */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 justify-center">
              {["Figma", "Canva", "Next.js", "React", "SEO"].map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-slate-100/80 text-slate-700 border border-slate-200 hover:border-[#6d28d9] hover:text-[#6d28d9] transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar Under Profile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={250 + i * 60}
                className="p-3 rounded-2xl border border-slate-200/90 text-center bg-white shadow-sm hover:border-[#6d28d9] hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[105px]"
              >
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#6d28d9]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
                <div className="text-[9px] font-medium text-slate-500 mt-1 leading-tight">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Narrative with Word-by-Word AOS Animation & Feature Pillars */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Paragraph 1: Who I Am (Word-by-Word bottom-to-top) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#6d28d9]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6d28d9]">
                // CORE STATEMENT
              </span>
            </div>
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
              <AnimatedWordText
                text="I’m a UI/UX Designer and Creative Frontend Developer focused on crafting visually striking, user-centered digital experiences—from Figma designs to functional, production-ready interfaces."
                baseDelay={100}
                stagger={24}
                highlights={["UI/UX", "Designer", "Creative", "Frontend", "Developer"]}
                bolds={["visually", "striking,", "user-centered", "Figma", "designs", "functional,", "production-ready", "interfaces."]}
              />
            </p>
          </div>

          {/* Paragraph 2: Proven Impact (Word-by-Word bottom-to-top) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#6d28d9]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6d28d9]">
                // INDUSTRY COLLABORATIONS
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              <AnimatedWordText
                text="I’ve designed and built digital experiences for TIDA Sports, TurfSquad, Anee’s School, and Quantifiers CAT Academy, combining thoughtful UX with practical frontend development. From intuitive booking workflows to gamified experiences, I focus on simplifying user journeys, improving engagement, and turning business requirements into meaningful digital products."
                baseDelay={200}
                stagger={20}
                highlights={["TIDA", "Sports,", "TurfSquad,", "Anee’s", "School,", "Quantifiers", "CAT", "Academy,"]}
                bolds={["thoughtful", "UX", "practical", "frontend", "development.", "intuitive", "booking", "workflows", "gamified", "simplifying", "user", "journeys,", "improving", "engagement,", "meaningful", "digital", "products."]}
              />
            </p>
          </div>

          {/* Paragraph 3: Standards & Philosophy (Word-by-Word bottom-to-top) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-[#6d28d9]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6d28d9]">
                // TECHNICAL CRAFT & STANDARDS
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              <AnimatedWordText
                text="Built with Next.js, React, TypeScript, and modern web standards, my interfaces combine purposeful design with clean, responsive frontend development. Every detail is crafted with usability, accessibility, and performance in mind—from the smallest interaction to the complete experience across devices."
                baseDelay={300}
                stagger={20}
                highlights={["Next.js,", "React,", "TypeScript,"]}
                bolds={["purposeful", "design", "clean,", "responsive", "frontend", "development.", "usability,", "accessibility,", "performance", "interaction", "complete", "experience"]}
              />
            </p>
          </div>

          {/* Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={400 + i * 100}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#6d28d9] shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#6d28d9] flex items-center justify-center mb-3 group-hover:bg-[#6d28d9] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div
            data-aos="fade-up"
            data-aos-delay="650"
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href="#projects"
              className="px-7 py-3.5 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-600/25 transition-all flex items-center gap-2 group active:scale-95"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="https://wa.me/917009737283?text=Hi%20Aryan,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20start%20a%20conversation!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full border border-slate-200 hover:border-[#6d28d9] text-slate-800 hover:text-[#6d28d9] font-bold text-xs uppercase tracking-wider transition-all bg-white shadow-sm hover:shadow-md active:scale-95 inline-flex items-center justify-center"
            >
              <span>Start A Conversation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
