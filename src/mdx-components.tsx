import type { MDXComponents } from 'mdx/types'

function AnchorHeading({ level, children, ...props }: { level: number; children?: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  const text = typeof children === 'string' ? children : ''
  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements

  return (
    // @ts-expect-error dynamic tag
    <Tag id={id} className="group scroll-mt-20" {...props}>
      {children}
      {id && (
        <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity" aria-label="Link to this heading">
          #
        </a>
      )}
    </Tag>
  )
}

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <AnchorHeading level={1} {...props}>
      <span className="text-3xl font-bold tracking-tight mt-8 mb-4 block">{children}</span>
    </AnchorHeading>
  ),
  h2: ({ children, ...props }) => (
    <AnchorHeading level={2} {...props}>
      <span className="text-2xl font-semibold tracking-tight mt-8 mb-3 block border-b border-zinc-200 dark:border-zinc-800 pb-2">{children}</span>
    </AnchorHeading>
  ),
  h3: ({ children, ...props }) => (
    <AnchorHeading level={3} {...props}>
      <span className="text-xl font-semibold mt-6 mb-2 block">{children}</span>
    </AnchorHeading>
  ),
  p: (props) => <p className="my-4 leading-7 text-zinc-700 dark:text-zinc-300" {...props} />,
  pre: (props) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm leading-6 text-zinc-100 border border-zinc-800" {...props} />
  ),
  code: ({ children, ...props }) => {
    const isInline = typeof children === 'string' && !children.includes('\n')
    if (isInline) {
      return (
        <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-zinc-800 dark:text-zinc-200" {...props}>
          {children}
        </code>
      )
    }
    return <code className="font-mono text-sm" {...props}>{children}</code>
  },
  blockquote: (props) => (
    <blockquote className="my-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 pl-4 py-2 text-zinc-700 dark:text-zinc-300 italic" {...props} />
  ),
  table: (props) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700 text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="px-4 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')
    return (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    )
  },
  ul: (props) => <ul className="my-4 ml-6 list-disc space-y-1 text-zinc-700 dark:text-zinc-300" {...props} />,
  ol: (props) => <ol className="my-4 ml-6 list-decimal space-y-1 text-zinc-700 dark:text-zinc-300" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
}

export function useMDXComponents(): MDXComponents {
  return components
}
