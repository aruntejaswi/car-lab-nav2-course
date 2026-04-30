"use client"

import { useState } from "react"

interface CommandBlockProps {
  command: string
  description?: string
}

export default function CommandBlock({ command, description }: CommandBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {description && (
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900">
        <code className="font-mono text-sm text-zinc-100 overflow-x-auto">
          <span className="text-zinc-500 select-none">$ </span>
          {command}
        </code>
        <button
          onClick={handleCopy}
          className="ml-4 shrink-0 px-2 py-1 rounded text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          aria-label="Copy command"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}
