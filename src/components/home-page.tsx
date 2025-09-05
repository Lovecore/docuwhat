import Link from "next/link";
import { Book, Code, FileText, PlayCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/sidebar";

const features = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Rich Documentation",
    description: "Write documentation in Markdown with MDX components for interactive content",
  },
  {
    icon: <PlayCircle className="h-8 w-8" />,
    title: "Video Resources",
    description: "Embed video tutorials and demonstrations directly in your documentation",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Code Examples",
    description: "Syntax-highlighted code blocks with copy functionality",
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Organized Content",
    description: "Hierarchical structure with categories, tags, and search",
  },
];

export function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 lg:pl-64">
        <div className="container max-w-6xl py-12 lg:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
              Welcome to DocuWhat
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A clean and elegant documentation repository for frameworks, tutorials, and resources.
              Built with simplicity and usability in mind.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/getting-started">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/resources">Browse Resources</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2 text-primary">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 border-t pt-16">
            <h2 className="text-2xl font-bold mb-8">Quick Links</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Getting Started</CardTitle>
                  <CardDescription>
                    Learn the basics and get up and running quickly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/getting-started">Read More →</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Frameworks</CardTitle>
                  <CardDescription>
                    Explore documentation for popular frameworks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/frameworks">Browse Frameworks →</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Video Tutorials</CardTitle>
                  <CardDescription>
                    Watch video guides and demonstrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/resources">Watch Videos →</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}