import { FolderGit2, ExternalLink } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Discovering novel soil microbes",
    description:
      "Using genome-resolved metagenomics, I identified deep branching lineages of soil Acidobacteria with genes for production of diverse natural products.",
    image: "/soil.jpg",
    links: [
      { label: "Crits-Christoph 2018 (Nature)", url: "https://www.nature.com/articles/s41586-018-0207-y" },
      { label: "UC Berkeley news", url: "https://vcresearch.berkeley.edu/news/soil-prospecting-yields-wealth-potential-antibiotics" },
      { label: "Phys.org", url: "https://phys.org/news/2018-06-genetic-soil-prospecting-yields-wealth.html" }

    ],
  },
  {
    title: "SARS-CoV-2 variant sewage surveillance",
    description:
      "Worked on a cross-disciplinary project at UC Berkeley to be one of the first in the world to track exact viral variants using wastewater epidemiology.",
    image: "/sewage.jpg",
    links: [
      { label: "Crits-Christoph 2021 (mBio)", url: "https://journals.asm.org/doi/full/10.1128/mbio.02703-20" },
      { label: "GitHub", url: "https://github.com/alexcritschristoph/wastewater_sarscov2" },
      { label: "Protocols.io", url: "https://www.protocols.io/view/direct-wastewater-rna-capture-and-purification-via-bi3dkgi6" },
    ],
  },
  {
    title: "Wildlife origin of SARS-CoV-2",
    description:
      "Performed the metagenomic analysis of animal wildlife at the market origin of the COVID-19 pandemic to identify the most plausible intermediate viral hosts.",
    image: "/wildlife.jpg",
    links: [
      { label: "Crits-Christoph 2024 (Cell)", url: "https://www.cell.com/cell/fulltext/S0092-8674(24)00901-2" },
      { label: "Github", url: "https://doi.org/10.1126/science.abp8715" },
      { label: "NPR", url: "https://www.npr.org/2024/09/19/g-s1-23605/covid-pandemic-origins-wet-market-wuhan-lab-leak-raccoon-dogs" },
      { label: "BBC", url: "https://www.bbc.com/news/articles/cy8095xjg4po" },
      { label: "CNN", url: "https://www.cnn.com/2024/09/19/health/huanan-animal-market-analysis-covid-19" },

    ],
  },
  {
    title: "Engineering Ideonella sakaiensis",
    description:
      "Published the first genetic tools for the plastic-degrading microbe I. sakaiensis, developing and analyzing a randomly-barcoded mutant library to identify genes involved in plastic degradation.",
    image: "/ideonella.png",
    links: [
      { label: "Crits-Christoph 2025 (bioRxiv)", url: "https://www.biorxiv.org/content/10.1101/2025.11.11.687616v1.full" },
      { label: "GitHub", url: "https://github.com/cultivarium/Piscinibacter_sakaiensis_RB_TnSeq" },

    ],
  },
  {
    title: "MicrobeMod: prokaryotic methylation detection",
    description:
      "Developed MicrobeMod, the earliest software for identifying patterns of three types of prokaryotic methylation using R10 Oxford Nanopore sequencing.",
    image: "/microbemod.jpg",
    links: [
      { label: "Crits-Christoph 2023 (bioRxiv)", url: "https://www.biorxiv.org/content/10.1101/2023.11.13.566931v1" },
      { label: "GitHub", url: "https://github.com/cultivarium/MicrobeMod" },
    ],
  },
  {
    title: "Bayesian optimization for electroporation",
    description:
      "Designed a bayesian optimization algorithm to identify optimal microbial electroporation conditions, leading to an improved electroporation protocol for Cupriavidus necator.",
    image: "/electroporation.png",
    links: [
      { label: "Brumwell 2025 (bioRxiv)", url: "https://www.biorxiv.org/content/10.1101/2025.11.18.689155v1" },
      { label: "GitHub", url: "https://github.com/cultivarium/electroporation-bayesian-optimization" },

    ],
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-6 md:py-8">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
            <FolderGit2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Projects
            </h2>
            <p className="font-mono text-xs text-muted-foreground">
              // a few of the things I've built or discovered
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-background/40" />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="mb-1.5 text-base font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {project.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-emerald-700 transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
