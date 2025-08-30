'use client'
import React from 'react'
type Toast = { id: string, kind: 'success'|'error'|'info'|'warning'|'undo'|'progress', message: string, actionLabel?: string, onAction?: ()=>void }
export const ToastContext = React.createContext<{ push: (t: Omit<Toast,'id'>)=>void }>({ push: ()=>{} })
export default function ToastProvider({ children }: { children: React.ReactNode }){
  const [items, setItems] = React.useState<Toast[]>([])
  function push(t: Omit<Toast,'id'>){ const id = Math.random().toString(36).slice(2); setItems(x=>[...x,{...t,id}]); setTimeout(()=>setItems(x=>x.filter(i=>i.id!==id)), t.kind==='undo'?8000:5000) }
  return <ToastContext.Provider value={{push}}>
    {children}
    <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2 md:bottom-auto md:right-4 md:top-4">
      {items.map(t=>(
        <div key={t.id} className="toast">
          <div className="text-sm">{t.message}</div>
          {t.actionLabel && <button className="ml-2 underline" onClick={t.onAction}>{t.actionLabel}</button>}
        </div>
      ))}
    </div>
  </ToastContext.Provider>
}
