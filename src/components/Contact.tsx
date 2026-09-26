"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  Sparkles,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "./Icons";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Header */}
      <div data-aos="fade-up" className="flex flex-col mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
            <Mail className="w-3.5 h-3.5 text-[#6d28d9]" />
            // 06 · DIRECT CONTACT
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
              <span className="block">
                <span className="font-syne font-black text-slate-950">LET&apos;S</span>{" "}
                <span className="font-playfair italic font-bold text-[#6d28d9]">BUILD</span>{" "}
                <span className="font-courier font-bold tracking-[0.08em] text-slate-800">SOMETHING</span>
              </span>
              <span className="block mt-0.5 sm:mt-1 font-space-grotesk font-black text-[#6d28d9] tracking-tight">
                GREAT TOGETHER.
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-3" />
          </div>

          <p className="max-w-md text-xs sm:text-sm text-slate-500 font-['Raleway']">
            Available for full-time opportunities, design contracts, and high-impact digital ventures. Reach out directly through any channel below.
          </p>
        </div>
      </div>

      {/* Profile & Status Highlight Banner */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="hud-bracket rounded-3xl p-6 sm:p-7 border border-slate-200/90 bg-white/95 shadow-md mb-8 sm:mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-purple-500/30 p-1 bg-purple-50/50 shrink-0">
            <Image
              src="/images/hero-avatar.jpg"
              alt="Aryan Nair"
              fill
              className="object-cover object-top rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black uppercase text-slate-900 font-['Raleway'] leading-tight">
                Aryan Nair
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
                PRO
              </span>
            </div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">
              UI/UX Designer &amp; Frontend Engineer
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Availability Status */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm" />
            <span>AVAILABLE FOR WORK</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-mono font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#6d28d9]" />
            <span>Punjab, India • Remote Worldwide</span>
          </div>
        </div>
      </div>

      {/* 4 Focused Contact Cards Grid: Email, Phone, LinkedIn, Instagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* ============================================================ */}
        {/* 1. EMAIL */}
        {/* ============================================================ */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="group relative rounded-3xl p-6 border border-slate-200/90 bg-white/95 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6d28d9] group-hover:scale-105 group-hover:bg-[#6d28d9] group-hover:text-white transition-all duration-300 shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                // INBOX
              </span>
            </div>

            <span className="text-[11px] font-mono font-bold uppercase text-[#6d28d9] tracking-wider block">
              Email Address
            </span>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-[#6d28d9] transition-colors truncate font-['Raleway'] mt-0.5">
              nairaryan119@gmail.com
            </h4>
            <p className="text-xs text-slate-500 font-['Raleway'] mt-1 leading-relaxed">
              Best for project proposals, contracts, and detailed inquiries.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
            <a
              href="mailto:nairaryan119@gmail.com"
              className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-[#6d28d9] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Email</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => copyToClipboard("nairaryan119@gmail.com", "email")}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Copy Email Address"
              aria-label="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. PHONE / WHATSAPP */}
        {/* ============================================================ */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="group relative rounded-3xl p-6 border border-slate-200/90 bg-white/95 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-xs">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                // DIRECT LINE
              </span>
            </div>

            <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 tracking-wider block">
              Phone &amp; WhatsApp
            </span>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate font-['Raleway'] mt-0.5">
              +91 70097 37283
            </h4>
            <p className="text-xs text-slate-500 font-['Raleway'] mt-1 leading-relaxed">
              Available for voice calls, quick chats, and instant WhatsApp comms.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
            <a
              href="https://wa.me/917009737283"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => copyToClipboard("+917009737283", "phone")}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Copy Phone Number"
              aria-label="Copy Phone"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. LINKEDIN */}
        {/* ============================================================ */}
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="group relative rounded-3xl p-6 border border-slate-200/90 bg-white/95 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-[#0077b5] group-hover:text-white transition-all duration-300 shadow-xs">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                // NETWORK
              </span>
            </div>

            <span className="text-[11px] font-mono font-bold uppercase text-blue-700 tracking-wider block">
              LinkedIn
            </span>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate font-['Raleway'] mt-0.5">
              Aryan Nair
            </h4>
            <p className="text-xs text-slate-500 font-['Raleway'] mt-1 leading-relaxed">
              Connect professionally, view verified recommendations &amp; career updates.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <a
              href="https://www.linkedin.com/in/aryan-nair-73b97624b/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-[#0077b5] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. INSTAGRAM */}
        {/* ============================================================ */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="group relative rounded-3xl p-6 border border-slate-200/90 bg-white/95 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-pink-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-50 via-pink-50 to-purple-50 border border-pink-200/80 flex items-center justify-center text-pink-600 group-hover:scale-105 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-xs">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                // CREATIVE
              </span>
            </div>

            <span className="text-[11px] font-mono font-bold uppercase text-pink-700 tracking-wider block">
              Instagram
            </span>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors truncate font-['Raleway'] mt-0.5">
              @itz_aryan_nair
            </h4>
            <p className="text-xs text-slate-500 font-['Raleway'] mt-1 leading-relaxed">
              Design snapshots, creative experiments, and visual aesthetics behind the scenes.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <a
              href="https://www.instagram.com/itz_aryan_nair/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Follow</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
