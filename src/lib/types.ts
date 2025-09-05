export interface ContentMeta {
  title: string;
  description?: string;
  tags?: string[];
  video?: string;
  order?: number;
  updated?: string;
  icon?: string;
}

export interface ContentItem {
  slug: string[];
  content: string;
  meta: ContentMeta;
}

export interface CategoryMeta {
  title: string;
  description?: string;
  order?: number;
  icon?: string;
}

export interface NavigationItem {
  title: string;
  href: string;
  items?: NavigationItem[];
  meta?: ContentMeta | CategoryMeta;
}