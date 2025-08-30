"use client";
import React from "react";
import { MAIN } from "../lib/nav";

// centered arrow icon
function Arrow({ dir }: { dir: "up" | "down" }) {
  const rotate = dir === "up" ? 0 : 180;
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <path d="M12 6l-6 6h4v6h4v-6h4z" fill="currentColor" />
    </svg>
  );
}

export default function EdgeDial({
  activeIndex,
  onNavigate,
}: {
  activeIndex: number;
  onNavigate: (key: string) => void;
}) {
  const N = MAIN.length;

  // geometry
  const STEP = 36;
  const R = 110;
  const BTN = 44;
  const SEL = 56;
  const EDGE = 0;
  const DURATION = 100;

  // ⬅️ CONTROL ONLY THE ARROW CONTAINER OFFSET (px)
  const ARROW_SHIFT_X = 12; // increase to push arrows right; negative to pull left
  const ARROW_GAP = 8;      // vertical gap between arrow and icon

  // animate rotation then navigate
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => { setOffset(0); }, [activeIndex]);

  const prevIdx = (activeIndex - 1 + N) % N;
  const nextIdx = (activeIndex + 1) % N;

  const slots = [-STEP, 0, STEP].map((deg) => deg + offset);
  const triplet = [prevIdx, activeIndex, nextIdx];

  // position helpers (tangent to the edge)
  const leftFor = (deg: number, size: number) => {
    const rad = (deg * Math.PI) / 180;
    return EDGE + R * (Math.cos(rad) - 1) + (BTN - size) / 2;
  };
  const topFor = (deg: number, size: number) => {
    const rad = (deg * Math.PI) / 180;
    return R + Math.sin(rad) * R - size / 2;
  };

  const animate = (dir: "prev" | "next") => {
    setOffset(dir === "prev" ? STEP : -STEP);
    const target = dir === "prev" ? prevIdx : nextIdx;
    window.setTimeout(() => onNavigate(MAIN[target].key), DURATION);
  };

  // base arrow positions centered to icons (no shift yet)
  const ARROW_W = 40;
  const ARROW_H = 32;

  const upLeftBase   = leftFor(-STEP, BTN) + BTN / 2 - ARROW_W / 2;
  const upTop        = topFor(-STEP, BTN) - (ARROW_H + ARROW_GAP);

  const downLeftBase = leftFor(STEP, BTN) + BTN / 2 - ARROW_W / 2;
  const downTop      = topFor(STEP, BTN) + BTN + ARROW_GAP;

  return (
    <div
      style={{
        position: "fixed",
        left: "8px", // keep dial near edge; this does NOT move arrows now
        top: "50%",
        transform: "translateY(-50%)",
        width: R + SEL,
        height: 2 * R,
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* Arrow wrapper: ONLY this group moves with ARROW_SHIFT_X */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${ARROW_SHIFT_X}px)`,
          pointerEvents: "none",
        }}
      >
        {/* ↑ arrow */}
        <button
          aria-label="Prev"
          onClick={() => animate("prev")}
          className="btn btn-secondary"
          style={{
            position: "absolute",
            left: upLeftBase,
            top: upTop,
            width: ARROW_W,
            height: ARROW_H,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            padding: 0,
            lineHeight: 0,
            pointerEvents: "auto",
            zIndex: 3,
          }}
        >
          <Arrow dir="up" />
        </button>

        {/* ↓ arrow */}
        <button
          aria-label="Next"
          onClick={() => animate("next")}
          className="btn btn-secondary"
          style={{
            position: "absolute",
            left: downLeftBase,
            top: downTop,
            width: ARROW_W,
            height: ARROW_H,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            padding: 0,
            lineHeight: 0,
            pointerEvents: "auto",
            zIndex: 3,
          }}
        >
          <Arrow dir="down" />
        </button>
      </div>

      {/* three icons along the arc */}
      {triplet.map((idx, i) => {
        const deg = slots[i];
        const isCenter = i === 1;
        const size = isCenter ? SEL : BTN;
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
                "left .14s ease, top .14s ease, width .12s ease, height .12s ease, border-color .12s ease, background .12s ease",
              willChange: "left, top, width, height",
              zIndex: isCenter ? 2 : 1,
            }}
          >
            <Icon width={isCenter ? 22 : 18} height={isCenter ? 22 : 18} />
          </button>
        );
      })}
    </div>
  );
}
