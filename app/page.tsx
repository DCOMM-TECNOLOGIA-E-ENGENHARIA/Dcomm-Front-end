import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { IotConectividade } from '@/components/sections/iot-conectividade'
import { SistemasSeguranca } from '@/components/sections/sistemas-seguranca'
import { Servicos } from '@/components/sections/servicos'
import { ProjetosLicenciamento } from '@/components/sections/projetos-licenciamento' // <--- Nova Importação
import { Parceiros } from '@/components/sections/parceiros'
import { Empresa } from '@/components/sections/empresa'
import { Contato } from '@/components/sections/contato'
import { dcommApi, type Configuracao, type Depoimento, type Servico } from '@/lib/dcomm-api'

export const dynamic = 'force-dynamic'

export default async function Home() {
    let config: Configuracao = {}
    let services: Servico[] = []
    let testimonials: Depoimento[] = []

    try {
        const [configRes, servicesRes, testimonialsRes] = await Promise.all([
            dcommApi.getConfiguracao(),
            dcommApi.getServicos(),
            dcommApi.getDepoimentos(),
        ])
        config = configRes || {}
        services = Array.isArray(servicesRes) ? servicesRes : []
        testimonials = Array.isArray(testimonialsRes) ? testimonialsRes : []
    } catch (error) {
        console.error('Falha ao carregar dados dinâmicos da home:', error)
    }

    return (
        <>
            <SiteHeader />
            <main>
                <Hero companyName={config.nome_empresa} />
                <IotConectividade />
                <SistemasSeguranca />
                <Servicos services={services} />
                <ProjetosLicenciamento />
                <Parceiros />
                <Empresa about={config.sobre_nos} testimonials={testimonials} />
                <Contato config={config} />
            </main>
            <SiteFooter />
        </>
    )
}