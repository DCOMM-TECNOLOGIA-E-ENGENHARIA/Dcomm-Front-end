export interface ApiError extends Error {
  status?: number
}

export interface PublicUser {
  id: number
  nome: string
  email: string
}

export interface LoginResponse {
  message: string
  token: string
  user: PublicUser
}

export interface Configuracao {
  id?: number
  nome_empresa?: string
  cnpj?: string
  email_contato?: string
  telefone?: string
  endereco?: string
  sobre_nos?: string
  links_redes_sociais?: Record<string, unknown>
}

export interface Servico {
  id: number
  titulo: string
  descricao: string
  icone_url?: string
  preco_base: number
  ativo?: boolean
}

export interface Depoimento {
  id: number
  nome_cliente: string
  cargo_empresa?: string
  texto: string
  aprovado?: boolean
  data_criacao?: string
}

export interface ContatoInput {
  nome_remetente: string
  email_remetente: string
  assunto: string
  mensagem: string
}

export interface ContatoMensagem extends ContatoInput {
  id: number
  data_envio?: string
}

export interface Autor {
  id: number
  nome: string
  email: string
  biografia?: string
  foto_url?: string
  ativo?: boolean
}

export interface Categoria {
  id: number
  nome: string
  slug: string
  descricao?: string
}

export interface BlogPostPublic {
  id: number
  autor_id?: number
  categoria_id?: number
  titulo: string
  slug: string
  resumo?: string
  conteudo: string
  imagem_capa?: string
  status?: string
  data_publicacao?: string
  autor_nome?: string
  categoria_nome?: string
}

export interface BlogPostCreateInput {
  autor_id?: number
  categoria_id?: number
  titulo: string
  slug: string
  resumo?: string
  conteudo: string
  imagem_capa?: string
  status?: 'rascunho' | 'publicado' | 'arquivado'
  data_publicacao?: string
  tags_ids?: number[]
}

export interface BlogPostCreateResponse {
  message: string
  post_id: number
}

export interface AnalyticsTrackInput {
  sessao_id?: string
  usuario_id?: number
  ip_anonimizado?: string
  tipo_acao: string
  url_atual: string
  url_referencia?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  dispositivo?: string
  navegador?: string
  detalhes?: Record<string, unknown>
}

export interface AnalyticsTrackResponse {
  id: number
  tipo_acao: string
  data_acao: string
}

export interface AnalyticsReportItem {
  tipo_acao: string
  total: number | string
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export function getApiBaseUrl() {
  return API_BASE_URL.replace(/\/+$/, '')
}

function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getApiBaseUrl()}${normalizedPath}`
}

async function apiRequest<T>(
  path: string,
  init?: RequestInit,
  token?: string,
): Promise<T> {
  const headers = new Headers(init?.headers || {})
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers,
    cache: init?.cache ?? 'no-store',
  })

  if (!response.ok) {
    let message = `Erro HTTP ${response.status}`
    try {
      const body = (await response.json()) as { error?: string; message?: string }
      message = body.error || body.message || message
    } catch {
      // Mantém mensagem padrão quando o back-end não responde JSON.
    }
    const error = new Error(message) as ApiError
    error.status = response.status
    throw error
  }

  return (await response.json()) as T
}

export const dcommApi = {
  login(email: string, password: string) {
    return apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
  getCurrentUser(token: string) {
    return apiRequest<{ user: PublicUser }>('/auth/me', { method: 'GET' }, token)
  },
  getConfiguracao() {
    return apiRequest<Configuracao>('/site/configuracoes')
  },
  getServicos() {
    return apiRequest<Servico[]>('/site/servicos')
  },
  getDepoimentos() {
    return apiRequest<Depoimento[]>('/site/depoimentos')
  },
  createContato(payload: ContatoInput) {
    return apiRequest<ContatoMensagem>('/site/contato', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  getBlogPosts() {
    return apiRequest<BlogPostPublic[]>('/blog/posts')
  },
  async getBlogPostBySlug(slug: string) {
    const posts = await apiRequest<BlogPostPublic[]>('/blog/posts')
    return posts.find((post) => post.slug === slug) ?? null
  },
  getAutores() {
    return apiRequest<Autor[]>('/blog/autores')
  },
  createAutor(payload: Pick<Autor, 'nome' | 'email'> & Partial<Autor>) {
    return apiRequest<Autor>('/blog/autores', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  getCategorias() {
    return apiRequest<Categoria[]>('/blog/categorias')
  },
  createPost(payload: BlogPostCreateInput) {
    return apiRequest<BlogPostCreateResponse>('/blog/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  getAnalyticsReports() {
    return apiRequest<AnalyticsReportItem[]>('/analytics/reports')
  },
  trackAnalytics(payload: AnalyticsTrackInput) {
    return apiRequest<AnalyticsTrackResponse>('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
