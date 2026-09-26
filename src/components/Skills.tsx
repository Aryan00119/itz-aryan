"use client";

import React from "react";
import { Cpu } from "lucide-react";
import {
  FigmaLogo,
  CanvaLogo,
  NextJsLogo,
  MernStackLogo,
  ReactLogo,
  JavaScriptLogo,
  HtmlCssLogo,
  SeoLogo,
  GoogleSearchConsoleLogo,
  ClaudeLogo,
  AntigravityLogo,
  ChatGptLogo,
  GeminiLogo,
  DeepSeekLogo,
  StickAiLogo,
  GoogleLabsLogo,
  BlackboxLogo,
} from "./SkillLogos";

export interface SkillItem {
  id: string;
  name: string;
  glowColor: string;
  logo: React.ReactNode;
}

// Row 1 Skills (Moving Forward / Left)
const ROW_1_SKILLS: SkillItem[] = [
  {
    id: "antigravity",
    name: "Google Antigravity",
    glowColor: "from-purple-500/20 via-blue-500/10 to-transparent",
    logo: <AntigravityLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "nextjs",
    name: "Next.js",
    glowColor: "from-slate-500/20 via-purple-500/10 to-transparent",
    logo: <NextJsLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "react",
    name: "React.js",
    glowColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    logo: <ReactLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    glowColor: "from-orange-500/20 via-amber-500/10 to-transparent",
    logo: <ClaudeLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "figma",
    name: "Figma",
    glowColor: "from-purple-500/20 via-pink-500/10 to-transparent",
    logo: <FigmaLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    glowColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
    logo: <ChatGptLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "mern",
    name: "MERN Stack",
    glowColor: "from-emerald-500/20 via-green-500/10 to-transparent",
    logo: <MernStackLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "seo",
    name: "SEO Optimization",
    glowColor: "from-violet-500/20 via-purple-500/10 to-transparent",
    logo: <SeoLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "stitch",
    name: "Google Stitch",
    glowColor: "from-indigo-500/20 via-blue-500/10 to-transparent",
    logo: <StickAiLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
];

// Row 2 Skills (Moving Backward / Right)
const ROW_2_SKILLS: SkillItem[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    glowColor: "from-blue-500/20 via-purple-500/10 to-transparent",
    logo: <GeminiLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "javascript",
    name: "JavaScript",
    glowColor: "from-yellow-500/20 via-amber-500/10 to-transparent",
    logo: <JavaScriptLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "canva",
    name: "Canva",
    glowColor: "from-teal-500/20 via-cyan-500/10 to-transparent",
    logo: <CanvaLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    glowColor: "from-sky-500/20 via-blue-500/10 to-transparent",
    logo: <DeepSeekLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    glowColor: "from-orange-500/20 via-red-500/10 to-transparent",
    logo: <HtmlCssLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "gsc",
    name: "Google Search Console",
    glowColor: "from-blue-500/20 via-cyan-500/10 to-transparent",
    logo: <GoogleSearchConsoleLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "googlelabs",
    name: "Google Labs",
    glowColor: "from-blue-500/20 via-yellow-500/10 to-transparent",
    logo: <GoogleLabsLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
  {
    id: "blackbox",
    name: "Blackbox AI",
    glowColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    logo: <BlackboxLogo className="w-8 h-8 sm:w-9 sm:h-9" />,
  },
];

// Clean Skill Card: Only Logo and Name, no extra content
function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <div className="group relative flex items-center gap-3 sm:gap-3.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border border-slate-200/90 bg-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_-5px_rgba(109,40,217,0.12)] hover:border-purple-300 transition-all duration-300 hover:-translate-y-1 cursor-default select-none shrink-0">
      {/* Corner Bloom Glow on Hover */}
      <div
        className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${skill.glowColor} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      {/* Logo Dock */}
      <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50/80 border border-slate-100 p-2 flex items-center justify-center group-hover:scale-105 group-hover:border-purple-200 transition-all duration-300 shrink-0">
        {skill.logo}
      </div>

      {/* Name Only */}
      <span className="relative z-10 font-['Raleway'] font-bold text-sm sm:text-base text-slate-800 group-hover:text-[#6d28d9] transition-colors whitespace-nowrap pr-1">
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const row1Duplicated = [...ROW_1_SKILLS, ...ROW_1_SKILLS];
  const row2Duplicated = [...ROW_2_SKILLS, ...ROW_2_SKILLS];

  return (
    <section id="skills" className="relative w-full py-16 sm:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header (Centered / Constrained) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div data-aos="fade-up" className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
              <Cpu className="w-3.5 h-3.5 text-[#6d28d9]" />
              // 02 · MY SKILLS
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
                <span className="block">
                  <span className="font-syne font-black text-slate-950">TECHNICAL</span>{" "}
                  <span className="font-playfair italic font-bold text-[#6d28d9]">STACK</span>{" "}
                  <span className="font-courier font-bold tracking-[0.08em] text-slate-800">&amp;</span>
                </span>
                <span className="block mt-0.5 sm:mt-1 font-space-grotesk font-black text-[#6d28d9] tracking-tight">
                  AI TOOLKIT.
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-3" />
            </div>
            <p className="max-w-md text-xs sm:text-sm text-slate-500 font-['Raleway']">
              Core technologies, design frameworks, and autonomous AI models powering my production workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Dual Opposite Infinite Moving Carousels */}
      <div className="relative w-full space-y-4 sm:space-y-5">
        {/* Left & Right Edge Vignette Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

        {/* Carousel Row 1: Moves Leftwards */}
        <div className="relative w-full overflow-hidden py-1">
          <div className="animate-marquee-forward flex items-center gap-4 sm:gap-5">
            {row1Duplicated.map((skill, index) => (
              <SkillCard key={`r1-${skill.id}-${index}`} skill={skill} />
            ))}
          </div>
        </div>

        {/* Carousel Row 2: Moves Rightwards (Opposite Direction) */}
        <div className="relative w-full overflow-hidden py-1">
          <div className="animate-marquee-backward flex items-center gap-4 sm:gap-5">
            {row2Duplicated.map((skill, index) => (
              <SkillCard key={`r2-${skill.id}-${index}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
