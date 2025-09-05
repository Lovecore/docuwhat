#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

function getDirectories(srcPath) {
  const items = [];
  
  function scanDir(dir, prefix = '') {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory() && !file.name.startsWith('_') && !file.name.startsWith('.')) {
        const fullPath = path.join(prefix, file.name);
        items.push(fullPath);
        scanDir(path.join(dir, file.name), fullPath);
      }
    });
  }
  
  scanDir(srcPath);
  return items;
}

async function selectDirectory() {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const directories = getDirectories(contentDir);
  
  console.log('\n📁 Select a directory or create a new one:\n');
  console.log('  0) 📄 Root (src/content/)');
  
  directories.forEach((dir, index) => {
    const indent = '  '.repeat(dir.split(path.sep).length);
    console.log(`  ${index + 1}) ${indent}📁 ${dir}/`);
  });
  
  console.log(`  ${directories.length + 1}) ✨ Create new directory`);
  console.log('');
  
  const choice = await question('Select option (number): ');
  const choiceNum = parseInt(choice, 10);
  
  if (isNaN(choiceNum) || choiceNum < 0 || choiceNum > directories.length + 1) {
    console.log('❌ Invalid selection');
    process.exit(1);
  }
  
  if (choiceNum === 0) {
    return '';
  } else if (choiceNum === directories.length + 1) {
    // Create new directory
    const newDir = await question('Enter new directory path (e.g., guides/advanced): ');
    if (!newDir) {
      console.log('❌ Directory path is required');
      process.exit(1);
    }
    return newDir;
  } else {
    return directories[choiceNum - 1];
  }
}

async function createDocument() {
  console.log('\n📝 DocuWhat Document Creator\n');
  console.log('This tool will help you create a new documentation file with frontmatter.');

  // Select or create directory
  const directory = await selectDirectory();
  
  // Get filename
  const filename = await question('\nEnter filename (without extension): ');
  if (!filename) {
    console.log('❌ Filename is required');
    process.exit(1);
  }

  // Build the full path
  const relativePath = directory ? path.join(directory, filename) : filename;

  // Get title
  const defaultTitle = filename.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  const titlePrompt = `\nTitle (default: "${defaultTitle}"): `;
  const titleInput = await question(titlePrompt);
  const title = titleInput || defaultTitle;

  // Get description
  const description = await question('Description (optional): ');

  // Get tags
  const tagsInput = await question('Tags (comma-separated, optional): ');
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];

  // Get order
  const orderInput = await question('Order number (optional, for navigation sorting): ');
  const order = orderInput ? parseInt(orderInput, 10) : undefined;

  // Get video
  const video = await question('Video path (optional, e.g., /videos/demo.mp4): ');

  // Get icon
  const icon = await question('Icon emoji (optional, e.g., 📚): ');

  // Build frontmatter
  const frontmatter = {
    title,
    ...(description && { description }),
    ...(tags.length > 0 && { tags }),
    ...(order !== undefined && !isNaN(order) && { order }),
    ...(video && { video }),
    ...(icon && { icon }),
    updated: new Date().toISOString().split('T')[0]
  };

  // Create the markdown content
  const content = `---
${Object.entries(frontmatter).map(([key, value]) => {
  if (Array.isArray(value)) {
    return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
  } else if (typeof value === 'string' && (value.includes(':') || value.includes('"'))) {
    return `${key}: "${value.replace(/"/g, '\\"')}"`;
  } else if (typeof value === 'string') {
    return `${key}: ${value}`;
  } else {
    return `${key}: ${value}`;
  }
}).join('\n')}
---

# ${title}

${description ? `${description}\n\n` : ''}## Overview

Start writing your documentation here...

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Getting Started

1. First step
2. Second step
3. Third step

## Example

\`\`\`javascript
// Add your code examples here
console.log('Hello from DocuWhat!');
\`\`\`

## Additional Resources

- [Link to related documentation](/path/to/doc)
- [External resource](https://example.com)
`;

  // Determine the full file path
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const filePath = path.join(contentDir, relativePath.endsWith('.md') || relativePath.endsWith('.mdx') 
    ? relativePath 
    : `${relativePath}.md`);
  
  const fileDir = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
    console.log(`\n📁 Created directory: ${path.relative(process.cwd(), fileDir)}`);
  }

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    const overwrite = await question(`\n⚠️  File already exists. Overwrite? (y/N): `);
    if (overwrite.toLowerCase() !== 'y') {
      console.log('❌ Cancelled');
      process.exit(0);
    }
  }

  // Write the file
  fs.writeFileSync(filePath, content);
  console.log(`\n✅ Created: ${path.relative(process.cwd(), filePath)}`);
  console.log(`🌐 URL: http://localhost:3000/${relativePath.replace(/\.(md|mdx)$/, '')}`);

  // Ask if user wants to create a _meta.json for new directories
  if (directory && !fs.existsSync(path.join(fileDir, '_meta.json'))) {
    const createMeta = await question('\n📋 Create _meta.json for this directory? (y/N): ');
    if (createMeta.toLowerCase() === 'y') {
      const metaTitle = await question('Category title: ');
      const metaDescription = await question('Category description (optional): ');
      const metaIcon = await question('Category icon (optional): ');
      const metaOrder = await question('Category order (optional): ');
      
      const metaContent = {
        title: metaTitle || directory.split(path.sep).pop(),
        ...(metaDescription && { description: metaDescription }),
        ...(metaIcon && { icon: metaIcon }),
        ...(metaOrder && { order: parseInt(metaOrder, 10) })
      };
      
      const metaPath = path.join(fileDir, '_meta.json');
      fs.writeFileSync(metaPath, JSON.stringify(metaContent, null, 2));
      console.log(`\n✅ Created: ${path.relative(process.cwd(), metaPath)}`);
    }
  }

  rl.close();
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

// Run the script
createDocument().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});