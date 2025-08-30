"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthGate from "./AuthGate";
import EdgeDial from "./EdgeDial";
import { MAIN } from "../lib/nav";
import DeviceIndicator from "./DeviceIndicator";


function keyFromPath(pathname: string): string | null {
  if (pathname.startsWith("/hub/")) {
    const seg = pathname.split("/")[2];
    return seg || null;
  }
  const first = (pathname.split("/")[1] || "").toLowerCase();
  const hit = MAIN.find(m => m.key === first);
  return hit ? hit.key : null;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const showDial = pathname !== "/" && pathname !== "/hub"; // hide on login + main hub
  const showBack = showDial;
  const showSignOut = pathname !== "/";                      // everywhere except login

  const key = keyFromPath(pathname) || "dashboard";
  const activeIndex = Math.max(0, MAIN.findIndex(m => m.key === key));

  const goto = (k: string) => router.push(`/hub/${k}`);
  const back = () => {
    if (pathname.startsWith("/hub/")) router.push("/hub");
    else router.push(`/hub/${key}`);
  };
  const signOut = () => { window.location.href = "/signout"; };

  return (
    <AuthGate>
      {showDial && <EdgeDial activeIndex={activeIndex} onNavigate={goto} />}

      {showBack && (
        <div style={{ position: "fixed", left: 72, top: 12, zIndex: 50 }}>
          <button className="btn btn-secondary" onClick={back}>← Back</button>
        </div>
      )}



      {/* show the device dot on every route, including "/" */}
      <DeviceIndicator />

      {/* keep Sign out hidden on login */}
      {pathname !== "/" && (
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
