import {
  RadioTower,
  Video,
  Camera,
  Car,
  ScanFace,
  ShieldCheck,
  Radio,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

const GROUPS = [
  {
    icon: Radio,
    title: 'Rádio Comunicação',
    description:
      'Sistemas de rádio digital de missão crítica para operações que não podem parar. Projeto, homologação e manutenção de redes troncalizadas.',
    items: [
      { name: 'DMR', desc: 'Rádio digital para uso profissional e industrial.' },
      { name: 'TETRA', desc: 'Padrão europeu para segurança pública e utilities.' },
      { name: 'P25', desc: 'Interoperabilidade para agências de segurança.' },
    ],
  },
  {
    icon: Video,
    title: 'Vídeo Monitoramento Inteligente',
    description:
      'Videomonitoramento com analítica de vídeo e inteligência artificial embarcada para detecção proativa de eventos.',
    items: [
      { name: 'Câmeras de Segurança', desc: 'CFTV IP com analítica avançada.' },
      { name: 'Bodycams', desc: 'Câmeras corporais para equipes em campo.' },
      { name: 'Vídeo Veicular', desc: 'Sistemas de vídeo embarcado para frotas.' },
    ],
  },
  {
    icon: ScanFace,
    title: 'Controle de Acesso',
    description:
      'Gestão integrada de acessos com biometria, credenciais inteligentes e integração com os demais sistemas de segurança.',
    items: [
      { name: 'Biometria', desc: 'Reconhecimento facial e digital.' },
      { name: 'Credenciais', desc: 'Cartões, tags e QR seguros.' },
      { name: 'Integração', desc: 'Unificação com CFTV e alarmes.' },
    ],
  },
]

const ICONS = [Camera, Car, ShieldCheck]

export function SistemasSeguranca() {
  return (
    <section
      id="seguranca"
      aria-labelledby="seguranca-title"
      className="relative overflow-hidden bg-primary py-20 text-white sm:py-28"
    >
      <div className="absolute inset-0 grid-bg-dark opacity-60" aria-hidden />
      <div
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/15 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              <RadioTower className="h-3.5 w-3.5 text-accent" aria-hidden />
              Sistemas e Segurança
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="seguranca-title"
              className="mt-5 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Segurança crítica com comunicação que nunca falha
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              Integramos rádio comunicação, videomonitoramento inteligente e
              controle de acesso em uma arquitetura única, resiliente e
              preparada para ambientes de alta exigência.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {GROUPS.map((group, i) => {
            const Accent = ICONS[i]
            return (
              <Reveal
                as="article"
                key={group.title}
                delay={i * 120}
                className="perspective-1000"
              >
                <div className="card-3d flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <group.icon className="h-7 w-7" aria-hidden />
                    </span>
                    <Accent className="ml-auto h-6 w-6 text-white/30" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {group.description}
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <p className="text-sm font-semibold text-accent">
                          {item.name}
                        </p>
                        <p className="text-sm text-white/60">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
