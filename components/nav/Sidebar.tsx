"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Briefcase, CircleDollarSign, Cog, FileText, Home, Layers, MessagesSquare } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/leads", label: "Leads", icon: MessagesSquare },
  { href: "/services", label: "Services", icon: Layers },
  { href: "/pricing", label: "Pricing", icon: CircleDollarSign },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/settings", label: "Settings", icon: Cog },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <aside className="sidebar w-60">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-bold">Softourtech Admin</span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-sm text-[color:var(--text-muted)]">â–®â–®</button>
      </div>
      <nav className={cn("px-2", collapsed && "hidden md:block")}>
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname.startsWith(it.href);
          return (
            <Link key={it.href} href={it.href} className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg mb-1",
              active ? "bg-[color:var(--surface-2)] font-semibold" : "hover:bg-[color:var(--surface-2)]"
            )}>
              <Icon className="h-4 w-4" />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
