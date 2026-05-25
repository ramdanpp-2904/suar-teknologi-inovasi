import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/context/LangContext'
import Navbar from '@/components/Navbar'
import WaFloat from '@/components/WaFloat'

export const metadata: Metadata = {
  title: 'Suar Teknologi Inovasi | Jasa Pembuatan Aplikasi Profesional',
  description: 'Jasa pembuatan aplikasi kantor dan web profesional. Saya siap membantu mewujudkan aplikasi impian Anda dengan kualitas terbaik.',
  icons: { icon: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <LangProvider>
          <Navbar />
          {children}
          <WaFloat />
        </LangProvider>
      </body>
    </html>
  )
}
