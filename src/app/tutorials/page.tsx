import Link from "next/link"

const tutorials = [
  {
    title: "Running NVIDIA Alpamayo on a Ground Robot",
    description: "Domain transfer of a 10B Vision-Language-Action model from autonomous driving to a slow ground robot with a single camera",
    slug: "alpamayo",
    tags: ["VLA", "NVIDIA", "Domain Transfer"],
  },
]

export default function TutorialsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-8 mb-4">
        Tutorials
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-7">
        Deep dives into specific topics beyond the core Nav2 curriculum. These tutorials
        explore advanced research and experimental integrations with the school bus robot.
      </p>

      <div className="grid grid-cols-1 gap-4">
        {tutorials.map((tut) => (
          <Link
            key={tut.slug}
            href={`/tutorials/${tut.slug}`}
            className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold text-sm">
                T
              </span>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {tut.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-6">
                  {tut.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tut.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
