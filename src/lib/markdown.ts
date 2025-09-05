import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// Configure marked with syntax highlighting
marked.use(
  markedHighlight({
    langPrefix: 'language-',
    highlight(code, lang) {
      // Default to 'bash' for code blocks without language specified
      if (!lang || lang === '') {
        lang = 'bash';
      }
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

// Custom renderer for video support
const renderer = new marked.Renderer();

// Override image rendering to support video
const originalImage = renderer.image.bind(renderer);
renderer.image = function(href: string | null | undefined, title: string | null, text: string) {
  // Convert href to string and check if this is a video file
  const hrefStr = String(href || '');
  if (hrefStr && (hrefStr.endsWith('.mp4') || hrefStr.endsWith('.webm') || hrefStr.endsWith('.ogg'))) {
    return `
      <div class="video-container my-6">
        <video controls class="w-full rounded-lg shadow-lg">
          <source src="${hrefStr}" type="video/${hrefStr.split('.').pop()}">
          Your browser does not support the video tag.
        </video>
        ${text ? `<p class="text-sm text-muted-foreground mt-2 text-center">${text}</p>` : ''}
      </div>
    `;
  }
  // Regular image
  return originalImage(href, title, text);
};

// Configure marked options
marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
});

export function parseMarkdown(content: string): string {
  return marked(content);
}