# DocuWhat - Documentation Repository

A clean, elegant, and enterprise-ready documentation platform built with Next.js 14, MDX, TypeScript, and ShadCN UI. DocuWhat transforms your markdown files into a beautiful, searchable, and interactive documentation website with zero configuration.

## ✨ Features

### Core Features
- **📁 File-Based Content**: Markdown/MDX files serve as the source of truth
- **⚡ Zero Configuration**: Works out of the box with sensible defaults
- **🔍 Intelligent Search**: CMD+K command palette with fuzzy search
- **🌙 Dark Mode**: Beautiful light/dark theme toggle
- **📱 Responsive Design**: Mobile-first, works on all devices
- **🎯 Auto-Navigation**: Sidebar automatically generated from file structure
- **📖 Table of Contents**: Auto-generated "On this page" navigation

### Content Features
- **🎬 Video Support**: Embed videos directly in frontmatter or content
- **🖼️ Image Support**: Full image embedding with optimized loading
- **🎨 MDX Components**: Rich interactive components in your markdown
- **🔤 Syntax Highlighting**: Beautiful code blocks with copy functionality
- **📋 Custom Components**: Callouts, file trees, video players, and more
- **🏷️ Frontmatter Support**: Rich metadata with tags, descriptions, ordering

### Developer Experience
- **⚡ TypeScript**: Full type safety throughout the application
- **🎨 Tailwind CSS**: Utility-first styling with dark mode support
- **🧩 ShadCN UI**: Modern, accessible component library
- **🔄 Hot Reload**: Instant updates during development
- **📊 SEO Optimized**: Built-in meta tags and structured data

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

> **Note**: If port 3000 is in use, Next.js will automatically use the next available port (e.g., 3001)

## Project Structure

```
docuwhat/
├── src/
│   ├── app/              # Next.js 14 app router
│   │   ├── [[...slug]]/  # Dynamic routing for content
│   │   ├── globals.css   # Global styles
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── ui/          # ShadCN UI components
│   │   ├── mdx/         # Custom MDX components
│   │   ├── layout/      # Layout components (sidebar, breadcrumb)
│   │   └── content/     # Content-specific components (TOC)
│   ├── lib/             # Utility functions
│   │   ├── content.ts   # Content parsing and management
│   │   ├── search.ts    # Search functionality
│   │   └── utils.ts     # General utilities
│   └── content/         # Your documentation content
│       ├── getting-started/
│       │   ├── _meta.json
│       │   └── *.md
│       ├── frameworks/
│       └── resources/
├── public/
│   ├── videos/          # Video files (.mp4, .webm, etc.)
│   └── images/          # Image files (.png, .jpg, .svg, etc.)
├── scripts/
│   └── build-content.js # Content processing scripts
└── Configuration files
    ├── next.config.mjs   # Next.js configuration
    ├── tailwind.config.ts # Tailwind CSS configuration
    └── tsconfig.json     # TypeScript configuration
```

## Creating Content

1. Create an MDX file in `src/content/`:

```mdx
---
title: Your Page Title
description: Brief description
tags: ["tag1", "tag2"]
order: 1
video: /videos/my-video.mp4  # Optional: Add video to page
---

# Your Content Here

Write your documentation using Markdown and MDX components.

![Alt text](/images/my-image.png)
```

2. Organize with folders for categories
3. Add `_meta.json` for category metadata:

```json
{
  "title": "Category Name",
  "description": "Category description",
  "order": 1
}
```

### Adding Media Files

#### Videos
Place video files in `public/videos/` directory:

**Method 1: Frontmatter (Automatic embedding)**
```mdx
---
title: My Tutorial
video: /videos/tutorial.mp4
---
```

**Method 2: Direct linking**
```markdown
[Watch the tutorial](/videos/tutorial.mp4)
```

**Method 3: Using VideoPlayer component**
```mdx
<VideoPlayer src="/videos/tutorial.mp4" title="My Tutorial" />
```

#### Images
Place image files in `public/images/` directory:

```markdown
![Alt text](/images/screenshot.png)
```

**With sizing:**
```html
<img src="/images/diagram.png" alt="Architecture diagram" width="600" />
```

