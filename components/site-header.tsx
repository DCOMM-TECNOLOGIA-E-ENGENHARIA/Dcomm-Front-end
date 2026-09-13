'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, Phone, ExternalLink } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'


type NavItem = {
  label: string
  href: string
  external?: boolean
}

const NAV: NavItem[] = [
  { label: 'Início', href: '/#inicio' },
  { label: 'IoT e Conectividade', href: '/#iot' },
  { label: 'Sistemas e Segurança', href: '/#seguranca' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Parceiros', href: '/#parceiros' },
  { label: 'Empresa', href: '/#empresa' },
  { label: 'Projetos', href: '/#projetos' }
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
      <header
          className={cn(
              'fixed inset-x-0 top-0 z-50 overflow-hidden transition-all duration-300',
              scrolled
                  ? 'border-b border-white/15 bg-navy-deep/95 backdrop-blur-xl shadow-2xl shadow-navy/30'
                  : 'border-b border-white/10 bg-navy/85 backdrop-blur-lg',
          )}
      >
        <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden />
        <div
          className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-accent/30 blur-[90px] animate-float"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-brand-blue/20 blur-[90px] animate-float"
          style={{ animationDelay: '0.8s' }}
          aria-hidden
        />

        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8 2xl:px-12">
          <Link href="/#inicio" aria-label="DCOMM Tecnologia e Engenharia - início">
            <Logo variant="light" />
          </Link>

          <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {NAV.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={cn(
                        'group relative flex items-center gap-1.5 text-sm font-medium transition-colors 2xl:text-base',
                        'text-white/80 hover:text-white',
                    )}
                >
                  {item.label}
                  {item.external && <ExternalLink className="h-3.5 w-3.5" />}
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
                href="/#contato"
                className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-xl hover:shadow-accent/40 md:inline-flex 2xl:px-6 2xl:py-3 2xl:text-base"
            >
              <Phone className="h-4 w-4 2xl:h-5 2xl:w-5" aria-hidden />
              Fale com um engenheiro
            </Link>

            <button
                type="button"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
            className={cn(
                'overflow-hidden border-t border-white/10 bg-navy-deep/95 backdrop-blur-lg transition-[max-height] duration-500 ease-out lg:hidden',
                open ? 'max-h-[600px]' : 'max-h-0',
            )}
        >
          <nav
              aria-label="Navegação mobile"
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4"
          >
            {NAV.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={() => !item.external && setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  {item.external && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                </Link>
            ))}
            <Link
                href="/#contato"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Fale com um engenheiro
            </Link>
          </nav>
        </div>
      </header>
  )
}