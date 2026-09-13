'use client'

import Link from 'next/link'
import {
    FileSignature,
    Landmark,
    RadioTower,
    FileCheck,
    Clock,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    FileText,
    ShieldAlert,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ACTIVITIES = [
    'Elaboração do Projeto Técnico de todas as redes, auto cadastramento e sistema interativo da ANATEL, em conformidade com a Resolução n°674/2017 da agência.',
    'Emissão dos Relatórios de Conformidade (conforme Res. 303/2002) e sua liberação para análise da ANATEL.',
    'Acompanhamento sistemático do andamento do processo de licenciamento junto à ANATEL.',
    'Emissão dos boletos para pagamento das taxas obrigatórias referentes aos novos licenciamentos, bem como eventuais taxas em atraso.',
    'Emissão de licenças de credenciamento, renovação e/ou adequação de outorga.',
]

export function ProjetosLicenciamento() {
    return (
        <section
            id="projetos"
            aria-labelledby="projetos-title"
            className="relative bg-background pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 2xl:pt-40 2xl:pb-44"
        >
            {/* ----------------------------------------------------
        1. BANNER (CELULAR ATÉ TV ULTRAWIDE)
        ---------------------------------------------------- */}
            <div className="relative mx-auto max-w-7xl 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12">
                <Reveal className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] 2xl:rounded-[3rem] bg-navy px-5 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-24 lg:px-20 lg:py-32 2xl:py-40">
                    <div className="absolute inset-0 grid-bg-dark opacity-40" aria-hidden />
                    <div
                        className="absolute -left-20 -top-20 h-[300px] w-[300px] 2xl:h-[500px] 2xl:w-[500px] rounded-full bg-accent/20 blur-[100px] 2xl:blur-[150px]"
                        aria-hidden
                    />
                    <div
                        className="absolute -bottom-20 -right-20 h-[350px] w-[350px] 2xl:h-[600px] 2xl:w-[600px] rounded-full bg-brand-blue/20 blur-[100px] 2xl:blur-[150px]"
                        aria-hidden
                    />

                    <div className="relative z-10 mx-auto max-w-3xl 2xl:max-w-5xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 2xl:px-6 2xl:py-2 text-[0.65rem] sm:text-xs 2xl:text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <Landmark className="h-4 w-4 2xl:h-5 2xl:w-5 text-accent" aria-hidden />
              Projetos & Consultoria
            </span>
                        <h2
                            id="projetos-title"
                            className="mt-6 sm:mt-8 text-balance font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold leading-tight tracking-tight"
                        >
                            Seu projeto aprovado pela <span className="text-accent text-glow">ANATEL</span>
                        </h2>
                        <p className="mt-5 sm:mt-6 text-pretty text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl leading-relaxed text-white/80">
                            Com a <strong>DCOMM Tecnologia e Engenharia</strong>, você conta com uma equipe especializada para resolver todos os trâmites relacionados à elaboração, homologação e licenciamento da sua rede de comunicação junto aos órgãos governamentais.
                        </p>
                    </div>
                </Reveal>
            </div>

            {/* ----------------------------------------------------
        2. CORPO E SIDEBAR (RESPONSIVIDADE EXTREMA)
        ---------------------------------------------------- */}
            <div className="mx-auto mt-12 sm:mt-16 lg:mt-24 2xl:mt-32 max-w-7xl 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12">
                <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16 2xl:gap-24">

                    {/* COLUNA ESQUERDA: POST */}
                    <div className="lg:col-span-8 2xl:col-span-8">
                        <Reveal delay={100} as="article" className="prose prose-sm sm:prose-base md:prose-lg 2xl:prose-2xl max-w-none text-muted-foreground">
                            <h3 className="flex items-center gap-3 font-display text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-primary">
                                <FileSignature className="h-7 w-7 sm:h-8 sm:w-8 2xl:h-10 2xl:w-10 text-accent" aria-hidden />
                                Licenciamento junto à ANATEL
                            </h3>
                            <p className="mt-4 sm:mt-6 leading-relaxed">
                                A <strong>ANATEL (Agência Nacional de Telecomunicações)</strong> é o órgão federal responsável por controlar e fiscalizar o uso de radiofrequência e a operação de equipamentos de telecomunicações no país. Para liberação de frequências e licenciamento de equipamentos, a agência exige a elaboração de projetos e formulários técnicos, realizando a cobrança de taxas de acordo com a quantidade de equipamentos e tipo de serviço realizado.
                            </p>
                            <p className="mt-3 sm:mt-4 leading-relaxed">
                                A elaboração de novos projetos ou alteração de projetos já existentes devem ser realizadas conforme as normas técnicas já publicadas pela ANATEL e <strong>assinadas por um engenheiro devidamente habilitado e especializado.</strong>
                            </p>

                            <div className="my-6 sm:my-8 2xl:my-10 rounded-2xl border border-border bg-secondary p-5 sm:p-8 2xl:p-10">
                                <h4 className="font-display text-base sm:text-lg 2xl:text-2xl font-bold text-primary">O que envolve o projeto?</h4>
                                <p className="mt-2 sm:mt-3 text-xs sm:text-sm 2xl:text-lg leading-relaxed">
                                    Consiste no preenchimento de diversos formulários específicos e na emissão de um relatório de conformidade para cada estação de rádio, exigidos desde julho de 2002 e atualizados em outubro de 2018 (Resolução 700 da ANATEL), aprovando o Regulamento sobre Limitação da Exposição a Campos Eletromagnéticos na Faixa de Radiofrequências entre 8,3kHz e 300GHz.
                                </p>
                            </div>

                            <p className="leading-relaxed">
                                Após analisar e aprovar o projeto apresentado, a agência libera o uso do sistema através da emissão das licenças. A ANATEL cobra anualmente uma taxa de manutenção (Fistel) após a obtenção de uma licença, sempre no fim do mês de março do ano seguinte à emissão.
                            </p>
                            <p className="mt-3 sm:mt-4 leading-relaxed">
                                O licenciamento do sistema proposto será na modalidade <strong>SLP (Serviço Limitado Privado)</strong>, em nome do(a) CLIENTE, onde o mesmo deverá arcar com todas as taxas envolvidas no processo e durante a vigência do contrato de fornecimento.
                            </p>
                        </Reveal>

                        <hr className="my-10 sm:my-12 2xl:my-16 border-border" />

                        <Reveal delay={150} as="article">
                            <h3 className="flex items-center gap-3 font-display text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-primary">
                                <Clock className="h-7 w-7 sm:h-8 sm:w-8 2xl:h-10 2xl:w-10 text-accent" aria-hidden />
                                Cronograma do Serviço de Licenciamento
                            </h3>
                            <p className="mt-4 sm:mt-6 text-base sm:text-lg 2xl:text-xl leading-relaxed text-muted-foreground">
                                A <strong>DCOMM Tecnologia e Engenharia</strong> representará o(a) CLIENTE perante a ANATEL durante o procedimento de obtenção das novas licenças digitais. Nossa consultoria disponibilizará um acompanhamento sistemático do início ao fim do processo.
                            </p>

                            <div className="mt-8 sm:mt-10 2xl:mt-12 rounded-2xl border border-border bg-card p-5 sm:p-8 md:p-10 2xl:p-14 shadow-sm">
                                <div className="relative border-l-2 border-accent/30 pl-5 sm:pl-8 2xl:pl-10">
                                    <div className="mb-6 sm:mb-8 2xl:mb-12 relative">
                                        <span className="absolute -left-[30px] sm:-left-[43px] 2xl:-left-[53px] flex h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 items-center justify-center rounded-full bg-accent ring-4 ring-card" />
                                        <h4 className="font-bold text-primary 2xl:text-2xl">Fases Iniciais (01 a 03)</h4>
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm 2xl:text-lg text-muted-foreground">Levantamento de dados, elaboração do projeto técnico e protocolo inicial de solicitação de licenciamento na Anatel.</p>
                                    </div>
                                    <div className="mb-6 sm:mb-8 2xl:mb-12 relative">
                                        <span className="absolute -left-[30px] sm:-left-[43px] 2xl:-left-[53px] flex h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 items-center justify-center rounded-full bg-accent ring-4 ring-card" />
                                        <h4 className="font-bold text-primary 2xl:text-2xl">Trâmites e Interações</h4>
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm 2xl:text-lg text-muted-foreground">Análise pelo órgão regulador, tratativas de pendências, aprovação técnica e coordenação de frequências.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[30px] sm:-left-[43px] 2xl:-left-[53px] flex h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 items-center justify-center rounded-full bg-primary ring-4 ring-card" />
                                        <h4 className="font-bold text-primary 2xl:text-2xl">Emissão e Entrega (Fase 15)</h4>
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm 2xl:text-lg text-muted-foreground">Prazo médio para entrega das licenças: <strong>4 a 6 meses</strong> após o protocolo inicial.</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <hr className="my-10 sm:my-12 2xl:my-16 border-border" />

                        <Reveal delay={200} as="article">
                            <h3 className="flex items-center gap-3 font-display text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-primary">
                                <FileCheck className="h-7 w-7 sm:h-8 sm:w-8 2xl:h-10 2xl:w-10 text-accent" aria-hidden />
                                Homologação de Serviço de Radiocomunicação
                            </h3>
                            <p className="mt-4 sm:mt-6 text-base sm:text-lg 2xl:text-xl leading-relaxed text-muted-foreground">
                                O setor de projetos da <strong>DCOMM Tecnologia e Engenharia</strong> será responsável pelo levantamento de informações, tratativa dos dados captados, análise e elaboração de planos de frequências, e todos os serviços necessários à Regularização das Redes de Comunicação.
                            </p>

                            <h4 className="mt-6 sm:mt-8 2xl:mt-10 font-display text-lg sm:text-xl 2xl:text-3xl font-bold text-primary">
                                Resumo das Atividades:
                            </h4>
                            <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 2xl:space-y-6">
                                {ACTIVITIES.map((activity, i) => (
                                    <li key={i} className="flex items-start gap-3 sm:gap-4 rounded-xl bg-secondary/50 p-4 sm:p-5 2xl:p-6 transition-colors hover:bg-secondary">
                                        <CheckCircle2 className="mt-0.5 sm:mt-0 h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8 shrink-0 text-accent" aria-hidden />
                                        <span className="text-sm sm:text-base 2xl:text-xl text-foreground/80">{activity}</span>
                                    </li>
                                ))}
                            </ul>

                        </Reveal>
                    </div>

                    {/* COLUNA DIREITA: SIDEBAR & CTA */}
                    <div className="lg:col-span-4 2xl:col-span-4">
                        <div className="sticky top-24 sm:top-28 2xl:top-36 space-y-6 sm:space-y-8 2xl:space-y-12">

                            <Reveal delay={300} className="perspective-1000 hidden sm:block">
                                <div className="card-3d relative overflow-hidden rounded-[2rem] 2xl:rounded-[2.5rem] bg-navy-deep pb-8 pt-10 2xl:pb-12 2xl:pt-14 text-center shadow-xl">
                                    <div className="absolute inset-0 grid-bg-dark opacity-30" />
                                    <div className="relative z-10 mx-auto flex h-28 w-28 2xl:h-40 2xl:w-40 items-center justify-center rounded-full bg-gradient-to-b from-accent to-[#0f6fd1] shadow-lg shadow-accent/40">
                                        <RadioTower className="h-12 w-12 2xl:h-16 2xl:w-16 text-white" aria-hidden />
                                    </div>
                                    <div className="relative z-10 mt-6 px-6 2xl:mt-8 2xl:px-8">
                                        <h4 className="font-display text-xl 2xl:text-3xl font-bold text-white">Legalização de Frequências</h4>
                                        <p className="mt-2 2xl:mt-4 text-sm 2xl:text-lg text-white/70">Operação regularizada, segura e dentro das normas da agência reguladora.</p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={400}>
                                <div className="rounded-[2rem] 2xl:rounded-[2.5rem] border border-border bg-card p-6 sm:p-8 2xl:p-10 shadow-md">
                                    <div className="flex h-12 w-12 2xl:h-16 2xl:w-16 items-center justify-center rounded-full bg-accent/10">
                                        <FileText className="h-6 w-6 2xl:h-8 2xl:w-8 text-accent" />
                                    </div>
                                    <h4 className="mt-5 2xl:mt-6 font-display text-2xl 2xl:text-4xl font-bold text-primary">
                                        Inicie o licenciamento
                                    </h4>
                                    <p className="mt-2 sm:mt-3 2xl:mt-4 text-sm 2xl:text-lg text-muted-foreground">
                                        Evite multas e interrupções na sua operação. Nossos engenheiros cuidarão de toda a burocracia.
                                    </p>

                                    <div className="mt-6 sm:mt-8 2xl:mt-10 space-y-3 sm:space-y-4 2xl:space-y-6 border-t border-border pt-6 2xl:pt-8">
                                        <div className="flex items-center gap-3 2xl:gap-4 text-sm 2xl:text-xl font-medium text-foreground">
                                            <ShieldAlert className="h-5 w-5 2xl:h-7 2xl:w-7 text-accent" />
                                            Projetos 100% em conformidade
                                        </div>
                                        <div className="flex items-center gap-3 2xl:gap-4 text-sm 2xl:text-xl font-medium text-foreground">
                                            <Clock className="h-5 w-5 2xl:h-7 2xl:w-7 text-accent" />
                                            Agilidade nos protocolos
                                        </div>
                                    </div>

                                    <Link
                                        href="/#contato"
                                        className={cn(
                                            buttonVariants({ size: 'lg' }),
                                            "group mt-8 2xl:mt-12 w-full rounded-full shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl 2xl:h-14 2xl:text-lg"
                                        )}
                                    >
                                        Solicite Orçamento
                                        <ArrowRight className="ml-2 h-4 w-4 2xl:h-5 2xl:w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                                    </Link>
                                </div>
                            </Reveal>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}