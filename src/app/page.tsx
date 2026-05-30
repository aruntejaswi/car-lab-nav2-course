import ModuleCard from "@/components/ModuleCard"

const modules = [
  { number: 0, title: "Orientation", description: "The robot, the network, and ROS2 basics", prerequisites: undefined, href: "/modules/0-orientation" },
  { number: 1, title: "LiDAR", description: "Seeing the world in 3D point clouds", prerequisites: ["M0"], href: "/modules/1-lidar" },
  { number: 2, title: "IMU", description: "Measuring orientation and angular velocity", prerequisites: ["M0"], href: "/modules/2-imu" },
  { number: 3, title: "TF", description: "The coordinate frame tree", prerequisites: ["M0"], href: "/modules/3-tf" },
  { number: 4, title: "Odometry", description: "KISS-ICP LiDAR odometry", prerequisites: ["M1", "M3"], href: "/modules/4-odometry" },
  { number: 5, title: "Sensor Fusion", description: "EKF localization", prerequisites: ["M2", "M4"], href: "/modules/5-sensor-fusion" },
  { number: 6, title: "SLAM", description: "Building the map", prerequisites: ["M1", "M3", "M5"], href: "/modules/6-slam" },
  { number: 7, title: "Costmaps", description: "Where can the robot go?", prerequisites: ["M1", "M6"], href: "/modules/7-costmaps" },
  { number: 8, title: "Path Planning", description: "SmacPlannerHybrid and Hybrid A*", prerequisites: ["M7"], href: "/modules/8-path-planning" },
  { number: 9, title: "Path Following", description: "Regulated Pure Pursuit controller", prerequisites: ["M8"], href: "/modules/9-path-following" },
  { number: 10, title: "Motor Control", description: "From cmd_vel to wheel motion", prerequisites: ["M9"], href: "/modules/10-motor-control" },
  { number: 11, title: "Behavior Tree", description: "Nav2 decision making", prerequisites: ["M8", "M9"], href: "/modules/11-behavior-tree" },
  { number: 12, title: "Integration", description: "The full stack end-to-end", prerequisites: ["All"], href: "/modules/12-integration" },
  { number: 13, title: "GPS", description: "RTK position and moving-baseline heading", prerequisites: ["M2", "M5"], href: "/modules/13-gps" },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/car-logo.png"
              alt="CAR Lab logo"
              width={40}
              height={34}
              className="shrink-0"
            />
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              CAR Lab — Computer science Autonomous Robotics
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Learning Nav2 from Scratch
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            A 14-module robotics course built around a real autonomous school bus.
            Every concept taught with data captured from physical hardware — Velodyne LiDAR,
            IMU, GPS, and double-Ackermann steering on ROS2 Jazzy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 font-medium">ROS2 Jazzy</span>
            <span className="rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 font-medium">Nav2</span>
            <span className="rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-3 py-1 font-medium">Real Hardware</span>
            <span className="rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-3 py-1 font-medium">Raspberry Pi</span>
          </div>
        </div>
      </header>

      {/* Learning path description */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">The Learning Path</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl">
          Start with M0 (Orientation) to understand the robot and ROS2 basics. Modules build on
          each other following the data flow: sensors produce data, odometry tracks motion, SLAM
          builds maps, and Nav2 plans and follows paths. Prerequisites are shown on each card.
        </p>

        {/* Dependency flow diagram */}
        <div className="mb-10 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 leading-6 whitespace-pre">{`  M0 Orientation
  ├── M1 LiDAR     ├── M2 IMU     ├── M3 TF
  │       └────────────────┐  │         │
  │                   M4 Odometry      │
  │                        │           │
  │                   M5 Sensor Fusion─┘
  │                        │
  ├───── M6 SLAM ──────────┘
  │         │
  │    M7 Costmaps
  │         │
  │    M8 Path Planning
  │       ├──── M9 Path Following
  │       │          │
  │       │     M10 Motor Control
  │       │
  │       └──── M11 Behavior Tree
  │
  └──── M12 Integration (all modules)

  M13 GPS (optional) ──▶ absolute position + heading into the global EKF (cf. M5)`}</pre>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <ModuleCard key={mod.number} {...mod} />
          ))}
        </div>
      </section>

      {/* Tutorials */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Tutorials</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl">
          Deep dives into advanced topics and experimental integrations with the school bus robot.
        </p>
        <a
          href="/tutorials/alpamayo"
          className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-sm transition-all max-w-xl"
        >
          <div className="flex items-start gap-4">
            <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold text-sm">
              T
            </span>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                Running NVIDIA Alpamayo on a Ground Robot
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-6">
                Domain transfer of a 10B Vision-Language-Action model from autonomous driving to a slow ground robot with a single camera.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-xs font-medium">VLA</span>
                <span className="rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-xs font-medium">NVIDIA</span>
                <span className="rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-xs font-medium">Domain Transfer</span>
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-zinc-500 dark:text-zinc-500">
          CAR Lab — Computer science Autonomous Robotics. Built with real robot data. Powered by Next.js, MDX, and ROS2.
        </div>
      </footer>
    </div>
  )
}
