"use client";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import React from "react";

export default function Topbar() {
  const router = useRouter();
  return (
    <div className="header">
      <div className="container-xl flex items-center justify-between py-3">
        <div className="text-sm text-[color:var(--text-muted)]">Dashboard</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => router.push('/command')}>⌘K</Button>
          <ThemeToggle />
          <Button variant="ghost" onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
