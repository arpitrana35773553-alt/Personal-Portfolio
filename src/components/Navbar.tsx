import { Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
export type Theme = 'light' | 'dark'

export function Navbar({ theme, setTheme, activeSection }: {
  theme: Theme
  setTheme: (theme: Theme) => void
  activeSection: string
}) {
  const [open, setOpen] = useState(false)
  const links = ['Home', 'About', 'Projects', 'Skills', 'Certificates', 'Dashboard', 'Roadmap', 'Connect']
  const ThemeIcon = theme === 'dark' ? Moon : Sun

  return (
    <header className="navbar">
      {/* Column 1: Brand */}
      <a className="brand" href="#home">
        <i />ARPIT<span>/RANA</span>
      </a>

      {/* Column 2: Nav — centered */}
      <nav className={open ? 'open' : ''}>
        {links.map(link => (
          <a
            key={link}
            className={activeSection === link.toLowerCase() ? 'active' : ''}
            onClick={() => setOpen(false)}
            href={`#${link.toLowerCase()}`}
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Column 3: Actions — right aligned */}
      <div className="navbar-actions">
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <ThemeIcon size={16} />
        </button>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
