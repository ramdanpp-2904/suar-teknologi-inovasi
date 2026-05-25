import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllSlugs } from '@/lib/posts'
import Footer from '@/components/Footer'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.meta.title} | Suar Teknologi Inovasi`,
    description: post.meta.excerpt,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { meta, content } = post

  return (
    <main>
      <section className="post-hero">
        <div className="post-hero-inner">
          <Link href="/blog" className="post-back">← Kembali ke Blog</Link>
          {meta.tags.length > 0 && (
            <div className="post-tags">
              {meta.tags.map(tag => <span key={tag} className="post-tag">{tag}</span>)}
            </div>
          )}
          <h1 className="post-title">{meta.title}</h1>
          <div className="post-meta">
            <span>✍️ {meta.author}</span>
            <span>📅 {new Date(meta.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>⏱ {meta.readingTime}</span>
          </div>
        </div>
      </section>

      {meta.coverImage && (
        <div className="post-cover container">
          <Image src={meta.coverImage} alt={meta.title} width={760} height={360} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
      )}

      <div className="post-body-wrap">
        <article className="prose">
          <MDXRemote source={content} />
        </article>
      </div>

      <Footer />
    </main>
  )
}
