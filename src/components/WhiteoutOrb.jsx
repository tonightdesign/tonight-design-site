import { useEffect, useRef } from 'react'

/*
  The Floodlight sphere for the Whiteout Sessions header: a sphere of light dots spinning
  on a 126 BPM pulse, with the rider cut out and riding its inside wall. Dots behind him
  draw on the back canvas, dots in front of him on the front canvas, so he sits inside it.
  Sizes are fractions of the square box, matching the story render.
*/
const N = 900
const BEAT = 60 / 126
const GOLD = Math.PI * (3 - Math.sqrt(5))
const BASE = Array.from({ length: N }, (_, i) => {
  const y = 1 - (i / (N - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  return [Math.cos(GOLD * i) * r, y, Math.sin(GOLD * i) * r]
})

export default function WhiteoutOrb({ label }) {
  const box = useRef(null)
  const back = useRef(null)
  const front = useRef(null)

  useEffect(() => {
    const el = box.current
    const bc = back.current.getContext('2d')
    const fc = front.current.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let S = 0
    let dpr = 1
    let raf = 0
    let running = false
    let t = 0
    let last = 0
    let spray = []

    const size = () => {
      S = el.clientWidth
      dpr = Math.min(2, window.devicePixelRatio || 1)
      for (const c of [back.current, front.current]) { c.width = Math.round(S * dpr); c.height = Math.round(S * dpr) }
      draw(t)
    }

    const angle = (tt) => {
      const n = Math.floor(tt / BEAT)
      const f = (tt % BEAT) / BEAT
      return tt * 0.35 + (n + 1 - (1 - f) ** 3) * (Math.PI / 10)
    }

    function draw(tt) {
      if (!S) return
      const R0 = 0.4 * S
      const e = still ? 0 : Math.exp(-((tt % BEAT)) * 9)
      const R = R0 * (1 + 0.03 * e)
      const F = 3.75 * R0
      const cx = 0.5 * S
      const cy = 0.5 * S
      const kx = 0.762 * S
      const ky = 0.723 * S
      const a = angle(tt)
      const ap = angle(tt - 0.025)
      const ct = Math.cos(0.42)
      const st = Math.sin(0.42)
      const place = (v, ang) => {
        const c = Math.cos(ang)
        const s = Math.sin(ang)
        const x = v[0] * c - v[1] * s
        const y = v[0] * s + v[1] * c
        const y2 = y * ct - v[2] * st
        const z2 = y * st + v[2] * ct
        const k = F / (F - z2 * R)
        return [cx + x * R * k, cy + y2 * R * k, z2, k]
      }
      for (const ctx of [bc, fc]) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, S, S)
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#fff'
        ctx.fillStyle = '#fff'
      }
      const u = S / 1000
      for (const v of BASE) {
        const [px, py, z, k] = place(v, a)
        const [qx, qy] = place(v, ap)
        const d = (z + 1) / 2
        const dx = px - kx
        const dy = py - ky
        const near = Math.exp(-(dx * dx + dy * dy) / (2 * (0.13 * S) ** 2))
        const w = (1.3 + d * 3.2 + near * 2) * k * (1 + 0.45 * e) * u * 1.7
        const al = Math.min(1, (0.15 + d * 0.75 + near * 0.5) * (1 + 0.5 * e))
        const ctx = z > 0 ? fc : bc
        ctx.globalAlpha = z > 0 ? al * 0.5 : al
        ctx.lineWidth = z > 0 ? w * 0.75 : w
        ctx.beginPath()
        ctx.moveTo(qx, qy)
        ctx.lineTo(px + 0.01, py)
        ctx.stroke()
      }
      for (const p of spray) {
        const ctx = p.f ? fc : bc
        ctx.globalAlpha = Math.max(0, 1 - p.l / p.m) * 0.85
        ctx.beginPath()
        ctx.arc(p.x * S, p.y * S, 2 * u * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      bc.globalAlpha = 1
      fc.globalAlpha = 1
    }

    const step = (dt) => {
      for (let i = 0; i < 4; i++) {
        const r1 = Math.random()
        const r2 = Math.random()
        spray.push({ x: 0.64 + (r1 - 0.5) * 0.026, y: 0.858, vx: -0.37 - r1 * 0.33, vy: -0.055 - r2 * 0.24, l: 0, m: 0.5 + r2 * 0.6, f: r1 > 0.5 })
      }
      for (const p of spray) { p.l += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 0.48 * dt }
      spray = spray.filter((p) => p.l < p.m)
    }

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      t += dt
      step(dt)
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    const start = () => { if (running || still) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop) }
    const stop = () => { running = false; cancelAnimationFrame(raf) }

    const ro = new ResizeObserver(size)
    ro.observe(el)
    const io = new IntersectionObserver((es) => (es.some((x) => x.isIntersecting) ? start() : stop()))
    io.observe(el)
    return () => { stop(); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <div className="wo-orb" ref={box} role="img" aria-label={label}>
      <canvas ref={back} aria-hidden="true" />
      <img className="wo-rider" src="/work/whiteout-rider.webp" alt="" width="398" height="502" decoding="async" fetchpriority="high" />
      <canvas ref={front} aria-hidden="true" />
    </div>
  )
}
