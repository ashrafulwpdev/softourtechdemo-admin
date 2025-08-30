# Softourtech Admin — Premium Skeleton (Blueprint-Ready)

This repo is a **clean replacement** starter aligned to your blueprint (desktop/tablet/mobile, dark/light, Blog-ready). It compiles to a premium shell you can extend with real data and server actions.

## Quick start
```bash
pnpm i   # or npm i / yarn
cp .env.example .env
# Set DATABASE_URL etc, then:
npx prisma generate
pnpm dev
```

## Highlights
- Next.js 14 (App Router), Tailwind tokens (AA), dark/light theme
- Sidebar (collapsible), Topbar (search/new/notifications/avatar/logout), container width 1280
- Dashboard KPIs + chart shells + activity/system status
- Pages: Projects, Leads, Services, Pricing, Blog, Settings
- Prisma schema for Admin + Blog (native) with extras (ServicePlan, LeadNote, AuditLog, SystemLog, Idempotency)
- API stubs: revalidate, email test
- Tokens: see `app/globals.css`, config in `tailwind.config.ts`

## Next steps
- Fill each module page with real UI per the spec (drawers, tables, kanban, editors).
- Add Server Actions and REST routes where needed.
- Wire revalidation and public site RO DB user.
- Add ToastProvider, Command Palette, and form validation patterns.
