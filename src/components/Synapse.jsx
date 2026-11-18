import { useEffect, useRef } from 'react'

/** Live synapse field drawn over the brain key visual in the hero. */
export default function Synapse({ hostRef }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv?.getContext?.('2d')
    if (!ctx) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let W, H, pts = [], mx = -9999, my = -9999, run = true, visible = true, alive = true

    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1)
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(110, (W * H) / 11000)); pts = []
      for (let i = 0; i < n; i++) {
        const bias = W < 760 ? Math.random() : Math.pow(Math.random(), 0.55)
        pts.push({ x: W < 760 ? bias * W : W * (1 - bias * 0.72), y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.4 + 0.4 })
      }
    }
    const draw = () => {
      if (!alive) return
      ctx.clearRect(0, 0, W, H)
      const L = W < 760 ? 90 : 130
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }
        const dm = Math.hypot(p.x - mx, p.y - my), near = dm < 180 ? 1 - dm / 180 : 0
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < L) {
            ctx.strokeStyle = `rgba(3,189,211,${(1 - d / L) * (0.14 + near * 0.5)})`
            ctx.lineWidth = 0.6 + near * 0.6
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        ctx.fillStyle = near > 0 ? `rgba(255,255,255,${0.5 + near * 0.5})` : 'rgba(6,156,173,.65)'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + near * 1.6, 0, 6.283); ctx.fill()
      }
      if (run && visible && !reduce) requestAnimationFrame(draw)
    }
    size(); draw()
    const onResize = () => { size(); if (reduce) draw() }
    addEventListener('resize', onResize)
    const host = hostRef.current
    const pm = (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; if (reduce) draw() }
    const pl = () => { mx = my = -9999; if (reduce) draw() }
    host.addEventListener('pointermove', pm); host.addEventListener('pointerleave', pl)
    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((es) => { const was = visible; visible = es[0].isIntersecting; if (visible && !was && !reduce) requestAnimationFrame(draw) })
      io.observe(host)
    }
    const vis = () => { const was = run; run = !document.hidden; if (run && !was && visible && !reduce) requestAnimationFrame(draw) }
    document.addEventListener('visibilitychange', vis)
    return () => {
      alive = false
      removeEventListener('resize', onResize)
      host.removeEventListener('pointermove', pm); host.removeEventListener('pointerleave', pl)
      io?.disconnect(); document.removeEventListener('visibilitychange', vis)
    }
  }, [hostRef])
  return <canvas id="synapse" ref={ref} aria-hidden="true" />
}
