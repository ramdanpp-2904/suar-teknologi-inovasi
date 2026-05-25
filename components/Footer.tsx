'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/context/LangContext'

export default function Footer() {
  const { t } = useLang()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    const navbar = document.querySelector('.navbar') as HTMLElement
    if (el && navbar) window.scrollTo({ top: el.offsetTop - navbar.offsetHeight, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-box">
              <Image src="/logo.png" alt="Suar Teknologi Inovasi" className="footer-logo" width={140} height={38} />
            </div>
            <p>
              {t(
                'Saya siap membantu bisnis Anda tumbuh dengan solusi teknologi yang tepat, berkualitas, dan sesuai anggaran.',
                "I'm ready to help your business grow with the right, quality technology solutions that fit your budget."
              )}
            </p>
            <a href="https://wa.me/6282213792865" className="footer-contact" target="_blank" rel="noopener">
              +62 822-1379-2865
            </a>
          </div>

          <div className="footer-nav">
            <h4>{t('Layanan', 'Services')}</h4>
            <ul>
              {[
                [t('Aplikasi Web', 'Web Application'), 'services'],
                [t('Aplikasi Kantor', 'Office Application'), 'services'],
                [t('Aplikasi Mobile', 'Mobile Application'), 'services'],
                [t('Konsultasi IT', 'IT Consulting'), 'services'],
              ].map(([label, id]) => (
                <li key={label}>
                  <button onClick={() => scrollTo(id)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit', padding: 0 }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav">
            <h4>{t('Navigasi', 'Navigation')}</h4>
            <ul>
              <li><button onClick={() => scrollTo('home')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit', padding: 0 }}>{t('Beranda', 'Home')}</button></li>
              <li><button onClick={() => scrollTo('portfolio')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit', padding: 0 }}>{t('Portfolio', 'Portfolio')}</button></li>
              <li><button onClick={() => scrollTo('pricing')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit', padding: 0 }}>{t('Harga', 'Pricing')}</button></li>
              <li><button onClick={() => scrollTo('contact')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit', padding: 0 }}>{t('Kontak', 'Contact')}</button></li>
              <li><Link href="/blog" style={{ color: 'rgba(255,255,255,.55)' }}>Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Suar Teknologi Inovasi. {t('Hak cipta dilindungi.', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  )
}
