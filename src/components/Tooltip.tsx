"use client"

import { useState, useRef, useEffect } from "react"

interface TooltipProps {
  term: string
  code?: boolean
  children: React.ReactNode
}

export default function Tooltip({ term, code, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [above, setAbove] = useState(true)
  const triggerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setAbove(rect.top > 200)
    }
  }, [visible])

  return (
    <span className="relative inline-block" ref={triggerRef}>
      <span
        className={`cursor-help border-b border-dashed transition-colors ${
          visible
            ? "border-blue-500 dark:border-blue-400"
            : "border-blue-400/50 dark:border-blue-500/50"
        } ${code ? "font-mono text-[0.9em] bg-zinc-100 dark:bg-zinc-800 rounded px-1 py-0.5" : ""}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {term}
      </span>
      <span
        className={`absolute left-1/2 -translate-x-1/2 z-50 w-72 rounded-lg border border-zinc-200 dark:border-zinc-700 border-b-2 border-b-blue-500 dark:border-b-blue-400 bg-white dark:bg-zinc-800 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50 transition-all duration-150 ease-out ${
          above ? "bottom-full mb-2" : "top-full mt-2"
        } ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : `opacity-0 pointer-events-none ${above ? "translate-y-1" : "-translate-y-1"}`
        }`}
      >
        <span className="block px-4 py-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          {children}
        </span>
        <span
          className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border bg-white dark:bg-zinc-800 ${
            above
              ? "top-full -mt-1 border-b border-r border-zinc-200 dark:border-zinc-700"
              : "bottom-full -mb-1 border-t border-l border-zinc-200 dark:border-zinc-700"
          }`}
        />
      </span>
    </span>
  )
}
