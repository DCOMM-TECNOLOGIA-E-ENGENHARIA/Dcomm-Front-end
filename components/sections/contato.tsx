'use client'

import { useState } from 'react'
import { Mail, MapPin, Building2, Send, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { type Configuracao } from '@/lib/dcomm-api'

export function Contato({ config }: { config?: Configuracao }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const destino = 'marcelo.jsilva77@hotmail.com'
    const assunto = `[Contato Site] ${form.assunto}`
    const corpo = `Nome: ${form.nome}\nE-mail: ${form.email}\n\nMensagem:\n${form.mensagem}`
    const mailtoHref = `mailto:${destino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`

    window.location.href = mailtoHref
    setSent(true)
    setForm({
      nome: '',
      email: '',
      assunto: '',
      mensagem: '',
    })
    setIsLoading(false)
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative overflow-hidden bg-navy py-20 text-white sm:py-28"
    >
      <div className="absolute inset-0 grid-bg-dark opacity-60" aria-hidden />
      <div
        className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Fale Conosco
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="contato-title"
              className="mt-5 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Vamos projetar a sua próxima rede crítica
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              Conte com uma equipe de engenharia com mais de 25 anos de mercado.
              Solicite um diagnóstico técnico e descubra a solução ideal para a
              sua operação.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            <Reveal delay={180}>
              <ContactItem
                icon={<Mail className="h-5 w-5 text-accent" aria-hidden />}
                label="E-mail"
                value="marcelo.jsilva77@hotmail.com"
                href="mailto:marcelo.jsilva77@hotmail.com"
              />
            </Reveal>
            <Reveal delay={240}>
              <ContactItem
                icon={<MapPin className="h-5 w-5 text-accent" aria-hidden />}
                label="Localização"
                value={config?.endereco || 'Barueri — São Paulo, Brasil'}
              />
            </Reveal>
            <Reveal delay={300}>
              <ContactItem
                icon={<Building2 className="h-5 w-5 text-accent" aria-hidden />}
                label="Whatsapp"
                value={config?.telefone || '+55 (11) 95552-4449'}
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={160}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8">
            {sent ? (
              <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                  <Send className="h-8 w-8 text-accent" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold">
                  Mensagem enviada!
                </h3>
                <p className="mt-2 text-white/70">
                  Nossa equipe de engenharia entrará em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {error && (
                  <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </p>
                )}
                <Field label="Nome" id="nome">
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.nome}
                    onChange={(e) => setForm((old) => ({ ...old, nome: e.target.value }))}
                    className="input-dark"
                    placeholder="Seu nome completo"
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="E-mail" id="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm((old) => ({ ...old, email: e.target.value }))}
                      className="input-dark"
                      placeholder="voce@empresa.com"
                    />
                  </Field>
                  <Field label="Assunto" id="assunto">
                    <input
                      id="assunto"
                      name="assunto"
                      type="text"
                      required
                      value={form.assunto}
                      onChange={(e) => setForm((old) => ({ ...old, assunto: e.target.value }))}
                      className="input-dark"
                      placeholder="Ex.: Projeto de rádio comunicação"
                    />
                  </Field>
                </div>
                <Field label="Como podemos ajudar?" id="mensagem">
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={4}
                    value={form.mensagem}
                    onChange={(e) => setForm((old) => ({ ...old, mensagem: e.target.value }))}
                    className="input-dark resize-none"
                    placeholder="Descreva o seu desafio ou projeto..."
                  />
                </Field>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40"
                >
                  {isLoading ? 'Enviando...' : 'Enviar solicitação'}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <style>{`
        .input-dark {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: #fff;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input-dark::placeholder { color: rgba(255,255,255,0.4); }
        .input-dark:focus {
          border-color: var(--brand-blue);
          box-shadow: 0 0 0 3px rgba(30,144,255,0.25);
        }
      `}</style>
    </section>
  )
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-accent/40">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-xs uppercase tracking-wide text-white/50">
          {label}
        </span>
        <span className="block text-sm font-semibold text-white">{value}</span>
      </span>
    </div>
  )
  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  )
}

function Field({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-white/80"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
