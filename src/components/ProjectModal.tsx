"use client";

import React from "react";
import Image from "next/image";
import { X, ExternalLink, CheckCircle2, Sparkles, Layers } from "lucide-react";

export interface ProjectData {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  role: string;
  year: string;
  challenge: string;
  solution: string;
  impact: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative hud-bracket w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-800 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with Glass Pill */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full glass-pill border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all z-20 bg-slate-50"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Title with Futuristic Blueprint Tag */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-50 text-[#6d28d9] border border-purple-200">
              SYS.INSPECT // {project.id.toUpperCase()}
            </span>
            <span className="text-[#6d28d9] text-xs font-black tracking-[0.25em] uppercase">
              {project.category}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 mt-1 font-['Raleway']">
            {project.title}
          </h3>
          <p className="text-slate-500 text-sm mt-1 font-['Raleway']">{project.tagline}</p>
        </div>

        {/* Project Image Mockup */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 mb-6 bg-slate-100 shadow-md">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Project Meta Info with Light Box & Monospace Tags */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 font-mono">
          <div>
            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">[ROLE]</span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 font-sans">{project.role}</p>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">[TIMELINE]</span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 font-sans">{project.year}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">[FOCUS]</span>
            <p className="text-xs sm:text-sm font-semibold text-[#6d28d9] mt-0.5 font-sans">UI/UX &amp; Frontend</p>
          </div>
        </div>

        {/* The Challenge & Solution */}
        <div className="space-y-4 mb-6 text-sm leading-relaxed text-slate-600 font-['Raleway']">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6d28d9] mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              // CHALLENGE_ANALYSIS
            </h4>
            <p>{project.challenge}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6d28d9] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              // SOLUTION_EXECUTION
            </h4>
            <p>{project.solution}</p>
          </div>
        </div>

        {/* Impact Highlights with Light Box */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-purple-50/60 border border-purple-200">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-purple-900 mb-2.5">
            // MEASURABLE_IMPACT_METRICS
          </h4>
          <ul className="space-y-2">
            {project.impact.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-['Raleway']">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Technologies &amp; Tools Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full glass-pill border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md shadow-purple-600/25"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
