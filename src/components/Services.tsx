import React from "react";
import { Layout, Palette, Code, Trophy, Search, Smartphone, Layers, Sparkles } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Palette className="w-6 h-6 text-[#6d28d9]" />,
      number: "01",
      title: "UI/UX & Product Design",
      description:
        "High-fidelity interactive prototypes in Figma, component design systems, intuitive user journeys, and wireframes designed for peak user retention.",
      deliverables: ["Figma Systems", "Interactive Prototyping", "User Journey Mapping", "Information Architecture"],
    },
    {
      icon: <Code className="w-6 h-6 text-[#6d28d9]" />,
      number: "02",
      title: "Creative Frontend Development",
      description:
        "Pixel-perfect translation of designs into lightning-fast, responsive web applications built with Next.js, React, Tailwind, and fluid micro-animations.",
      deliverables: ["Next.js & React Apps", "Modern CSS & Glassmorphism", "Responsive Layouts", "Clean Clean Architecture"],
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#6d28d9]" />,
      number: "03",
      title: "App Gamification & Engagement",
      description:
        "Integrating behavioral gamification features — tournament brackets, leaderboards, XP badges, and challenge loops to boost daily user engagement.",
      deliverables: ["Gamified User Flows", "XP & Badge Loops", "Leaderboard Mechanics", "500+ Customer Feedback Loops"],
    },
    {
      icon: <Search className="w-6 h-6 text-[#6d28d9]" />,
      number: "04",
      title: "SEO & AI-Driven Growth",
      description:
        "Strategic on-page SEO, semantic content structuring, AI-assisted search optimization, and conversion-optimized landing pages that turn visitors into users.",
      deliverables: ["AI SEO & Core Web Vitals", "Conversion Landing Pages", "On-Page SEO Audits", "Search Visibility Strategy"],
    },
  ];

  return (
    <section id="services" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Header */}
      <div data-aos="fade-up" className="flex flex-col mb-12 sm:mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
            <Layers className="w-3.5 h-3.5 text-[#6d28d9]" />
            // 03 · CAPABILITY MODULES
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
              <span className="block">
                <span className="font-syne font-black text-slate-950">SERVICES</span>{" "}
                <span className="font-playfair italic font-bold text-[#6d28d9]">&amp;</span>{" "}
                <span className="font-courier font-bold tracking-[0.08em] text-slate-800">CORE</span>
              </span>
              <span className="block mt-0.5 sm:mt-1 font-space-grotesk font-black text-[#6d28d9] tracking-tight">
                CAPABILITIES.
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-3" />
          </div>
          <p className="max-w-md text-sm text-slate-600 font-['Raleway']">
            Combining empathetic design with modern frontend engineering and growth strategies to build products people love using.
          </p>
        </div>
      </div>

      {/* Services Grid with Crisp White Cards & HUD Brackets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 120}
            className="group relative hud-bracket glass-box glass-box-hover rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-slate-200/90 bg-white/95 shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl glass-pill border border-purple-200 group-hover:border-[#6d28d9] group-hover:scale-110 transition-all duration-300 shadow-sm bg-purple-50">
                  {service.icon}
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[10px] font-bold text-[#6d28d9] uppercase tracking-widest px-2 py-0.5 rounded bg-purple-50 border border-purple-200">
                    MOD-{service.number}
                  </span>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-[#6d28d9] transition-colors font-['Raleway']">
                    #{service.number}
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-900 group-hover:text-[#6d28d9] transition-colors font-['Raleway'] mb-3">
                {service.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-['Raleway'] mb-6">
                {service.description}
              </p>
            </div>

            {/* Deliverables tags with crisp glass pills */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 font-mono">
              {service.deliverables.map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg glass-pill border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-50/90 group-hover:border-purple-400/50"
                >
                  [{item}]
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
