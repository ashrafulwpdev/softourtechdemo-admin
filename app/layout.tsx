import "./globals.css";
import { Container, ThemeToggle } from "@/components/ui";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Softourtech Admin",
  description: "Admin dashboard for content, leads, and settings."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
          <Container className="flex items-center justify-between py-3">
            <Link href="/dashboard" className="no-underline text-lg font-bold">Softourtech Admin</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/services" className="hover:underline">Services</Link>
              <Link href="/leads" className="hover:underline">Leads</Link>
              <Link href="/settings" className="hover:underline">Settings</Link>
              <ThemeToggle />
            </nav>
          </Container>
        </header>
        {children}
      </body>
    </html>
  );
}
