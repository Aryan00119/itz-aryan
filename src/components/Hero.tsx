"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import GridScan from "./GridScan";
import { WhatsAppIcon, LinkedinIcon, InstagramIcon } from "./Icons";

const TYPING_WORDS = ["Aryan Nair", "UI UX Designer", "SEO Expert"];

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 1800) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 300);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words, typingSpeed, deletingSpeed, pauseTime]);

  return words[index].substring(0, subIndex);
}

function formatMobileTypedTitle(text: string) {
  const parts = text.split(" ");
  if (parts.length <= 1) {
    return <span className="text-white">{text}</span>;
  }
  const lastWord = parts[parts.length - 1];
  const leadWords = parts.slice(0, -1).join(" ") + " ";
  return (
    <>
      <span className="text-white">{leadWords}</span>
      <span className="text-[#a855f7] drop-shadow-[0_0_24px_rgba(168,85,247,0.7)]">
        {lastWord}
      </span>
    </>
  );
}

export default function Hero() {
  const typedName = useTypewriter(TYPING_WORDS, 75, 40, 1800);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[620px] md:min-h-[560px] max-h-[920px] bg-[#07060b] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Interactive GridScan 3D Cyber Matrix Background from React Bits */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#c084fc"
          scanOpacity={0.45}
          enablePost={true}
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          scanOnClick={true}
          scanDirection="pingpong"
        />
      </div>

      {/* ===================== MOBILE VIEW (Matches User Mockup) ===================== */}
      <div className="flex md:hidden flex-col justify-between h-full w-full max-w-md mx-auto px-4 pt-28 sm:pt-32 pb-5 z-20 relative">
        {/* Top Text Block: HI, I'M + Title (with purple highlighted word) + Bio */}
        <div data-aos="fade-down" className="flex flex-col items-center text-center">
          <span className="text-[11px] font-mono tracking-[0.25em] text-purple-300 font-bold uppercase mb-1">
            HI, I&apos;M
          </span>
          <h1 className="font-['Raleway'] font-black text-[30px] sm:text-4xl tracking-tight leading-tight mb-2">
            {formatMobileTypedTitle(typedName)}
            <span className="inline-block w-1.5 h-[0.75em] bg-purple-400 ml-1.5 animate-pulse rounded-sm align-middle" />
          </h1>
          <p className="text-white/80 text-[11.5px] sm:text-xs font-medium leading-relaxed font-['Raleway'] max-w-[320px] px-1 drop-shadow-md">
            I create interfaces that blend function with emotion, crafting digital experiences that feel intuitive, seamless, and meaningful.
          </p>
        </div>

        {/* Center: 3D Character Avatar positioned prominently in mobile view */}
        <div
          data-aos="zoom-in"
          data-aos-duration="900"
          className="relative w-full flex-1 flex justify-center items-center pointer-events-none min-h-[250px] my-1"
        >
          <Image
            src="/images/hero-avatar-3d-perfect.png"
            alt="Aryan Nair - UI/UX Designer & Creative Frontend Developer"
            width={896}
            height={1200}
            priority
            className="h-[46vh] sm:h-[50vh] max-h-[440px] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] scale-120 sm:scale-125 transition-transform origin-center"
          />
        </div>

        {/* Bottom Horizontal Dock Row matching Mockup */}
        <div data-aos="fade-up" className="flex items-center justify-between gap-2 w-full pt-1 px-1">
          {/* Monogram A Badge */}
          <div className="w-10 h-10 rounded-full bg-black/85 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-lg">
            <span className="font-['Syne',sans-serif] font-black italic text-base -ml-0.5">
              A
            </span>
          </div>

          {/* Social Buttons (WhatsApp, LinkedIn, Instagram) */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/917009737283?text=Hi%20Aryan,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(109,40,217,0.6)] active:scale-95 transition-transform"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://www.linkedin.com/in/aryan-nair-73b97624b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(109,40,217,0.6)] active:scale-95 transition-transform"
            >
              <LinkedinIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://www.instagram.com/itz_aryan_nair/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(109,40,217,0.6)] active:scale-95 transition-transform"
            >
              <InstagramIcon className="w-4 h-4 fill-current" />
            </a>
          </div>

          {/* Let's Talk CTA */}
          <Link
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-[0_4px_22px_rgba(109,40,217,0.7)] active:scale-95 transition-transform"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* ===================== DESKTOP VIEW (md and up) ===================== */}
      {/* Center Headline with Typewriter Effect */}
      <div
        data-aos="zoom-out"
        data-aos-duration="900"
        className="hidden md:block absolute top-[16%] lg:top-[18%] left-0 w-full text-center z-10 pointer-events-none select-none px-4"
      >
        <h1 className="font-['Raleway'] font-black tracking-tight leading-none text-white flex items-center justify-center whitespace-nowrap">
          <span className="block md:text-[7vw] lg:text-[88px] xl:text-[104px] 2xl:text-[118px] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
            {typedName}
          </span>
          <span className="inline-block w-1.5 lg:w-2 h-[0.7em] bg-purple-400 ml-2 animate-pulse rounded-sm align-middle" />
        </h1>
      </div>

      {/* Centered 3D Character Avatar for Desktop */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 z-20 md:h-[72vh] lg:h-[76vh] max-h-[500px] lg:max-h-[540px] pointer-events-none select-none justify-center items-end"
      >
        <Image
          src="/images/hero-avatar-3d-perfect.png"
          alt="Aryan Nair - UI/UX Designer & Creative Frontend Developer"
          width={896}
          height={1200}
          priority
          className="h-full w-auto max-h-[500px] lg:max-h-[540px] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
        />
      </div>

      {/* Desktop 2-Column Content Overlay Grid */}
      <div className="hidden md:block relative z-30 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pb-5 sm:pb-6 md:pb-7 lg:pb-8 mt-auto pointer-events-auto">
        <div className="grid grid-cols-2 gap-8 items-end">
          {/* Left Column: Mission Statement + Social Icons */}
          <div
            data-aos="fade-right"
            data-aos-delay="250"
            className="flex flex-col items-start gap-3.5 max-w-[240px] lg:max-w-[270px]"
          >
            <p className="text-white/85 text-[11px] lg:text-xs font-medium leading-relaxed font-['Raleway'] drop-shadow-md">
              I create interfaces that blend function with emotion, crafting digital experiences that feel intuitive, seamless, and meaningful.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/917009737283?text=Hi%20Aryan,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_14px_rgba(109,40,217,0.5)]"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-nair-73b97624b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_14px_rgba(109,40,217,0.5)]"
              >
                <LinkedinIcon className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="https://www.instagram.com/itz_aryan_nair/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_14px_rgba(109,40,217,0.5)]"
              >
                <InstagramIcon className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Right Column: Insight Philosophy + Let's Talk CTA */}
          <div
            data-aos="fade-left"
            data-aos-delay="250"
            className="flex flex-col items-end text-right gap-3.5 ml-auto max-w-[240px] lg:max-w-[270px]"
          >
            <p className="text-white/85 text-[11px] lg:text-xs font-medium leading-relaxed font-['Raleway'] drop-shadow-md">
              Merging design thinking with human insight to create digital experiences that don&apos;t just look great — they perform effortlessly.
            </p>

            {/* Let's Talk Pill Button with Arrow Icon Circle */}
            <Link
              href="#contact"
              className="group px-5 py-2.5 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white text-xs font-bold tracking-wide transition-all duration-300 shadow-[0_6px_20px_rgba(109,40,217,0.45)] hover:shadow-[0_8px_26px_rgba(109,40,217,0.65)] hover:scale-105 active:scale-95 flex items-center gap-2.5"
            >
              <span>Let&apos;s Talk</span>
              <span className="w-5 h-5 rounded-full bg-white text-[#6d28d9] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
