import Sidebar from "@/components/Sidebar"

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:pl-0">
        <div className="max-w-3xl mx-auto px-6 py-10 lg:px-10">
          <div className="mdx-content">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
