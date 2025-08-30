import React from "react";

export type MainKey =
  | "dashboard" | "groups" | "courses" | "exams" | "grades" | "attendance"
  | "documents" | "notes" | "chat" | "reports" | "funnel" | "settings" | "profile";

export const MAIN: { key: MainKey; label: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { key: "dashboard",  label: "Dashboard",  Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z" fill="currentColor"/></svg>
  )},
  { key: "groups",     label: "Groups",     Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M16 11a4 4 0 10-8 0 4 4 0 008 0zm-9 6a6 6 0 0110 0v2H7v-2z" fill="currentColor"/></svg>
  )},
  { key: "courses",    label: "Courses",    Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M3 6l9-3 9 3v12l-9 3-9-3V6zm9 1l6 2v7l-6 2-6-2V9l6-2z" fill="currentColor"/></svg>
  )},
  { key: "exams",      label: "Exams",      Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M4 4h12l4 4v12H4V4zm12 0v4h4" stroke="currentColor" fill="none"/></svg>
  )},
  { key: "grades",     label: "Grades",     Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M12 3l3 6 6 .9-4.5 4.4 1 6.3L12 18l-5.5 2.6 1-6.3L3 9.9 9 9l3-6z" fill="currentColor"/></svg>
  )},
  { key: "attendance", label: "Attendance", Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M7 2h10v3H7zM5 7h14v15H5zM9 11h6" stroke="currentColor" fill="none"/></svg>
  )},
  { key: "documents",  label: "Documents",  Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M6 2h8l4 4v16H6zM14 2v4h4" stroke="currentColor" fill="none"/></svg>
  )},
  { key: "notes",      label: "Notes",      Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M5 4h14v12H9l-4 4V4z" stroke="currentColor" fill="none"/></svg>
  )},
  { key: "chat",       label: "Chat",       Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M21 7a4 4 0 01-4 4H8l-5 4V7a4 4 0 014-4h10a4 4 0 014 4z" fill="currentColor"/></svg>
  )},
  { key: "reports",    label: "Reports",    Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M4 20h16M6 16V8m6 8V4m6 16v-6" stroke="currentColor" fill="none"/></svg>
  )},
  { key: "funnel",     label: "Funnel",     Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" fill="currentColor"/></svg>
  )},
  { key: "settings",   label: "Settings",   Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M12 15a3 3 0 100-6 3 3 0 000 6zM4 12l2-1 1-2-1-2 2-2 2 1 2-1 2 1 2-1 2 2-1 2 1 2-1 2 1 2-2 2-2-1-2 1-2-1-2 1-2-2 1-2-1-2z" fill="currentColor"/></svg>
  )},
  { key: "profile",    label: "Profile",    Icon: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0v1H5v-1z" fill="currentColor"/></svg>
  )},
];

export const SUB: Record<MainKey, { label: string; href: string }[]> = {
  dashboard:  [{ label: "Open Dashboard", href: "/dashboard" }],
  groups:     [{ label: "Open Groups", href: "/groups" }],
  courses:    [{ label: "Open Courses", href: "/courses" }],
  exams:      [{ label: "View Exams", href: "/exams" }, { label: "Create Exam", href: "/exams" }],
  grades:     [{ label: "Open Grades", href: "/grades" }],
  attendance: [{ label: "Open Attendance", href: "/attendance" }],
  documents:  [{ label: "Open Documents", href: "/documents" }],
  notes:      [{ label: "Open Notes", href: "/notes" }],
  chat:       [{ label: "Open Chat", href: "/chat" }],
  reports:    [{ label: "Open Reports", href: "/reports" }],
  funnel:     [{ label: "Open Funnel", href: "/funnel" }],
  settings:   [{ label: "Open Settings", href: "/settings" }],
  profile:    [{ label: "Open Profile", href: "/profile" }],
};
