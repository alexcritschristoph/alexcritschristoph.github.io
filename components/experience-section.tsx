import { Briefcase } from "lucide-react"

const experiences = [
  {
    period: "2022 -- 2026",
    role: "Senior Computational Biologist",
    org: "Cultivarium",
    description:
      "Cultivarium is a non-profit focused research organization developing open source tools for microbiology. We have developed new computational approaches, designed open molecular toolkits, and engineered novel organisms.",
  },
  {
    period: "2021 -- 2022",
    role: "Postdoctoral Researcher",
    org: "Johns Hopkins School of Public Health",
    description: "I was a postdoc in Jotham Suez's Lab at JHSPH, studying mechanistic and causative interactions between the gut microbiome and metabolic syndrome.",
  },
  {
    period: "2021",
    role: "Computational Biologist",
    org: "Pattern Ag (merged with EarthOptics)",
    description:
      "I designed and developed the soil metagenomic pipelines to detect the most harmful pathogens of major crops in the US.",
  },
  {
    period: "2016 -- 2021",
    role: "PhD in Microbiology",
    org: "University of California, Berkeley",
    description:
      "I completed my PhD in the laboratory of Jill Banfield on the evolution, ecology, and genomics of microbial specialized metabolisms, primarily using genome-resolved metagenomics.",
  },
  {
    period: "2012 -- 2016",
    role: "B.A. in Biophysics",
    org: "Johns Hopkins University",
    description:
      "Undergraduate studies in biophysics, performing research in the lab of Jocelyne DiRuggiero on metagenomics of extremophiles.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-8 md:py-12">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Experience
            </h2>
            <p className="font-mono text-xs text-muted-foreground">
              // where I've worked
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative ml-4 md:ml-0">
          {/* Vertical line */}
          <div className="absolute left-0 top-1 bottom-1 w-px bg-border md:left-[168px]" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp) => (
              <div
                key={exp.role + exp.org}
                className="group relative flex flex-col gap-1 md:flex-row md:gap-8"
              >
                {/* Period - positioned to the left of the line on desktop */}
                <div className="hidden md:flex md:w-40 md:flex-shrink-0 md:justify-end md:pt-0.5">
                  <span className="font-mono text-sm text-muted-foreground whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                {/* Dot - aligned with the vertical line */}
                <div className="absolute -left-[5px] top-1.5 md:left-[164px]">
                  <div className="h-[11px] w-[11px] rounded-full border-2 border-border bg-background transition-colors group-hover:border-primary group-hover:bg-primary/20" />
                </div>

                {/* Content */}
                <div className="ml-6 flex-1 md:ml-4">
                  {/* Mobile period */}
                  <span className="font-mono text-xs text-muted-foreground md:hidden">
                    {exp.period}
                  </span>
                  <h3 className="font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-sm text-primary">
                    {exp.org}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
