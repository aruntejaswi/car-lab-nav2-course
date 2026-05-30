export interface GlossaryEntry {
  term: string
  definition: string
}

export const glossary: Record<string, GlossaryEntry> = {
  gnss: {
    term: "GNSS",
    definition:
      "Global Navigation Satellite System — the umbrella term for satellite-positioning constellations (GPS, GLONASS, Galileo, BeiDou). The robot's ZED-F9P receivers track all of them at once for a faster, more robust fix. Covered in M13.",
  },
  rtk: {
    term: "RTK",
    definition:
      "Real-Time Kinematic — a GNSS technique that measures the signal's carrier wave (~19 cm) instead of the coarse code (~300 m), reaching centimeter accuracy given a correction stream. Its solution climbs none → float → fixed; only 'fixed' is centimeter-grade. Covered in M13.",
  },
  "moving-baseline": {
    term: "moving baseline",
    definition:
      "An RTK mode where the 'base' is a second antenna on the same moving vehicle. Instead of an absolute position correction it yields the precise vector between the two antennas — giving a true-north heading that, unlike a magnetometer, is immune to indoor magnetic interference. Covered in M13.",
  },
  rtcm: {
    term: "RTCM",
    definition:
      "RTCM 3.x — the standard binary format for GNSS correction messages. In this kit the moving-base board streams RTCM (notably type 4072.0 plus MSM7 observations 1077/1087) to the rover so it can resolve a carrier-phase baseline. Covered in M13.",
  },
  "zed-f9p": {
    term: "ZED-F9P",
    definition:
      "A u-blox multi-band (L1/L2) RTK GNSS receiver module. The robot's ArduSimple simpleRTK2B board carries two of them: one acts as the moving base, the other as the rover that computes position and heading. Covered in M13.",
  },
  "navsat-transform": {
    term: "navsat_transform_node",
    definition:
      "A robot_localization node that converts GPS latitude/longitude (NavSatFix) into the robot's local map frame, anchored to a datum, so a global EKF can fuse absolute GPS position with local odometry. Currently commented out in ekf.yaml — the integration step that follows M13.",
  },
  slam: {
    term: "SLAM",
    definition:
      "Simultaneous Localization and Mapping — builds a map of the environment while tracking the robot's position within it. On this robot, SLAM Toolbox runs on the laptop and processes 2D laser scans to produce the /map occupancy grid. Covered in depth in M6.",
  },
  mqtt: {
    term: "MQTT",
    definition:
      "A lightweight publish-subscribe messaging protocol. On this robot, an MQTT broker (mosquitto) runs on the Pi. The control_tower node publishes wheel commands over MQTT to the four ESC microcontrollers, bypassing ROS2 for the final motor-control hop.",
  },
  nav2: {
    term: "Nav2",
    definition:
      "The ROS2 Navigation2 stack — a collection of nodes for path planning, obstacle avoidance, and trajectory following. Runs on the laptop because it's too computationally expensive for the Pi.",
  },
  lidar: {
    term: "LiDAR",
    definition:
      "Light Detection and Ranging — measures distances by firing laser pulses and timing reflections. This robot uses a Velodyne VLP-16 with 16 beams spinning at 10 Hz, producing ~29,000 points per revolution.",
  },
  imu: {
    term: "IMU",
    definition:
      "Inertial Measurement Unit — measures acceleration and rotation rate using accelerometers and gyroscopes. This robot's LSM6DSOX IMU publishes at 100 Hz on the Pi, providing angular velocity data that the EKF fuses with LiDAR odometry.",
  },
  dds: {
    term: "DDS",
    definition:
      "Data Distribution Service — the middleware layer under ROS2 that handles automatic topic discovery and transport between nodes, even across machines. This robot uses Fast-RTPS (eProsima) as its DDS implementation.",
  },
  ekf: {
    term: "EKF",
    definition:
      "Extended Kalman Filter — fuses KISS-ICP LiDAR odometry (10 Hz) with IMU angular velocity (100 Hz) into a single smooth pose estimate published on /odometry/local. Covered in M5.",
  },
  "kiss-icp": {
    term: "KISS-ICP",
    definition:
      "A LiDAR odometry algorithm that estimates robot motion by matching consecutive 3D point clouds. Runs on the laptop and produces /kiss/odometry at ~10 Hz. Covered in M4.",
  },
  urdf: {
    term: "URDF",
    definition:
      "Unified Robot Description Format — an XML file describing the robot's physical structure (links, joints, dimensions). The robot_state_publisher node reads it and broadcasts the TF tree so every node knows where sensors are mounted.",
  },
  ros2: {
    term: "ROS2",
    definition:
      "Robot Operating System 2 — a middleware framework that organizes robot software into independent nodes communicating over topics via publish-subscribe. This robot runs ROS2 Jazzy (May 2024 LTS) on Ubuntu 24.04.",
  },
  costmap: {
    term: "Costmap",
    definition:
      "A 2D grid overlaid on the map where each cell has a cost value (0 = free, 254 = lethal obstacle). Nav2 maintains a global costmap for full-map planning and a local costmap for nearby obstacle avoidance. Covered in M7.",
  },
  odometry: {
    term: "Odometry",
    definition:
      "The estimation of a robot's position change over time based on sensor data. On this robot, KISS-ICP provides LiDAR odometry and the EKF refines it with IMU data. Covered in M4.",
  },
  esc: {
    term: "ESC",
    definition:
      "Electronic Speed Controller — a circuit board that converts a control signal (PWM) into variable current to drive a brushless DC motor at the requested speed and direction. Each of the four wheels has its own ESC, commanded via MQTT.",
  },
  pointcloud2: {
    term: "PointCloud2",
    definition:
      "A ROS2 message type (sensor_msgs/msg/PointCloud2) containing a set of 3D points with optional fields like intensity and ring number. The Velodyne publishes these on /velodyne_points at 10 Hz.",
  },
  tf: {
    term: "TF",
    definition:
      "The ROS2 Transform system — a tree of coordinate frames that lets any node convert a point from one frame to another (e.g., from the LiDAR frame to the map frame). Published on /tf and /tf_static. Covered in M3.",
  },
  systemd: {
    term: "systemd",
    definition:
      "The Linux service manager. On the Pi, sensor and motor drivers run as systemd services (ractor-sensors.service, ractor-controls.service) so they can be started, stopped, and restarted cleanly.",
  },
  rviz2: {
    term: "RViz2",
    definition:
      "The ROS2 3D visualization tool. Runs on the laptop to display point clouds, maps, costmaps, planned paths, and TF frames in real time.",
  },
  udp: {
    term: "UDP",
    definition:
      "User Datagram Protocol — a fast, connectionless network protocol. The Velodyne LiDAR streams raw point data as UDP packets to the Pi's driver node.",
  },
  ntp: {
    term: "NTP",
    definition:
      "Network Time Protocol — keeps clocks synchronized across machines. The laptop runs a Chrony NTP server and the Pi synchronizes to it. Clock sync is critical because ROS2 timestamps from both machines must agree for TF lookups to work.",
  },
  arm64: {
    term: "ARM64",
    definition:
      "The 64-bit ARM CPU architecture used by the Raspberry Pi 4. Relevant because some ROS2 packages need to be compiled from source for ARM64, and it's too slow for SLAM and Nav2.",
  },
  pwm: {
    term: "PWM",
    definition:
      "Pulse Width Modulation — a signal encoding where information is carried in the width of periodic pulses. ESCs interpret PWM to set motor speed: 1500 µs = stop, 1000 µs = full reverse, 2000 µs = full forward.",
  },
  ibus: {
    term: "iBus",
    definition:
      "A serial protocol used by the RC receiver (TGY-IA6B) to send all 8 channel values in a single data frame at 50 Hz over UART. The ibus_reader node on the Pi parses these frames into individual ROS2 topics.",
  },
  "behavior-tree": {
    term: "Behavior Tree",
    definition:
      "A decision-making structure that controls Nav2's high-level logic — deciding when to replan, what to do when the robot gets stuck, and how to sequence recovery behaviors. Covered in M11.",
  },
  ttyama0: {
    term: "/dev/ttyAMA0",
    definition:
      "A UART (Universal Asynchronous Receiver/Transmitter) serial port on the Raspberry Pi — a simple two-wire (TX/RX) hardware interface for sending bytes at a fixed baud rate. The iBus receiver streams its 8-channel RC data over this port at 115,200 baud.",
  },
}
