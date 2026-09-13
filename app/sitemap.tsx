import { MetadataRoute } from 'next'
import { dcommApi } from '@/lib/dcomm-api'

// CORREÇÃO: Força a renderização dinâmica para evitar o erro "Dynamic server usage" no build.
export const dynamic = 'force-dynamic'

const SITE_URL = 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split('T')[0]

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/#inicio`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#iot`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#seguranca`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#servicos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#projetos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#empresa`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#contato`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  try {
    const posts = await dcommApi.getBlogPosts()

    const dynamicBlogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.data_publicacao?.split('T')[0] || currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    return [...staticRoutes, ...dynamicBlogRoutes]
  } catch (error) {
    console.error('Falha ao gerar sitemap dinâmico do blog:', error)
    // Se a API estiver offline durante a geração, retorna apenas as rotas estáticas para não quebrar.
    return staticRoutes
  }
}