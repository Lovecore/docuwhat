# DocuWhat Frontmatter Helper

## Quick Start

Create new documentation files with proper frontmatter using our helper script:

```bash
npm run new-doc
# or
npm run create
```

## What It Does

The script will prompt you for:

1. **File path** (required) - Where to save the file (e.g., `guides/my-guide`)
2. **Title** (required) - The page title
3. **Description** (optional) - Brief summary for search/preview
4. **Tags** (optional) - Comma-separated tags for categorization
5. **Order** (optional) - Number for navigation sorting
6. **Video** (optional) - Path to featured video
7. **Icon** (optional) - Emoji for navigation

## Example Session

```bash
$ npm run new-doc

📝 DocuWhat Document Creator

This tool will help you create a new documentation file with frontmatter.

Enter file path (e.g., guides/my-guide): tutorials/getting-started
Title (required): Getting Started with DocuWhat
Description (optional): Learn how to set up and use DocuWhat
Tags (comma-separated, optional): tutorial, beginner, setup
Order number (optional, for navigation sorting): 1
Video path (optional, e.g., /videos/demo.mp4): /videos/intro.mp4
Icon emoji (optional, e.g., 📚): 🚀

✅ Created: src/content/tutorials/getting-started.md
🌐 URL: http://localhost:3000/tutorials/getting-started
```

## Generated Frontmatter Format

The script generates clean, properly formatted frontmatter:

```yaml
---
title: Getting Started with DocuWhat
description: Learn how to set up and use DocuWhat
tags: ["tutorial", "beginner", "setup"]
order: 1
video: /videos/intro.mp4
icon: 🚀
updated: 2024-01-15
---
```

## Manual Frontmatter Reference

If you prefer to create files manually, here's the complete frontmatter structure:

```yaml
---
title: "Page Title"           # Required: Shows in navigation
description: "Brief summary"   # Optional: For search & previews  
tags: ["tag1", "tag2"]        # Optional: Improves searchability
order: 1                      # Optional: Navigation sort order
video: "/videos/intro.mp4"    # Optional: Featured video
updated: "2024-01-15"         # Optional: Last update date
icon: "🚀"                    # Optional: Icon for navigation
---
```

## Tips

- The script automatically creates directories if they don't exist
- Files are created with `.md` extension by default
- The script includes a basic template with sections for Overview, Key Features, Getting Started, and Examples
- You can run the script from anywhere in the project directory
- The `updated` field is automatically set to today's date

## Video Support

To embed videos in your markdown, use the standard image syntax:

```markdown
![Video description](/videos/my-video.mp4)
```

The system automatically detects video files (`.mp4`, `.webm`, `.ogg`) and renders them as video players.