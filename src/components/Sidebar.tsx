"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const modules = [
  { number: 0, title: "Orientation", slug: "0-orientation" },
  { number: 1, title: "LiDAR", slug: "1-lidar" },
  { number: 2, title: "IMU", slug: "2-imu" },
  { number: 3, title: "TF", slug: "3-tf" },
  { number: 4, title: "Odometry", slug: "4-odometry" },
  { number: 5, title: "Sensor Fusion", slug: "5-sensor-fusion" },
  { number: 6, title: "SLAM", slug: "6-slam" },
  { number: 7, title: "Costmaps", slug: "7-costmaps" },
  { number: 8, title: "Path Planning", slug: "8-path-planning" },
  { number: 9, title: "Path Following", slug: "9-path-following" },
  { number: 10, title: "Motor Control", slug: "10-motor-control" },
  { number: 11, title: "Behavior Tree", slug: "11-behavior-tree" },
  { number: 12, title: "Integration", slug: "12-integration" },
  { number: 13, title: "GPS", slug: "13-gps" },
]

const tutorials = [
  { title: "Alpamayo VLA", slug: "alpamayo" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm"
        aria-label="Toggle navigation"
      >
        <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto transition-transform lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <Link href="/" className="flex items-center gap-2 mb-6" onClick={() => setOpen(false)}>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Schoolbus Nav2</span>
          </Link>
          <nav>
            <ul className="space-y-1">
              {modules.map((mod) => {
                const href = `/modules/${mod.slug}`
                const active = pathname === href || pathname.startsWith(href + "/")
                return (
                  <li key={mod.slug}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                      }`}
                    >
                      <span className={`shrink-0 w-7 h-7 flex items-center justify-center rounded text-xs font-bold ${
                        active
                          ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                      }`}>
                        {mod.number}
                      </span>
                      <span>{mod.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Tutorials
              </p>
              <ul className="space-y-1">
                {tutorials.map((tut) => {
                  const href = `/tutorials/${tut.slug}`
                  const active = pathname === href || pathname.startsWith(href + "/")
                  return (
                    <li key={tut.slug}>
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                        }`}
                      >
                        <span className={`shrink-0 w-7 h-7 flex items-center justify-center rounded text-xs font-bold ${
                          active
                            ? "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                        }`}>
                          T
                        </span>
                        <span>{tut.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
