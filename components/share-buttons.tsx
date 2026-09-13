'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Mail, Copy, Check } from 'lucide-react'

export function ShareButtons({ title, slug }: { title: string, slug: string }) {
    const [copied, setCopied] = useState(false)
    const [currentUrl, setCurrentUrl] = useState(`https://dcomm.com.br/blog/${slug}`)

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])

    const handleCopyLink = (redeNome?: string) => {
        navigator.clipboard.writeText(currentUrl)
        setCopied(true)
        if (redeNome) alert(`Link copiado com sucesso! Cole na sua postagem do ${redeNome}.`)
        setTimeout(() => setCopied(false), 3000)
    }

    return (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-3 gap-3">
            {/* X / Twitter */}
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer"
               className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground hover:bg-black hover:text-white transition-all shadow-sm">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>

            {/* LinkedIn */}
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer"
               className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground hover:bg-[#0077b5] hover:text-white transition-all shadow-sm">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>

            {/* Facebook */}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer"
               className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground hover:bg-[#1877f2] hover:text-white transition-all shadow-sm">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>

            {/* WhatsApp */}
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - Leia mais em: ${currentUrl}`)}`} target="_blank" rel="noopener noreferrer"
               className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground hover:bg-[#25D366] hover:text-white transition-all shadow-sm">
                <MessageCircle className="h-5 w-5" />
            </a>

            {/* Email */}
            <a href={`mailto:?subject=${encodeURIComponent(`Artigo: ${title}`)}&body=${encodeURIComponent(`Achei que você ia gostar deste artigo: ${currentUrl}`)}`}
               className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground hover:bg-destructive hover:text-white transition-all shadow-sm">
                <Mail className="h-5 w-5" />
            </a>

            {/* Instagram (Copy Link) */}
            <button onClick={() => handleCopyLink('Instagram')}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all shadow-sm">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </button>

            {/* YouTube (Copy Link) */}
            <button onClick={() => handleCopyLink('YouTube')}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground hover:bg-[#FF0000] hover:text-white transition-all shadow-sm">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </button>

            {/* Copiar Link Geral */}
            <button onClick={() => handleCopyLink()}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
        </div>
    )
}