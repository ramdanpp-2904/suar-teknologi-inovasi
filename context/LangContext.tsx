'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'id' | 'en'

interface LangContextType {
  lang: Lang
  toggle: () => void
  t: (id: string, en: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'id',
  toggle: () => {},
  t: (id) => id,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('id')

  const toggle = () => setLang(l => l === 'id' ? 'en' : 'id')
  const t = (id: string, en: string) => lang === 'id' ? id : en

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
