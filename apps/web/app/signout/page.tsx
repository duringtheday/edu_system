"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();
  useEffect(() => {
    document.cookie = "eduos_token=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax";
    try {
      localStorage.removeItem("eduos_token");
      localStorage.removeItem("eduos_role");
    } catch {}
    router.replace("/");
  }, [router]);
  return null;
}