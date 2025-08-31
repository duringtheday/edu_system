"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MAIN } from "../lib/nav";

const STEP = 360 / MAIN.length;

export default function RotatingWheel() {
  const router = useRouter();
  const [angle, setAngle] = React.useState(0);
  const [active, setActive] = React.useState(0);

  function rotate(delta: number) {
    const next = (active + delta + MAIN.length) % MAIN.length;
    setActive(next);
    setAngle(-(next * STEP));
  }
  function open() {
    router.push(`/hub/${MAIN[active].key}`);
  }

  return (
    <div style={{ position:"relative", width: 420, height: 420 }}>
      {/* ring */}
      <div
        style={{
          position:"absolute", inset: 0, margin:"auto",
          width: 390, height: 390, borderRadius:"50%",
          border:"1px solid var(--border)",
          transition:"transform .30s ease",
          transform:`rotate(${angle}deg)`,
          background:"#fff", boxShadow:"var(--shadow)"
        }}
      >
        {MAIN.map((item, i) => {
          const rad = ((i * STEP) * Math.PI) / 180;
          const R = 150;
          const cx = 190 + Math.cos(rad) * R;
          const cy = 190 + Math.sin(rad) * R;
          const selected = i === active;
          return (
            <button
              key={item.key}
              onClick={() => { setActive(i); setAngle(-(i * STEP)); }}
              title={item.label}
              style={{
                position:"absolute", left: cx - 24, top: cy - 24,
                width: 52, height: 52, borderRadius: 999, display:"grid", placeItems:"center",
                border:`1px solid ${selected ? "var(--blue)" : "var(--border)"}`,
                background: selected ? "rgba(11,95,255,.12)" : "#F9FAFB",
                color: selected ? "var(--blue)" : "var(--text)",
                transform:`rotate(${-angle}deg)`,
                transition:"all .22s ease",
              }}
            >
              <item.Icon width={20} height={20} />
            </button>
          );
        })}
      </div>

      {/* center block */}
      <div className="card animate-slide" style={{
        position:"absolute", left:0, right:10, top:0, bottom:0, margin:"auto",
        width: 220, height: 120, borderRadius: 16, display:"grid", placeItems:"center"
      }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontWeight:800, fontSize:18 }}>{MAIN[active].label}</div>
          <div style={{ display:"flex", gap:8, marginTop:10, justifyContent:"center" }}>
            <button className="btn btn-secondary" onClick={()=>rotate(-1)} aria-label="Prev">←</button>
            <button className="btn btn-primary" onClick={open}>Open</button>
            <button className="btn btn-secondary" onClick={()=>rotate(1)} aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}