'use client'

import { useLang } from '@/context/LangContext'

export default function Hero() {
  const { t } = useLang()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    const navbar = document.querySelector('.navbar') as HTMLElement
    if (el && navbar) window.scrollTo({ top: el.offsetTop - navbar.offsetHeight, behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-shapes" aria-hidden="true">
        <div className="hs hs-1" /><div className="hs hs-2" />
        <div className="hs hs-3" /><div className="hs hs-4" /><div className="hs hs-5" />
      </div>
      <div className="container hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>{t('Developer Freelance Profesional', 'Professional Freelance Developer')}</span>
        </div>
        <h1 className="hero-title">
          {t('Hai! Saya Siap Bantu', 'Hi! I\'m Here to Help')}<br />
          <span className="gradient-text">{t('Wujudkan Aplikasi Anda', 'Build Your Application')}</span>
        </h1>
        <p className="hero-sub">
          {t(
            'Saya siap membantu Anda — para pelaku usaha, UMKM, agen, dan penjual personal — untuk mengembangkan jualan produk & jasa melalui aplikasi yang powerful, modern, dan mudah digunakan.',
            "I'm here to help you — business owners, SMEs, agents, and personal sellers — grow your product & service sales through powerful, modern, and easy-to-use applications."
          )}
        </p>
        <div className="hero-cta">
          <button className="btn btn-accent btn-lg" onClick={() => scrollTo('contact')}>
            {t('Mulai Proyek', 'Start a Project')}
          </button>
          <button className="btn btn-ghost btn-lg" onClick={() => scrollTo('portfolio')}>
            {t('Lihat Portfolio', 'View Portfolio')}
          </button>
        </div>
        <div className="hero-stats">
          {[
            { num: '50+', label: t('Proyek Selesai', 'Projects Done') },
            { num: '30+', label: t('Klien Puas', 'Happy Clients') },
            { num: '20+', label: t('Tahun Pengalaman', 'Years Experience') },
            { num: '99%', label: t('Kepuasan Klien', 'Client Satisfaction') },
          ].map(({ num, label }, i) => (
            <>
              {i > 0 && <div key={`d${i}`} className="stat-divider" />}
              <div key={num} className="stat-item">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="hero-scroll-hint">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
      </div>
    </section>
  )
}
