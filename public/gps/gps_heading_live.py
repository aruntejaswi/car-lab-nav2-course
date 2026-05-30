#!/usr/bin/env python3
"""Live monitor of UBX NAV-RELPOSNED + NAV-PVT to watch moving-baseline convergence.

Read-only. Prints each RELPOSNED frame as it arrives so we can see carrSoln
progress (none -> float -> fixed) and whether a baseline ever forms.
"""
import struct
import sys
import time


def main():
    port = sys.argv[1] if len(sys.argv) > 1 else "/dev/cu.usbmodemROVER1"
    dur = int(sys.argv[2]) if len(sys.argv) > 2 else 90
    import serial

    ser = serial.Serial(port, 115200, timeout=1)
    print(f"Port: {port}  monitor: {dur}s\n")
    buf = b""
    start = time.time()
    last_pvt = 0.0
    pvt_info = ""
    while time.time() - start < dur:
        buf += ser.read(1024)
        while True:
            i = buf.find(b"\xb5\x62")
            if i < 0 or len(buf) - i < 6:
                break
            cls, mid, length = struct.unpack_from("<BBH", buf, i + 2)
            if len(buf) - i < 6 + length + 2:
                break
            p = buf[i + 6: i + 6 + length]
            buf = buf[i + 6 + length + 2:]
            t = time.time() - start

            if cls == 0x01 and mid == 0x07 and len(p) >= 92:  # NAV-PVT
                if t - last_pvt >= 5:
                    last_pvt = t
                    fixType = p[20]
                    flags = p[21]
                    numSV = p[23]
                    ftxt = {0: "none", 1: "DR", 2: "2D", 3: "3D",
                            4: "GNSS+DR", 5: "time"}.get(fixType, fixType)
                    carr_pvt = (flags >> 6) & 0x3
                    pvt_info = (f"[rover fix={ftxt} numSV={numSV} "
                                f"carrSoln={['none','float','fixed'][carr_pvt]}]")

            if cls == 0x01 and mid == 0x3C and len(p) >= 64:  # NAV-RELPOSNED v1
                relPosLength = struct.unpack_from("<i", p, 20)[0]
                relPosHeading = struct.unpack_from("<i", p, 24)[0]
                accLength = struct.unpack_from("<I", p, 48)[0]
                accHeading = struct.unpack_from("<I", p, 52)[0]
                fl = struct.unpack_from("<I", p, 60)[0]
                carr = (fl >> 3) & 0x3
                print(f"t={t:5.1f}s  carrSoln={['none','float','fixed'][carr]:5} "
                      f"relPosValid={bool(fl & 0x4)!s:5} "
                      f"hdgValid={bool(fl & 0x100)!s:5} "
                      f"baseline={relPosLength/100:.3f}m "
                      f"heading={relPosHeading*1e-5:7.2f}deg "
                      f"accHdg={accHeading*1e-5:.2f} {pvt_info}")
    ser.close()


if __name__ == "__main__":
    main()
