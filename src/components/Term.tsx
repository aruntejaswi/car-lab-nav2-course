"use client"

import Tooltip from "./Tooltip"
import { glossary } from "@/lib/glossary"

interface TermProps {
  id: string
  code?: boolean
  children?: React.ReactNode
}

export default function Term({ id, code, children }: TermProps) {
  const entry = glossary[id]

  if (!entry) {
    return <span>{id}</span>
  }

  const isCodeTerm = code ?? ["/", "."].some((ch) => entry.term.includes(ch))

  return (
    <Tooltip term={entry.term} code={isCodeTerm}>
      {children ?? entry.definition}
    </Tooltip>
  )
}
