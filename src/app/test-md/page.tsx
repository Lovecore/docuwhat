import { parseMarkdown } from "@/lib/markdown";

export default function TestPage() {
  const testMarkdown = `
## Test Heading

This is a test paragraph.

### Code Block Test

\`\`\`bash
echo "Hello World"
\`\`\`

- List item 1
- List item 2
  `;

  const html = parseMarkdown(testMarkdown);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl mb-4">Markdown Test Page</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl mb-2">Raw Markdown:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {testMarkdown}
          </pre>
        </div>
        
        <div>
          <h2 className="text-xl mb-2">Rendered HTML:</h2>
          <div 
            className="prose prose-neutral dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl mb-2">Raw HTML Output:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {html}
        </pre>
      </div>
    </div>
  );
}