import { useEffect, useState, type FormEvent } from 'react'
import { ArrowDown, ArrowUpRight, Code2, ExternalLink, Globe2, Mail, Send, Terminal, UsersRound, X } from 'lucide-react'
import { Navbar, type Theme } from './components/Navbar'
import { GlassButton, GlassPanel } from './components/ui'
import { ThemeScanOverlay } from './components/ThemeScanOverlay'
import { projects, skills, certificates, type Project } from './data/portfolio'
import arpitPhoto from './arpit-photo.png'
import './styles.css'
import './motion.css'

const steps = ['Learn', 'Build', 'Experiment', 'Debug', 'Refine']
const socials = [
  { name: 'LinkedIn', icon: UsersRound, url: '#' },
  { name: 'GitHub', icon: Code2, url: 'https://github.com/arpitrana35773553-alt' },
  { name: 'LeetCode', icon: Code2, url: '#' },
  { name: 'HackerRank', icon: Terminal, url: '#' },
  { name: 'Instagram', icon: Globe2, url: '#' },
  { name: 'Email', icon: Mail, url: 'mailto:' }
]

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="section-title">
      <p className="eyebrow">// {eyebrow}</p>
      {children}
    </div>
  )
}

function BlueprintCorners() {
  return (
    <>
      <span className="blueprint-crosshair blueprint-top-left" />
      <span className="blueprint-crosshair blueprint-top-right" />
      <span className="blueprint-crosshair blueprint-bottom-left" />
      <span className="blueprint-crosshair blueprint-bottom-right" />
    </>
  )
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return (saved === 'dark' || saved === 'light') ? saved : 'light'
  })
  const [isThemeScanning, setIsThemeScanning] = useState(false)
  const [modal, setModal] = useState<Project | null>(null)
  const [filter, setFilter] = useState('All')
  const [filteringState, setFilteringState] = useState<'in' | 'out'>('in')
  const [message, setMessage] = useState('')
  const [activeSection, setActiveSection] = useState('home')
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme === theme) return
    setIsThemeScanning(true)
    
    // Check for native view transitions support
    if ('startViewTransition' in document) {
      ;(document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        setTheme(newTheme)
      })
    } else {
      setTheme(newTheme)
    }

    const scanDuration = newTheme === 'dark' ? 1900 : 700
    setTimeout(() => {
      setIsThemeScanning(false)
    }, scanDuration)
  }

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        '--scroll',
        `${(window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * 100}%`
      )
    }
    addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const sections = [...document.querySelectorAll<HTMLElement>('main > section')]
    if (!reducedMotion) {
      sections.slice(1).forEach(section => section.classList.add('reveal-on-scroll'))
    }

    // ── Scroll-Driven Letter Stretch ─────────────────────────────────────────
    if (!reducedMotion) {
      const stretchTargets = document.querySelectorAll<HTMLElement>(
        '.section-title h2, .hero-heading'
      )
      stretchTargets.forEach(el => {
        // Split text into word-spans, preserving spaces
        const words = el.innerText.trim().split(/\s+/)
        el.innerHTML = words
          .map(w => `<span class="scroll-stretch-word">${w}</span>`)
          .join(' ')
      })

      const stretchObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const words = entry.target.querySelectorAll<HTMLElement>('.scroll-stretch-word')
              words.forEach(word => word.classList.add('stretch-visible'))
              stretchObserver.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.25 }
      )
      stretchTargets.forEach(el => stretchObserver.observe(el))
    }
    // ─────────────────────────────────────────────────────────────────────────

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            const staggerItems = entry.target.querySelectorAll('.reveal-stagger-item')
            staggerItems.forEach(item => item.classList.add('is-visible'))

            const id = (entry.target as HTMLElement).id
            if (id) setActiveSection(id)
          }
        })
      },
      { threshold: 0.2 }
    )

    sections.forEach(section => observer.observe(section))

    const handlePointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX / innerWidth}`)
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY / innerHeight}`)
    }

    if (!reducedMotion && !matchMedia('(pointer: coarse)').matches) {
      addEventListener('pointermove', handlePointerMove, { passive: true })
    }

    return () => {
      observer.disconnect()
      removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  const handleCategoryFilter = (category: string) => {
    if (category === filter) return
    setFilteringState('out')
    setTimeout(() => {
      setFilter(category)
      setFilteringState('in')
    }, 200)
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name    = (data.get('name')    as string) || ''
    const email   = (data.get('email')   as string) || ''
    const subject = (data.get('subject') as string) || 'Message from Portfolio'
    const msg     = (data.get('message') as string) || ''

    const body = encodeURIComponent(
      `Hi Arpit,\n\nYou have a new message from your portfolio:\n\nName: ${name}\nEmail: ${email}\n\n${msg}\n`
    )
    const mailtoHref = `mailto:arpitrana35773553@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`

    // Open the user's mail client
    window.location.href = mailtoHref

    form.reset()
    setMessage('✓ Your mail client has opened with the message pre-filled. Hit Send!')
  }

  const categories = ['All', ...Object.keys(skills)]

  return (
    <>
      <ThemeScanOverlay isScanning={isThemeScanning} targetTheme={theme} />
      <div className="progress" />
      <div className="ambient" />
      <Navbar theme={theme} setTheme={handleThemeChange} activeSection={activeSection} />

      <main className={pageLoaded ? 'page-loaded' : ''}>
        {/* HERO */}
        <section id="home" className="hero hero-grand-showcase">

          {/* Far-left vertical year */}
          <span className="hero-year">2026</span>

          {/* ── LEFT PANEL ───────────────────── */}
          <div className="hero-left-panel">
            <span className="hero-badge">
              <i className="badge-dot" /> FULL-STACK DEVELOPER
            </span>

            <h1 className="hero-condensed-heading">
              BUILDING SECURE,<br />
              SCALABLE &amp; IMPACTFUL<br />
              <em className="heading-accent">DIGITAL EXPERIENCES.</em>
            </h1>

            <div className="actions hero-left-actions">
              <a className="glass-button primary" href="#projects">
                Explore My Work <ArrowUpRight size={15} />
              </a>
              <a className="glass-button" href="#connect">Connect</a>
            </div>

            <span className="hero-status">
              <i className="status-dot" /> SYSTEM ONLINE
            </span>
          </div>

          {/* ── CENTER PORTRAIT ──────────────── */}
          <div className="hero-portrait-col">
            <div className="portrait-ring" />
            <div className="portrait-ambient-glow" />
            <img src={arpitPhoto} alt="Arpit Rana" className="frameless-portrait-photo" />
          </div>

          {/* ── RIGHT PANEL ──────────────────── */}
          <div className="hero-right-panel">
            {[
              { n: '01', title: 'DATA & AI',      desc: 'Turning data into meaningful insights',      icon: <ArrowUpRight size={18} /> },
              { n: '02', title: 'FULL STACK',      desc: 'Building end-to-end web solutions',          icon: <Code2 size={18} /> },
              { n: '03', title: 'CYBERSECURITY',   desc: 'Securing systems, protecting futures',       icon: <Terminal size={18} /> },
              { n: '04', title: 'UI / UX DESIGN',  desc: 'Designing intuitive user experiences',       icon: <Globe2 size={18} /> },
            ].map(({ n, title, desc, icon }) => (
              <div key={n} className="hero-service-item">
                <div className="svc-left">
                  <span className="svc-num">{n}</span>
                  <div>
                    <strong className="svc-title">{title}</strong>
                    <p className="svc-desc">{desc}</p>
                  </div>
                </div>
                <span className="svc-icon">{icon}</span>
              </div>
            ))}

            <div className="hero-scroll-hint">
              SCROLL DOWN <ArrowDown size={13} />
            </div>
          </div>

          {/* ── CYBER × UI BOTTOM BAR ────────── */}
          <div className="hero-cyber-bar">
            <span className="blended-cyber-title">CYBER × UI</span>
          </div>

        </section>


        {/* ABOUT */}
        <section id="about" className="section about">
          <BlueprintCorners />
          <SectionTitle eyebrow="02 · ABOUT">
            <h2>
              Curious by nature.
              <br />
              <em>Intentional</em> by practice.
            </h2>
          </SectionTitle>
          <div className="about-copy">
            <p>
              I’m Arpit, a Computer Science Engineering student from Himachal Pradesh, currently pursuing B.Tech CSE Core
              at Lovely Professional University.
            </p>
            <p>
              I’m drawn to the way systems work beneath the surface—how code becomes useful, how networks communicate, and
              how intelligent systems can be made safer.
            </p>
            <blockquote>
              “A CSE student building the skills, projects and mindset to become an AI-driven Cybersecurity Engineer.”
            </blockquote>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section process">
          <p className="eyebrow">// MY WORKING SYSTEM</p>
          <div className="process-track">
            {steps.map((s, i) => (
              <div key={s} className={`reveal-stagger-item stagger-${i + 1}`}>
                <b>0{i + 1}</b>
                <strong>{s}</strong>
                <span>
                  {
                    ['Absorb fundamentals', 'Turn ideas into work', 'Test and explore', 'Find what matters', 'Make it better'][
                      i
                    ]
                  }
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <SectionTitle eyebrow="03 · SELECTED WORK">
            <h2>
              Built to <em>learn.</em>
            </h2>
          </SectionTitle>
          <div className="project-grid">
            {projects.map((project, idx) => (
              <GlassPanel
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''} reveal-stagger-item stagger-${(idx % 4) + 1}`}
              >
                <BlueprintCorners />
                <span className="project-label">
                  {project.id === 'memory' ? '01' : project.id === 'tic' ? '02' : project.id === 'amazon' ? '03' : '04'} /{' '}
                  {project.label}
                </span>
                <div>
                  <p className="tag">{project.status}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="chips">
                    {project.stack.map(x => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                </div>
                <GlassButton onClick={() => setModal(project)}>
                  View details <ArrowUpRight size={16} />
                </GlassButton>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <SectionTitle eyebrow="04 · SKILL MATRIX">
            <h2>
              Learning with <em>purpose.</em>
            </h2>
          </SectionTitle>
          <div className="filters">
            {categories.map(c => (
              <button
                key={c}
                className={filter === c ? 'selected' : ''}
                onClick={() => handleCategoryFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div
            className={`skills-grid-container ${filteringState === 'out' ? 'filtering-out' : 'filtering-in'}`}
          >
            <div className="skills-grid">
              {Object.entries(skills)
                .filter(([c]) => filter === 'All' || c === filter)
                .map(([category, items], idx) => (
                  <GlassPanel key={category} className={`reveal-stagger-item stagger-${(idx % 3) + 1}`}>
                    <BlueprintCorners />
                    <h3>{category}</h3>
                    <div className="skill-items">
                      {items.map((s, i) => (
                        <span key={s}>
                          <i className={i === 0 ? 'project' : 'learning'} />
                          {s}
                          <small>{i === 0 ? 'Project experience' : 'Learning'}</small>
                        </span>
                      ))}
                    </div>
                  </GlassPanel>
                ))}
            </div>
          </div>
        </section>

        {/* DASHBOARD */}
        <section id="dashboard" className="section dashboard">
          <SectionTitle eyebrow="05 · PERSONAL DASHBOARD">
            <h2>
              System <em>status.</em>
            </h2>
          </SectionTitle>
          <div className="dashboard-grid">
            <GlassPanel className="focus reveal-stagger-item stagger-1">
              <BlueprintCorners />
              <p className="eyebrow">CURRENT FOCUS</p>
              {['AI', 'Cybersecurity', 'CSE Fundamentals', 'Projects', 'DSA'].map((x, i) => (
                <span key={x}>
                  0{i + 1}
                  <b>{x}</b>
                </span>
              ))}
            </GlassPanel>

            <GlassPanel className="reveal-stagger-item stagger-2">
              <BlueprintCorners />
              <p className="eyebrow">PROJECT STATUS</p>
              {projects.slice(0, 3).map(p => (
                <p className="status" key={p.id}>
                  <i className={p.status === 'Completed' ? 'done' : ''} />
                  {p.status}
                  <b>{p.title}</b>
                </p>
              ))}
            </GlassPanel>

            <GlassPanel className="reveal-stagger-item stagger-3">
              <BlueprintCorners />
              <p className="eyebrow">LONG-TERM VECTOR</p>
              <div className="vector">
                CSE <ArrowDown /> AI + Cybersecurity <ArrowDown /> <strong>Security Engineer</strong>
              </div>
            </GlassPanel>

            <GlassPanel className="profile reveal-stagger-item stagger-4">
              <BlueprintCorners />
              <p className="eyebrow">DEVELOPER PROFILES</p>
              <p>
                GitHub <b>See connected profile</b>
              </p>
              <p>
                LeetCode <b>Profile link pending</b>
              </p>
              <p>
                HackerRank <b>Profile link pending</b>
              </p>
            </GlassPanel>
          </div>
        </section>

        {/* AI DIRECTION */}
        <section className="section ai-direction">
          <BlueprintCorners />
          <SectionTitle eyebrow="06 · LONG-TERM DIRECTION">
            <h2>
              AI needs security.
              <br />
              Security can use <em>AI.</em>
            </h2>
          </SectionTitle>
          <div>
            <p>
              The most compelling problems for me sit where intelligent systems and secure systems meet. I’m starting
              with the fundamentals, then growing toward work that understands both sides.
            </p>
            <div className="ai-chain">
              {['Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Secure Systems'].map(x => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className="section">
          <SectionTitle eyebrow="07 · ROADMAP">
            <h2>
              Direction over <em>destination.</em>
            </h2>
          </SectionTitle>
          <div className="roadmap">
            {[
              ['NOW / 2026', 'Foundations', 'B.Tech CSE · Programming · DSA · Projects · Linux · Web Development · Cybersecurity & AI fundamentals'],
              ['NEXT', 'Depth & practice', 'Advanced programming · Networking · Machine Learning · Security projects · Open source'],
              ['FUTURE', 'Applied security', 'Cybersecurity engineering · AI security · Advanced systems · Real-world problem solving']
            ].map(([time, title, text], idx) => (
              <GlassPanel key={time} className={`reveal-stagger-item stagger-${idx + 1}`}>
                <BlueprintCorners />
                <span>{time}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* CERTIFICATES */}
        <section id="certificates" className="section certificates-section">
          <SectionTitle eyebrow="08 · VERIFIED CREDENTIALS">
            <h2>
              Official <em>Accreditations</em> &amp; Hackathons.
            </h2>
          </SectionTitle>

          <div className="certs-showcase-grid">
            {certificates.map((cert, idx) => (
              <div key={cert.id} className={`cert-futuristic-card reveal-stagger-item stagger-${idx + 1}`}>
                <BlueprintCorners />

                {/* Top Cyber Status Bar */}
                <div className="cert-card-header">
                  <span className="cert-cyber-id">// CERT_0{idx + 1}</span>
                  <span className="cert-badge-type">{cert.type}</span>
                </div>

                {/* Extracted Certificate Image Showcase Stage */}
                <a
                  href={cert.pdfUrl ?? cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-media-stage"
                  aria-label={`Open ${cert.title} certificate`}
                >
                  <div className="cert-scanline" />
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cert-showcase-photo"
                    loading="lazy"
                  />
                  <div className="cert-overlay-glow">
                    <span className="cert-inspect-pill">
                      Inspect Document <ExternalLink size={13} />
                    </span>
                  </div>
                </a>

                {/* Futuristic Info & Title Block Below */}
                <div className="cert-info-block">
                  <div className="cert-title-row">
                    <h3 className="cert-futuristic-title">{cert.title}</h3>
                    <span className="cert-year-tag">{cert.date}</span>
                  </div>

                  <p className="cert-issuer-brand">
                    <span className="issuer-dot" /> {cert.issuer}
                  </p>

                  <p className="cert-summary-desc">{cert.credential}</p>

                  <div className="cert-action-footer">
                    <span className="cert-verify-status">
                      <i className="verify-pulse" /> VERIFIED CREDENTIAL
                    </span>
                    <a
                      href={cert.pdfUrl ?? cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-open-action"
                    >
                      View Source <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONNECT */}
        <section id="connect" className="section connect">
          <SectionTitle eyebrow="08 · ESTABLISH CONNECTION">
            <h2>
              Let’s build something <em>useful.</em>
            </h2>
          </SectionTitle>
          <div className="social-grid">
            {socials.map(({ name, icon: Icon, url }, idx) => (
              <a
                key={name}
                href={url}
                className={`social-card reveal-stagger-item stagger-${(idx % 3) + 1}`}
                aria-label={name}
              >
                <Icon />
                <span>{name}</span>
                <ExternalLink size={15} />
              </a>
            ))}
          </div>

          <div className="contact-layout">
            <p>Have an idea, opportunity, or simply want to talk technology? My inbox is the best starting point.</p>
            <form onSubmit={submit}>
              <label>
                Name
                <input required name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input required type="email" name="email" placeholder="you@email.com" />
              </label>
              <label>
                Subject
                <input name="subject" placeholder="A quick subject" />
              </label>
              <label>
                Message
                <textarea required name="message" placeholder="What would you like to talk about?" />
              </label>
              <GlassButton className="primary" type="submit">
                Establish Connection <Send size={16} />
              </GlassButton>
              <p aria-live="polite" className="form-status">
                {message}
              </p>
            </form>
          </div>

          <footer>
            © {new Date().getFullYear()} ARPIT RANA <a href="#home">BACK TO TOP ↑</a>
          </footer>
        </section>
      </main>

      {modal && (
        <div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}>
          <GlassPanel
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={e => e.stopPropagation()}
          >
            <BlueprintCorners />
            <button className="close" onClick={() => setModal(null)} aria-label="Close">
              <X />
            </button>
            <p className="eyebrow">PROJECT NOTES</p>
            <h2 id="modal-title">{modal.title}</h2>
            {modal.details.map(x => (
              <p key={x}>{x}</p>
            ))}
            <p>
              <strong>Key learning:</strong> {modal.learning}
            </p>
          </GlassPanel>
        </div>
      )}
    </>
  )
}
