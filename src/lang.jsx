import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LangContext = createContext({ lang: 'en', setLang: () => {} })

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (q === 'es' || q === 'en') return q
    if (window.location.hash === '#es') return 'es'
    const saved = localStorage.getItem('td-lang')
    if (saved === 'es' || saved === 'en') return saved
    // First visit: follow the browser's language
    if ((navigator.languages || [navigator.language]).some((l) => /^es\b/i.test(l))) return 'es'
  } catch { /* storage can be blocked */ }
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('td-lang', lang) } catch { /* ignore */ }
  }, [lang])
  const value = useMemo(() => ({ lang, setLang }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

const NB = '\u00a0'

/**
 * Keep the end of a sentence together so no line ends with one lonely word:
 * the last two words always travel together, and when they are short
 * ("sin costo.", "by you.") the word before them comes along too.
 */
export function noWidow(str) {
  if (typeof str !== 'string') return str
  const w = str.trim().split(/ +/)
  if (w.length < 3) return str
  const n = w.length
  const tail = w[n - 2].length + w[n - 1].length + 1
  if (tail <= 18) w.splice(n - 2, 2, w[n - 2] + NB + w[n - 1])
  const m = w.length
  if (m >= 6 && tail <= 12 && w[m - 2].length + w[m - 1].length <= 22) w.splice(m - 2, 2, w[m - 2] + NB + w[m - 1])
  return w.join(' ')
}

/** Inline bilingual text: <T en="Work" es="Trabajo" /> */
export function T({ en, es }) {
  const { lang } = useLang()
  return noWidow(lang === 'es' ? es : en)
}

/** Pick from an {en, es} object */
export function useT() {
  const { lang } = useLang()
  return (o) => noWidow(o && typeof o === 'object' ? o[lang] ?? o.en : o)
}
