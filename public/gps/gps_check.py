#!/usr/bin/env python3
"""Read-only validation of an ArduSimple simpleRTK2B (u-blox ZED-F9P) over USB.

Auto-detects /dev/cu.usbmodem*, captures the stream for a few seconds, then
reports: sentence/message types seen, NMEA/UBX presence, fix quality, sat count,
HDOP, position, stream rate, and heading availability.
"""
import glob
import sys
import time
from collections import Counter


def find_port(explicit=None):
    if explicit:
        return explicit
    cands = sorted(glob.glob("/dev/cu.usbmodem*") + glob.glob("/dev/cu.usbserial*"))
    return cands[0] if cands else None


def nmea_ok(line):
    """Validate a NMEA checksum. line like '$GxGGA,...*HH'."""
    if "*" not in line or not line.startswith("$"):
        return False
    body, _, cksum = line[1:].partition("*")
    try:
        calc = 0
        for ch in body:
            calc ^= ord(ch)
        return calc == int(cksum[:2], 16)
    except ValueError:
        return False


FIX_QUALITY = {
    "0": "no fix", "1": "GPS (SPS)", "2": "DGPS", "3": "PPS",
    "4": "RTK FIXED", "5": "RTK FLOAT", "6": "dead reckoning",
}


def main():
    port = find_port(sys.argv[1] if len(sys.argv) > 1 else None)
    dur = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    if not port:
        print("NO DEVICE: no /dev/cu.usbmodem* found. Is the POWER+GPS USB plugged in?")
        sys.exit(2)

    import serial  # pyserial

    print(f"Port: {port}   capture: {dur}s")
    last_err = None
    for baud in (115200, 38400, 9600):
        try:
            ser = serial.Serial(port, baud, timeout=1)
            break
        except Exception as e:  # noqa: BLE001
            last_err = e
    else:
        print(f"OPEN FAILED: {last_err}")
        sys.exit(2)

    sentence_counts = Counter()
    ubx_frames = 0
    nmea_lines = 0
    nmea_bad = 0
    best = {"fix": None, "sats": None, "hdop": None,
            "lat": None, "lon": None, "alt": None}
    heading = {"seen": False, "valid": False, "deg": None}
    sample_lines = []

    buf = b""
    start = time.time()
    raw_total = 0
    while time.time() - start < dur:
        chunk = ser.read(512)
        if not chunk:
            continue
        raw_total += len(chunk)
        buf += chunk
        ubx_frames += buf.count(b"\xb5\x62")

        while b"\n" in buf:
            raw, _, buf = buf.partition(b"\n")
            line = raw.decode("ascii", "replace").strip()
            if not line.startswith("$"):
                continue
            nmea_lines += 1
            if not nmea_ok(line):
                nmea_bad += 1
                continue
            stype = line[1:6]
            sentence_counts[stype] += 1
            if len(sample_lines) < 8:
                sample_lines.append(line)
            f = line.split(",")
            tail = stype[2:]
            try:
                if tail == "GGA":
                    best["fix"] = FIX_QUALITY.get(f[6], f[6])
                    best["sats"] = f[7]
                    best["hdop"] = f[8]
                    if f[2] and f[4]:
                        best["lat"] = f[2] + f[3]
                        best["lon"] = f[4] + f[5]
                        best["alt"] = f[9] + f[10]
                elif tail in ("HDT", "THS", "ROT"):
                    heading["seen"] = True
                    if f[1]:
                        heading["valid"] = True
                        heading["deg"] = f[1]
            except IndexError:
                pass
    ser.close()

    elapsed = time.time() - start
    print(f"\n=== RAW ===\nbytes: {raw_total}  (~{raw_total/elapsed:.0f} B/s)")
    print(f"UBX binary sync frames (0xB5 0x62): {ubx_frames}")
    print(f"NMEA lines: {nmea_lines}  (bad checksum: {nmea_bad})")
    if not nmea_lines and not ubx_frames:
        print("\nNo recognizable data. Device may be byte-streaming UBX only, "
              "or wrong port. Try a different cable/port.")
    print("\n=== NMEA sentence types (count) ===")
    for k, v in sorted(sentence_counts.items()):
        print(f"  {k}: {v}  (~{v/elapsed:.1f} Hz)")
    print("\n=== FIX ===")
    for k in ("fix", "sats", "hdop", "lat", "lon", "alt"):
        print(f"  {k}: {best[k]}")
    print("\n=== HEADING (moving baseline) ===")
    print(f"  heading sentence seen: {heading['seen']}")
    print(f"  heading valid: {heading['valid']}  value: {heading['deg']}")
    print("\n=== sample sentences ===")
    for s in sample_lines:
        print("  " + s)


if __name__ == "__main__":
    main()
