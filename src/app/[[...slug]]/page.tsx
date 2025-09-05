import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getContentBySlug, getAllContent } from "@/lib/content";
import { Sidebar } from "@/components/layout/sidebar";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TableOfContents } from "@/components/content/table-of-contents";
import { MDXComponents } from "@/components/mdx";
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

export default function Page({ params }: PageProps) {
  // Home page
  if (!params.slug || params.slug.length === 0) {
    return <HomePage />;
  }

  const content = getContentBySlug(params.slug);

  if (!content) {
    notFound();
  }

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
              <div className="flex-1">
                <MDXRemote 
                  source={content.content} 
                  components={MDXComponents}
                />
              </div>
              
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