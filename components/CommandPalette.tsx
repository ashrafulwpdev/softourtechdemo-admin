"use client";
import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const nav = (to: string) => { setOpen(false); router.push(to); };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-24 z-50" onClick={()=>setOpen(false)}>
      <Command className="bg-surface text-[color:var(--text)] w-[600px] max-w-[90%] rounded-xl shadow-card border border-[color:var(--border)]"
        onKeyDown={(e)=> e.stopPropagation()}>
        <Command.Input placeholder="Type a command..." className="input m-3" />
        <Command.List className="max-h-80 overflow-auto">
          <Command.Empty className="p-3 text-[color:var(--text-muted)]">No results found.</Command.Empty>
          <Command.Group heading="Navigate">
            <Command.Item onSelect={()=>nav('/dashboard')}>Dashboard</Command.Item>
            <Command.Item onSelect={()=>nav('/projects')}>Projects</Command.Item>
            <Command.Item onSelect={()=>nav('/leads')}>Leads</Command.Item>
            <Command.Item onSelect={()=>nav('/services')}>Services</Command.Item>
            <Command.Item onSelect={()=>nav('/pricing')}>Pricing</Command.Item>
            <Command.Item onSelect={()=>nav('/blog')}>Blog</Command.Item>
            <Command.Item onSelect={()=>nav('/settings')}>Settings</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
