import React from "react";

export function FigmaLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

export function CanvaLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/canva.png"
      alt="Canva"
      className={`${className} object-contain rounded-md shrink-0`}
    />
  );
}

export function NextJsLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/nextjs.png"
      alt="Next.js"
      className={`${className} object-contain rounded-full shrink-0`}
    />
  );
}

export function MernStackLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/mern.png"
      alt="MERN Stack"
      className={`${className} object-contain shrink-0`}
    />
  );
}

export function ReactLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function JavaScriptLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#F7DF1E" />
      <path
        d="M13.5 36.5l3.2-1.9c.7 1.3 1.6 2.3 3.3 2.3 1.7 0 2.8-.7 2.8-2.5v-14h4.1v14.1c0 4.1-2.4 6-6.6 6-3.4 0-5.6-1.7-6.8-4zm15.4-.5l3.2-1.9c.9 1.5 2.2 2.6 4.3 2.6 1.8 0 3-.9 3-2.1 0-1.5-1.2-2-3.3-2.9l-1.1-.5c-3.3-1.4-5.4-3.1-5.4-6.8 0-3.4 2.6-5.9 6.7-5.9 2.9 0 5 1.1 6.3 3.4l-3.1 2c-.7-1.2-1.6-1.7-3.2-1.7-1.5 0-2.5.9-2.5 2 0 1.3.9 1.8 2.8 2.6l1.1.5c3.8 1.6 5.9 3.3 5.9 7.2 0 4.1-3.2 6.3-7.3 6.3-4.1 0-6.7-2-7.5-4.8z"
        fill="#000000"
      />
    </svg>
  );
}

export function HtmlCssLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/html-css.png"
      alt="HTML5 & CSS3"
      className={`${className} object-contain shrink-0`}
    />
  );
}

export function SeoLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/seo.png"
      alt="SEO"
      className={`${className} object-contain shrink-0`}
    />
  );
}

export function GoogleSearchConsoleLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Search Console Google 4-Color Diagnostic Emblem */}
      <rect width="48" height="48" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <path d="M11 16h26v20H11z" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* Terminal Bar */}
      <rect x="11" y="16" width="26" height="5" fill="#3B82F6" />
      <circle cx="14" cy="18.5" r="1" fill="#FFFFFF" />
      <circle cx="17" cy="18.5" r="1" fill="#FFFFFF" />
      {/* Search Lens + Diagnostic Tool */}
      <circle cx="22" cy="28" r="5" stroke="#EA4335" strokeWidth="2" />
      <path d="M26 32l5 5" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" />
      {/* Green Performance Graph Line */}
      <path d="M14 31l4-3 4 2 6-6" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="24" r="1.5" fill="#FBBC05" />
    </svg>
  );
}

export function ClaudeLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/claude.png"
      alt="Anthropic Claude"
      className={`${className} object-cover rounded-md shrink-0`}
    />
  );
}

export function AntigravityLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/antigravity.png"
      alt="Google Antigravity"
      className={`${className} object-cover rounded-md shrink-0`}
    />
  );
}

export function ChatGptLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/chatgpt.png"
      alt="ChatGPT"
      className={`${className} object-contain rounded-md shrink-0`}
    />
  );
}

export function GeminiLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A73E8" />
          <stop offset="50%" stopColor="#8E44AD" />
          <stop offset="100%" stopColor="#EA4335" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* 4-Point Prismatic Star */}
      <path
        d="M24 8C24 16.8366 16.8366 24 8 24C16.8366 24 24 31.1634 24 40C24 31.1634 31.1634 24 40 24C31.1634 24 24 16.8366 24 8Z"
        fill="url(#geminiGrad)"
      />
    </svg>
  );
}

export function DeepSeekLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/deepseek.png"
      alt="DeepSeek"
      className={`${className} object-contain shrink-0`}
    />
  );
}

export function StickAiLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/logos/stitch.png"
      alt="Google Stitch"
      className={`${className} object-contain rounded-md shrink-0 bg-[#0d0e12] p-0.5`}
    />
  );
}

export const GoogleStitchLogo = StickAiLogo;

export function GoogleLabsLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Google Scientific Research Flask */}
      <path
        d="M21 12h6v6l7 12c1.2 2 .5 4.5-1.5 5.5-.6.3-1.3.5-2 .5H17.5c-2.2 0-4-1.8-4-4 0-.7.2-1.4.5-2l7-12v-6z"
        stroke="#4285F4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chemical Liquid Layers (Google 4 Colors) */}
      <path d="M16 28h16l2 4c.4.8.4 1.7 0 2.5H14c-.4-.8-.4-1.7 0-2.5l2-4z" fill="#34A853" />
      <circle cx="21" cy="25" r="2" fill="#FBBC05" />
      <circle cx="27" cy="23" r="1.5" fill="#EA4335" />
      {/* Top Stopper */}
      <rect x="20" y="10" width="8" height="2" rx="1" fill="#4285F4" />
    </svg>
  );
}

export function BlackboxLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#09090B" stroke="#27272A" strokeWidth="1.5" />
      {/* Black Box 3D Isometric Cube with Neon Code Brackets */}
      <path d="M24 12l11 6v12l-11 6-11-6V18l11-6z" stroke="#06B6D4" strokeWidth="2" fill="#18181B" />
      <path d="M24 12v12l11 6M24 24l-11 6" stroke="#06B6D4" strokeWidth="1.5" strokeOpacity="0.7" />
      {/* Terminal Code Cursor in Center */}
      <path d="M20 22l3 2-3 2" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
