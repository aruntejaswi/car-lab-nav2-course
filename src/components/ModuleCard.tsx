import Link from "next/link"

interface ModuleCardProps {
  number: number
  title: string
  description: string
  prerequisites?: string[]
  href: string
}

export default function ModuleCard({ number, title, description, prerequisites, href }: ModuleCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-zinc-900 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm">
          M{number}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
          {prerequisites && prerequisites.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {prerequisites.map((prereq) => (
                <span
                  key={prereq}
                  className="inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
                >
                  {prereq}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
