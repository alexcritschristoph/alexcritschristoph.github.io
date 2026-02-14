import Image from "next/image"
import { Mail, GraduationCap, Github } from "lucide-react"

const yearsOfExperience = new Date().getFullYear() - 2013

export function HeroSection() {
  return (
    <section id="about" className="relative overflow-hidden pt-28 pb-4">
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col-reverse md:flex-row md:items-start gap-6 md:gap-8">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <Image
              src="/website_pic.jpg"
              alt="Alex Crits-Christoph"
              width={225}
              height={225}
              className="rounded-full object-cover w-40 h-40 md:w-[225px] md:h-[225px]"
              priority
            />
          </div>
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-4xl lg:text-4xl">
            Alex Crits-Christoph
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            I am a computational microbiologist with {yearsOfExperience} years of experience in genomics. I've worked on a wide range of diverse projects across microbial genomics, evolution, machine learning, and synthetic
            biology. 
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:alexcritschristoph@gmail.com"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              email me
            </a>
            <a
              href="https://scholar.google.com/citations?user=UTO7XJwAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              <GraduationCap className="h-4 w-4" />
              scholar
            </a>
            <a
              href="https://github.com/alexcritschristoph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              <Github className="h-4 w-4" />
              github
            </a>
            <a
              href="https://bsky.app/profile/acritschristoph.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              <svg className="h-4 w-4" viewBox="0 0 568 501" fill="currentColor">
                <path d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 googletag.cmd.push(function() { googletag.display('div-gpt-ad-1684514120498-0'); });383.578C285.169 375.909 284.017 372.431 284 375.306C283.983 372.431 282.831 375.909 280.369 383.578C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z" />
              </svg>
              bluesky
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
