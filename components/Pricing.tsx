'use client'

import { useLang } from '@/context/LangContext'
import { useReveal } from '@/lib/useReveal'

export default function Pricing() {
  const { t } = useLang()
  useReveal()

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    const navbar = document.querySelector('.navbar') as HTMLElement
    if (el && navbar) window.scrollTo({ top: el.offsetTop - navbar.offsetHeight, behavior: 'smooth' })
  }

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{t('Harga', 'Pricing')}</span>
          <h2 className="section-title">{t('Paket Layanan Saya', 'My Service Packages')}</h2>
          <p className="section-sub">
            {t(
              'Pilih paket yang sesuai dengan kebutuhan dan anggaran bisnis Anda. Atau hubungi saya untuk solusi custom.',
              'Choose the package that suits your business needs and budget. Or reach out to me for a custom solution.'
            )}
          </p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card reveal">
            <div className="pricing-head">
              <p className="tier-name">Starter</p>
              <div className="price-wrap"><span className="price-cur">Rp</span><span className="price-val">3 Juta</span></div>
              <p className="price-sub">{t('Mulai dari', 'Starting from')}</p>
            </div>
            <ul className="price-list">
              {[
                [true, t('Company Profile / Landing Page', 'Company Profile / Landing Page')],
                [true, t('Desain Responsif (Mobile-friendly)', 'Responsive Design (Mobile-friendly)')],
                [true, t('Integrasi WhatsApp & Form Kontak', 'WhatsApp & Contact Form Integration')],
                [true, t('SEO Dasar', 'Basic SEO')],
                [true, t('1 Bulan Garansi', '1 Month Warranty')],
                [false, t('Panel Admin', 'Admin Panel')],
                [false, t('Fitur Custom', 'Custom Features')],
              ].map(([ok, label], i) => (
                <li key={i} className={ok ? '' : 'off'}>
                  <span className={`chk${ok ? ' ok' : ''}`}>{ok ? '✓' : '✗'}</span>
                  <span>{label as string}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn-outline btn-block" onClick={scrollToContact}>
              {t('Pilih Paket Ini', 'Choose This Package')}
            </button>
          </div>

          <div className="pricing-card featured reveal">
            <div className="popular-tag">{t('Paling Populer', 'Most Popular')}</div>
            <div className="pricing-head">
              <p className="tier-name">Professional</p>
              <div className="price-wrap"><span className="price-cur">Rp</span><span className="price-val">15 Juta</span></div>
              <p className="price-sub">{t('Mulai dari', 'Starting from')}</p>
            </div>
            <ul className="price-list">
              {[
                t('Aplikasi Web / Kantor Lengkap', 'Complete Web / Office Application'),
                t('Panel Admin & Dashboard', 'Admin Panel & Dashboard'),
                t('Database & Integrasi API', 'Database & API Integration'),
                t('Multi-user & Role Management', 'Multi-user & Role Management'),
                t('Laporan & Export Excel/PDF', 'Reports & Export Excel/PDF'),
                t('3 Bulan Garansi & Support', '3 Month Warranty & Support'),
                t('Training Penggunaan', 'Usage Training'),
              ].map((label, i) => (
                <li key={i}><span className="chk ok">✓</span><span>{label}</span></li>
              ))}
            </ul>
            <button className="btn btn-white btn-block" onClick={scrollToContact}>
              {t('Pilih Paket Ini', 'Choose This Package')}
            </button>
          </div>

          <div className="pricing-card reveal">
            <div className="pricing-head">
              <p className="tier-name">Enterprise</p>
              <div className="price-wrap"><span className="price-val">{t('Custom', 'Custom')}</span></div>
              <p className="price-sub">{t('Sesuai kebutuhan Anda', 'As per your requirements')}</p>
            </div>
            <ul className="price-list">
              {[
                t('Semua fitur Professional', 'All Professional features'),
                t('Arsitektur Microservices / Cloud', 'Microservices / Cloud Architecture'),
                t('Integrasi Sistem Existing', 'Existing System Integration'),
                t('Keamanan & Audit Trail', 'Security & Audit Trail'),
                t('Dedicated Support Tim', 'Dedicated Support Team'),
                t('SLA & Kontrak Maintenance', 'SLA & Maintenance Contract'),
                t('Solusi Scalable', 'Scalable Solution'),
              ].map((label, i) => (
                <li key={i}><span className="chk ok">✓</span><span>{label}</span></li>
              ))}
            </ul>
            <button className="btn btn-outline btn-block" onClick={scrollToContact}>
              {t('Hubungi Kami', 'Contact Us')}
            </button>
          </div>
        </div>

        <p className="pricing-note reveal">
          {t(
            '* Harga dapat bervariasi tergantung kompleksitas dan kebutuhan spesifik proyek. Konsultasikan kebutuhan Anda untuk mendapatkan penawaran terbaik.',
            '* Prices may vary depending on project complexity and specific requirements. Contact us to get the best offer for your needs.'
          )}
        </p>
      </div>
    </section>
  )
}
