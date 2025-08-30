# 📐 SaaS Education OS – Full Architecture Map


edu_system/ # Project root (monorepo)
├── apps/ # Applications
│ ├── web/ # Web App (Next.js, Vercel)
│ └── mobile/ # Mobile App (React Native, Expo/EAS)
│
├── packages/ # Reusable internal libraries
│ ├── ui/ # Shared UI components (buttons, modals, etc.)
│ ├── i18n/ # Internationalization (translations, dictionaries)
│ ├── models/ # Data models, TypeScript types, Zod validation
│ ├── services/ # Internal SDK (Firebase, APIs, logic)
│ └── theme/ # Design tokens: colors, typography, spacing
│
├── infra/ # Infrastructure & deployment
│ ├── firebase/ # firebase.json, Firestore/Storage rules
│ ├── functions/ # Cloud Functions (Node 20, TypeScript)
│ └── scripts/ # Automation scripts, backups, seeding
│
├── docs/ # Project documentation
│ └── runbooks/ # Setup guides, backup guides, troubleshooting
│
├── .github/workflows/ # CI/CD pipelines (GitHub Actions)
├── package.json # Monorepo configuration
├── turbo.json # Turborepo configuration
├── tsconfig.base.json # Global TypeScript configuration
├── .gitignore # Files ignored by Git
└── ARCHITECTURE.md # This architecture map



---

## 🔹 Quick Summary

- **apps/** → Where web and mobile apps live.  
- **packages/** → Shared code (UI components, services, models, design system).  
- **infra/** → Firebase config, Functions, automation scripts.  
- **docs/** → Developer and administrator documentation.  
- **.github/** → CI/CD automation workflows.  
- **package.json, turbo.json, tsconfig.base.json** → Monorepo setup and build configuration files.

