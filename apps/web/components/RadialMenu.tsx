"use client";
import React from "react";
import { MAIN } from "../lib/nav";

/** Full radial selector. Items are positioned around a circle.
 *  Click => onSelect(key)
 */
export default function RadialMenu({ onSelect }: { onSelect: (key: string)=>void }) {
  const R = 180;     // ring radius
  const BTN = 52;    // item size
  const items = MAIN; // 13 items

  return (
    <div style={{ position:"relative", width: 2*R+BTN, height: 2*R+BTN }}>
      {/* center disk */}
      <div
        className="card animate-fade"
        style={{
          position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
          width: 140, height: 140, borderRadius: 999, display:"grid", placeItems:"center"
        }}
      >
        <div style={{ textAlign:"center", lineHeight:1.2 }}>
          <div style={{ fontWeight:700 }}>USER</div>
          <div style={{ color:"var(--muted)", fontSize:12 }}>choose a category</div>
        </div>
      </div>

      {/* ring items */}
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2; // 0..2π
        const cx = R + Math.cos(angle) * R;
        const cy = R + Math.sin(angle) * R;
        const Icon = item.Icon;
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            title={item.label}
            className="btn animate-slide"
            style={{
              position:"absolute",
              left: cx - BTN/2, top: cy - BTN/2, width: BTN, height: BTN,
              borderRadius: 999, background:"#F9FAFB", border:"1px solid var(--border)",
              boxShadow:"var(--shadow)"
            }}
          >
             <Icon width={18} height={18} />
          </button>
        );
      })}
    </div>
  );
}
