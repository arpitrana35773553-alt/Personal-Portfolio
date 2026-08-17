import { useEffect, useMemo, useState } from 'react'

interface ThemeScanOverlayProps {
  isScanning: boolean
  targetTheme: string
}

export function ThemeScanOverlay({ isScanning, targetTheme }: ThemeScanOverlayProps) {
  const [visible, setVisible] = useState(false)

  const isDark = targetTheme === 'dark'

  useEffect(() => {
    if (isScanning) {
      setVisible(true)
      const duration = isDark ? 1850 : 1100
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isScanning, isDark])

  // Generate deterministic cyber fragments for the de-rez dissolve
  const fragments = useMemo(() => {
    const types = ['hex', 'code', 'shard', 'dot', 'cross']
    const codeBits = ['01', '10', '0x7F', '✦', 'SYS', '11']
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      code: codeBits[i % codeBits.length],
      left: `${(i * 3.7 + 4) % 94}%`,
      top: `${(i * 7.3 + 8) % 88}%`,
      delay: `${(i * 0.035).toFixed(2)}s`,
      driftX: `${((i % 5) - 2) * 24}px`,
      driftY: `-${30 + (i % 6) * 18}px`,
      scale: 0.7 + (i % 4) * 0.25,
    }))
  }, [])

  if (!visible) return null

  // ── Light Mode: Cyber De-Rez & Fragment Dissolve into Classic Day Mode ──
  if (!isDark) {
    return (
      <div className={`cyber-derez-dissolve-overlay ${isScanning ? 'active' : ''}`} aria-hidden="true">
        {/* Soft Ambient Daylight Wash */}
        <div className="derez-ambient-wash" />

        {/* Fracturing Circuit Lines Dissolving Away */}
        <svg className="derez-circuit-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <line x1="0" y1="260" x2="1920" y2="260" className="derez-line line-1" />
          <line x1="0" y1="620" x2="1920" y2="620" className="derez-line line-2" />
          <line x1="0" y1="880" x2="1920" y2="880" className="derez-line line-3" />
          
          <line x1="380" y1="0" x2="380" y2="1080" className="derez-line line-v1" />
          <line x1="960" y1="0" x2="960" y2="1080" className="derez-line line-v2" />
          <line x1="1540" y1="0" x2="1540" y2="1080" className="derez-line line-v3" />

          <path d="M 120 260 L 280 260 L 380 360 L 380 580 L 520 720 L 960 720" className="derez-path p1" />
          <path d="M 1800 880 L 1640 880 L 1540 780 L 1540 540 L 1400 400 L 960 400" className="derez-path p2" />
        </svg>

        {/* Dispersing Cyber Particle Fragments evaporating into sunlight */}
        <div className="derez-fragments-layer">
          {fragments.map(f => (
            <span
              key={f.id}
              className={`derez-fragment fragment-${f.type}`}
              style={{
                left: f.left,
                top: f.top,
                animationDelay: f.delay,
                '--drift-x': f.driftX,
                '--drift-y': f.driftY,
                transform: `scale(${f.scale})`,
              } as React.CSSProperties}
            >
              {f.type === 'code' ? f.code : f.type === 'cross' ? '+' : null}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // ── Dark Mode: Cyber J.A.R.V.I.S. Arc Reactor Holographic Activation ──
  return (
    <div className={`jarvis-transformation-overlay ${isScanning ? 'active' : ''} jarvis-dark`} aria-hidden="true">
      {/* Anamorphic Horizontal Laser Flare Streak */}
      <div className="anamorphic-flare-streak" />

      {/* Vector Graph & Blueprint Circuit Line Drawing */}
      <svg className="scan-graph-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <defs>
          <linearGradient id="jarvisLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <line x1="0" y1="200" x2="1920" y2="200" className="circuit-line line-h-1" />
        <line x1="0" y1="540" x2="1920" y2="540" className="circuit-line line-h-2" />
        <line x1="0" y1="880" x2="1920" y2="880" className="circuit-line line-h-3" />

        <line x1="300" y1="0" x2="300" y2="1080" className="circuit-line line-v-1" />
        <line x1="960" y1="0" x2="960" y2="1080" className="circuit-line line-v-2" />
        <line x1="1620" y1="0" x2="1620" y2="1080" className="circuit-line line-v-3" />

        <path d="M 80 200 L 220 200 L 300 280 L 300 480 L 440 620 L 780 620 L 960 540 L 1320 540 L 1440 660 L 1720 660 L 1840 780" className="circuit-path-drawn branch-1" stroke="url(#jarvisLineGrad)" />
        <path d="M 1840 880 L 1680 880 L 1620 820 L 1620 600 L 1500 480 L 1140 480 L 960 540 L 600 540 L 480 420 L 200 420 L 80 300" className="circuit-path-drawn branch-2" stroke="url(#jarvisLineGrad)" />

        <circle cx="300" cy="280" r="5" className="circuit-node node-1" />
        <circle cx="960" cy="540" r="7" className="circuit-node node-2" />
        <circle cx="1620" cy="820" r="5" className="circuit-node node-3" />
        <circle cx="440" cy="620" r="4" className="circuit-node node-4" />
        <circle cx="1440" cy="660" r="4" className="circuit-node node-5" />
      </svg>

      {/* Central JARVIS Arc Reactor & Holographic Core */}
      <div className="jarvis-arc-stage">
        <div className="arc-core-glow" />
        <svg className="arc-svg-rings" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="350" className="arc-ring ring-outer-cw" strokeDasharray="24 12 48 12 12 12" />
          <circle cx="400" cy="400" r="300" className="arc-ring ring-dial-ccw" strokeDasharray="6 18" />
          <circle cx="400" cy="400" r="250" className="arc-ring ring-dashed" strokeDasharray="50 15 25 15" />

          <polygon points="400,160 610,520 190,520" className="arc-triangle tri-1" />
          <polygon points="400,640 610,280 190,280" className="arc-triangle tri-2" />

          <circle cx="400" cy="400" r="180" className="arc-ring ring-mid-cw" strokeDasharray="70 25 15 25" />
          <circle cx="400" cy="400" r="130" className="arc-ring ring-inner-ccw" strokeDasharray="10 10" />

          <line x1="400" y1="20" x2="400" y2="780" className="arc-crosshair" />
          <line x1="20" y1="400" x2="780" y2="400" className="arc-crosshair" />

          <circle cx="400" cy="400" r="80" className="arc-core-inner" />
          <circle cx="400" cy="400" r="40" className="arc-center-orb" />
        </svg>
      </div>
    </div>
  )
}
