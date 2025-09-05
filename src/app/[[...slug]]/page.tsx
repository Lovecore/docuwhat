import { notFound } from "next/navigation";
import { getContentBySlug, getAllContent } from "@/lib/content";
import { parseMarkdown } from "@/lib/markdown";
import { Sidebar } from "@/components/layout/sidebar";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TableOfContents } from "@/components/content/table-of-contents";
import { HomePage } from "@/components/home-page";

interface PageProps {
  params: {
    slug?: string[];
  };
}

export async function generateStaticParams() {
  const content = getAllContent();
  return content.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  // Home page
  if (!params.slug || params.slug.length === 0) {
    return <HomePage />;
  }

  const content = getContentBySlug(params.slug);

  if (!content) {
    notFound();
  }

  // Parse markdown to HTML
  const htmlContent = parseMarkdown(content.content);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 lg:pl-64">
        <div className="container max-w-4xl py-6 lg:py-10">
          <Breadcrumb slug={params.slug} />
          
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h1 className="mb-4 text-4xl font-bold">{content.meta.title}</h1>
            
            {content.meta.description && (
              <p className="text-xl text-muted-foreground mb-8">
                {content.meta.description}
              </p>
            )}

            {content.meta.video && (
              <div className="mb-8">
                <video
                  className="w-full rounded-lg"
                  controls
                  src={content.meta.video}
                />
              </div>
            )}

            <div className="flex gap-8">
              <div 
                className="flex-1 prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              
              <aside className="hidden xl:block w-64">
                <div className="sticky top-24">
                  <TableOfContents content={content.content} />
                </div>
              </aside>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}