"use client";
import RotatingWheel from "../../components/RotatingWheel";

export default function HubPage() {
  return (
    <section style={{ minHeight:"72vh", display:"grid", placeItems:"center" }} className="animate-fade">
      <RotatingWheel />
    </section>
  );
}
