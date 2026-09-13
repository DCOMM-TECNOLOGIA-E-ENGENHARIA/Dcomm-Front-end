import {
  Cpu,
  Router,
  Antenna,
  Waypoints,
  Gauge,
  CheckCircle2,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

const CARDS = [
  {
    icon: Cpu,
    title: 'IoT',
    description:
      'Plataformas e dispositivos IoT  para telemetria, automação industrial e cidades inteligentes, com gateways LoRaWAN e integração ponta a ponta.',
    points: ['Sensores e gateways', 'Telemetria em tempo real', 'Automação industrial'],
  },
  {
    icon: Router,
    title: 'Redes LTE Privadas',
    description:
      'Redes celulares privadas dedicadas para ambientes de missão crítica, garantindo baixa latência, cobertura controlada e segurança de dados.',
    points: ['Cobertura dedicada', 'Baixa latência', 'Isolamento de tráfego'],
  },
  {
    icon: Antenna,
    title: 'Conectividade 4G',
    description:
      'Projetos de conectividade 4G LTE robustos para operações remotas, backhaul e mobilidade corporativa com alta disponibilidade.',
    points: ['Alta disponibilidade', 'Backhaul confiável', 'Mobilidade corporativa'],
  },
  {
    icon: Waypoints,
    title: 'Redes 5G',
    description:
      'Arquiteturas 5G de nova geração com network slicing e edge computing para aplicações críticas, industriais e de altíssima densidade.',
    points: ['Network slicing', 'Edge computing', 'Ultra banda larga'],
  },
]

export function IotConectividade() {
  return (
    <section
      id="iot"
      aria-labelledby="iot-title"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <Gauge className="h-3.5 w-3.5" aria-hidden />
              IoT e Conectividade
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="iot-title"
              className="mt-5 text-balance font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              Infraestrutura de conectividade projetada por engenheiros
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Da coleta de dados na ponta às redes celulares privadas de alta
              performance, entregamos ecossistemas conectados escaláveis,
              seguros e prontos para o futuro da sua operação.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal
              as="article"
              key={card.title}
              delay={i * 100}
              className="perspective-1000"
            >
              <div className="card-3d group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent">
                  <card.icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-primary">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
