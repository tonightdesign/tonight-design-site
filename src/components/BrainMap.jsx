import { useEffect, useRef } from 'react'

// Size of the brain cut-out (public/img/brain.webp). All points below are in this space.
export const BW = 816
export const BH = 691

// Where each marker sits on the brain, and the centre of the area it lights
export const REGIONS = [
  { dot: [455, 95], centre: [440, 150] },
  { dot: [735, 335], centre: [650, 330] },
  { dot: [345, 430], centre: [340, 400] },
  { dot: [110, 270], centre: [160, 250] },
]

/**
 * The brain with live neural pathways. Only the brain itself reacts to the pointer
 * (pixels with alpha > 150), never the ground around it.
 * `labels` names the four regions for screen readers, `active` = index or -1.
 */
export default function BrainMap({ labels, active, onActive, alt }) {
  const mapRef = useRef(null)
  const canvasRef = useRef(null)
  const activeRef = useRef(active)
  const wakeRef = useRef(() => {})

  // Keep the latest active region for the draw loop without re-running the effect
  useEffect(() => {
    activeRef.current = active
    wakeRef.current()
  }, [active])

  useEffect(() => {
    const map = mapRef.current
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let alpha = null
    let pts = []
    const pulses = []
    let mx = -1e4
    let my = -1e4
    let scale = 1
    let visible = true
    let raf = 0
    let dead = false

    const inside = (x, y) => {
      if (!alpha) return false
      x |= 0; y |= 0
      if (x < 0 || y < 0 || x >= BW || y >= BH) return false
      return alpha[(y * BW + x) * 4 + 3] > 150
    }

    const seed = () => {
      pts = []
      let tries = 0
      while (pts.length < 240 && tries < 40000) {
        tries++
        const x = Math.random() * BW
        const y = Math.random() * BH
        if (inside(x, y)) pts.push({ bx: x, by: y, x, y, ph: Math.random() * 6.28, sp: 0.4 + Math.random() * 0.6, r: Math.random() * 1.3 + 0.6, g: 0, nb: [] })
      }
      // Neighbours are worked out once: these are the pathways
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          if (Math.hypot(pts[i].bx - pts[j].bx, pts[i].by - pts[j].by) < 62) pts[i].nb.push(j)
        }
      }
    }

    const size = () => {
      const r = map.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      scale = r.width / BW
      cv.width = Math.round(r.width * dpr)
      cv.height = Math.round(r.height * dpr)
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0)
    }

    const near = (p) => {
      let g = 0
      if (mx > -1e3) {
        const d = Math.hypot(p.x - mx, p.y - my)
        if (d < 150) g = 1 - d / 150
      }
      const a = activeRef.current
      if (a >= 0) {
        const c = REGIONS[a].centre
        const dc = Math.hypot(p.x - c[0], p.y - c[1])
        if (dc < 170) g = Math.max(g, (1 - dc / 170) * 0.9)
      }
      return g
    }

    const draw = (now) => {
      raf = 0
      if (dead || !pts.length) return
      const t = (now || 0) / 1000
      ctx.clearRect(0, 0, BW, BH)
      for (const p of pts) {
        if (!reduce) { p.x = p.bx + Math.sin(t * p.sp + p.ph) * 3; p.y = p.by + Math.cos(t * p.sp * 0.8 + p.ph) * 3 }
        p.g = near(p)
      }
      ctx.lineWidth = (1 / scale) * 0.8 + 0.4
      for (const p of pts) {
        for (const j of p.nb) {
          const q = pts[j]
          const a = 0.05 + Math.max(p.g, q.g) * 0.55
          ctx.strokeStyle = `rgba(3,189,211,${a})`
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
        }
      }
      for (const p of pts) {
        ctx.fillStyle = p.g > 0 ? `rgba(255,255,255,${0.45 + p.g * 0.55})` : 'rgba(3,189,211,.45)'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + p.g * 1.8, 0, 6.283); ctx.fill()
      }
      // Signals travelling along the pathways
      for (let k = pulses.length - 1; k >= 0; k--) {
        const s = pulses[k]
        s.t += reduce ? 1 : 0.08
        if (s.t >= 1) {
          const B = pts[s.b]
          if (s.hops-- > 0 && B.nb.length) { s.a = s.b; s.b = B.nb[(Math.random() * B.nb.length) | 0]; s.t = 0 } else { pulses.splice(k, 1); continue }
        }
        const A = pts[s.a]
        const B = pts[s.b]
        const x = A.x + (B.x - A.x) * s.t
        const y = A.y + (B.y - A.y) * s.t
        ctx.fillStyle = '#ffffff'; ctx.shadowColor = '#03bdd3'; ctx.shadowBlur = 12
        ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 6.283); ctx.fill(); ctx.shadowBlur = 0
      }
      const busy = mx > -1e3 || activeRef.current >= 0 || pulses.length > 0
      if (visible && (!reduce || busy)) wake()
    }
    const wake = () => { if (!raf && !dead) raf = requestAnimationFrame(draw) }
    wakeRef.current = wake

    const fire = (x, y) => {
      let best = -1
      let bd = 1e9
      pts.forEach((p, i) => { const d = Math.hypot(p.x - x, p.y - y); if (d < bd && p.nb.length) { bd = d; best = i } })
      if (best < 0 || pulses.length > 40) return
      const p = pts[best]
      pulses.push({ a: best, b: p.nb[(Math.random() * p.nb.length) | 0], t: 0, hops: 4 })
    }

    const point = (e) => {
      const r = map.getBoundingClientRect()
      const x = (e.clientX - r.left) / scale
      const y = (e.clientY - r.top) / scale
      if (inside(x, y)) { mx = x; my = y; if (Math.random() < 0.35) fire(x, y) } else { mx = my = -1e4 }
      wake()
    }
    const leave = () => { mx = my = -1e4; wake() }

    const img = new Image()
    img.onload = () => {
      if (dead) return
      const oc = document.createElement('canvas')
      oc.width = BW; oc.height = BH
      const o = oc.getContext('2d', { willReadFrequently: true })
      o.drawImage(img, 0, 0)
      try { alpha = o.getImageData(0, 0, BW, BH).data } catch { alpha = null }
      seed(); size(); wake()
    }
    img.src = '/img/brain.webp'

    const ro = new ResizeObserver(() => { size(); wake() })
    ro.observe(map)
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) wake() })
    io.observe(map)
    const onVis = () => { visible = !document.hidden; if (visible) wake() }
    document.addEventListener('visibilitychange', onVis)
    map.addEventListener('pointermove', point, { passive: true })
    map.addEventListener('pointerdown', point, { passive: true })
    map.addEventListener('pointerleave', leave)

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      map.removeEventListener('pointermove', point)
      map.removeEventListener('pointerdown', point)
      map.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="map" ref={mapRef}>
      <picture>
        <source media="(max-width: 520px)" srcSet="/img/brain-sm.webp" />
        <img src="/img/brain.webp" alt={alt} width={BW} height={BH} fetchPriority="high" draggable="false" />
      </picture>
      <canvas ref={canvasRef} aria-hidden="true" />
      {REGIONS.map((r, i) => (
        <button
          key={i}
          type="button"
          className={i === active ? 'dot on' : 'dot'}
          style={{ left: `${(r.dot[0] / BW) * 100}%`, top: `${(r.dot[1] / BH) * 100}%` }}
          aria-label={labels[i]}
          aria-pressed={i === active}
          onPointerEnter={() => onActive(i)}
          onPointerLeave={() => onActive(-1)}
          onFocus={() => onActive(i)}
          onBlur={() => onActive(-1)}
          onClick={() => onActive(i)}
        />
      ))}
    </div>
  )
}
