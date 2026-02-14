import { Nav } from "@/components/nav"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { PublicationsSection } from "@/components/publications-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        {/* Global tiled grid background */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(173 70% 52%) 1px, transparent 1px), linear-gradient(90deg, hsl(173 70% 52%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <PublicationsSection />
      </main>
      <Footer />
    </>
  )
}
