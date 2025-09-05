import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export interface ContentItem {
  slug: string[]
  frontmatter: {
    title: string
    description?: string
    tags?: string[]
    order?: number
    video?: string
    updated?: string
    icon?: string
  }
  content: string
  compiledContent?: any
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content')

export async function getContent(slug: string[]): Promise<ContentItem | null> {
  const filePath = path.join(CONTENT_DIR, ...slug) + '.mdx'
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    frontmatter: data as ContentItem['frontmatter'],
    content,
  }
}

export async function getAllContent(): Promise<ContentItem[]> {
  const items: ContentItem[] = []

  function readDir(dirPath: string, slugPrefix: string[] = []) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true })

    files.forEach(file => {
      if (file.isDirectory() && !file.name.startsWith('_')) {
        readDir(
          path.join(dirPath, file.name),
          [...slugPrefix, file.name]
        )
      } else if (file.name.endsWith('.mdx')) {
        const slug = [...slugPrefix, file.name.replace('.mdx', '')]
        const filePath = path.join(dirPath, file.name)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(fileContent)

        items.push({
          slug,
          frontmatter: data as ContentItem['frontmatter'],
          content,
        })
      }
    })
  }

  readDir(CONTENT_DIR)
  return items
}