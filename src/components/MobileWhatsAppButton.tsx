"use client";

import React from "react";
import { WhatsAppIcon } from "./Icons";

export default function MobileWhatsAppButton() {
  return (
    <aside
      aria-label="Contact options"
      className="md:hidden fixed bottom-5 right-5 z-50"
    >
      <a
        href="https://wa.me/917009737283?text=Hi%20Aryan,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe5d] text-white font-bold text-xs uppercase tracking-wider shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] active:scale-95 transition-all duration-300 border border-white/25 backdrop-blur-md"
        aria-label="Text me on WhatsApp"
      >
        {/* Pulsing online status indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-4 h-4 text-white drop-shadow-xs" />

        {/* Text */}
        <span className="font-['Raleway'] tracking-wide font-extrabold">
          Text Me
        </span>
      </a>
    </aside>
  );
}
