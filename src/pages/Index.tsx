import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ChatbotLauncher } from "@/components/portfolio/ChatbotLauncher";
import { StructuredData } from "@/components/StructuredData";

const Index = () => {
  return (
    <>
      <StructuredData />
      <a
        href="#main-content"
        className="fixed left-4 top-0 z-[100] -translate-y-full rounded-b-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow outline-none ring-offset-background transition-transform focus:translate-y-0 focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <main id="main-content" className="relative min-h-screen overflow-x-hidden" tabIndex={-1}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
        <Footer />
        <ChatbotLauncher />
      </main>
    </>
  );
};

export default Index;
