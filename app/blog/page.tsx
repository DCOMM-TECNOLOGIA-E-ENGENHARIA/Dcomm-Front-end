'use client'
import { useEffect, useState, useRef } from 'react'
import { Send, FileText, CheckCircle, BarChart3, Users, Loader2, ImagePlus, UploadCloud } from 'lucide-react'
import { dcommApi, type Autor, type Categoria } from '@/lib/dcomm-api'
import api from '@/lib/api' // O client Axios configurado que você já possui com o Token

export default function AdminBlog() {
    const [titulo, setTitulo] = useState('')
    const [slug, setSlug] = useState('')
    const [resumo, setResumo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const [imagemCapa, setImagemCapa] = useState('')
    const [statusPost, setStatusPost] = useState<'publicado' | 'rascunho' | 'arquivado'>('publicado')
    const [autorId, setAutorId] = useState<number | ''>('')
    const [categoriaId, setCategoriaId] = useState<number | ''>('')

    const [authors, setAuthors] = useState<Autor[]>([])
    const [categories, setCategories] = useState<Categoria[]>([])

    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isLoadingReferences, setIsLoadingReferences] = useState(true)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        async function loadReferences() {
            try {
                const [authorsData, categoriesData] = await Promise.all([
                    dcommApi.getAutores(),
                    dcommApi.getCategorias(),
                ])
                setAuthors(Array.isArray(authorsData) ? authorsData : [])
                setCategories(Array.isArray(categoriesData) ? categoriesData : [])
            } catch (error) {
                console.error('Falha ao carregar autores/categorias:', error)
            } finally {
                setIsLoadingReferences(false)
            }
        }
        loadReferences()
    }, [])

    function handleTituloChange(val: string) {
        setTitulo(val)
        const generatedSlug = val
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/-+/g, '-')
        setSlug(generatedSlug)
    }

    // ==============================================================
    // LÓGICA DE UPLOAD SEGURO PARA A API
    // ==============================================================
    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setErrorMessage('')

        try {
            const formData = new FormData()
            formData.append('file', file)

            // Faz o POST para nossa nova rota mascarada do backend
            const response = await api.post('/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            // Recebe a URL virtual (Ex: /api/media/cover-1234.webp)
            setImagemCapa(response.data.url)
        } catch (error) {
            console.error('Erro no upload da imagem:', error)
            setErrorMessage('Falha ao enviar a imagem. Verifique o tamanho do arquivo.')
        } finally {
            setIsUploading(false)
        }
    }

    async function handlePost(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setSuccessMessage('')
        setErrorMessage('')

        try {
            await dcommApi.createPost({
                autor_id: autorId === '' ? undefined : autorId,
                categoria_id: categoriaId === '' ? undefined : categoriaId,
                titulo,
                slug,
                resumo,
                conteudo,
                imagem_capa: imagemCapa || undefined,
                status: statusPost,
                data_publicacao: new Date().toISOString(),
            })

            setSuccessMessage('Artigo publicado com sucesso!')
            setTitulo(''); setSlug(''); setResumo(''); setConteudo(''); setImagemCapa(''); setAutorId(''); setCategoriaId('')
            setTimeout(() => setSuccessMessage(''), 4000)
        } catch (error) {
            console.error('Falha ao criar post no admin:', error)
            setErrorMessage('Falha ao publicar o artigo no servidor.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <aside className="w-64 bg-navy text-white p-6 flex flex-col gap-6 shrink-0">
                <div className="font-display font-extrabold text-xl tracking-tight text-white border-b border-white/10 pb-4">
                    DCOMM <span className="text-accent">PANEL</span>
                </div>
                <nav className="flex flex-col gap-2">
                    <a href="/admin/dashboard" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl transition-colors">
                        <BarChart3 className="h-5 w-5" /> Dashboard
                    </a>
                    <a href="/admin/blog" className="flex items-center gap-3 bg-white/10 p-3 rounded-xl font-medium text-white">
                        <FileText className="h-5 w-5 text-accent" /> Postagens Blog
                    </a>
                    <a href="/admin/usuarios" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl transition-colors">
                        <Users className="h-5 w-5" /> Autores
                    </a>
                </nav>
            </aside>

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold font-display text-primary">Nova Publicação Editorial</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Escreva e publique artigos com imagens otimizadas para WebP automaticamente.
                        </p>
                    </header>

                    {successMessage && (
                        <div className="mb-6 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                            <span className="text-sm font-medium">{successMessage}</span>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-6 bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded-xl text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handlePost} className="space-y-6 bg-card border border-border p-8 rounded-2xl shadow-sm">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Título do Artigo</label>
                                <input
                                    type="text"
                                    required
                                    value={titulo}
                                    onChange={(e) => handleTituloChange(e.target.value)}
                                    className="w-full border border-border bg-transparent p-3 rounded-xl outline-none focus:border-accent text-foreground"
                                    placeholder="Ex: Redes LTE Privadas na Engenharia"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Slug (URL Automática)</label>
                                <input
                                    type="text"
                                    required
                                    value={slug}
                                    disabled
                                    className="w-full border border-border bg-muted/50 p-3 rounded-xl text-muted-foreground cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Autor</label>
                                <select
                                    value={autorId}
                                    onChange={(e) => setAutorId(e.target.value ? Number(e.target.value) : '')}
                                    className="w-full border border-border bg-transparent p-3 rounded-xl outline-none text-foreground"
                                    disabled={isLoadingReferences}
                                >
                                    <option value="">Não vincular autor</option>
                                    {authors.map((author) => (
                                        <option key={author.id} value={author.id}>{author.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Categoria</label>
                                <select
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value ? Number(e.target.value) : '')}
                                    className="w-full border border-border bg-transparent p-3 rounded-xl outline-none text-foreground"
                                    disabled={isLoadingReferences}
                                >
                                    <option value="">Não vincular categoria</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.nome}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* CAIXA DE UPLOAD DINÂMICO DE IMAGEM */}
                        <div>
                            <label className="block text-sm font-semibold text-primary mb-2">Imagem de Capa </label>
                            <div
                                className={`relative border-2 border-dashed rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-colors
                  ${imagemCapa ? 'border-transparent bg-navy/5' : 'border-border bg-transparent hover:bg-secondary/50'}
                  ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
                `}
                                style={{ minHeight: '200px' }}
                                onClick={() => !imagemCapa && fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/webp"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />

                                {isUploading ? (
                                    <div className="flex flex-col items-center text-primary">
                                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                                        <span className="font-semibold text-sm">Processando e convertendo...</span>
                                    </div>
                                ) : imagemCapa ? (
                                    <div className="relative w-full h-full group">
                                        <img src={imagemCapa} alt="Preview" className="w-full h-64 object-cover" />
                                        <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                                className="bg-white text-navy font-bold px-4 py-2 rounded-xl text-sm"
                                            >
                                                Trocar Imagem
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-muted-foreground p-8 text-center">
                                        <UploadCloud className="h-10 w-10 mb-3 text-accent" />
                                        <span className="font-semibold">Clique para anexar arquivo da sua máquina</span>
                                        <span className="text-xs mt-1">Sua imagem será protegida, convertida para WebP e redimensionada</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-primary mb-2">Resumo de Exibição</label>
                            <input
                                type="text"
                                required
                                value={resumo}
                                onChange={(e) => setResumo(e.target.value)}
                                className="w-full border border-border bg-transparent p-3 rounded-xl outline-none text-foreground"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-primary mb-2">Conteúdo do Artigo</label>
                            <textarea
                                rows={10}
                                required
                                value={conteudo}
                                onChange={(e) => setConteudo(e.target.value)}
                                className="w-full border border-border bg-transparent p-3 rounded-xl outline-none resize-none font-sans leading-relaxed text-foreground"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-semibold text-primary">Status:</label>
                                <select
                                    value={statusPost}
                                    onChange={(e) => setStatusPost(e.target.value as 'publicado' | 'rascunho' | 'arquivado')}
                                    className="border border-border bg-background p-2 rounded-lg outline-none text-sm text-foreground"
                                >
                                    <option value="publicado">Publicado Imediatamente</option>
                                    <option value="rascunho">Salvar como Rascunho</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || isUploading}
                                className="bg-accent hover:bg-brand-blue disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors shadow-md"
                            >
                                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Salvando...</> : <><Send className="h-4 w-4" /> Publicar Artigo</>}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}