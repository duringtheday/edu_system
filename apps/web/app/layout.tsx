import "./globals.css";
import React from "react";
import AppShell from "../components/AppShell";

export const metadata = { title: "Education OS" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#F9FAFB", color: "#101828", margin: 0 }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}