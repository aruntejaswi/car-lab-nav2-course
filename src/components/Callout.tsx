interface CalloutProps {
  type: "why" | "see" | "warning"
  children: React.ReactNode
}

const config = {
  why: {
    title: "Why This Matters",
    icon: "\u{1F4A1}",
    border: "border-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    titleColor: "text-amber-800 dark:text-amber-300",
  },
  see: {
    title: "What You Will See",
    icon: "\u{1F441}",
    border: "border-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    titleColor: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    title: "Common Mistake",
    icon: "\u{26A0}\u{FE0F}",
    border: "border-red-500",
    bg: "bg-red-50 dark:bg-red-950/20",
    titleColor: "text-red-800 dark:text-red-300",
  },
}

export default function Callout({ type, children }: CalloutProps) {
  const c = config[type]
  return (
    <div className={`my-6 rounded-lg border-l-4 ${c.border} ${c.bg} p-4`}>
      <div className={`flex items-center gap-2 font-semibold text-sm ${c.titleColor} mb-2`}>
        <span>{c.icon}</span>
        <span>{c.title}</span>
      </div>
      <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-6">
        {children}
      </div>
    </div>
  )
}
