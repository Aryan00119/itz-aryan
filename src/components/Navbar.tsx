"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Work");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = [
        { id: "hero", name: "Work" },
        { id: "projects", name: "Work" },
        { id: "about", name: "About" },
        { id: "skills", name: "Skills" },
        { id: "experience", name: "Experience" },
        { id: "personal-projects", name: "Experience" },
        { id: "contact", name: "Experience" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
  ];

  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[94vw]">
      {/* Floating Pill Container matching User Reference */}
      <div className="bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-[0_12px_40px_-8px_rgba(109,40,217,0.35),0_2px_8px_rgba(0,0,0,0.04)] px-2.5 sm:px-3 py-2 flex items-center gap-3 sm:gap-6 md:gap-8 transition-all duration-300">
        
        {/* Left: Stylized Black Monogram Badge "A" */}
        <Link
          href="#hero"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black flex items-center justify-center text-white shrink-0 hover:scale-105 active:scale-95 transition-transform shadow-md group"
          aria-label="Aryan Nair Home"
        >
          <span className="font-['Syne',sans-serif] font-black text-xl sm:text-2xl italic tracking-tighter text-white select-none leading-none -ml-0.5 group-hover:text-purple-300 transition-colors">
            A
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.name)}
                className={`text-sm lg:text-[15px] font-semibold transition-all duration-200 relative ${
                  isActive
                    ? "text-black font-bold"
                    : "text-slate-700 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Glossy Black Metallic Pill Button - Download Resume */}
        <a
          href="/Aryan_Nair_CV.pdf"
          download="Aryan_Nair_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="glossy-black-capsule px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center justify-center shrink-0 group cursor-pointer text-decoration-none shadow-md hover:scale-105 active:scale-95 transition-all"
          title="Download Aryan Nair CV"
        >
          <span className="relative z-10 text-white font-semibold text-xs sm:text-sm tracking-normal whitespace-nowrap group-hover:text-purple-200 transition-colors flex items-center gap-2">
            <Download className="w-3.5 h-3.5 text-white/90 group-hover:translate-y-0.5 transition-transform" />
            <span>Download CV</span>
          </span>
        </a>

        {/* Mobile Menu Dropdown Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Menu for remaining links */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 w-full bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-3 flex flex-col gap-1 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => {
                setActiveSection(link.name);
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-700 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/Aryan_Nair_CV.pdf"
            download="Aryan_Nair_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl text-xs font-bold text-white bg-slate-900 hover:bg-[#6d28d9] flex items-center justify-between transition-colors mt-1"
          >
            <span>Download CV</span>
            <Download className="w-3.5 h-3.5 text-white/90" />
          </a>
        </div>
      )}
    </header>
  );
}

