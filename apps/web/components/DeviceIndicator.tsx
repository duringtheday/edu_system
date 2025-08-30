"use client";
import React from "react";
import { getDevices, heartbeatCurrent, upsertCurrentDevice, colorForDevice } from "../lib/devices";

// quick cookie check
function hasTokenCookie(): boolean {
  if (typeof document === "undefined") return false;
  return /(?:^|;\s*)eduos_token=/.test(document.cookie);
}

export default function DeviceIndicator() {
  const authed = hasTokenCookie();
  const [open, setOpen] = React.useState(false);
  const [tick, setTick] = React.useState(0);

  // When authenticated, ensure current device exists
  React.useEffect(() => {
    if (!authed) return;
    upsertCurrentDevice();
  }, [authed]);

  // Heartbeat only while authenticated
  React.useEffect(() => {
    if (!authed) return;
    heartbeatCurrent();
    const id = setInterval(() => {
      heartbeatCurrent();
      setTick(t => t + 1);
    }, 30_000);
    return () => clearInterval(id);
  }, [authed]);

  // When logged out, ignore any stored devices (show neutral state)
  const devices = React.useMemo(() => (authed ? getDevices() : []), [authed, tick]);
  const total = devices.length;
  const activeCount = devices.filter(d => colorForDevice(d) === "#16A34A").length;

  // Colors:
  // Logged OUT  -> outer white, inner gray
  // Logged IN   -> outer blue if any device, white if none
  //               inner green if any active, red if none active, gray if none
  const outerBg = authed ? (total > 0 ? "rgba(11,95,255,.15)" : "#FFFFFF") : "#FFFFFF";
  const innerColor = authed
    ? (total === 0 ? "#98A2B3" : activeCount > 0 ? "#16A34A" : "#EF4444")
    : "#98A2B3";

  const countText = authed && total > 1 ? (total > 9 ? "9+" : String(total)) : null;

  return (
    <div style={{ position: "fixed", right: 32, top: 66, zIndex: 50 }}>
      <button
        onClick={() => setOpen(v => !v)}
        title="Devices"
        style={{
          width: 18, height: 18, borderRadius: 999, border: "1px solid #D0D5DD",
          background: outerBg, display: "grid", placeItems: "center", padding: 0, lineHeight: 0,
          position: "relative"
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 999, background: innerColor, display: "block" }} />
        {countText && (
          <span
            style={{
              position: "absolute", right: -6, top: -6, minWidth: 14, height: 14,
              padding: "0 2px", borderRadius: 999, background: "#0B5FFF", color: "#FFF",
              fontSize: 10, display: "grid", placeItems: "center", border: "1px solid #D0D5DD"
            }}
          >
            {countText}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute", right: -4, marginTop: 8, width: 280,
            background: "#FFF", border: "1px solid #D0D5DD", borderRadius: 12,
            boxShadow: "0 6px 24px rgba(16,24,40,.08)"
          }}
        >
          <div style={{ padding: 10, borderBottom: "1px solid #F2F4F7", fontWeight: 600 }}>
            Devices {authed ? `(${total})` : ""}
          </div>

          <div style={{ padding: 10, display: "grid", gap: 8 }}>
            {!authed && <div style={{ color: "#98A2B3", fontSize: 12 }}>Not signed in.</div>}

            {authed && devices.length === 0 && (
              <div style={{ color: "#98A2B3", fontSize: 12 }}>No devices detected.</div>
            )}

            {authed && devices.map(d => {
              const c = colorForDevice(d);
              return (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: c, display: "inline-block" }} />
                  <div style={{ fontSize: 13, flex: 1 }}>
                    {d.name}
                    <div style={{ color: "#667085", fontSize: 12 }}>
                      {d.remember ? "Remembered" : "12h session"}
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{ color: "#98A2B3", fontSize: 12 }}>
              Cross-device status will appear after Firebase sessions are wired.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
