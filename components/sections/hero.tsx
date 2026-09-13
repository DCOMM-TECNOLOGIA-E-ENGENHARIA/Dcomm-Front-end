'use client'

import {
  ArrowRight,
  RadioTower,
  ShieldCheck,
  Cpu,
  Signal,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

const STATS = [
  { value: '+25', label: 'anos de engenharia' },
  { value: '4', label: 'tecnologias de rádio críticas' },
  { value: '5G', label: 'redes privadas de nova geração' },
  { value: '24/7', label: 'operação e suporte' },
]

export function Hero({ companyName }: { companyName?: string }) {
  const brandName = companyName?.trim() || 'DCOMM Tecnologia e Engenharia'

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-navy text-white"
      aria-label="Apresentação DCOMM"
    >
      {/* Layered depth background */}
      <div className="absolute inset-0 grid-bg-dark opacity-70" aria-hidden />
      <div
        className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-44">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              <Signal className="h-3.5 w-3.5 text-accent" aria-hidden />
              Engenharia de telecomunicações críticas
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Conectividade que{' '}
              <span className="text-accent text-glow">move o futuro</span> da
              sua operação
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              Na {brandName}, projetamos, construímos e mantemos redes de telecomunicações de
              missão crítica. IoT, redes privadas LTE, 4G e 5G, rádio
              comunicação DMR, TETRA e P25, vídeo monitoramento inteligente e
              controle de acesso — com a autoridade de quem entrega há mais de
              25 anos.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contato"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40"
              >
                Solicitar diagnóstico técnico
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Conhecer soluções
              </a>
            </div>
          </Reveal>
        </div>

        {/* 3D visual */}
        <Reveal delay={200} className="perspective-1000">
          <div className="preserve-3d relative mx-auto flex h-[380px] w-full max-w-md items-center justify-center sm:h-[460px]">
            {/* Central tower node with pulsing signal */}
            <div className="animate-float relative flex h-40 w-40 items-center justify-center">
              <span className="pulse-ring absolute inset-6 rounded-full" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-accent to-[#0f6fd1] shadow-2xl shadow-accent/40">
                <RadioTower className="h-16 w-16 text-white" aria-hidden />
              </div>
            </div>

            {/* Floating feature cards */}
            <FloatingCard
              className="left-0 top-6"
              delay={0.4}
              icon={<Cpu className="h-5 w-5 text-accent" aria-hidden />}
              title="IoT"
              subtitle="Sensores conectados"
            />
            <FloatingCard
              className="right-0 top-20"
              delay={1.2}
              icon={<Signal className="h-5 w-5 text-accent" aria-hidden />}
              title="LTE Privado"
              subtitle="4G / 5G dedicado"
            />
            <FloatingCard
              className="bottom-6 left-6"
              delay={2}
              icon={<ShieldCheck className="h-5 w-5 text-accent" aria-hidden />}
              title="Segurança"
              subtitle="Monitoramento 24/7"
            />
          </div>
        </Reveal>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10 bg-navy-deep/60 backdrop-blur">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map((stat, i) => (
            <Reveal
              as="div"
              key={stat.label}
              delay={i * 90}
              className="flex flex-col items-center gap-1 border-white/10 px-4 py-7 text-center md:border-l md:first:border-l-0"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-extrabold text-accent sm:text-4xl">
                {stat.value}
              </dd>
              <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

function FloatingCard({
  className = '',
  icon,
  title,
  subtitle,
  delay = 0,
}: {
  className?: string
  icon: React.ReactNode
  title: string
  subtitle: string
  delay?: number
}) {
  return (
    <div
      className={`animate-float absolute flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="block text-xs text-white/60">{subtitle}</span>
      </span>
    </div>
  )
}
