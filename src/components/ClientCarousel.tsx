"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  logoAlt: string;
  sizeClass: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "google-dev",
    name: "Google Developer Program",
    logo: "/clients/google-developer-program.png",
    logoAlt: "Google Developer Program Logo",
    sizeClass: "h-12 sm:h-14 w-auto max-w-[190px]",
  },
  {
    id: "google-io",
    name: "Google I/O",
    logo: "/clients/google-io.png",
    logoAlt: "Google I/O Logo",
    sizeClass: "h-12 sm:h-14 w-auto max-w-[180px]",
  },
  {
    id: "the-social-court",
    name: "The Social Court",
    logo: "/clients/the-social-court.png",
    logoAlt: "The Social Court Logo",
    sizeClass: "h-13 sm:h-15 w-auto max-w-[180px]",
  },
  {
    id: "tida-sports",
    name: "TIDA Sports",
    logo: "/clients/tida-sports.png",
    logoAlt: "TIDA Sports Logo",
    sizeClass: "h-11 sm:h-13 w-auto max-w-[200px]",
  },
  {
    id: "anees-school",
    name: "Anee's School",
    logo: "/clients/anees-school.png",
    logoAlt: "Anee's School Logo",
    sizeClass: "h-16 sm:h-18 w-auto max-w-[140px]",
  },
  {
    id: "quantifiers",
    name: "Quantifiers CAT Academy",
    logo: "/clients/quantifiers.png",
    logoAlt: "Quantifiers CAT Academy Logo",
    sizeClass: "h-12 sm:h-14 w-auto max-w-[190px]",
  },
  {
    id: "turfsquad",
    name: "TurfSquad",
    logo: "/clients/turfsquad.png",
    logoAlt: "TurfSquad Logo",
    sizeClass: "h-11 sm:h-13 w-auto max-w-[210px]",
  },
];

// Repeat 4 times for a seamless infinite loop
const MARQUEE_LOGOS = [
  ...CLIENT_LOGOS,
  ...CLIENT_LOGOS,
  ...CLIENT_LOGOS,
  ...CLIENT_LOGOS,
];

export default function ClientCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Manual scroll controls
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="clients"
      className="relative w-full pt-10 sm:pt-14 pb-8 sm:pb-12 overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-white"
    >
      {/* Subtle ambient lighting spot */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#6d28d9] border border-purple-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6d28d9]" />
                // 00 · CLIENT COLLABORATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[0.98] sm:leading-[1.02]">
              <span className="block">
                <span className="font-syne font-black text-slate-950">PROUDLY</span>{" "}
                <span className="font-playfair italic font-bold text-[#6d28d9]">WORKED</span>{" "}
                <span className="font-courier font-bold tracking-[0.08em] text-slate-800">WITH.</span>
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#6d28d9] to-purple-400 rounded-full mt-3" />
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous logo"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-[#6d28d9] text-slate-700 hover:text-[#6d28d9] flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next logo"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-[#6d28d9] text-slate-700 hover:text-[#6d28d9] flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pure Logo Carousel / Marquee */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="relative w-full overflow-hidden"
        >
          {/* Marquee Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-6 sm:gap-10 py-3 overflow-x-auto no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div
              className="flex items-center gap-6 sm:gap-10 animate-marquee"
              style={{ animationDuration: "36s", animationPlayState: "running" }}
            >
              {MARQUEE_LOGOS.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="relative shrink-0 w-[180px] sm:w-[220px] md:w-[240px] h-20 sm:h-24 flex items-center justify-center select-none px-3"
                >
                  {/* Logo Image */}
                  <Image
                    src={client.logo}
                    alt={client.logoAlt}
                    width={240}
                    height={100}
                    style={{ width: "auto" }}
                    className={`${client.sizeClass} object-contain`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
