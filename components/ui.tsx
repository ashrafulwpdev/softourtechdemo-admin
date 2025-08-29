"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import React from "react";

export function Container({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`container-xl ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return <button {...rest} className={`rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 ${className}`} />;
}

export function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="inline-block rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">{children}</Link>;
}

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const next = !dark; setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button onClick={toggle} className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-sm">
      {dark ? <Sun className="inline h-4 w-4" /> : <Moon className="inline h-4 w-4" />} <span className="ml-1">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
