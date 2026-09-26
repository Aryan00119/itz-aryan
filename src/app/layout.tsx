import type { Metadata, Viewport } from "next";
import { Raleway, Courier_Prime } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aryan Nair | UI/UX Designer & Creative Frontend Developer",
  description:
    "Portfolio of Aryan Nair — Creative UI/UX Designer & Frontend Developer specializing in Figma, Next.js, AI SEO, and crafting human-centered digital experiences that drive measurable business growth.",
  keywords: [
    "Aryan Nair",
    "UI/UX Designer",
    "Frontend Developer",
    "Next.js Portfolio",
    "Figma Designer",
    "Creative Web Developer",
    "Product Designer",
    "TIDA Sports",
  ],
  authors: [{ name: "Aryan Nair" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${courierPrime.variable} font-raleway scroll-smooth`}
    >
      <body className="font-raleway antialiased bg-white text-neutral-900 min-h-screen flex flex-col selection:bg-purple-100 selection:text-purple-900">
        {children}
      </body>
    </html>
  );
}
