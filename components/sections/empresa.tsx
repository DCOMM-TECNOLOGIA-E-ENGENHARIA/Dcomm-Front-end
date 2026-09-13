import { Award, Target, Users, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { Depoimento } from '@/lib/dcomm-api'

const PILLARS = [
  {
    icon: Award,
    title: 'Autoridade Técnica',
    description:
      'Mais de 25 anos projetando e operando redes críticas para os setores mais exigentes do país.',
  },
  {
    icon: Target,
    title: 'Foco em Resultado',
    description:
      'Soluções desenhadas para disponibilidade máxima, com SLAs claros e engenharia orientada a dados.',
  },
  {
    icon: Users,
    title: 'Equipe Multidisciplinar',
    description:
      'Engenheiros, técnicos e especialistas certificados atuando de forma integrada em cada projeto.',
  },
  {
    icon: ShieldCheck,
    title: 'Confiabilidade',
    description:
      'Processos, homologações e parceiros de classe mundial que garantem segurança em cada entrega.',
  },
]

export function Empresa({
  about,
  testimonials = [],
}: {
  about?: string
  testimonials?: Depoimento[]
}) {
  const hasAbout = Boolean(about && about.trim())
  const approvedTestimonials = testimonials.filter(
    (item) => item.aprovado !== false && item.texto,
  )

  return (
    <section
      id="empresa"
      aria-labelledby="empresa-title"
      className="bg-secondary py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              A Empresa
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="empresa-title"
              className="mt-5 text-balance font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              25 anos construindo a infraestrutura que conecta o Brasil
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hasAbout
                ? about
                : 'A DCOMM Tecnologia e Engenharia nasceu da paixão por resolver os desafios mais complexos de conectividade e segurança. Combinamos engenharia de ponta, parcerias com líderes globais e um time apaixonado por tecnologia para entregar soluções que sustentam operações de missão crítica em todo o país.'}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Da consultoria estratégica à manutenção contínua, somos o parceiro
              de engenharia que transforma tecnologia em resultado real.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 100}
              className="perspective-1000"
            >
              <div className="card-3d flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <pillar.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {approvedTestimonials.length > 0 && (
        <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Depoimentos de clientes
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {approvedTestimonials.slice(0, 4).map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <blockquote className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "{item.texto}"
                  </p>
                  <footer className="mt-4 text-sm font-semibold text-primary">
                    {item.nome_cliente}
                    {item.cargo_empresa ? ` · ${item.cargo_empresa}` : ''}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
