'use client'

import { useLang } from '@/context/LangContext'
import { useReveal } from '@/lib/useReveal'

const services = [
  {
    accent: '#3B82F6',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    titleId: 'Aplikasi Web', titleEn: 'Web Application',
    descId: 'Website dan aplikasi web modern yang responsif, cepat, dan aman. Dari landing page hingga sistem manajemen kompleks.',
    descEn: 'Modern, responsive, fast, and secure websites and web applications. From landing pages to complex management systems.',
    features: ['Company Profile', 'E-Commerce', 'Web Portal', 'Dashboard Admin'],
  },
  {
    accent: '#F97316',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/><path d="M12 12v5M9.5 14.5l2.5-2.5 2.5 2.5"/></svg>,
    titleId: 'Aplikasi Kantor', titleEn: 'Office Application',
    descId: 'Sistem manajemen kantor yang terintegrasi untuk meningkatkan produktivitas dan efisiensi operasional bisnis Anda.',
    descEn: 'Integrated office management systems to increase the productivity and operational efficiency of your business.',
    features: ['HR Management', 'Inventory System', 'Payroll & Accounting', 'POS System'],
  },
  {
    accent: '#10B981',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
    titleId: 'Aplikasi Mobile', titleEn: 'Mobile Application',
    descId: 'Aplikasi mobile Android dan iOS yang intuitif dan powerful untuk menjangkau pelanggan Anda di mana pun mereka berada.',
    descEn: 'Intuitive and powerful Android and iOS mobile applications to reach your customers wherever they are.',
    features: ['Android App', 'iOS App', 'Cross-Platform', 'Mobile Commerce'],
  },
  {
    accent: '#8B5CF6',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0018 0V5"/><path d="M3 12a9 3 0 0018 0"/></svg>,
    titleId: 'Database & API', titleEn: 'Database & API',
    descId: 'Desain dan implementasi database yang optimal serta pengembangan REST API untuk integrasi sistem yang seamless.',
    descEn: 'Optimal database design and implementation, plus REST API development for seamless system integration.',
    features: ['Database Design', 'REST API', 'Data Migration', 'System Integration'],
  },
  {
    accent: '#EC4899',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    titleId: 'Maintenance & Support', titleEn: 'Maintenance & Support',
    descId: 'Layanan pemeliharaan dan dukungan teknis berkelanjutan untuk memastikan sistem Anda selalu berjalan optimal.',
    descEn: 'Ongoing maintenance and technical support services to ensure your systems always run optimally.',
    features: ['Bug Fixing', 'Performance Tuning', 'Security Update', '24/7 Support'],
  },
  {
    accent: '#0EA5E9',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    titleId: 'Konsultasi IT', titleEn: 'IT Consulting',
    descId: 'Konsultasi teknologi untuk membantu Anda memilih solusi yang tepat, merencanakan arsitektur sistem, dan meminimalkan risiko implementasi.',
    descEn: 'Technology consulting to help you choose the right solution, plan system architecture, and minimize implementation risks.',
    features: ['Tech Assessment', 'Architecture Planning', 'Digital Transformation', 'Training'],
  },
]

export default function Services() {
  const { t } = useLang()
  useReveal()

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{t('Layanan Saya', 'My Services')}</span>
          <h2 className="section-title">{t('Apa yang Saya Tawarkan', 'What I Offer')}</h2>
          <p className="section-sub">
            {t(
              'Saya menyediakan solusi teknologi lengkap mulai dari pengembangan aplikasi hingga konsultasi IT untuk memenuhi kebutuhan bisnis Anda.',
              'I provide complete technology solutions from application development to IT consulting to meet your business needs.'
            )}
          </p>
        </div>
        <div className="services-grid">
          {services.map((s) => (
            <div
              key={s.titleId}
              className="service-card reveal"
              style={{ ['--card-accent' as string]: s.accent }}
            >
              <div className="service-icon" style={{ background: `${s.accent}1F`, color: s.accent }}>
                {s.icon}
              </div>
              <h3>{t(s.titleId, s.titleEn)}</h3>
              <p>{t(s.descId, s.descEn)}</p>
              <ul className="service-features">
                {s.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
