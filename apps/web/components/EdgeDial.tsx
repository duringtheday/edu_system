"use client";
import React from "react";
import { MAIN } from "../lib/nav";

/**
 * EdgeDial
 * - Toda la geometría y visual en DEFAULTS + ARROW_* (abajo)
 * - Teclas: Ctrl+Alt+←/→ (mueve dial), Ctrl+Alt+[ / ] (flechas), Ctrl+Alt+0 (reset)
 */
export default function EdgeDial({
  activeIndex,
  onNavigate,
}: {
  activeIndex: number;
  onNavigate: (key: string) => void;
}) {
  // ======= CONFIG BÁSICA =======
  const DEFAULTS = {
    stepDeg: 36,        // grados entre slots
    radius: 110,        // radio del arco
    btn: 44,            // tamaño botón base
    sel: 56,            // tamaño botón seleccionado (centro)
    duration: 120,      // animación rotación (ms)
    edgeLeft: 14,       // separación del dial desde el borde izquierdo
    arrowShiftX: -10,   // desplazamiento horizontal de las flechas
    arrowOverTop: 42,   // solape por encima del botón superior
    arrowOverBottom: 6, // solape por debajo del botón inferior
  } as const;

  // ======= FLECHAS (CAMBIA SOLO ESTAS 3 PARA TAMAÑO/GRUESO) =======
  const ARROW_SIZE   = 28;   // 18–32 recomendado
  const ARROW_STROKE = 4.0;  // 2.5–5 recomendado
  const ARROW_BTN_W  = ARROW_SIZE + 18; // ancho del botón contenedor
  const ARROW_BTN_H  = ARROW_SIZE + 10; // alto del botón contenedor
  // ================================================================

  // Persistencia local (solo este componente)
  const KEY = "eduos_edgeDial";
  const load = (): { edgeLeft: number; arrowShiftX: number } => {
    if (typeof window === "undefined")
      return { edgeLeft: DEFAULTS.edgeLeft, arrowShiftX: DEFAULTS.arrowShiftX };
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

  // Hotkeys
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey && e.altKey)) return;
      let changed = false;
      if (e.key === "ArrowLeft")  { setEdgeLeft(v => { const nv = Math.max(0, v - 2); save({ edgeLeft: nv, arrowShiftX }); return nv; }); changed = true; }
      if (e.key === "ArrowRight") { setEdgeLeft(v => { const nv = v + 2;           save({ edgeLeft: nv, arrowShiftX }); return nv; }); changed = true; }
      if (e.key === "[")          { setArrowShiftX(v => { const nv = Math.max(0, v - 1); save({ edgeLeft, arrowShiftX: nv }); return nv; }); changed = true; }
      if (e.key === "]")          { setArrowShiftX(v => { const nv = v + 1;           save({ edgeLeft, arrowShiftX: nv }); return nv; }); changed = true; }
      if (e.key === "0")          { setEdgeLeft(DEFAULTS.edgeLeft); setArrowShiftX(DEFAULTS.arrowShiftX); save({ edgeLeft: DEFAULTS.edgeLeft, arrowShiftX: DEFAULTS.arrowShiftX }); changed = true; }
      if (changed) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeLeft, arrowShiftX]);

  // --- rotación (igual que antes) ---
  const N = MAIN.length;
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => { setOffset(0); }, [activeIndex]);
  const prevIdx = (activeIndex - 1 + N) % N;
  const nextIdx = (activeIndex + 1) % N;

  const slots = [-DEFAULTS.stepDeg, 0, DEFAULTS.stepDeg].map((deg) => deg + offset);
  const triplet = [prevIdx, activeIndex, nextIdx];

  const leftFor = (deg: number, size: number) => {
    const rad = (deg * Math.PI) / 180;
    return DEFAULTS.radius * (cos(rad) - 1) + (DEFAULTS.btn - size) / 2;
  };
  const topFor = (deg: number, size: number) => {
    const rad = (deg * Math.PI) / 180;
    return DEFAULTS.radius + sin(rad) * DEFAULTS.radius - size / 2;
  };
  const cos = Math.cos, sin = Math.sin;

  const animate = (dir: "prev" | "next") => {
    setOffset(dir === "prev" ? DEFAULTS.stepDeg : -DEFAULTS.stepDeg);
    const target = dir === "prev" ? prevIdx : nextIdx;
    window.setTimeout(() => onNavigate(MAIN[target].key), DEFAULTS.duration);
  };

  // Flecha (chevron redondeado, escalable)
  const Chevron = ({ up }: { up: boolean }) => (
    <svg width={ARROW_SIZE} height={ARROW_SIZE} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={up ? "M6 14l6-6 6 6" : "M6 10l6 6 6-6"}
        fill="none"
        stroke="currentColor"
        strokeWidth={ARROW_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      style={{
        position: "fixed",
        left: edgeLeft,
        top: "50%",
        transform: "translateY(-50%)",
        width: DEFAULTS.radius + DEFAULTS.sel,
        height: 2 * DEFAULTS.radius,
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* ↑ arriba (sobre el botón superior) */}
      <button
        aria-label="Prev"
        onClick={() => animate("prev")}
        className="btn btn-secondary"
        style={{
          position: "absolute",
          left: arrowShiftX,
          top: topFor(-DEFAULTS.stepDeg, DEFAULTS.btn) - DEFAULTS.arrowOverTop,
          width: ARROW_BTN_W,
          height: ARROW_BTN_H,
          borderRadius: 12,
          pointerEvents: "auto",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0,
        }}
      >
        <Chevron up />
      </button>

      {/* 3 íconos sobre el arco */}
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

      {/* ↓ abajo (debajo del botón inferior) */}
      <button
        aria-label="Next"
        onClick={() => animate("next")}
        className="btn btn-secondary"
        style={{
          position: "absolute",
          left: arrowShiftX,
          top: topFor(DEFAULTS.stepDeg, DEFAULTS.btn) + DEFAULTS.btn + DEFAULTS.arrowOverBottom,
          width: ARROW_BTN_W,
          height: ARROW_BTN_H,
          borderRadius: 12,
          pointerEvents: "auto",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0,
        }}
      >
        <Chevron up={false} />
      </button>
    </div>
  );
}
