# 🧭 SaaS Education OS – Navigation Map

This document outlines all application routes, screens, and modal flows for both Web and Mobile apps.

---

## 🌐 Web App (Next.js – Vercel)



/
├── Landing Page
│ ├── CTA: Request Demo (modal)
│ └── CTA: Sign Up (modal)
│
├── /login # Login modal or page
│
├── /dashboard # Role-based dashboards
│ ├── Admin Dashboard
│ │ ├── KPI Cards (Students, Teachers, Attendance, Exams, Alerts)
│ │ └── Quick Actions: Create Group, Create Course, Invite Users
│ ├── Teacher Dashboard
│ │ ├── Assigned Groups
│ │ └── Actions: Attendance, Create Exam, Grade, Upload Memo
│ └── Student Dashboard
│ ├── Upcoming Classes & Exams
│ └── Mini Progress Charts
│
├── /groups
│ ├── Groups Grid (filters by course, level, term)
│ └── /groups/[groupId]
│ ├── Overview (schedule, teacher, roster, pinned docs)
│ └── Quick Actions: Exams, Attendance, Materials, Chat
│
├── /courses
│ ├── Courses List
│ └── Templates: Exam, Memo, Lesson
│
├── /exams
│ ├── Exams Table (course, group, date, status)
│ └── /exams/[examId]
│ ├── Config (duration, proctoring)
│ ├── Sections
│ └── Assign to Groups
│
├── /exams/[examId]/attempt
│ └── Fullscreen Student Exam Attempt
│
├── /grades
│ └── Grades Table (student, group, term, feedback status)
│
├── /attendance
│ └── Attendance Table (daily by group)
│
├── /documents
│ └── Document Repository (filters: type, course, group)
│
├── /notes
│ └── Notion-Style Editor for Memos, Lessons, Maps
│
├── /chat
│ └── Internal Chat Rooms (global, group, private)
│
├── /reports
│ └── Charts: Course Performance, Absences, Pass Rate
│
├── /settings
│ └── Tenant Settings: Branding, Roles, Feature Flags
│
└── /profile
└── User Profile & Preferences




---

## 📱 Mobile App (React Native – Expo/EAS)


Tabs:
├── Dashboard
│ ├── Role-based cards (next events, quick actions)
│
├── Groups
│ ├── List with search & filters
│ └── Group Detail: overview, materials, chat
│
├── Exams
│ ├── List of available exams
│ └── Fullscreen Exam Attempt
│
├── Chat
│ └── Realtime messaging (group & private)
│
└── Profile
└── Language, notifications, sessions




Drawer (extra):
- Settings
- Help & Support
- Logout

---

## 🔹 Modals Overview

- Login / Sign Up
- Create/Edit Group
- Create/Edit Course
- Create/Edit Exam
- Attendance Modal
- Document Upload & E-Signature
- Share/Permissions
- Generate AI Feedback
- Backup/Restore Confirmation
- Alerts & Notifications

---

## 🔹 Notes

- All **create/edit flows** happen in modals with a dimmed backdrop for focus.  
- Navigation is **role-aware**: each user sees only relevant sections.  
- Mobile keeps navigation minimal (tabs + drawer) for speed and clarity.


