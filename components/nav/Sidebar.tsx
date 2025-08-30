'use client'
import Link from 'next/link'
import { useState } from 'react'
import { LayoutDashboard, Folder, Users, Settings, Tags, Newspaper } from 'lucide-react'
import { clsx } from 'clsx'

const items = [
  { href:'/dashboard', label:'Dashboard', icon: LayoutDashboard },
  { href:'/projects', label:'Projects', icon: Folder },
  { href:'/leads', label:'Leads', icon: Users },
  { href:'/services', label:'Services', icon: Tags },
  { href:'/pricing', label:'Pricing', icon: Tags },
  { href:'/blog', label:'Blog', icon: Newspaper },
  { href:'/settings', label:'Settings', icon: Settings },
]

export default function Sidebar(){
  const [collapsed, setCollapsed] = useState(false)
  return (
    <aside className={clsx('border-r border-[var(--border)] bg-[var(--surface)] transition-all', collapsed?'w-[72px]':'w-[240px]')}>
      <div className="flex items-center justify-between p-3">
        <span className="font-semibold">{collapsed?'ST':'Softourtech'}</span>
        <button className="btn btn-ghost px-2 py-1" onClick={()=>setCollapsed(!collapsed)}>{collapsed?'>':'<'}</button>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {items.map((it)=>(
          <Link href={it.href} key={it.href} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[var(--surface-2)]">
            <it.icon size={20} />
            {!collapsed && <span>{it.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-2 text-xs text-[var(--text-muted)]">{!collapsed && '© Softourtech'}</div>
    </aside>
  )
}
