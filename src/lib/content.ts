import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentItem, NavigationItem, CategoryMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export function getContentFiles(dir: string = CONTENT_DIR): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  const files: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getContentFiles(fullPath));
    } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getContentBySlug(slug: string[]): ContentItem | null {
  const filePath = path.join(CONTENT_DIR, ...slug) + ".mdx";
  const altFilePath = path.join(CONTENT_DIR, ...slug) + ".md";
  
  let fullPath: string | null = null;
  
  if (fs.existsSync(filePath)) {
    fullPath = filePath;
  } else if (fs.existsSync(altFilePath)) {
    fullPath = altFilePath;
  }
  
  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    meta: {
      title: data.title || slug[slug.length - 1],
      description: data.description,
      tags: data.tags,
      video: data.video,
      order: data.order,
      updated: data.updated,
      icon: data.icon,
    },
  };
}

export function getAllContent(): ContentItem[] {
  const files = getContentFiles();
  
  return files.map((file) => {
    const relativePath = path.relative(CONTENT_DIR, file);
    const slug = relativePath
      .replace(/\.(mdx|md)$/, "")
      .split(path.sep);
    
    const fileContents = fs.readFileSync(file, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      meta: {
        title: data.title || slug[slug.length - 1],
        description: data.description,
        tags: data.tags,
        video: data.video,
        order: data.order,
        updated: data.updated,
        icon: data.icon,
      },
    };
  });
}

export function getNavigationStructure(): NavigationItem[] {
  const buildNavigation = (dir: string, basePath: string[] = []): NavigationItem[] => {
    if (!fs.existsSync(dir)) {
      return [];
    }

    const items = fs.readdirSync(dir);
    const navigation: NavigationItem[] = [];

    // Look for _meta.json in this directory
    const metaPath = path.join(dir, "_meta.json");
    let categoryMeta: CategoryMeta | undefined;
    
    if (fs.existsSync(metaPath)) {
      const metaContent = fs.readFileSync(metaPath, "utf8");
      categoryMeta = JSON.parse(metaContent);
    }

    for (const item of items) {
      if (item === "_meta.json") continue;
      
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const subItems = buildNavigation(fullPath, [...basePath, item]);
        if (subItems.length > 0) {
          const dirMetaPath = path.join(fullPath, "_meta.json");
          let dirMeta: CategoryMeta = { title: item };
          
          if (fs.existsSync(dirMetaPath)) {
            const metaContent = fs.readFileSync(dirMetaPath, "utf8");
            dirMeta = JSON.parse(metaContent);
          }
          
          navigation.push({
            title: dirMeta.title,
            href: `/${[...basePath, item].join("/")}`,
            items: subItems,
            meta: dirMeta,
          });
        }
      } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
        const slug = item.replace(/\.(mdx|md)$/, "");
        const content = getContentBySlug([...basePath, slug]);
        
        if (content) {
          navigation.push({
            title: content.meta.title,
            href: `/${[...basePath, slug].join("/")}`,
            meta: content.meta,
          });
        }
      }
    }

    // Sort by order if specified
    navigation.sort((a, b) => {
      const orderA = a.meta?.order ?? 999;
      const orderB = b.meta?.order ?? 999;
      return orderA - orderB;
    });

    return navigation;
  };

  return buildNavigation(CONTENT_DIR);
}