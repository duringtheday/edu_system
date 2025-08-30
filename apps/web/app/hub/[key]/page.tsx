"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MAIN, SUB } from "../../../lib/nav";

export default function CategoryPage() {
  const { key } = useParams<{ key: string }>();
  const idx = Math.max(0, MAIN.findIndex(m => m.key === key));
  const main = MAIN[idx];
  const items = (SUB as any)[main.key] as { label: string; href: string }[];

  return (
    <section className="animate-fade" style={{ maxWidth: 880, margin: "0 auto", paddingTop: 24 }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{main.label}</h1>
      <div className="card animate-slide" style={{ padding: 20, marginTop: 12 }}>
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((it) => (
            <Link key={it.label} href={it.href} className="btn btn-primary" style={{ textAlign: "left" }}>
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
