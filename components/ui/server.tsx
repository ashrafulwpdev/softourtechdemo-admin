import React from "react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container-xl ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 p-6 ${className}`}>{children}</div>;
}