'use client'

import { useState } from 'react'
import { Mail, User, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { dcommApi } from '@/lib/dcomm-api'

export default function RecuperarSenha() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      await dcommApi.createContato({
        nome_remetente: nome,
        email_remetente: email,
        assunto: 'Recuperação de acesso administrativo',
        mensagem: `Solicitação de recuperação de acesso para o e-mail: ${email}.`,
      })
      setStatus({
        success: true,
        message: 'Solicitação recebida. A equipe de suporte entrará em contato.',
      })
      setNome('')
      setEmail('')
    } catch (error) {
      console.error('Falha ao abrir solicitação de recuperação:', error)
      setStatus({
        success: false,
        message: 'Não foi possível registrar sua solicitação agora.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-navy text-white px-4">
      <div className="absolute inset-0 grid-bg-dark opacity-60" />
      <div className="relative z-10 w-full max-w-md card-3d rounded-3xl border border-white/10 bg-navy-deep/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 text-center flex flex-col items-center">
          <Logo variant="light" className="mb-4" />
          <h2 className="text-xl font-bold font-display">Recuperação de Acesso</h2>
        </div>

        {status?.success ? (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
            <p className="text-sm text-white/80">{status.message}</p>
            <Link href="/admin/login" className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" /> Voltar ao Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {status && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{status.message}</p>}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Seu nome</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none"
                  placeholder="Nome completo"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">E-mail corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none"
                  placeholder="exemplo@dcomm.com.br"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-brand-blue py-3.5 rounded-xl font-bold text-sm transition-colors">
              {loading ? 'Enviando...' : 'Solicitar suporte de acesso'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
