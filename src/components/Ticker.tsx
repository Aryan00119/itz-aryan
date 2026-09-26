"use client";

import React from "react";

export default function Ticker() {
  const dataPoints = [
    "UX Design",
    "On Page SEO",
    "Off Page SEO",
    "Blogs SEO",
    "Website Design",
    "Frontend Development",
    "Mobile Interface Design",
  ];

  // Repeat items to ensure continuous coverage on any screen size
  const repeatedItems = [...dataPoints, ...dataPoints, ...dataPoints, ...dataPoints];

  return (
    <section className="relative w-full bg-black py-4 sm:py-5 overflow-hidden select-none border-y border-black">
      {/* Straight Horizontal Infinite Marquee */}
      <div className="flex w-max animate-ticker-straight">
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {repeatedItems.map((item, index) => (
            <span
              key={`set1-${index}`}
              className="flex items-center text-white font-['Courier_Prime',monospace] font-bold uppercase tracking-[0.22em] text-sm sm:text-base md:text-lg whitespace-nowrap"
            >
              <span className="px-5 sm:px-8">{item}</span>
              <span className="text-white select-none">✦</span>
            </span>
          ))}
        </div>

        {/* Set 2 (Identical for seamless loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {repeatedItems.map((item, index) => (
            <span
              key={`set2-${index}`}
              className="flex items-center text-white font-['Courier_Prime',monospace] font-bold uppercase tracking-[0.22em] text-sm sm:text-base md:text-lg whitespace-nowrap"
            >
              <span className="px-5 sm:px-8">{item}</span>
              <span className="text-white select-none">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
