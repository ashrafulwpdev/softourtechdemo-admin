'use client'
import { clsx } from 'clsx'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary'|'ghost'|'danger',
  size?: 'sm'|'md'|'lg',
  isLoading?: boolean,
  fullWidth?: boolean
}
export default function Button({ variant='primary', size='md', isLoading=false, fullWidth=false, className, children, ...rest }: Props){
  const base = 'btn'
  const v = variant==='primary' ? 'btn-primary' : variant==='danger' ? 'bg-danger text-white' : 'btn-ghost'
  const s = size==='sm' ? 'text-xs py-1.5 px-3' : size==='lg' ? 'text-base py-2.5 px-5' : ''
  const w = fullWidth ? 'w-full' : ''
  return <button {...rest} className={clsx(base, v, s, w, className)} disabled={isLoading || rest.disabled}>
    {isLoading ? 'Loading…' : children}
  </button>
}
