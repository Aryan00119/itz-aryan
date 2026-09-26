"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Gamepad2,
  Palette,
  Sparkles,
  Monitor,
  Smartphone,
  AlertTriangle,
  X,
  Play,
  Check,
  Layers,
  Cpu,
  ShieldCheck,
  Code2,
  ArrowUpRight,
} from "lucide-react";

export default function PersonalProjects() {
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Sample 10 tonal shades demonstration for Color Volor showcase card
  const sampleShades = [
    { label: "50", hex: "#faf5ff", text: "#581c87" },
    { label: "100", hex: "#f3e8ff", text: "#581c87" },
    { label: "200", hex: "#e9d5ff", text: "#581c87" },
    { label: "300", hex: "#d8b4fe", text: "#581c87" },
    { label: "400", hex: "#c084fc", text: "#ffffff" },
    { label: "500", hex: "#a855f7", text: "#ffffff" },
    { label: "600", hex: "#9333ea", text: "#ffffff" },
    { label: "700", hex: "#7e22ce", text: "#ffffff" },
    { label: "800", hex: "#6b21a8", text: "#ffffff" },
    { label: "900", hex: "#581c87", text: "#ffffff" },
  ];

  const handleCopySwatch = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  // Launch Game with PC / Mobile Compatibility Verification
  const handlePlayGame = () => {
    if (typeof window === "undefined") return;

    const isMobileDevice =
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobileDevice) {
      setShowMobileModal(true);
    } else {
      window.open("/games/flatline-protocol/index.html", "_blank");
    }
  };

  return (
    <section
      id="personal-projects"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden font-['Raleway']"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div data-aos="fade-up" className="flex flex-col mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-[#6d28d9]" />
            // 05 · LABS &amp; INDEPENDENT BUILDS
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
              <span className="block">
                <span className="font-syne font-black text-slate-950">PERSONAL</span>{" "}
                <span className="font-playfair italic font-bold text-[#6d28d9]">PROJECTS</span>{" "}
                <span className="font-courier font-bold tracking-[0.08em] text-slate-800">&amp; LABS</span>
              </span>
              <span className="block mt-0.5 sm:mt-1 font-space-grotesk font-black text-[#6d28d9] tracking-tight">
                INDEPENDENT VENTURES.
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] via-purple-500 to-emerald-400 rounded-full mt-3" />
          </div>

          <p className="max-w-md text-xs sm:text-sm text-slate-500 font-['Raleway']">
            Handcrafted personal creations exploring 3D interactive graphics, color theory algorithms, and gaming architecture built from the ground up.
          </p>
        </div>
      </div>

      {/* 2-Card Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* ============================================================ */}
        {/* 1. ONLINE: Color Volor — Pro Color Studio & 10 Shades Generator */}
        {/* ============================================================ */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="group relative rounded-3xl p-6 sm:p-8 border border-slate-200/90 bg-white/95 shadow-md hover:shadow-2xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle decorative glow accent */}
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div>
            {/* Top metadata tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE WEB TOOL
              </span>

              <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                DESIGN SUITE
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Raleway'] leading-tight group-hover:text-[#6d28d9] transition-colors">
                  Color Volor
                </h3>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#6d28d9] mt-0.5">
                  Pro Color Studio &amp; 10 Shades Generator
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 mb-6">
              A specialized design suite built for UI/UX designers and design engineers to craft harmonic color systems, generate 10 mathematically calibrated tonal shades (50–900), verify WCAG accessibility contrast ratios, and export clean Tailwind CSS color tokens.
            </p>

            {/* Interactive 10 Tonal Shades Swatch Strip Demo */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#6d28d9]" />
                  10-Shade Tonal Generation Engine
                </span>
                <span className="text-[10px] font-mono text-purple-700 font-semibold">
                  {copiedColor ? `COPIED: ${copiedColor}` : "Click any swatch to copy"}
                </span>
              </div>

              {/* Swatch Strip */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 rounded-xl overflow-hidden p-1.5 bg-white border border-slate-200">
                {sampleShades.map((shade) => (
                  <button
                    key={shade.label}
                    onClick={() => handleCopySwatch(shade.hex)}
                    style={{ backgroundColor: shade.hex }}
                    className="group/swatch h-14 sm:h-16 rounded-lg flex flex-col items-center justify-between p-1 transition-all duration-150 hover:scale-105 hover:z-10 shadow-xs relative border border-black/5"
                    title={`Copy ${shade.hex} (${shade.label})`}
                    aria-label={`Copy shade ${shade.label}`}
                  >
                    <span
                      style={{ color: shade.text }}
                      className="text-[9px] font-mono font-bold opacity-80"
                    >
                      {shade.label}
                    </span>
                    <span
                      style={{ color: shade.text }}
                      className="text-[8px] font-mono uppercase tracking-tighter opacity-0 group-hover/swatch:opacity-100 transition-opacity font-bold"
                    >
                      {copiedColor === shade.hex ? "✓" : "HEX"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "10 Harmonic Tonal Shades",
                "WCAG Contrast Analyzer",
                "Tailwind & CSS Tokens",
                "OKLCH & HSL Color Spaces",
                "Palette Export",
              ].map((feat) => (
                <span
                  key={feat}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-purple-50 text-purple-800 border border-purple-200/80"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://aryan00119.github.io/Color_volor/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Launch Color Studio</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={() => handleCopySwatch("https://aryan00119.github.io/Color_volor/")}
              className="w-full sm:w-auto py-3 px-4 rounded-2xl border border-slate-200 hover:border-purple-300 text-slate-700 hover:text-[#6d28d9] font-mono font-semibold text-xs transition-colors bg-white flex items-center justify-center gap-1.5 cursor-pointer"
              title="Copy Tool Link"
            >
              {copiedColor === "https://aryan00119.github.io/Color_volor/" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied</span>
                </>
              ) : (
                <span>Share Tool</span>
              )}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. OFFLINE {GAME BY ME}: St. Agnes Mercy — Flatline Protocol (Z V1.6) */}
        {/* ============================================================ */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="group relative rounded-3xl p-6 sm:p-8 border border-slate-200/90 bg-white/95 shadow-md hover:shadow-2xl hover:border-red-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle decorative glow accent */}
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-red-500/15 to-amber-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div>
            {/* Top metadata tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-red-50 text-red-700 border border-red-200">
                <Gamepad2 className="w-3 h-3 text-red-600" />
                PLAYABLE 3D GAME
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                <Monitor className="w-3 h-3 text-slate-600" />
                PC DEVICES ONLY
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Raleway'] leading-tight group-hover:text-red-600 transition-colors">
                  St. Agnes Mercy
                </h3>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 mt-0.5">
                  Flatline Protocol · 3D Zombie Survival (Z V1.6)
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 mb-6">
              A 3D first-person survival horror game built from scratch using Three.js and WebGL. Survive procedurally intelligent zombie hordes inside an infected research medical center, featuring custom weapon ballistic physics, dynamic blood splatters, puzzle decryption, and spatial 3D audio.
            </p>

            {/* Game Specs Visual Box */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-red-400" />
                  Engine Architecture &amp; System Specs
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-900/60 font-bold uppercase">
                  WebGL 3D
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Engine</div>
                  <div className="text-xs font-bold text-white mt-0.5">Three.js r128</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Controls</div>
                  <div className="text-xs font-bold text-white mt-0.5">WASD + Mouse</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Physics</div>
                  <div className="text-xs font-bold text-white mt-0.5">Custom Particles</div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  PC Device Keyboard &amp; Mouse Required
                </span>
                <span className="text-slate-500 hidden sm:inline">Runs in New Tab</span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "Three.js 3D Engine",
                "Procedural Zombie AI",
                "Custom 3D Weapon Models",
                "Blood Physics System",
                "Puzzle Decryption Loop",
              ].map((feat) => (
                <span
                  key={feat}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-red-50 text-red-800 border border-red-200/80"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handlePlayGame}
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-md shadow-red-600/25 transition-all flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Play Game in New Tab</span>
            </button>

            <button
              onClick={handlePlayGame}
              className="w-full sm:w-auto py-3 px-4 rounded-2xl border border-slate-200 hover:border-red-300 text-slate-700 hover:text-red-600 font-mono font-semibold text-xs transition-colors bg-white flex items-center justify-center gap-1.5 cursor-pointer"
              title="Launch 3D Game"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>PC Launch</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE COMPATIBILITY WARNING MODAL */}
      {/* Required by user: "show error when user enable game in Mobile {Show message sorry this game is currently for Pc Devices, im working on Mobile compatibility}" */}
      {/* ============================================================ */}
      {showMobileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in-50 duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-red-200/80 animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowMobileModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Warning Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 mx-auto shadow-inner">
              <Smartphone className="w-7 h-7" />
            </div>

            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 mb-3">
                DEVICE COMPATIBILITY NOTICE
              </span>

              <h4 className="text-lg sm:text-xl font-black text-slate-900 uppercase font-['Raleway'] mb-3">
                PC Device Required
              </h4>

              {/* Exact user requested message */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 font-medium text-xs sm:text-sm leading-relaxed mb-6">
                &ldquo;Sorry, this game is currently for PC devices, I&apos;m working on mobile compatibility.&rdquo;
              </div>

              <p className="text-xs text-slate-500 font-['Raleway'] mb-6 leading-relaxed">
                This 3D survival game relies on keyboard bindings (WASD navigation, Space jump, Shift sprint) and mouse pointer lock for first-person camera aiming. Please visit this portfolio on a laptop or desktop computer to play!
              </p>

              <button
                onClick={() => setShowMobileModal(false)}
                className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-md active:scale-95"
              >
                Understood, Return to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
