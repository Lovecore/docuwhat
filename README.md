# DocuWhat - Documentation Repository

A clean, elegant, and enterprise-worthy documentation repository built with Next.js, MDX, and ShadCN UI.

## Features

- **File-Based Content**: Markdown files serve as the source of truth
- **MDX Support**: Rich content with React components in Markdown
- **Built-in Search**: CMD+K command palette for instant search
- **Dark Mode**: Toggle between light and dark themes
- **Video Support**: Embed video tutorials and demonstrations
- **Responsive Design**: Works seamlessly on all devices
- **Syntax Highlighting**: Beautiful code blocks with copy functionality
- **Auto-Navigation**: Automatically generated sidebar from file structure

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

## Project Structure

```
docuwhat/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   │   ├── ui/          # ShadCN UI components
│   │   ├── mdx/         # Custom MDX components
│   │   └── layout/      # Layout components
│   ├── lib/             # Utility functions
│   └── content/         # Your documentation content
│       ├── getting-started/
│       ├── frameworks/
│       └── resources/
└── public/
    └── videos/          # Video files
```

## Creating Content

1. Create an MDX file in `src/content/`:

```mdx
---
title: Your Page Title
description: Brief description
tags: ["tag1", "tag2"]
order: 1
---

# Your Content Here

Write your documentation using Markdown and MDX components.
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

## MDX Components

Use these custom components in your MDX files:

- `<VideoPlayer>` - Embed videos
- `<CodeBlock>` - Syntax-highlighted code
- `<Callout>` - Info/warning/success boxes
- `<FileTree>` - Visual file structure

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library
- **MDX** - Markdown with JSX
- **Fuse.js** - Fuzzy search

## License

MIT