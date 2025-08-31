"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthGate from "./AuthGate";
import EdgeDial from "./EdgeDial";
import DeviceIndicator from "./DeviceIndicator";
import { MAIN } from "../lib/nav";

function keyFromPath(pathname: string): string | null {
  const segs = pathname.replace(/\/+$/,"").split("/").filter(Boolean);
  if (segs[0] === "hub" && segs.length >= 2) return segs[1];
  const first = segs[0] || "";
  const hit = MAIN.find(m => m.key === first);
  return hit ? hit.key : null;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const p = pathname.replace(/\/+$/,"");
  const router = useRouter();

  const onLogin = p === "";
  const onHubRoot = p === "/hub";

  // show EdgeDial on every page except login and hub root
  const showDial = !onLogin && !onHubRoot;
  const showBack = showDial;
  const showSignOut = !onLogin;

  const key = keyFromPath(p) || "dashboard";
  const activeIndex = Math.max(0, MAIN.findIndex(m => m.key === key));

  const goto = (k: string) => router.push(`/hub/${k}`);
  const back = () => {
    if (p.startsWith("/hub/")) router.push("/hub");
    else router.push(`/hub/${key}`);
  };
  const signOut = () => { window.location.href = "/signout"; };

  return (
    <AuthGate>
      <DeviceIndicator />

      {showDial && (
        <EdgeDial
          activeIndex={activeIndex}
          onNavigate={goto}
          /* EdgeDial manages its own positioning (hotkeys/localStorage) */
        />
      )}

      {showBack && (
        <div style={{ position: "fixed", left: 72, top: 12, zIndex: 50 }}>
          <button className="btn btn-secondary" onClick={back}>← Back</button>
        </div>
      )}

      {showSignOut && (
        <div style={{ position: "fixed", right: 16, top: 12, zIndex: 50 }}>
          <button className="btn btn-secondary" onClick={signOut}>Sign out</button>
        </div>
      )}

      <main style={{ maxWidth: "72rem", margin: "0 auto", padding: "16px" }}>
        {children}
      </main>
    </AuthGate>
  );
}
