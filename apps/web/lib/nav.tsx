import * as React from "react";

export type MainKey =
  | "dashboard" | "groups" | "courses" | "exams" | "grades" | "attendance"
  | "documents" | "notes" | "chat" | "reports" | "funnel" | "settings" | "profile";

type Item = { key: MainKey; label: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> };

const S = 2.2; // stroke width (thick)

const Icon = {
  dashboard: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}><path d="M4 4h7v7H4zM13 4h7v16h-7zM4 13h7v7H4z" fill="none" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" /></svg>
  ),
  groups: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <circle cx="8" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth={2.2} />
      <circle cx="16" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth={2.2} />
      <path d="M3 19c1.6-3 4.2-4.5 7-4.5s5.4 1.5 7 4.5"
        fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  ),
  courses: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M3 7l9-4 9 4-9 4-9-4z" fill="none" stroke="currentColor" strokeWidth={S} />
      <path d="M6 10v6l6 3 6-3v-6" fill="none" stroke="currentColor" strokeWidth={S} />
    </svg>
  ),
  exams: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth={S} />
      <path d="M8 8h8M8 12h8M8 16h6" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  ),
  grades: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M4 20v-6h4v6zM10 20V8h4v12zM16 20v-10h4v10z" fill="none" stroke="currentColor" strokeWidth={S} />
    </svg>
  ),
  attendance: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth={S} />
      <path d="M8 7h8M7 11h10M7 15h5" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  ),
  documents: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" strokeWidth={S} />
      <path d="M14 3v5h5" fill="none" stroke="currentColor" strokeWidth={S} />
    </svg>
  ),
  notes: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth={S} />
      <path d="M8 9h8M8 13h6" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  ),
  chat: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M4 5h16v10H8l-4 4z" fill="none" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M8 9h8" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  ),
  reports: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M4 18l6-6 4 3 6-7" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18h16" fill="none" stroke="currentColor" strokeWidth={S} />
    </svg>
  ),
  funnel: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M3 5h18l-7 8v5l-4 2v-7z" fill="none" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
    </svg>
  ),
  settings: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth={S} />
      <path d="M19 12l2-1-1-3-3-1-.8-2.2h-4.4L11 7 8 8 7 11l2 1-2 1 1 3 3 1 1 2h4l1-2 3-1 1-3-2-1z" fill="none" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
    </svg>
  ),
  profile: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...p}>
      <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth={S} />
      <path d="M5 20c2.5-4 11.5-4 14 0" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  ),
} as const;

export const MAIN: Item[] = [
  { key: "dashboard", label: "Dashboard", Icon: Icon.dashboard },
  { key: "groups", label: "Groups", Icon: Icon.groups },
  { key: "courses", label: "Courses", Icon: Icon.courses },
  { key: "exams", label: "Exams", Icon: Icon.exams },
  { key: "grades", label: "Grades", Icon: Icon.grades },
  { key: "attendance", label: "Attendance", Icon: Icon.attendance },
  { key: "documents", label: "Documents", Icon: Icon.documents },
  { key: "notes", label: "Notes", Icon: Icon.notes },
  { key: "chat", label: "Chat", Icon: Icon.chat },
  { key: "reports", label: "Reports", Icon: Icon.reports },
  { key: "funnel", label: "Funnel", Icon: Icon.funnel },
  { key: "settings", label: "Settings", Icon: Icon.settings },
  { key: "profile", label: "Profile", Icon: Icon.profile },
];

export const SUB: Record<MainKey, { label: string; href: string }[]> = {
  dashboard: [{ label: "Open Dashboard", href: "/dashboard" }],
  groups: [{ label: "All Groups", href: "/groups" }],
  courses: [{ label: "Courses", href: "/courses" }],
  exams: [{ label: "All Exams", href: "/exams" }],
  grades: [{ label: "Grades", href: "/grades" }],
  attendance: [{ label: "Attendance", href: "/attendance" }],
  documents: [{ label: "Documents", href: "/documents" }],
  notes: [{ label: "Notes", href: "/notes" }],
  chat: [{ label: "Chat", href: "/chat" }],
  reports: [{ label: "Reports", href: "/reports" }],
  funnel: [{ label: "Funnel", href: "/funnel" }],
  settings: [{ label: "Settings", href: "/settings" }],
  profile: [{ label: "Profile", href: "/profile" }],
};
