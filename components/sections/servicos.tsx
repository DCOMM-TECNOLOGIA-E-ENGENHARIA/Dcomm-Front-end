import {
  HardHat,
  Wrench,
  Network,
  LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { Servico as ApiServico } from '@/lib/dcomm-api'

const FALLBACK_SERVICES = [
  {
    icon: Network,
    title: 'Engenharia de Redes de Telecom',
    description:
      'Projeto e dimensionamento de redes de telecomunicações completas, do estudo de viabilidade ao as-built, com documentação técnica de excelência.',
  },
  {
    icon: HardHat,
    title: 'Construção de Infraestrutura',
    description:
      'Implantação de torres, sites, cabeamento estruturado e infraestrutura civil para telecom com equipes certificadas e segurança do trabalho.',
  },
  {
    icon: Wrench,
    title: 'Manutenção e Operação',
    description:
      'Manutenção preventiva e corretiva com SLA garantido, monitoramento contínuo e suporte técnico 24/7 para máxima disponibilidade.',
  }
]

function resolveServiceIcon(title: string): LucideIcon {
  const normalized = title.toLowerCase()
  if (normalized.includes('infra')) return HardHat
  if (normalized.includes('manuten') || normalized.includes('opera')) return Wrench
  return Network
}

export function Servicos({ services = [] }: { services?: ApiServico[] }) {
  const dynamicServices = services
    .filter((item) => item.ativo !== false)
    .map((item) => ({
      icon: resolveServiceIcon(item.titulo),
      title: item.titulo,
      description: item.descricao,
    }))

  const displayServices =
    dynamicServices.length > 0 ? dynamicServices : FALLBACK_SERVICES

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="bg-secondary py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <Wrench className="h-3.5 w-3.5" aria-hidden />
              Serviços de Engenharia
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="servicos-title"
              className="mt-5 text-balance font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              Um parceiro de engenharia do projeto à operação
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Cobrimos todo o ciclo de vida da sua infraestrutura tecnológica
              com uma equipe multidisciplinar de engenheiros e especialistas.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, i) => (
            <Reveal
              as="article"
              key={service.title}
              delay={(i % 3) * 100}
              className="perspective-1000"
            >
              <div className="card-3d group flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-secondary p-3 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-primary">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
