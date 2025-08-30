"use client";

import React from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { useFormStatus } from "react-dom";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <button
      {...rest}
      className={`rounded-xl bg-primary px-4 py-2 text-white hover:opacity-95 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function SubmitButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-xl bg-primary px-4 py-2 text-white hover:opacity-95 disabled:opacity-50 ${className}`}
    >
      {pending ? "Saving…" : children}
    </button>
  );
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
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button onClick={toggle} className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-sm">
      {dark ? <Sun className="inline h-4 w-4" /> : <Moon className="inline h-4 w-4" />}{" "}
      <span className="ml-1">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

export function SidebarToggle() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.toggleAttribute("data-sidebar-open", open);
  }, [open]);
  return (
    <button onClick={() => setOpen((o) => !o)} className="md:hidden rounded-xl border px-3 py-2">
      <Menu className="h-4 w-4" />
    </button>
  );
}
