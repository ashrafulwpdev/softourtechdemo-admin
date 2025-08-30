import "./globals.css";
import Sidebar from "@/components/nav/Sidebar";
import Topbar from "@/components/nav/Topbar";
import CommandPalette from "@/components/CommandPalette";
import { ReactNode } from "react";

export const metadata = {
  title: "Softourtech Admin",
  description: "Premium Admin Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen">
            <Topbar />
            <div className="container-xl py-6">{children}</div>
          </main>
        </div>
        <CommandPalette />
      </body>
    </html>
  );
}
