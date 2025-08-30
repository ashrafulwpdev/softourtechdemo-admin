'use client'
import { useEffect, useState } from 'react'
import { Command, Bell, User, LogOut, Sun, Moon, Plus } from 'lucide-react'
import { clsx } from 'clsx'

export default function Topbar({ title }: { title: string }){
  const [dark, setDark] = useState(false)
  useEffect(()=>{
    const saved = localStorage.getItem('theme'); const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved==='dark' : prefers
    document.documentElement.classList.toggle('dark', isDark); setDark(isDark)
  },[])
  function toggleTheme(){
    const next = !dark; setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:var(--surface)] backdrop-blur">
      <div className="container-xl flex h-14 items-center justify-between">
        <div className="font-semibold">{title}</div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost" aria-label="Command Palette (⌘K)"><Command size={16}/> <span className="hidden md:inline">Search</span></button>
          <button className="btn btn-ghost" aria-label="New"><Plus size={16}/> <span className="hidden md:inline">New</span></button>
          <button className="btn btn-ghost" aria-label="Notifications"><Bell size={16}/></button>
          <button className="btn btn-ghost" onClick={toggleTheme} aria-label="Toggle theme">{dark? <Sun size={16}/> : <Moon size={16}/>}</button>
          <div className="relative">
            <button className="btn btn-ghost"><User size={16}/></button>
            {/* Simple static menu hint for spec */}
          </div>
          <button className="btn btn-ghost text-danger" aria-label="Logout"><LogOut size={16}/></button>
        </div>
      </div>
    </header>
  )
}
