import { Mail, MapPin, Building2 } from 'lucide-react'
import { Logo } from '@/components/logo'
import { dcommApi } from '@/lib/dcomm-api'

const FALLBACK_LINKS = [
  {
    title: 'Soluções',
    items: [
      { label: 'IoT e Conectividade', href: '#iot' },
      { label: 'Redes Privadas LTE/5G', href: '#iot' },
      { label: 'Rádio Comunicação', href: '#seguranca' },
      { label: 'Vídeo Monitoramento', href: '#seguranca' },
      { label: 'Controle de Acesso', href: '#seguranca' },
    ],
  },
  {
    title: 'Empresa',
    items: [
      { label: 'Serviços', href: '#servicos' },
      { label: 'Parceiros', href: '#parceiros' },
      { label: 'Sobre a DCOMM', href: '#empresa' },
      { label: 'Contato', href: '#contato' },
    ],
  },
]

export async function SiteFooter() {
  let companyName = 'DCOMM Tecnologia e Engenharia'
  let companySummary =
    'Engenharia de telecomunicações de missão crítica. Conectividade, segurança e inovação há mais de 25 anos.'
  let companyEmail = 'dcoom.telecom@outlook.com'
  let companyAddress = 'Barueri — São Paulo, Brasil'
  let companyPhone = '+55 (11) 95552-4449'
  let serviceItems = FALLBACK_LINKS[0].items

  try {
    const [config, services] = await Promise.all([
      dcommApi.getConfiguracao(),
      dcommApi.getServicos(),
    ])

    if (config?.nome_empresa) companyName = config.nome_empresa
    if (config?.sobre_nos) companySummary = config.sobre_nos
    if (config?.email_contato) companyEmail = config.email_contato
    if (config?.endereco) companyAddress = config.endereco
    if (config?.telefone) companyPhone = config.telefone
    if (Array.isArray(services) && services.length > 0) {
      const dynamicServices = services
        .filter((service) => service.ativo !== false)
        .slice(0, 5)
        .map((service) => ({
          label: service.titulo,
          href: '#servicos',
        }))
      if (dynamicServices.length > 0) {
        serviceItems = dynamicServices
      }
    }
  } catch (error) {
    console.error('Falha ao carregar dados dinâmicos do rodapé:', error)
  }

  const LINKS = [
    {
      ...FALLBACK_LINKS[0],
      items: serviceItems,
    },
    FALLBACK_LINKS[1],
  ]

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {companySummary}
            </p>
          </div>

          {LINKS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-white/60 transition-colors hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contato
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <a
                  href={`mailto:${companyEmail}`}
                  className="transition-colors hover:text-accent"
                >
                  {companyEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                {companyAddress}
              </li>
              <li className="flex items-start gap-3">
                <Building2
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden
                />
                Telefone/Whatsapp: {companyPhone}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {companyName}.
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
