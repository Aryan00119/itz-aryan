"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  subtitle?: string;
  location: string;
  period?: string;
  status: string;
  statusColor: string;
  type: "work" | "education";
  category: "Full Time" | "Freelance" | "Internship" | "Education";
  logo?: string;
  bullets: string[];
  tags: string[];
}

const WORK_EXPERIENCES: ExperienceItem[] = [
  {
    id: "tida-sports",
    role: "Lead UI/UX Designer & SEO Executive",
    company: "TIDA Sports",
    subtitle: "India's one of the Biggest Sports Academies",
    location: "India",
    period: "July 2024 — Present",
    status: "CURRENT ROLE • FULL TIME",
    statusColor: "text-purple-700 bg-purple-50 border-purple-200",
    type: "work",
    category: "Full Time",
    logo: "/clients/tida-sports.png",
    bullets: [
      "UI and UX design of the core TIDA Sports App (gamification loops, XP badges, athlete dashboards).",
      "UI design and responsive layout architecture of the official TIDA Sports Website.",
      "Complete Fitness Tests Module UI designs for athlete physical assessments & metric tracking.",
      "Comprehensive On-Page and Off-Page SEO designs and technical site optimization.",
      "Strategic blog architecture and content writing for organic search dominance.",
      "Created and actively handle 30+ Google My Business (GMB) profiles across national academies.",
      "Conducted in-person UX research and usability tests with 500+ athletes & parents to eliminate friction points.",
    ],
    tags: ["TIDA Sports App", "Website UI", "Fitness Tests Module", "30+ GMBs Handled", "On/Off-Page SEO", "SEO Blogs"],
  },
  {
    id: "anees-school",
    role: "UI/UX Designer & SEO Specialist",
    company: "Anee's School",
    subtitle: "Group of Schools in Kharar and Mohali (with TIDA Sports)",
    location: "Kharar & Mohali, Punjab",
    status: "CLIENT PROJECT • WITH TIDA SPORTS",
    statusColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    type: "work",
    category: "Full Time",
    logo: "/clients/anees-school.png",
    bullets: [
      "Designed UI designs and responsive layout systems for the official school website.",
      "Refined and restructured all website content for clear parent communication and enrollment clarity.",
      "Executed On-Page and Off-Page SEO to maximize local admissions and regional search visibility.",
      "Optimized onboarding touchpoints to increase inquiry conversions across campuses.",
    ],
    tags: ["Website UI Design", "Content Refinement", "On-Page SEO", "Off-Page SEO", "Admission Optimization"],
  },
  {
    id: "turfsquad-arena",
    role: "Web & SEO Consultant",
    company: "Turfsquad Arena",
    subtitle: "Punjab's one of the Biggest Sports Arena",
    location: "Punjab, India",
    status: "FREELANCE",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    type: "work",
    category: "Freelance",
    logo: "/clients/turfsquad.png",
    bullets: [
      "Restructured and rewrote core website content to reflect the state-of-the-art sports arena brand.",
      "End-to-end SEO of Website covering technical On-Page, Off-Page authority, and high-impact sports blogs.",
      "Created 2 Google My Business (GMB) profiles and handled local map optimization & booking traffic.",
    ],
    tags: ["Website Restructuring", "Content Writing", "On/Off-Page SEO", "Sports Blogs", "2 GMBs Handled"],
  },
  {
    id: "quantifiers",
    role: "Web & SEO Consultant",
    company: "Quantifiers",
    subtitle: "Chandigarh's one of the Biggest CAT / MBA exams Coaching",
    location: "Chandigarh, India",
    status: "FREELANCE",
    statusColor: "text-blue-700 bg-blue-50 border-blue-200",
    type: "work",
    category: "Freelance",
    logo: "/clients/quantifiers.png",
    bullets: [
      "Restructured and rewrote core website content tailored to high-intent CAT and MBA entrance candidates.",
      "Executed comprehensive On-Page and Off-Page SEO to outrank competing test prep portals.",
      "Researched and authored high-value educational blogs boosting organic exam search traffic.",
    ],
    tags: ["Content Restructuring", "SEO Strategy", "CAT / MBA Blogs", "Conversion Copywriting"],
  },
  {
    id: "the-social-court",
    role: "Web & SEO Consultant",
    company: "The Social Court",
    subtitle: "Digital Hospitality & Sports Lounge",
    location: "India",
    status: "FREELANCE",
    statusColor: "text-amber-800 bg-amber-50 border-amber-200",
    type: "work",
    category: "Freelance",
    logo: "/clients/the-social-court.png",
    bullets: [
      "Restructured and rewrote website content with a contemporary hospitality and sports lifestyle narrative.",
      "Executed full-suite On-Page and Off-Page SEO for elevated local and regional digital presence.",
      "Created 3 Google My Business (GMB) profiles and actively managed local listings, reviews, and traffic.",
    ],
    tags: ["Content Rewrite", "On-Page SEO", "Off-Page SEO", "3 GMBs Handled", "Brand Strategy"],
  },
  {
    id: "sensation-software",
    role: "MERN Stack Developer Intern",
    company: "Sensation Software Solutions",
    subtitle: "Software Engineering & Full-Stack Solutions",
    location: "Mohali, Punjab",
    status: "INTERNSHIP",
    statusColor: "text-slate-700 bg-slate-100 border-slate-300",
    type: "work",
    category: "Internship",
    bullets: [
      "Engineered full-stack responsive web interfaces using React.js, Node.js, Express, and MongoDB.",
      "Developed modular, reusable UI components and tested RESTful API endpoints for production readiness.",
      "Applied industry best practices for state management, component lifecycles, and cross-browser responsiveness.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
];

const EDUCATION_EXPERIENCES: ExperienceItem[] = [
  {
    id: "lkctc-btech",
    role: "Bachelor of Technology in Computer Science & Engineering (C.S.E)",
    company: "Lyallpur Khalsa College Technical Campus",
    subtitle: "Affiliated with I.K. Gujral Punjab Technical University (IKGPTU)",
    location: "Jalandhar, Punjab",
    period: "May 2020 — May 2024",
    status: "DEGREE COMPLETED",
    statusColor: "text-purple-700 bg-purple-50 border-purple-200",
    type: "education",
    category: "Education",
    bullets: [
      "Graduated with core academic focus on Web Technologies, Software Engineering, UI/UX Principles, and Data Structures.",
      "Active contributor and organizer in college technical events, hackathons, and creative design workshops.",
      "Built a solid foundation in algorithmic logic, front-end architecture, and scalable software design.",
    ],
    tags: ["B.Tech C.S.E", "Web Technologies", "UI/UX Principles", "Software Engineering", "Algorithms"],
  },
];

export default function Experience() {
  const [filter, setFilter] = useState<"ALL" | "WORK" | "EDUCATION">("ALL");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const showWork = filter === "ALL" || filter === "WORK";
  const showEducation = filter === "ALL" || filter === "EDUCATION";

  return (
    <section id="experience" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Section */}
      <div data-aos="fade-up" className="flex flex-col mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
            <Briefcase className="w-3.5 h-3.5 text-[#6d28d9]" />
            // 03 · CAREER &amp; ACADEMICS
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
              <span className="block">
                <span className="font-syne font-black text-slate-950">WORK</span>{" "}
                <span className="font-playfair italic font-bold text-[#6d28d9]">&amp;</span>{" "}
                <span className="font-courier font-bold tracking-[0.08em] text-slate-800">EDUCATION</span>
              </span>
              <span className="block mt-0.5 sm:mt-1 font-space-grotesk font-black text-[#6d28d9] tracking-tight">
                TIMELINE.
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-3" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-xs sm:text-sm text-slate-500 font-['Raleway']">
              Track record of designing top-tier applications, scaling 30+ GMB profiles, driving organic SEO growth, and crafting intuitive user interfaces.
            </p>

            {/* Filter Toggle Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200 self-start sm:self-auto shrink-0">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === "ALL"
                    ? "bg-[#6d28d9] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("WORK")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === "WORK"
                    ? "bg-[#6d28d9] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Work ({WORK_EXPERIENCES.length})
              </button>
              <button
                onClick={() => setFilter("EDUCATION")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === "EDUCATION"
                    ? "bg-[#6d28d9] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Education (1)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {/* ============================================================ */}
        {/* 1. WORK EXPERIENCE (MOVED TO TOP OF EDUCATION) */}
        {/* ============================================================ */}
        {showWork && (
          <div data-aos="fade-up" className="space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-200/80">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#6d28d9]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase font-['Raleway'] tracking-wide">
                  Work Experience
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  // PRODUCTION ROLES, ACADEMIES &amp; HIGH-GROWTH CLIENTS
                </p>
              </div>
            </div>

            {/* Timeline Spine with Redesigned Rich Cards */}
            <div className="relative border-l-2 border-[#6d28d9]/25 ml-3 sm:ml-7 pl-5 sm:pl-9 space-y-8 sm:space-y-10">
              {WORK_EXPERIENCES.map((item, idx) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 60}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[27px] sm:-left-[43px] top-4 w-4 h-4 rounded-full bg-white border-2 border-[#6d28d9] group-hover:border-purple-600 group-hover:scale-125 transition-all shadow-md flex items-center justify-center z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6d28d9] group-hover:scale-150 transition-transform" />
                  </div>

                  {/* Redesigned Experience Card */}
                  <div className="relative rounded-3xl p-5 sm:p-7 border border-slate-200/90 bg-white/95 shadow-[0_2px_14px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(109,40,217,0.14)] hover:border-purple-300 transition-all duration-300 overflow-hidden">
                    {/* Corner Ambient Glow on Card */}
                    <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Top Row: Logo Dock, Company Info & Status Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      {/* Left: Company Logo Dock & Titles */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        {/* Company Logo Container */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-2 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-purple-200 transition-all duration-300">
                          {item.logo ? (
                            <img
                              src={item.logo}
                              alt={item.company}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Building2 className="w-7 h-7 text-[#6d28d9]" />
                          )}
                        </div>

                        {/* Company & Role Details */}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#6d28d9] transition-colors font-['Raleway'] leading-tight">
                              {item.company}
                            </h4>
                          </div>

                          {/* Subtitle / Academy callout */}
                          {item.subtitle && (
                            <div className="mt-1">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-[#6d28d9] bg-purple-50 border border-purple-100 leading-normal">
                                <Sparkles className="w-3 h-3 text-[#6d28d9] shrink-0" />
                                {item.subtitle}
                              </span>
                            </div>
                          )}

                          <p className="text-sm sm:text-base font-bold text-slate-700 mt-1 font-['Raleway']">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      {/* Right: Badges, Period & Location */}
                      <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${item.statusColor}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {item.status}
                        </span>

                        <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 mt-1 font-['Raleway']">
                          {item.period ? (
                            <>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#6d28d9]" />
                                {item.period}
                              </span>
                              <span>•</span>
                            </>
                          ) : null}
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#6d28d9]" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-slate-100 my-3.5" />

                    {/* Bullet Points List with Mobile 'Read More' Collapse */}
                    <div className="mb-4">
                      <ul className="space-y-2 sm:space-y-2.5">
                        {item.bullets.map((bullet, bIdx) => {
                          const isHiddenOnMobile = bIdx >= 2 && !expandedCards[item.id];
                          return (
                            <li
                              key={bIdx}
                              className={`${
                                isHiddenOnMobile ? "hidden sm:flex" : "flex"
                              } items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-['Raleway']`}
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Mobile Read More / Show Less Toggle Button */}
                      {item.bullets.length > 2 && (
                        <button
                          onClick={() => toggleCard(item.id)}
                          className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6d28d9] text-xs font-mono font-bold tracking-wide border border-purple-200/80 transition-colors mt-2.5"
                        >
                          <span>
                            {expandedCards[item.id]
                              ? "Show Less"
                              : `Read More (+${item.bullets.length - 2} more)`}
                          </span>
                          {expandedCards[item.id] ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Tags Strip */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-semibold bg-slate-50 text-slate-600 border border-slate-200/70 group-hover:border-purple-200 group-hover:bg-purple-50/50 group-hover:text-purple-800 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. EDUCATION (PLACED BELOW WORK EXPERIENCE) */}
        {/* ============================================================ */}
        {showEducation && (
          <div data-aos="fade-up" className="space-y-8 pt-4">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-200/80">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#6d28d9]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase font-['Raleway'] tracking-wide">
                  Academic Foundation
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  // FORMAL DEGREE &amp; ENGINEERING FOUNDATIONS
                </p>
              </div>
            </div>

            {/* Education Timeline / Showcase */}
            <div className="relative border-l-2 border-[#6d28d9]/25 ml-3 sm:ml-7 pl-5 sm:pl-9 space-y-8">
              {EDUCATION_EXPERIENCES.map((item, idx) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[27px] sm:-left-[43px] top-4 w-4 h-4 rounded-full bg-white border-2 border-[#6d28d9] group-hover:border-purple-600 group-hover:scale-125 transition-all shadow-md flex items-center justify-center z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6d28d9]" />
                  </div>

                  {/* Education Card */}
                  <div className="relative rounded-3xl p-5 sm:p-7 border border-slate-200/90 bg-white/95 shadow-[0_2px_14px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(109,40,217,0.14)] hover:border-purple-300 transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      {/* Left: Icon & Institution Details */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 text-[#6d28d9]">
                          <GraduationCap className="w-8 h-8 text-[#6d28d9]" />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#6d28d9] transition-colors font-['Raleway'] leading-tight">
                            {item.role}
                          </h4>
                          <p className="text-sm sm:text-base font-bold text-slate-700 mt-1 font-['Raleway']">
                            {item.company}
                          </p>
                          {item.subtitle && (
                            <p className="text-xs text-slate-500 font-['Raleway'] mt-0.5">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Badges & Period */}
                      <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${item.statusColor}`}
                        >
                          <Award className="w-3 h-3 text-[#6d28d9]" />
                          {item.status}
                        </span>

                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mt-1 font-['Raleway']">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#6d28d9]" />
                            {item.period}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#6d28d9]" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px w-full bg-slate-100 my-3.5" />

                    {/* Bullet Points List with Mobile 'Read More' Collapse */}
                    <div className="mb-4">
                      <ul className="space-y-2 sm:space-y-2.5">
                        {item.bullets.map((bullet, bIdx) => {
                          const isHiddenOnMobile = bIdx >= 2 && !expandedCards[item.id];
                          return (
                            <li
                              key={bIdx}
                              className={`${
                                isHiddenOnMobile ? "hidden sm:flex" : "flex"
                              } items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-['Raleway']`}
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          );
                        })}
                      </ul>

                      {item.bullets.length > 2 && (
                        <button
                          onClick={() => toggleCard(item.id)}
                          className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6d28d9] text-xs font-mono font-bold tracking-wide border border-purple-200/80 transition-colors mt-2.5"
                        >
                          <span>
                            {expandedCards[item.id]
                              ? "Show Less"
                              : `Read More (+${item.bullets.length - 2} more)`}
                          </span>
                          {expandedCards[item.id] ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-semibold bg-purple-50 text-purple-800 border border-purple-200/70"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
