"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
};

export function Button({ className, variant = "primary", loading, children, ...rest }: Props) {
  const base = "btn";
  const styles = variant === "primary" ? "btn-primary" : variant === "danger" ? "text-white bg-[var(--danger)]" : "btn-ghost";
  return (
    <button {...rest} disabled={loading || rest.disabled} className={cn(base, styles, className)}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span className={cn(loading && "opacity-80")}>{children}</span>
    </button>
  );
}
