'use client'

import { useEffect, useState } from 'react'
import { BarChart3, Users, FolderKanban, ShieldAlert, FileText } from 'lucide-react'
import api from '@/lib/api'

// 1. Tipagem robusta para resolver os erros de "property does not exist on type 'never'"
interface AnalyticsData {
    tipo_acao: string;
    total: string | number;
}

interface ProjetoData {
    id: number;
    titulo: string;
    descricao: string;
}

export default function DashboardAdmin() {
    // 2. Atribuição das tipagens nos hooks useState
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
    const [projetos, setProjetos] = useState<ProjetoData[]>([])
    const [loading, setLoading] = useState(true)

    // 3. Correção do erro de argumentos do useEffect
    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const [analyticsRes, projetosRes] = await Promise.all([
                    api.get('/analytics/reports'),
                    api.get('/site/servicos') // Mapeado para os serviços/projetos ativos
                ])
                setAnalyticsData(analyticsRes.data)
                setProjetos(projetosRes.data)
            } catch (err) {
                console.error("Erro ao carregar dados do painel:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, []) // <- Sintaxe de dependências corrigida

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-primary font-bold animate-pulse">Carregando painel...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar Interna do Admin */}
            <aside className="w-64 bg-navy text-white p-6 flex flex-col gap-6 shrink-0">
                <div className="font-display font-extrabold text-xl tracking-tight text-white border-b border-white/10 pb-4">
                    DCOMM <span className="text-accent">PANEL</span>
                </div>
                <nav className="flex flex-col gap-2">
                    <a href="/admin/dashboard" className="flex items-center gap-3 bg-white/10 p-3 rounded-xl font-medium transition-colors">
                        <BarChart3 className="h-5 w-5 text-accent" /> Dashboard
                    </a>
                    <a href="/admin/blog" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl transition-colors">
                        <FileText className="h-5 w-5" /> Postagens Blog
                    </a>
                    <a href="/admin/usuarios" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl transition-colors">
                        <Users className="h-5 w-5" /> Usuários & PAM
                    </a>
                </nav>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 p-8 overflow-y-auto lg:p-12">
                <header className="flex justify-between items-center mb-10 border-b border-border pb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-display text-primary">Painel de Engenharia & Monitoramento</h1>
                        <p className="text-muted-foreground text-sm mt-1">Dados consolidados de tráfego e infraestrutura.</p>
                    </div>
                </header>

                {/* Métricas Principais */}
                <div className="grid gap-6 md:grid-cols-3 mb-10">
                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-4 bg-accent/10 rounded-xl"><FolderKanban className="h-6 w-6 text-accent" /></div>
                        <div>
                            <span className="block text-2xl font-bold text-primary">{projetos.length}</span>
                            <span className="text-xs text-muted-foreground uppercase font-semibold">Projetos Monitorados</span>
                        </div>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-4 bg-green-500/10 rounded-xl"><BarChart3 className="h-6 w-6 text-green-500" /></div>
                        <div>
                            <span className="block text-2xl font-bold text-primary">
                                {analyticsData.reduce((acc, curr) => acc + (typeof curr.total === 'string' ? parseInt(curr.total, 10) : curr.total), 0)}
                            </span>
                            <span className="text-xs text-muted-foreground uppercase font-semibold">Cliques e Ações Trackeadas</span>
                        </div>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-4 bg-navy/10 rounded-xl"><ShieldAlert className="h-6 w-6 text-navy" /></div>
                        <div>
                            <span className="block text-2xl font-bold text-primary">SLP</span>
                            <span className="text-xs text-muted-foreground uppercase font-semibold">Fistel & Anatel Habilitados</span>
                        </div>
                    </div>
                </div>

                {/* Grid das Tabelas do Painel */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Tabela de Tráfego */}
                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                        <h3 className="text-lg font-bold text-primary font-display mb-4">Eventos Recentes (Analytics)</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="border-b border-border text-muted-foreground">
                                    <th className="pb-3 font-semibold">Tipo de Ação</th>
                                    <th className="pb-3 font-semibold text-right">Total Registrado</th>
                                </tr>
                                </thead>
                                <tbody>
                                {analyticsData.map((item, idx) => (
                                    <tr key={idx} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                                        <td className="py-3 font-medium text-foreground">{item.tipo_acao}</td>
                                        <td className="py-3 text-right text-muted-foreground font-semibold">{item.total}</td>
                                    </tr>
                                ))}
                                {analyticsData.length === 0 && (
                                    <tr>
                                        <td colSpan={2} className="py-6 text-center text-muted-foreground">Nenhum evento registrado ainda.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Visão Rápida dos Projetos */}
                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                        <h3 className="text-lg font-bold text-primary font-display mb-4">Portfólio Conectado</h3>
                        <div className="space-y-4">
                            {projetos.map((proj) => (
                                <div key={proj.id} className="p-4 bg-secondary rounded-xl flex justify-between items-center border border-border transition-colors hover:border-accent/40">
                                    <div>
                                        <h4 className="font-bold text-sm text-primary">{proj.titulo}</h4>
                                        <p className="text-xs text-muted-foreground max-w-xs truncate">{proj.descricao}</p>
                                    </div>
                                    <span className="text-[10px] bg-accent/15 text-accent font-bold px-2 py-1 rounded-full uppercase tracking-wider">Ativo</span>
                                </div>
                            ))}
                            {projetos.length === 0 && (
                                <div className="text-center py-6 text-muted-foreground text-sm">
                                    Nenhum projeto cadastrado.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}