"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { FileText, Hash, Search as SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ContentItem } from "@/lib/types";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [searchResults, setSearchResults] = useState<ContentItem[]>([]);

  // Fetch content once when component mounts
  useEffect(() => {
    fetch("/api/search")
      .then((res) => res.json())
      .then((data) => {
        console.log("Content loaded:", data.length, "items");
        setContent(data);
      })
      .catch((err) => {
        console.error("Failed to load content:", err);
        setContent([]);
      });
  }, []);

  // Update search results when search or content changes
  useEffect(() => {
    console.log("Search effect - search:", search, "content length:", content.length);
    
    if (!search) {
      // Show first 5 items when no search
      setSearchResults(content.slice(0, 5));
      return;
    }

    if (content.length === 0) {
      setSearchResults([]);
      return;
    }

    const fuse = new Fuse(content, {
      keys: [
        { name: "meta.title", weight: 2 },
        { name: "meta.description", weight: 1.5 },
        { name: "meta.tags", weight: 1 },
        { name: "content", weight: 0.5 },
      ],
      threshold: 0.3,
    });

    const results = fuse.search(search);
    console.log("Fuse search results for '" + search + "':", results.length);
    setSearchResults(results.slice(0, 10).map((r) => r.item));
  }, [search, content]);

  const handleSelect = (item: ContentItem) => {
    router.push(`/${item.slug.join("/")}`);
    onOpenChange(false);
    setSearch("");
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search documentation..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {console.log("Rendering - searchResults:", searchResults, "search:", search)}
        {searchResults.length === 0 && search && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        
        {searchResults.length > 0 ? (
          <CommandGroup heading="Search Results">
            {searchResults.map((item) => (
              <CommandItem
                key={item.slug.join("/")}
                value={item.meta.title}
                onSelect={() => handleSelect(item)}
              >
                <FileText className="mr-2 h-4 w-4" />
                <div className="flex-1">
                  <div className="font-medium">{item.meta.title}</div>
                  {item.meta.description && (
                    <div className="text-sm text-muted-foreground">
                      {item.meta.description}
                    </div>
                  )}
                </div>
                {item.meta.tags && item.meta.tags.length > 0 && (
                  <div className="ml-2 flex gap-1">
                    {item.meta.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs"
                      >
                        <Hash className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : (
          !search && (
            <CommandGroup heading="Recent Documents">
              <CommandEmpty>Loading...</CommandEmpty>
            </CommandGroup>
          )
        )}
      </CommandList>
    </CommandDialog>
  );
}