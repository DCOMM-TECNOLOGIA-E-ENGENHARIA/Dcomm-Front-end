import { Handshake } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const PARTNERS = [
  { name: 'Motorola', tag: 'Rádio Comunicação' },
  { name: 'Hytera', tag: 'Comunicação Crítica' },
  { name: 'Tait', tag: 'Redes Troncalizadas' },
  { name: 'Caltta', tag: 'Soluções DMR / PoC' },
]

export function Parceiros() {
  return (
    <section
      id="parceiros"
      aria-labelledby="parceiros-title"
      className="bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <Handshake className="h-3.5 w-3.5" aria-hidden />
              Parceiros Tecnológicos
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="parceiros-title"
              className="mt-5 text-balance font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              Tecnologia de líderes globais, entregue por especialistas locais
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Trabalhamos com os principais fabricantes do mundo em comunicação
              crítica, garantindo soluções homologadas, suporte oficial e
              performance comprovada.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((partner, i) => (
            <Reveal
              key={partner.name}
              delay={i * 90}
              className="perspective-1000"
            >
              <div className="card-3d flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 py-10 text-center">
                <span className="font-display text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                  {partner.name}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {partner.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
