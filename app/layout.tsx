// app/layout.tsx
"use client";

import "./globals.css";
import Sidebar from "@/components/nav/Sidebar";
import Topbar from "@/components/nav/Topbar";
import CommandPalette from "@/components/CommandPalette";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const AUTH_ROUTES = ["/login"]; // add more auth-only routes here if needed

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {isAuthRoute ? (
          // Clean auth layout (no sidebar/topbar)
          <main className="min-h-screen flex items-start justify-center p-6">
            <div className="w-full max-w-2xl">{children}</div>
          </main>
        ) : (
          // App layout (sidebar + topbar)
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen">
              <Topbar />
              <div className="container-xl py-6">{children}</div>
            </main>
          </div>
        )}
        <CommandPalette />
      </body>
    </html>
  );
}
