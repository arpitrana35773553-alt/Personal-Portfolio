import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { useState } from 'react'
export type Theme = 'light' | 'dark' | 'system'
export function Navbar({ theme, setTheme, activeSection }: { theme: Theme; setTheme: (theme: Theme) => void; activeSection: string }) {
 const [open, setOpen] = useState(false); const links = ['Home', 'About', 'Projects', 'Skills', 'Dashboard', 'Roadmap', 'Connect']
 const icons = { light: Sun, dark: Moon, system: Monitor }; const ThemeIcon = icons[theme]
 return <header className="navbar"><a className="brand" href="#home"><i />ARPIT<span>/RANA</span></a><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')} aria-label={`Change theme, currently ${theme}`}><ThemeIcon size={16} /></button><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button><nav className={open ? 'open' : ''}>{links.map(link => <a className={activeSection === link.toLowerCase() ? 'active' : ''} onClick={() => setOpen(false)} key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}</nav></header>
}
