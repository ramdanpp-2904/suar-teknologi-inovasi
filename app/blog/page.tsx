import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog | Suar Teknologi Inovasi',
  description: 'Tips teknologi, insight bisnis digital, dan tutorial pengembangan aplikasi untuk UMKM dan pelaku usaha.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main>
      <section className="blog-hero">
        <div className="container">
          <h1>Blog & Insight</h1>
          <p>Tips teknologi, insight bisnis digital, dan tutorial untuk UMKM dan pelaku usaha.</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <h3>Belum ada artikel</h3>
              <p>Artikel pertama segera hadir. Stay tuned!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-cover">
                    {post.coverImage ? (
                      <Image src={post.coverImage} alt={post.title} width={400} height={200} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    ) : (
                      <span className="blog-card-cover-placeholder">✍️</span>
                    )}
                  </div>
                  <div className="blog-card-body">
                    {post.tags.length > 0 && (
                      <div className="blog-card-tags">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="blog-card-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="blog-card-title">{post.title}</div>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="blog-read-time">⏱ {post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
