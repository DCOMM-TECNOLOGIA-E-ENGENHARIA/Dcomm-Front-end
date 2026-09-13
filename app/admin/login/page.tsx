'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, AlertCircle, ArrowRight, Loader2, ServerOff } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Reveal } from '@/components/reveal'
import api from '@/lib/api'

type LoginError = {
  message: string
  isNetworkError: boolean
}

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<LoginError | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    async function checkCurrentSession() {
      try {
        await api.get('/auth/me')
        router.replace('/admin/dashboard')
      } catch {
        setCheckingSession(false)
      }
    }

    checkCurrentSession()
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.post('/auth/login', { email, password })
      const data = response.data as { token?: string; user?: unknown; message?: string }

      if (!data?.token) {
        throw new Error('Resposta inválida de autenticação.')
      }

      document.cookie = `dcomm_admin_token=${data.token}; path=/; max-age=${8 * 60 * 60}; SameSite=Strict;`
      if (data.user) {
        localStorage.setItem('dcomm_admin_user', JSON.stringify(data.user))
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch (err: unknown) {
      const code =
        typeof err === 'object' && err !== null && 'code' in err
          ? String((err as { code?: string }).code)
          : undefined
      const status =
        typeof err === 'object' && err !== null && 'response' in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined
      const responseData =
        typeof err === 'object' && err !== null && 'response' in err
          ? (err as { response?: { data?: { error?: string; message?: string } } }).response?.data
          : undefined

      if (code === 'ERR_NETWORK') {
        setError({
          message: 'Não foi possível conectar ao servidor da API.',
          isNetworkError: true,
        })
      } else if (status === 400) {
        setError({
          message: responseData?.error || 'E-mail e senha são obrigatórios.',
          isNetworkError: false,
        })
      } else if (status === 401) {
        setError({
          message: responseData?.error || 'Credenciais inválidas.',
          isNetworkError: false,
        })
      } else {
        setError({
          message: responseData?.error || responseData?.message || 'Erro interno de autenticação.',
          isNetworkError: false,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy text-white px-4">
        <div className="absolute inset-0 grid-bg-dark opacity-60" aria-hidden />
        <div className="relative z-10 flex items-center gap-3 text-sm font-semibold text-white/80">
          <Loader2 className="h-5 w-5 animate-spin" />
          Verificando sessão...
        </div>
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy text-white px-4">
      <div className="absolute inset-0 grid-bg-dark opacity-60" aria-hidden />

      <Reveal delay={100} className="relative z-10 w-full max-w-md perspective-1000">
        <div className="card-3d overflow-hidden rounded-3xl border border-white/10 bg-navy-deep/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center flex flex-col items-center">
            <Logo variant="light" className="mb-6 scale-110" />
            <h1 className="font-display text-2xl font-bold tracking-tight text-white">Painel de Engenharia</h1>
            <p className="mt-2 text-sm text-white/60">Acesso corporativo restrito DCOMM.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {error && (
              <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${error.isNetworkError ? 'border-orange-500/30 bg-orange-500/10' : 'border-destructive/30 bg-destructive/10'}`}>
                {error.isNetworkError ? (
                  <ServerOff className="h-5 w-5 shrink-0 text-orange-400 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                )}
                <p className={error.isNetworkError ? 'text-orange-200/90' : 'text-destructive/90'}>
                  {error.message}
                </p>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="email">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-colors focus:border-brand-blue focus:bg-white/10"
                  placeholder="admin@dcomm.com.br"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="password">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-colors focus:border-brand-blue focus:bg-white/10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="text-right">
              <a href="/admin/recuperar-senha" className="text-xs text-accent hover:underline transition-colors">
                Problemas de acesso?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-brand-blue disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Acessar Painel <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>
        </div>
      </Reveal>
    </main>
  )
}
