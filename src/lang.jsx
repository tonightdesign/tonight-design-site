import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext({ lang: 'en', setLang: () => {} })

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (q === 'es' || q === 'en') return q
    if (window.location.hash === '#es') return 'es'
    const saved = localStorage.getItem('td-lang')
    if (saved === 'es' || saved === 'en') return saved
  } catch { /* storage can be blocked */ }
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('td-lang', lang) } catch { /* ignore */ }
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

/** Inline bilingual text: <T en="Work" es="Trabajo" /> */
export function T({ en, es }) {
  const { lang } = useLang()
  return lang === 'es' ? es : en
}

/** Pick from an {en, es} object */
export function useT() {
  const { lang } = useLang()
  return (o) => (o && typeof o === 'object' ? o[lang] ?? o.en : o)
}