## 🧩 MDX Components

DocuWhat includes powerful custom components you can use in your MDX files:

### VideoPlayer
Embed videos with custom controls:
```mdx
<VideoPlayer 
  src="/videos/demo.mp4" 
  title="Feature Demo"
  poster="/images/video-thumb.png"
/>
```

### Callout
Create attention-grabbing callouts:
```mdx
<Callout type="info">
This is an informational callout.
</Callout>

<Callout type="warning">
⚠️ Be careful with this configuration!
</Callout>

<Callout type="success">
✅ Great job! You've completed the setup.
</Callout>
```

### FileTree
Display file structures visually:
```mdx
<FileTree>
- src/
  - components/
    - Button.tsx
    - Modal.tsx
  - pages/
    - index.tsx
- package.json
</FileTree>
```

### CodeBlock
Enhanced code blocks with copy functionality:
```mdx
<CodeBlock language="typescript" title="utils.ts">
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US');
};
</CodeBlock>
```

> **Note**: Regular markdown code blocks also work and automatically use the CodeBlock component.

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run type-check` | Run TypeScript type checking |

## 🎨 Customization

### Theme Colors
Customize your brand colors in `tailwind.config.ts`:
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### Custom Components
Add your own MDX components in `src/components/mdx/`:

1. Create your component:
```tsx
// src/components/mdx/my-component.tsx
export function MyComponent({ children }: { children: React.ReactNode }) {
  return <div className="my-custom-style">{children}</div>;
}
```

2. Export it in `src/components/mdx/index.tsx`:
```tsx
export { MyComponent } from './my-component';
```

3. Add to MDXComponents:
```tsx
const MDXComponents = {
  // ... existing components
  MyComponent,
};
```

## 📁 Content Organization

### Folder Structure
Organize content with nested folders:
```
src/content/
├── getting-started/
│   ├── _meta.json
│   ├── introduction.md
│   └── installation.md
├── guides/
│   ├── _meta.json
│   ├── basic-usage.md
│   └── advanced-features.md
└── api/
    ├── _meta.json
    └── reference.md
```

### Category Metadata
Control sidebar ordering and titles with `_meta.json`:
```json
{
  "title": "Getting Started",
  "description": "Learn the basics of DocuWhat",
  "order": 1,
  "collapsed": false
}
```

### Page Frontmatter
Rich metadata for individual pages:
```yaml
---
title: "Advanced Configuration"
description: "Deep dive into DocuWhat configuration options"
tags: ["config", "advanced", "customization"]
order: 5
video: "/videos/advanced-config.mp4"
author: "Your Name"
date: "2024-01-15"
---
```

## 📚 Advanced Usage

### Search Configuration
The search functionality uses Fuse.js for fuzzy matching. Customize search behavior:

```typescript
// Search includes:
// - Page titles and descriptions
// - Content text
// - Tags
// - File paths
```

### Custom Styling
Override component styles using Tailwind classes:

```mdx
<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg">
  Custom styled content
</div>
```

### Environment Variables
Configure your documentation site:

```env
# .env.local
NEXT_PUBLIC_SITE_NAME="My Documentation"
NEXT_PUBLIC_SITE_DESCRIPTION="Comprehensive documentation for my project"
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main
3. Custom domains and SSL included

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

**Search not working?**
- Check that your content has proper frontmatter
- Ensure files are in the `src/content` directory

**Styles not loading?**
- Run `npm run dev` to rebuild
- Check Tailwind CSS configuration

**MDX components not rendering?**
- Verify component is exported in `src/components/mdx/index.tsx`
- Check for TypeScript errors

## 📚 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|----------|
| **Next.js** | 14+ | React framework with app router |
| **TypeScript** | 5+ | Type safety and developer experience |
| **Tailwind CSS** | 3+ | Utility-first styling framework |
| **ShadCN UI** | Latest | Modern component library |
| **MDX** | 2+ | Markdown with JSX support |
| **Fuse.js** | 7+ | Fuzzy search functionality |
| **React** | 18+ | UI library |
| **Lucide React** | Latest | Icon library |

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the DocuWhat team**

