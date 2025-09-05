import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { MDXComponents } from '@/components/mdx'

interface MDXPageProps {
  slug: string[]
}

export default async function MDXPage({ slug }: MDXPageProps) {
  // Build the import path
  const importPath = slug.join('/')
  
  let MDXContent: any
  
  try {
    // Dynamically import the MDX file
    MDXContent = dynamic(() => import(`@/content/${importPath}.mdx`), {
      loading: () => <div>Loading...</div>,
    })
  } catch (error) {
    console.error(`Failed to load MDX file: ${importPath}`, error)
    notFound()
  }

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <MDXContent components={MDXComponents} />
    </article>
  )
}