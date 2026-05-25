'use client'

import { useState } from 'react'
import { useLang } from '@/context/LangContext'
import { useReveal } from '@/lib/useReveal'

const projects = [
  {
    category: 'office',
    gradient: 'linear-gradient(135deg,#1E40AF,#60A5FA)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" width="52" height="52"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
    catId: 'Aplikasi Kantor', catEn: 'Office App',
    titleId: 'Sistem Koperasi Online', titleEn: 'Online Cooperative System',
    descId: 'Manajemen koperasi digital: simpan pinjam, data anggota, laporan keuangan, dan transaksi online yang terintegrasi.',
    descEn: 'Digital cooperative management: savings & loans, member data, financial reports, and integrated online transactions.',
    tags: ['PHP', 'MySQL', 'Vue.js'],
  },
  {
    category: 'web',
    gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" width="52" height="52"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    catId: 'Aplikasi Web', catEn: 'Web App',
    titleId: 'Platform E-Commerce', titleEn: 'E-Commerce Platform',
    descId: 'Platform belanja online dengan manajemen produk, keranjang, pembayaran online, dan laporan penjualan.',
    descEn: 'Online shopping platform with product management, cart, online payment, and sales reports.',
    tags: ['Laravel', 'React', 'PostgreSQL'],
  },
  {
    category: 'office',
    gradient: 'linear-gradient(135deg,#059669,#34D399)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" width="52" height="52"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>,
    catId: 'Aplikasi Kantor', catEn: 'Office App',
    titleId: 'Sistem Inventory & Gudang', titleEn: 'Inventory & Warehouse System',
    descId: 'Manajemen stok real-time, laporan keluar-masuk, barcode scanner, dan notifikasi stok menipis.',
    descEn: 'Real-time stock management, in-out reports, barcode scanner, and low stock notifications.',
    tags: ['Python', 'Django', 'SQLite'],
  },
  {
    category: 'web',
    gradient: 'linear-gradient(135deg,#0891B2,#67E8F9)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" width="52" height="52"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    catId: 'Aplikasi Web', catEn: 'Web App',
    titleId: 'Platform Jasa Pariwisata', titleEn: 'Tourism Service Platform',
    descId: 'Platform booking wisata online: paket tour, hotel, pemandu wisata, ulasan, dan pembayaran digital yang mudah.',
    descEn: 'Online tourism booking platform: tour packages, hotels, tour guides, reviews, and easy digital payments.',
    tags: ['Laravel', 'Vue.js', 'MySQL'],
  },
  {
    category: 'office',
    gradient: 'linear-gradient(135deg,#0284C7,#38BDF8)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" width="52" height="52"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    catId: 'Aplikasi Kantor', catEn: 'Office App',
    titleId: 'Sistem Manajemen Agen Asuransi', titleEn: 'Insurance Agent Management System',
    descId: 'Kelola data nasabah, polis, premi, klaim, dan komisi agen dalam satu sistem yang terintegrasi.',
    descEn: 'Manage customer data, policies, premiums, claims, and agent commissions in one integrated system.',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
  },
  {
    category: 'web',
    gradient: 'linear-gradient(135deg,#4F46E5,#818CF8)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" width="52" height="52"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg>,
    catId: 'Aplikasi Web', catEn: 'Web App',
    titleId: 'Platform Agen Asuransi', titleEn: 'Insurance Agent Platform',
    descId: 'Portal web untuk agen asuransi: pengelolaan leads, presentasi produk digital, dan tracking komisi.',
    descEn: 'Web portal for insurance agents: lead management, digital product presentations, and commission tracking.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    category: 'mobile',
    gradient: 'linear-gradient(135deg,#DB2777,#F9A8D4)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" width="52" height="52"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    catId: 'Mobile', catEn: 'Mobile',
    titleId: 'Aplikasi Absensi Mobile', titleEn: 'Mobile Attendance App',
    descId: 'Absensi karyawan berbasis GPS dan face recognition untuk memastikan akurasi data kehadiran.',
    descEn: 'Employee attendance app based on GPS and face recognition to ensure accurate attendance data.',
    tags: ['Flutter', 'Firebase', 'TensorFlow'],
  },
]

type Filter = 'all' | 'web' | 'office' | 'mobile'

export default function Portfolio() {
  const { t } = useLang()
  const [active, setActive] = useState<Filter>('all')
  useReveal()

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{t('Portfolio Saya', 'My Portfolio')}</span>
          <h2 className="section-title">{t('Proyek yang Pernah Saya Kerjakan', "Projects I've Worked On")}</h2>
          <p className="section-sub">
            {t(
              'Beberapa proyek yang telah saya kerjakan untuk berbagai klien dari berbagai industri.',
              'Some of the projects I have completed for various clients from different industries.'
            )}
          </p>
        </div>

        <div className="portfolio-filter reveal">
          {([['all', 'Semua', 'All'], ['web', 'Aplikasi Web', 'Web App'], ['office', 'Aplikasi Kantor', 'Office App'], ['mobile', 'Mobile', 'Mobile']] as const).map(([key, id, en]) => (
            <button
              key={key}
              className={`filter-btn${active === key ? ' active' : ''}`}
              onClick={() => setActive(key)}
            >
              {t(id, en)}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filtered.map((p) => (
            <div key={p.titleId} className="portfolio-card reveal">
              <div className="portfolio-thumb" style={{ background: p.gradient }}>
                {p.icon}
              </div>
              <div className="portfolio-body">
                <span className="p-cat">{t(p.catId, p.catEn)}</span>
                <h3>{t(p.titleId, p.titleEn)}</h3>
                <p>{t(p.descId, p.descEn)}</p>
                <div className="p-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
