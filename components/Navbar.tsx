'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/context/LangContext'

export default function Navbar() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const offset = window.scrollY + 100
      const sections = ['home', 'services', 'portfolio', 'pricing', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    const navbar = document.querySelector('.navbar') as HTMLElement
    if (el && navbar) {
      window.scrollTo({ top: el.offsetTop - navbar.offsetHeight, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link href="/" className="nav-logo">
          <Image src="/logo.png" alt="Suar Teknologi Inovasi" className="logo-img" width={160} height={44} />
        </Link>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {[
            { id: 'home',      label: t('Beranda', 'Home') },
            { id: 'services',  label: t('Layanan', 'Services') },
            { id: 'portfolio', label: t('Portfolio', 'Portfolio') },
            { id: 'pricing',   label: t('Harga', 'Pricing') },
            { id: 'contact',   label: t('Kontak', 'Contact') },
          ].map(({ id, label }) => (
            <li key={id}>
              <button
                className={`nav-link${activeSection === id ? ' active' : ''}`}
                onClick={() => scrollTo(id)}
                style={{ background: 'none', border: 'none' }}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <Link href="/blog" className="nav-link" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="lang-toggle" onClick={toggle}>
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <button className="btn btn-primary nav-cta" onClick={() => scrollTo('contact')}>
            {t('Konsultasi Gratis', 'Free Consultation')}
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}} />
          </button>
        </div>
      </div>
    </nav>
  )
}
