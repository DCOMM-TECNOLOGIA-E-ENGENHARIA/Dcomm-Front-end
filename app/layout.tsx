import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Sora } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const SITE_URL = 'https://dcomm.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'DCOMM Tecnologia e Engenharia | IoT, Rádio Comunicação e Redes Privadas',
    template: '%s | DCOMM Tecnologia e Engenharia',
  },
  description:
    'Há mais de 25 anos, a DCOMM Tecnologia e Engenharia projeta, constrói e mantém redes de telecomunicações, soluções de IoT, redes LTE privadas, 4G/5G, rádio comunicação DMR, TETRA e P25, vídeo monitoramento inteligente e controle de acesso. Engenharia de alta performance em Barueri/SP.',
  keywords: [
    'DCOMM',
    'telecomunicações',
    'engenharia de telecomunicações',
    'IoT Khomp',
    'LTE privado',
    'redes 4G 5G',
    'rádio comunicação DMR',
    'TETRA',
    'P25',
    'vídeo monitoramento inteligente',
    'bodycam',
    'controle de acesso',
    'Motorola',
    'Hytera',
    'Tait',
    'Caltta',
    'Barueri',
    'instalações elétricas',
    'consultoria de TI',
  ],
  authors: [{ name: 'DCOMM Tecnologia e Engenharia' }],
  creator: 'DCOMM Tecnologia e Engenharia',
  publisher: 'DCOMM Tecnologia e Engenharia',
  category: 'technology',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'DCOMM Tecnologia e Engenharia',
    title: 'DCOMM Tecnologia e Engenharia | Conectividade que Move o Futuro',
    description:
      'Engenharia especializada em IoT, redes privadas LTE/5G, rádio comunicação crítica e sistemas de segurança inteligentes. Mais de 25 anos de mercado.',
    images: [
      {
        url: '/dcomm-logo.png',
        width: 1408,
        height: 768,
        alt: 'DCOMM Tecnologia e Engenharia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DCOMM Tecnologia e Engenharia',
    description:
      'IoT, redes privadas, rádio comunicação crítica e sistemas de segurança inteligentes.',
    images: ['/dcomm-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0b2b56',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DCOMM Tecnologia e Engenharia',
  legalName: 'DCOMM Tecnologia e Engenharia',
  url: SITE_URL,
  logo: `${SITE_URL}/dcomm-logo.png`,
  description:
    'Engenharia de telecomunicações, IoT, redes privadas LTE/5G, rádio comunicação crítica e sistemas de segurança inteligentes.',
  email: 'dcoom.telecom@outlook.com',
  taxID: '42.083.464/0001-59',
  foundingDate: '1999',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barueri',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  areaServed: 'BR',
  knowsAbout: [
    'IoT',
    'LTE Privado',
    '5G',
    'Rádio Comunicação DMR',
    'TETRA',
    'P25',
    'Vídeo Monitoramento',
    'Controle de Acesso',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${manrope.variable}`}>
      <body className="bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
