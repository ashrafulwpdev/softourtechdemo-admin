# Softourtech Admin -- Full Build (MVP functional)

**What works now**
- Next.js 14 App Router + Tailwind tokens (dark/light)
- Auth (NextAuth Credentials) via `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- Protected routes via `middleware.ts`
- Prisma schema + CRUD pages:
  - Services + Service Plans (Pricing)
  - Projects
  - Leads (status update)
  - Blog Posts
  - Site Settings
- Dashboard with real DB data (counts + weekly aggregation, example JSON)
- API: `/api/revalidate` (token) and `/api/email/test` (Resend)
- Command palette (Cmd/Ctrl+K) for quick navigation
- Mobile-friendly sidebar + logout + theme toggle

## Quick start
```bash
pnpm i # or npm/yarn
cp .env.example .env
# fill envs: DATABASE_URL, NEXTAUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, REVALIDATE_TOKEN, RESEND_API_KEY (optional)
npx prisma generate
npm run db:push
npm run dev
```
Login at `/login` with the admin credentials.

## Notes
- Charts use JSON preview in Dashboard; wire Recharts as next step if needed.
- Image uploads and Kanban drag-drop are not included in MVP; add Supabase/R2 and DnD Kit later.
- Revalidation: call POST `/api/revalidate` with header `x-revalidate-token: REVALIDATE_TOKEN` and body `{ "paths": ["/","/pricing"] }`.
