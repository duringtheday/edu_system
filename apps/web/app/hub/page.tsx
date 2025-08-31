"use client";
import React from "react";
import RotatingWheel from "../../components/RotatingWheel";

export default function HubPage() {
  return (
    <section className="animate-fade" style={{ minHeight:"70vh", display:"grid", placeItems:"center" }}>
      <RotatingWheel />
    </section>
  );
}