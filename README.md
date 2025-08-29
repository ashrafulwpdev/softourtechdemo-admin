# Softourtech Admin (Vercel-ready)

A professional admin for managing **Services**, **Leads**, and **Site Settings**.

## Features
- Next.js 14 (App Router) + Tailwind (dark/light)
- NextAuth (Credentials) + middleware route protection
- Prisma + Postgres (Neon/Supabase)
- Dashboard KPIs + Recharts line chart
- Services CRUD via Server Actions
- Leads list (with public POST API)
- Settings (site name, tagline, default meta, theme)

## Deploy on Vercel
1. Push to GitHub and import the repo in Vercel.
2. Set **Environment Variables**:
   - `DATABASE_URL` (Postgres; include `?sslmode=require`)
   - `NEXTAUTH_SECRET` (long random string)
   - `NEXTAUTH_URL` = your Vercel URL (or custom domain later)
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. Build command (already in package.json): `prisma db push && next build`
4. Open `/login` and sign in.

## Local Dev
```bash
npm install
cp .env.example .env   # fill in values
npx prisma db push
npm run dev
```
