import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientCarousel from "@/components/ClientCarousel";
import GoogleBadgesCarousel from "@/components/GoogleBadgesCarousel";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import PersonalProjects from "@/components/PersonalProjects";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";
import MobileWhatsAppButton from "@/components/MobileWhatsAppButton";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white text-neutral-900 overflow-x-hidden selection:bg-purple-100 selection:text-purple-900 futuristic-grid">
      {/* AOS Scroll Animation Initializer */}
      <AOSInit />

      {/* Top Floating Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Proudly Worked With Carousel */}
      <ClientCarousel />

      {/* About Me Section */}
      <About />

      {/* Google Developer Badges Carousel */}
      <GoogleBadgesCarousel />

      {/* Curvy Black Strip Marquee */}
      <Ticker />

      {/* Technical Skills & AI Toolkit */}
      <Skills />

      {/* Experience & Education Timeline */}
      <Experience />

      {/* Featured Projects matching Screenshot 3 */}
      <Projects />

      {/* Direct Contact & Collaboration Form */}
      <Contact />

      {/* Personal Projects & Creative Labs */}
      <PersonalProjects />

      {/* Modern Footer */}
      <Footer />

      {/* Floating WhatsApp Action for Mobile View */}
      <MobileWhatsAppButton />
    </main>
  );
}
