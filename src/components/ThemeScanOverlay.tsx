import { useEffect, useMemo, useState } from 'react'

interface ThemeScanOverlayProps {
  isScanning: boolean
  targetTheme: string
}

interface OrigamiFacet {
  id: number
  points: string
  center: [number, number]
  rotateX: number
  rotateY: number
  rotateZ: number
  delay: number
  foldAxis: string
}

export function ThemeScanOverlay({ isScanning, targetTheme }: ThemeScanOverlayProps) {
  const [visible, setVisible] = useState(false)

  const isDark = targetTheme === 'dark'

  useEffect(() => {
    if (isScanning) {
      setVisible(true)
      const duration = isDark ? 1850 : 1300
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isScanning, isDark])

  // Deterministic Origami Facets for the Dark -> Light Transition
  // 16 architectural planar polygons folding along spatial geometric axes
  const origamiFacets = useMemo<OrigamiFacet[]>(() => {
    return [
      // Top Quad & Triangular Facets
      { id: 1, points: '0,0 480,0 360,270 0,270', center: [210, 135], rotateX: -42, rotateY: 30, rotateZ: -12, delay: 0.04, foldAxis: 'top-left' },
      { id: 2, points: '480,0 960,0 720,270 360,270', center: [630, 135], rotateX: -48, rotateY: -15, rotateZ: 8, delay: 0.08, foldAxis: 'top-center' },
      { id: 3, points: '960,0 1440,0 1560,270 1200,270', center: [1290, 135], rotateX: -45, rotateY: 25, rotateZ: -6, delay: 0.12, foldAxis: 'top-right' },
      { id: 4, points: '1440,0 1920,0 1920,270 1560,270', center: [1710, 135], rotateX: -40, rotateY: -35, rotateZ: 14, delay: 0.06, foldAxis: 'top-far-right' },

      // Upper Center Origami Planes
      { id: 5, points: '0,270 360,270 480,540 0,540', center: [210, 405], rotateX: 25, rotateY: 45, rotateZ: -10, delay: 0.1, foldAxis: 'left-center' },
      { id: 6, points: '360,270 720,270 960,540 480,540', center: [630, 405], rotateX: 35, rotateY: 30, rotateZ: 15, delay: 0.14, foldAxis: 'center-left' },
      { id: 7, points: '720,270 1200,270 1440,540 960,540', center: [1080, 405], rotateX: 38, rotateY: -30, rotateZ: -15, delay: 0.16, foldAxis: 'center-right' },
      { id: 8, points: '1200,270 1560,270 1920,540 1440,540', center: [1530, 405], rotateX: 28, rotateY: -45, rotateZ: 12, delay: 0.12, foldAxis: 'right-center' },

      // Lower Center Origami Planes
      { id: 9, points: '0,540 480,540 360,810 0,810', center: [210, 675], rotateX: -30, rotateY: 40, rotateZ: 8, delay: 0.15, foldAxis: 'lower-left' },
      { id: 10, points: '480,540 960,540 720,810 360,810', center: [630, 675], rotateX: -36, rotateY: 28, rotateZ: -12, delay: 0.18, foldAxis: 'lower-mid-left' },
      { id: 11, points: '960,540 1440,540 1200,810 720,810', center: [1080, 675], rotateX: -34, rotateY: -28, rotateZ: 10, delay: 0.2, foldAxis: 'lower-mid-right' },
      { id: 12, points: '1440,540 1920,540 1920,810 1200,810', center: [1620, 675], rotateX: -26, rotateY: -42, rotateZ: -9, delay: 0.16, foldAxis: 'lower-right' },

      // Bottom Quad & Triangular Facets
      { id: 13, points: '0,810 360,810 480,1080 0,1080', center: [210, 945], rotateX: 45, rotateY: 35, rotateZ: -14, delay: 0.08, foldAxis: 'bottom-left' },
      { id: 14, points: '360,810 720,810 960,1080 480,1080', center: [630, 945], rotateX: 50, rotateY: 18, rotateZ: 8, delay: 0.12, foldAxis: 'bottom-mid-left' },
      { id: 15, points: '720,810 1200,810 1440,1080 960,1080', center: [1080, 945], rotateX: 48, rotateY: -20, rotateZ: -10, delay: 0.14, foldAxis: 'bottom-mid-right' },
      { id: 16, points: '1200,810 1920,810 1920,1080 1440,1080', center: [1620, 945], rotateX: 42, rotateY: -38, rotateZ: 12, delay: 0.1, foldAxis: 'bottom-right' },
    ]
  }, [])

  if (!visible) return null

  // ── Dark -> Light Mode: Architectural Fragmented Origami Dissolve ──
  if (!isDark) {
    return (
      <div className={`origami-dissolve-overlay ${isScanning ? 'active' : ''}`} aria-hidden="true">
        {/* Soft Ambient Daylight Influx */}
        <div className="origami-ambient-glow" />

        {/* 3D Fragmented Origami Planar Mesh */}
        <div className="origami-3d-stage">
          <svg className="origami-mesh-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
            <defs>
              <linearGradient id="origamiFacetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(245, 242, 235, 0.92)" />
                <stop offset="50%" stopColor="rgba(235, 228, 218, 0.88)" />
                <stop offset="100%" stopColor="rgba(214, 196, 178, 0.82)" />
              </linearGradient>
            </defs>

            {origamiFacets.map(facet => (
              <polygon
                key={facet.id}
                points={facet.points}
                className="origami-plane-facet"
                fill="url(#origamiFacetGrad)"
                stroke="rgba(179, 131, 95, 0.35)"
                strokeWidth="1"
                style={{
                  transformOrigin: `${facet.center[0]}px ${facet.center[1]}px`,
                  animationDelay: `${facet.delay}s`,
                  '--rx': `${facet.rotateX}deg`,
                  '--ry': `${facet.rotateY}deg`,
                  '--rz': `${facet.rotateZ}deg`,
                  '--cx': `${facet.center[0]}px`,
                  '--cy': `${facet.center[1]}px`,
                } as React.CSSProperties}
              />
            ))}
          </svg>
        </div>
      </div>
    )
  }

  // ── Light -> Dark Mode: Marvel J.A.R.V.I.S. Arc Reactor Hologram ──
  return (
    <div className={`jarvis-transformation-overlay ${isScanning ? 'active' : ''} jarvis-dark`} aria-hidden="true">
      {/* Horizontal Laser Flare Streak */}
      <div className="anamorphic-flare-streak" />

      {/* Blueprint Circuit Vector Lines */}
      <svg className="scan-graph-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <defs>
          <linearGradient id="jarvisLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <line x1="0" y1="200" x2="1920" y2="200" className="circuit-line line-h-1" fill="none" />
        <line x1="0" y1="540" x2="1920" y2="540" className="circuit-line line-h-2" fill="none" />
        <line x1="0" y1="880" x2="1920" y2="880" className="circuit-line line-h-3" fill="none" />

        <line x1="300" y1="0" x2="300" y2="1080" className="circuit-line line-v-1" fill="none" />
        <line x1="960" y1="0" x2="960" y2="1080" className="circuit-line line-v-2" fill="none" />
        <line x1="1620" y1="0" x2="1620" y2="1080" className="circuit-line line-v-3" fill="none" />

        <path d="M 80 200 L 220 200 L 300 280 L 300 480 L 440 620 L 780 620 L 960 540 L 1320 540 L 1440 660 L 1720 660 L 1840 780" className="circuit-path-drawn branch-1" stroke="url(#jarvisLineGrad)" fill="none" />
        <path d="M 1840 880 L 1680 880 L 1620 820 L 1620 600 L 1500 480 L 1140 480 L 960 540 L 600 540 L 480 420 L 200 420 L 80 300" className="circuit-path-drawn branch-2" stroke="url(#jarvisLineGrad)" fill="none" />

        <circle cx="300" cy="280" r="5" className="circuit-node node-1" />
        <circle cx="960" cy="540" r="7" className="circuit-node node-2" />
        <circle cx="1620" cy="820" r="5" className="circuit-node node-3" />
        <circle cx="440" cy="620" r="4" className="circuit-node node-4" />
        <circle cx="1440" cy="660" r="4" className="circuit-node node-5" />
      </svg>

      {/* Central JARVIS Arc Reactor Holographic Core */}
      <div className="jarvis-arc-stage">
        <div className="arc-core-glow" />
        <svg className="arc-svg-rings" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="350" className="arc-ring ring-outer-cw" strokeDasharray="24 12 48 12 12 12" fill="none" />
          <circle cx="400" cy="400" r="300" className="arc-ring ring-dial-ccw" strokeDasharray="6 18" fill="none" />
          <circle cx="400" cy="400" r="250" className="arc-ring ring-dashed" strokeDasharray="50 15 25 15" fill="none" />

          <polygon points="400,160 610,520 190,520" className="arc-triangle tri-1" fill="none" />
          <polygon points="400,640 610,280 190,280" className="arc-triangle tri-2" fill="none" />

          <circle cx="400" cy="400" r="180" className="arc-ring ring-mid-cw" strokeDasharray="70 25 15 25" fill="none" />
          <circle cx="400" cy="400" r="130" className="arc-ring ring-inner-ccw" strokeDasharray="10 10" fill="none" />

          <line x1="400" y1="20" x2="400" y2="780" className="arc-crosshair" fill="none" />
          <line x1="20" y1="400" x2="780" y2="400" className="arc-crosshair" fill="none" />

          <circle cx="400" cy="400" r="80" className="arc-core-inner" fill="none" />
          <circle cx="400" cy="400" r="40" className="arc-center-orb" />
        </svg>
      </div>
    </div>
  )
}
