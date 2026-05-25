#!/usr/bin/env node
/**
 * AI Blog Post Generator — Suar Teknologi Inovasi
 *
 * Usage:
 *   node scripts/generate-post.js "Topik artikel Anda"
 *   node scripts/generate-post.js "Topik" --publish   (auto git commit & push)
 *   node scripts/generate-post.js "Topik" --lang en   (English)
 *
 * Requires:
 *   ANTHROPIC_API_KEY in environment or .env.local
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const POSTS_DIR = path.join(ROOT, 'content', 'blog')

// ─── Load env ────────────────────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8')
    .split('\n')
    .forEach(line => {
      const [key, ...val] = line.split('=')
      if (key && val.length) process.env[key.trim()] = val.join('=').trim()
    })
}

// ─── Args ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const topic = args.find(a => !a.startsWith('--'))
const shouldPublish = args.includes('--publish')
const lang = args.find(a => a.startsWith('--lang='))?.split('=')[1] ?? 'id'

if (!topic) {
  console.error('Usage: node scripts/generate-post.js "Topik artikel Anda" [--publish] [--lang=id|en]')
  process.exit(1)
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY is not set. Add it to .env.local or export it.')
  process.exit(1)
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── Helpers ─────────────────────────────────────────────────────────────────
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

// ─── Phase 1: Research ────────────────────────────────────────────────────────
async function research(topic) {
  console.log('\n🔍 Phase 1: Researching topic...')
  const res = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are a research assistant for a tech company blog targeting Indonesian SMBs (UMKM) and business owners.

Research the following blog topic and return a structured outline in JSON:
Topic: "${topic}"
Language: ${lang === 'en' ? 'English' : 'Indonesian (Bahasa Indonesia)'}

Return ONLY valid JSON (no markdown, no explanation) with this exact shape:
{
  "title": "SEO-optimized article title",
  "slug_hint": "kebab-case-hint-for-filename",
  "excerpt": "One sentence summary (max 160 chars)",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "key_points": ["point 1", "point 2", "point 3", "point 4", "point 5"],
  "target_audience": "brief description",
  "tone": "professional yet approachable",
  "image_prompt": "Detailed prompt for generating a blog cover image via AI image generator"
}`
    }]
  })

  const text = res.content[0].text.trim()
  try {
    return JSON.parse(text)
  } catch {
    // Try to extract JSON if model added markdown fences
    const match = text.match(/\{[\s\S]+\}/)
    if (match) return JSON.parse(match[0])
    throw new Error('Research phase did not return valid JSON')
  }
}

// ─── Phase 2: Write ───────────────────────────────────────────────────────────
async function writePost(topic, outline) {
  console.log('✍️  Phase 2: Writing article...')
  const isId = lang !== 'en'

  const res = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `You are a professional tech blogger writing for "Suar Teknologi Inovasi", a software company serving Indonesian SMBs.

Write a complete, high-quality blog post in ${isId ? 'Indonesian (Bahasa Indonesia)' : 'English'} about:
Topic: "${topic}"
Title: "${outline.title}"
Target audience: ${outline.target_audience}
Key points to cover: ${outline.key_points.join(', ')}
Tone: ${outline.tone}

Requirements:
- Write in MDX format (Markdown with no JSX components needed)
- Length: 600-900 words
- Use clear headings (## and ###)
- Include practical examples relevant to Indonesian businesses
- End with a call-to-action mentioning Suar Teknologi Inovasi and linking to https://wa.me/6282213792865
- Do NOT include frontmatter (we'll add it separately)
- Do NOT wrap in markdown code fences

Write ONLY the article body content.`
    }]
  })

  return res.content[0].text.trim()
}

// ─── Phase 3: Assemble MDX ────────────────────────────────────────────────────
function assembleMdx(outline, body) {
  const frontmatter = [
    '---',
    `title: "${outline.title}"`,
    `date: "${today()}"`,
    `excerpt: "${outline.excerpt}"`,
    `tags: [${outline.tags.map(t => `"${t}"`).join(', ')}]`,
    `author: "Tim Suar Teknologi"`,
    `coverImage: ""`,
    `image_prompt: "${outline.image_prompt}"`,
    '---',
  ].join('\n')

  return `${frontmatter}\n\n${body}\n`
}

// ─── Phase 4: Save ────────────────────────────────────────────────────────────
function savePost(outline, mdx) {
  console.log('💾 Phase 3: Saving post...')
  const slug = slugify(outline.slug_hint || outline.title)
  const filename = `${slug}.mdx`
  const filepath = path.join(POSTS_DIR, filename)

  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true })

  if (fs.existsSync(filepath)) {
    const ts = Date.now()
    const alt = path.join(POSTS_DIR, `${slug}-${ts}.mdx`)
    fs.writeFileSync(alt, mdx, 'utf-8')
    console.log(`⚠️  File existed, saved as: ${path.basename(alt)}`)
    return alt
  }

  fs.writeFileSync(filepath, mdx, 'utf-8')
  console.log(`✅ Saved: content/blog/${filename}`)
  return filepath
}

// ─── Phase 5: Publish (optional) ─────────────────────────────────────────────
function publish(filepath) {
  console.log('🚀 Phase 4: Publishing via git...')
  const rel = path.relative(ROOT, filepath).replace(/\\/g, '/')
  try {
    execSync(`git -C "${ROOT}" add "${rel}"`, { stdio: 'inherit' })
    execSync(`git -C "${ROOT}" commit -m "blog: add new post via AI pipeline"`, { stdio: 'inherit' })
    execSync(`git -C "${ROOT}" push`, { stdio: 'inherit' })
    console.log('✅ Published! Vercel will deploy automatically.')
  } catch (e) {
    console.error('❌ Git publish failed:', e.message)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🤖 AI Blog Generator — Suar Teknologi Inovasi`)
  console.log(`   Topic : ${topic}`)
  console.log(`   Lang  : ${lang}`)
  console.log(`   Publish: ${shouldPublish}\n`)

  try {
    const outline = await research(topic)
    console.log(`   Title : ${outline.title}`)
    console.log(`   Tags  : ${outline.tags.join(', ')}`)

    const body = await writePost(topic, outline)
    const mdx = assembleMdx(outline, body)
    const filepath = savePost(outline, mdx)

    console.log('\n📝 Image prompt for cover art:')
    console.log(`   ${outline.image_prompt}`)

    if (shouldPublish) {
      publish(filepath)
    } else {
      console.log('\n💡 Tip: Run with --publish to auto-commit and push to GitHub.')
    }

    console.log('\n✨ Done!\n')
  } catch (err) {
    console.error('\n❌ Error:', err.message)
    process.exit(1)
  }
}

main()
