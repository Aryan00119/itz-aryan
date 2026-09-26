"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, X, Mail, Phone, ExternalLink, Sparkles, Send } from "lucide-react";

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Popover Window with Crisp White Theme & HUD Bracket */}
      {isOpen && (
        <div className="hud-bracket mb-4 w-80 sm:w-88 rounded-3xl bg-white/95 border border-slate-200 p-5 shadow-2xl text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-purple-500/50 glass-pill p-0.5">
                <Image
                  src="/images/hero-avatar.jpg"
                  alt="Aryan Nair"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-slate-900 font-['Raleway']">
                  Aryan Nair
                </h4>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider">
                    [ONLINE // READY]
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-900"
              aria-label="Close widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mt-3 mb-4 leading-relaxed">
            Hi there! Need a UI/UX design, Next.js frontend, or want to discuss an open role? Let&apos;s talk!
          </p>

          <div className="space-y-2">
            <a
              href="https://wa.me/917009737283"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between shadow-sm"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Quick WhatsApp
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="mailto:nairaryan119@gmail.com"
              className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-[#6d28d9] hover:text-white border border-purple-200 text-[#6d28d9] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Direct Email
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="tel:+917009737283"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6d28d9]" />
                Call Directly
              </span>
              <span className="text-[10px] text-[#6d28d9] font-semibold">+91 70097 37283</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Button with Crisp rgb(109, 40, 217) Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white shadow-xl shadow-purple-600/30 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Open Quick Contact"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>

        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
        )}
      </button>
    </div>
  );
}
