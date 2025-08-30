"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ROLES = ["student","parent","teacher_payroll","teacher_ext","admin","staff","reception"] as const;
type Role = typeof ROLES[number];

export default function Page() {
  const [token, setToken] = useState("");
  const [remember, setRemember] = useState(true); // NEW
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  function inferRole(t: string): Role | null {
    const lower = t.toLowerCase();
    for (const r of ROLES) if (lower.includes(r)) return r;
    return null;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = token.trim();
    if (!trimmed) { setError("Enter your access token."); return; }

    // Cookie lifetime based on "remember this device"
    const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 12; // 30d or 12h
    document.cookie = `eduos_token=${encodeURIComponent(trimmed)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;

    // Dev-mode role inference
    const role = inferRole(trimmed);
    if (role) localStorage.setItem("eduos_role", role);
    localStorage.setItem("eduos_token", trimmed);
    localStorage.setItem("eduos_remember", remember ? "1" : "0"); // NEW

    // Prepare a per-device id (used later when we sync sessions to Firestore)
    if (!localStorage.getItem("eduos_device_id")) {
      const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
      localStorage.setItem("eduos_device_id", id);
      localStorage.setItem("eduos_device_name", navigator.userAgent);
    }

    router.push(next || "/hub");
  }

  return (
    <section style={{ minHeight: "72vh", display: "grid", placeItems: "center" }} className="animate-fade">
      <div className="card animate-slide" style={{ width: "100%", maxWidth: 560, padding: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Enter Access Token</h1>
        <p style={{ marginTop: 6, color: "var(--muted)" }}>Access is restricted. Paste the token to continue.</p>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 8 }}>
          <input className="input" placeholder="Paste your token here" value={token}
                 onChange={(e)=>{setToken(e.target.value); setError(null);}} />
          {/* Remember me */}
          <label style={{ display:"flex", gap:8, alignItems:"center", color:"var(--muted)", userSelect:"none" }}>
            <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} />
            Keep me signed in on this device
          </label>
          {error && <div className="badge" style={{ background: "rgba(249,115,22,.15)", color: "var(--warn)" }}>{error}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" type="submit">Continue</button>
            <button className="btn btn-secondary" type="button" onClick={()=>setToken("")}>Clear</button>
          </div>
        </form>
        {/* Dev tokens hint */}
        <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 14 }}>
          Examples: <code>admin-token</code>, <code>teacher_payroll-token</code>, <code>student-token</code> …
        </div>
      </div>
    </section>
  );
}
