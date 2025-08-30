"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { markCurrentSignedOut } from "../../lib/devices"; // NEW

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    // expire cookie both ways
    document.cookie = "eduos_token=; Max-Age=0; Path=/; SameSite=Lax";
    document.cookie = "eduos_token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax";

    try {
      localStorage.removeItem("eduos_token");
      localStorage.removeItem("eduos_role");
      localStorage.removeItem("eduos_remember");
      markCurrentSignedOut(); // <-- marks this device as signed out + clears old heartbeats
      // broadcast signout to other tabs
      localStorage.setItem("eduos_broadcast", `signout@${Date.now()}`);
      localStorage.removeItem("eduos_broadcast");
    } catch {}

    router.replace("/");
  }, [router]);

  return null;
}
