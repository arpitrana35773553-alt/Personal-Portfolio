import { type ButtonHTMLAttributes, type ComponentPropsWithoutRef, type PropsWithChildren } from 'react'
export function GlassPanel({ children, className = '', ...props }: PropsWithChildren<ComponentPropsWithoutRef<'div'>>) { return <div className={`glass-panel ${className}`} {...props}>{children}</div> }
export function GlassButton({ children, className = '', ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) { return <button className={`glass-button ${className}`} {...props}>{children}</button> }
