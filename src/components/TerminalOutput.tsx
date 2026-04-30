"use client"

interface TerminalOutputProps {
  title?: string
  children: React.ReactNode
}

export default function TerminalOutput({ title, children }: TerminalOutputProps) {
  return (
    <div className="my-6 rounded-lg border border-zinc-700 bg-zinc-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {title && <span className="ml-3 text-sm text-zinc-400 font-mono">{title}</span>}
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-900/50 text-green-400 border border-green-800">
          Captured from real robot
        </span>
      </div>
      <div className="p-4 overflow-x-auto font-mono text-sm leading-6 text-green-400 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  )
}
