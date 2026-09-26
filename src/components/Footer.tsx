"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Heart, Sparkles, Mail } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "./Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-slate-200 bg-slate-50 py-14 px-4 sm:px-6 lg:px-8 text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#6d28d9]/40">
            <Image
              src="/images/hero-avatar.jpg"
              alt="Aryan Nair"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase text-slate-900 font-['Raleway']">
              Aryan Nair
            </h4>
            <p className="text-xs text-[#6d28d9] font-semibold tracking-wider">
              UI/UX Designer &amp; Frontend Developer
            </p>
          </div>
        </div>

        {/* Center Tagline */}
        <div className="text-center text-xs text-slate-500 font-['Raleway']">
          <p>© 2026 Aryan Nair. All rights reserved.</p>
        </div>

        {/* Back to top & Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/aryan-nair-73b97624b/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#6d28d9] hover:border-[#6d28d9] transition-all shadow-sm"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/itz_aryan_nair/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#6d28d9] hover:border-[#6d28d9] transition-all shadow-sm"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="group p-2.5 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white shadow-md shadow-purple-600/25 transition-all"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
