import { Github, Mail, GraduationCap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-foreground">
              ACC
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              / Alex Crits-Christoph
            </span>
          </div>

        </div>

        <div className="mt-8 text-center">
        </div>
      </div>
    </footer>
  )
}
