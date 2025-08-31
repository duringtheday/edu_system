"use client";
import React from "react";
import { MAIN } from "../lib/nav";

/**
 * EdgeDial
 * - All geometry/visual controls live in CFG (below)
 * - Live tuning (saved to localStorage) without extra files:
 *     Ctrl+Alt+Left/Right → edgeLeft (move whole dial in/out)
 *     Ctrl+Alt+[ / ]      → arrowShiftX (move arrow buttons)
 *     Ctrl+Alt+0          → reset to defaults
 */
export default function EdgeDial({
  activeIndex,
  onNavigate,
}: {
  activeIndex: number;
  onNavigate: (key: string) => void;
}) {
  // ======= CONFIG YOU CAN TWEAK (defaults) =======
  const DEFAULTS = {
    stepDeg: 36,        // degrees between slots
    radius: 110,        // arc radius
    btn: 44,            // base button size
    sel: 56,            // selected size
    duration: 120,      // rotation animation (ms)
    edgeLeft: 14,       // distance of the whole dial from the window's left edge
    arrowShiftX: -10,    // horizontal offset for the arrow buttons
    arrowW: 25,         // arrow icon width
    arrowH: 25,         // arrow icon height
    arrowStroke: 3.1,   // arrow line thickness
    arrowOverTop: 38,   // overlap above the top icon (px)
    arrowOverBottom: 6, // overlap below the bottom icon (px)
  } as const;
  // ===============================================

  // Load/save only inside this component
  const KEY = "eduos_edgeDial";
  const load = (): { edgeLeft: number; arrowShiftX: number } => {
    if (typeof window === "undefined") return { edgeLeft: DEFAULTS.edgeLeft, arrowShiftX: DEFAULTS.arrowShiftX };
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { edgeLeft: DEFAULTS.edgeLeft, arrowShiftX: DEFAULTS.arrowShiftX };
      const j = JSON.parse(raw);
      return {
        edgeLeft: Number.isFinite(j.edgeLeft) ? j.edgeLeft : DEFAULTS.edgeLeft,
        arrowShiftX: Number.isFinite(j.arrowShiftX) ? j.arrowShiftX : DEFAULTS.arrowShiftX,
      };
    } catch {
      return { edgeLeft: DEFAULTS.edgeLeft, arrowShiftX: DEFAULTS.arrowShiftX };
    }
  };
  const save = (cfg: { edgeLeft: number; arrowShiftX: number }) => {
    try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch {}
  };

  const [edgeLeft, setEdgeLeft] = React.useState(() => load().edgeLeft);
  const [arrowShiftX, setArrowShiftX] = React.useState(() => load().arrowShiftX);

  // Live hotkeys (no extra UI, no extra files)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey && e.altKey)) return;
      let changed = false;
      if (e.key === "ArrowLeft") { setEdgeLeft(v => { const nv = Math.max(0, v - 2); save({ edgeLeft: nv, arrowShiftX }); return nv; }); changed = true; }
      if (e.key === "ArrowRight") { setEdgeLeft(v => { const nv = v + 2; save({ edgeLeft: nv, arrowShiftX }); return nv; }); changed = true; }
      if (e.key === "[") { setArrowShiftX(v => { const nv = Math.max(0, v - 1); save({ edgeLeft, arrowShiftX: nv }); return nv; }); changed = true; }
      if (e.key === "]") { setArrowShiftX(v => { const nv = v + 1; save({ edgeLeft, arrowShiftX: nv }); return nv; }); changed = true; }
      if (e.key === "0") { setEdgeLeft(DEFAULTS.edgeLeft); setArrowShiftX(DEFAULTS.arrowShiftX); save({ edgeLeft: DEFAULTS.edgeLeft, arrowShiftX: DEFAULTS.arrowShiftX }); changed = true; }
      if (changed) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeLeft, arrowShiftX]);

  // --- existing behavior (unchanged) ---
  const N = MAIN.length;
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => { setOffset(0); }, [activeIndex]);

  const prevIdx = (activeIndex - 1 + N) % N;
  const nextIdx = (activeIndex + 1) % N;

  const slots = [-DEFAULTS.stepDeg, 0, DEFAULTS.stepDeg].map((deg) => deg + offset);
  const triplet = [prevIdx, activeIndex, nextIdx];

  const leftFor = (deg: number, size: number) => {
    const rad = (deg * Math.PI) / 180;
    return DEFAULTS.radius * (Math.cos(rad) - 1) + (DEFAULTS.btn - size) / 2;
  };
  const topFor = (deg: number, size: number) => {
    const rad = (deg * Math.PI) / 180;
    return DEFAULTS.radius + Math.sin(rad) * DEFAULTS.radius - size / 2;
  };

  const animate = (dir: "prev" | "next") => {
    setOffset(dir === "prev" ? DEFAULTS.stepDeg : -DEFAULTS.stepDeg);
    const target = dir === "prev" ? prevIdx : nextIdx;
    window.setTimeout(() => onNavigate(MAIN[target].key), DEFAULTS.duration);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: edgeLeft,                // ← whole dial offset from left edge
        top: "50%",
        transform: "translateY(-50%)",
        width: DEFAULTS.radius + DEFAULTS.sel,
        height: 2 * DEFAULTS.radius,
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* ↑ arrow (overlaps ABOVE the top icon) */}
      <button
        aria-label="Prev"
        onClick={() => animate("prev")}
        className="btn btn-secondary"
        style={{
          position: "absolute",
          left: arrowShiftX,           // ← fine-tune arrow container horizontally
          top: topFor(-DEFAULTS.stepDeg, DEFAULTS.btn) - DEFAULTS.arrowOverTop,
          width: 44,
          height: 34,
          borderRadius: 12,
          pointerEvents: "auto",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0,
        }}
      >
        <svg width={DEFAULTS.arrowW} height={DEFAULTS.arrowH} viewBox="0 0 24 24">
          <path d="M6 14l6-6 6 6" fill="none" stroke="currentColor" strokeWidth={DEFAULTS.arrowStroke} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* three icons along the arc */}
      {triplet.map((idx, i) => {
        const deg = slots[i];
        const isCenter = i === 1;
        const size = isCenter ? DEFAULTS.sel : DEFAULTS.btn;
        const item = MAIN[idx];
        const Icon = item.Icon;
        return (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            title={item.label}
            className="btn"
            style={{
              position: "absolute",
              left: leftFor(deg, size),
              top: topFor(deg, size),
              width: size,
              height: size,
              borderRadius: 999,
              background: isCenter ? "rgba(11,95,255,.12)" : "#FFFFFF",
              border: `2px solid ${isCenter ? "var(--blue)" : "var(--border)"}`,
              color: isCenter ? "var(--blue)" : "var(--text)",
              display: "grid",
              placeItems: "center",
              pointerEvents: "auto",
              transition:
                "left .12s ease, top .12s ease, width .12s ease, height .12s ease, border-color .12s ease, background .12s ease",
              willChange: "left, top, width, height",
              zIndex: isCenter ? 2 : 1,
            }}
          >
            <Icon width={isCenter ? 22 : 18} height={isCenter ? 22 : 18} />
          </button>
        );
      })}

      {/* ↓ arrow (overlaps BELOW the bottom icon) */}
      <button
        aria-label="Next"
        onClick={() => animate("next")}
        className="btn btn-secondary"
        style={{
          position: "absolute",
          left: arrowShiftX,
          top: topFor(DEFAULTS.stepDeg, DEFAULTS.btn) + DEFAULTS.btn + DEFAULTS.arrowOverBottom,
          width: 44,
          height: 34,
          borderRadius: 12,
          pointerEvents: "auto",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0,
        }}
      >
        <svg width={DEFAULTS.arrowW} height={DEFAULTS.arrowH} viewBox="0 0 24 24">
          <path d="M6 10l6 6 6-6" fill="none" stroke="currentColor" strokeWidth={DEFAULTS.arrowStroke} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
