import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { Calendar, Clock, Share2, Tag, ChevronLeft } from 'lucide-react'
import { dcommApi, type BlogPostPublic } from '@/lib/dcomm-api'
import { ShareButtons } from '@/components/share-buttons'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

function formatDate(dateString?: string): string {
  if (!dateString) return 'Data recente'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function estimateReadTime(text?: string): string {
  if (!text) return '3 min de leitura'
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(3, Math.ceil(words / 150))
  return `${minutes} min de leitura`
}

async function getPostBySlug(slug: string): Promise<BlogPostPublic | null> {
  try {
    return await dcommApi.getBlogPostBySlug(slug)
  } catch (error) {
    console.error('Falha ao carregar artigo por slug:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  const siteUrl = 'https://dcomm.com.br'

  if (!post) {
    return {
      title: 'Artigo não encontrado | Blog DCOMM',
      description: 'O artigo solicitado não está disponível.',
    }
  }

  return {
    title: `${post.titulo} | Blog DCOMM`,
    description: post.resumo || post.conteudo.slice(0, 160),
    openGraph: {
      title: post.titulo,
      description: post.resumo || post.conteudo.slice(0, 160),
      url: `${siteUrl}/blog/${slug}`,
      type: 'article',
      publishedTime: post.data_publicacao,
      authors: post.autor_nome ? [post.autor_nome] : undefined,
      images: post.imagem_capa
          ? [{ url: post.imagem_capa, width: 1200, height: 630, alt: post.titulo }]
          : undefined,
    },
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const category = post.categoria_nome || 'Engenharia'
  const excerpt = post.resumo || 'Conteúdo técnico da DCOMM Tecnologia.'
  const postImage = post.imagem_capa || 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?auto=format&fit=crop&q=80&w=2000'
  const readTime = estimateReadTime(post.conteudo || post.resumo)
  const tags = [category, post.autor_nome || 'DCOMM', 'Telecom']
  const formattedDate = formatDate(post.data_publicacao)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titulo,
    image: postImage,
    datePublished: post.data_publicacao,
    description: excerpt,
    author: {
      '@type': 'Person',
      name: post.autor_nome || 'Equipe DCOMM',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DCOMM Tecnologia e Engenharia',
    },
  }

  return (
      <>
        <SiteHeader />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="min-h-screen bg-background pt-20 pb-20 sm:pb-32 2xl:pb-40">
          <article>
            <header className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
              <Reveal>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors mb-8">
                  <ChevronLeft className="h-4 w-4" /> Voltar para o Blog
                </Link>
              </Reveal>

              <div className="mx-auto max-w-4xl text-center">
                <Reveal delay={100}>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {category}
                </span>
                </Reveal>

                <Reveal delay={150}>
                  <h1 className="mt-6 sm:mt-8 text-balance font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-primary">
                    {post.titulo}
                  </h1>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mt-6 mx-auto max-w-3xl text-pretty text-base sm:text-xl leading-relaxed text-muted-foreground">
                    {excerpt}
                  </p>
                </Reveal>

                <Reveal delay={250}>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-border pt-8">
                    <div className="text-left flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent font-display text-lg">
                        {(post.autor_nome || 'D')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{post.autor_nome || 'Equipe DCOMM'}</p>
                        <p className="text-xs font-medium text-muted-foreground">Engenharia e Projetos</p>
                      </div>
                    </div>

                    <div className="hidden sm:block h-8 w-px bg-border" aria-hidden />

                    <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent" /> <time>{formattedDate}</time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-accent" /> <span>{readTime}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </header>

            <Reveal delay={300} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
              <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] shadow-2xl">
                <img src={postImage} alt={post.titulo} className="h-full w-full object-cover" />
              </div>
            </Reveal>

            <div className="mx-auto mt-12 sm:mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-12 items-start">

                <aside className="lg:col-span-3 order-2 lg:order-1 sticky top-28 space-y-10">
                  <div>
                    <h4 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-primary">
                      <Share2 className="h-4 w-4 text-accent" /> Compartilhe
                    </h4>
                    {/* COMPONENTE ISOLADO DAS REDES SOCIAIS */}
                    <ShareButtons title={post.titulo} slug={post.slug} />
                  </div>

                  <hr className="border-border" />

                  <div>
                    <h4 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-primary">
                      <Tag className="h-4 w-4 text-accent" /> Tópicos
                    </h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                        {tag}
                      </span>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="lg:col-span-9 order-1 lg:order-2">
                  <Reveal delay={400}>
                    <div className="text-foreground/90 leading-relaxed text-base sm:text-lg whitespace-pre-line font-sans">
                      {post.conteudo}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </article>
        </main>
        <SiteFooter />
      </>
  )
}