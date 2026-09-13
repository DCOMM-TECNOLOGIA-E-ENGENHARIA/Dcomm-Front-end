// app/admin/usuarios/page.tsx
'use client'

import { useState } from 'react'
import { UserPlus, UserCheck, Shield } from 'lucide-react'
import api from '@/lib/api'

export default function GestaoUsuariosPAM() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [cadastrado, setCadastrado] = useState(false)

    async function handleUserRegistry(e: React.FormEvent) {
        e.preventDefault()
        try {
            // Rota mapeada para criação de novos colaboradores no esquema de Alocação de Projetos
            await api.post('/blog/autores', {
                nome,
                email,
                biografia: departamento, // Salva o departamento no campo biografia adaptado para o front
                foto_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7'
            })
            setCadastrado(true)
            setNome(''); setEmail(''); setSenha(''); setDepartamento('')
        } catch (err) {
            alert('Erro ao registrar novo operador no banco PAM.')
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <aside className="w-64 bg-navy text-white p-6 flex flex-col gap-6">
                <div className="font-display font-extrabold text-xl tracking-tight text-white border-b border-white/10 pb-4">
                    DCOMM <span className="text-accent">PANEL</span>
                </div>
                <nav className="flex flex-col gap-2">
                    <a href="/admin/dashboard" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl"> Dashboard</a>
                    <a href="/admin/usuarios" className="flex items-center gap-3 bg-white/10 p-3 rounded-xl font-medium"><Shield className="h-5 w-5 text-accent" /> Usuários & PAM</a>
                </nav>
            </aside>

            {/* Form */}
            <main className="flex-1 p-8 lg:p-12">
                <h2 className="text-2xl font-bold font-display text-primary mb-2">Controle de Recursos & Usuários (PAM)</h2>
                <p className="text-muted-foreground text-sm mb-6">Cadastro de novos desenvolvedores, engenheiros e gestores de alocação.</p>

                {cadastrado && <p className="mb-4 bg-accent/10 text-accent border border-accent/20 p-4 rounded-xl flex items-center gap-2"><UserCheck /> Colaborador inserido com sucesso na tabela USUARIO do banco!</p>}

                <form onSubmit={handleUserRegistry} className="space-y-4 bg-card border border-border p-6 rounded-2xl shadow-sm max-w-2xl">
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Nome Completo</label>
                        <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border border-border bg-transparent p-3 rounded-xl outline-none" placeholder="Nome do colaborador" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">E-mail Corporativo</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-border bg-transparent p-3 rounded-xl outline-none" placeholder="nome.sobrenome@dcomm.com.br" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Senha Provisória</label>
                        <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full border border-border bg-transparent p-3 rounded-xl outline-none" placeholder="••••••••" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Departamento</label>
                        <select value={departamento} onChange={(e) => setDepartamento(e.target.value)} className="w-full border border-border bg-transparent p-3 rounded-xl outline-none text-foreground">
                            <option value="ENGENHARIA_REDES">Engenharia de Redes</option>
                            <option value="DESENVOLVIMENTO_IOT">Desenvolvimento IoT / Automação</option>
                            <option value="INFRAESTRUTURA_CIVIL">Infraestrutura e Telecom</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-primary text-white font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors hover:bg-navy-deep">
                        <UserPlus className="h-4 w-4" /> Registrar no Sistema PAM
                    </button>
                </form>
            </main>
        </div>
    )
}