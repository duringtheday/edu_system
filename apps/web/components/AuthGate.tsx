"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function hasTokenInCookies(): boolean {
  return document.cookie.split("; ").some((c) => c.startsWith("eduos_token="));
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") return; // allow token page
    if (!hasTokenInCookies()) router.replace("/");
  }, [pathname, router]);

  return <>{children}</>;
}
