"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, FileText, Home, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CommandMenu } from "@/components/layout/command-menu";
import { useState, useEffect } from "react";
import { NavigationItem } from "@/lib/types";
import { getNavigationStructure } from "@/lib/content";

export function Sidebar() {
  const pathname = usePathname();
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would be passed as props or fetched once
    // For now, we'll use a client-side fetch
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => setNavigation(data))
      .catch(() => setNavigation([]));
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const NavItem = ({ item, depth = 0 }: { item: NavigationItem; depth?: number }) => {
    const isActive = pathname === item.href;
    const hasChildren = item.items && item.items.length > 0;
    const [isExpanded, setIsExpanded] = useState(pathname.startsWith(item.href));

    return (
      <div className={cn(depth > 0 && "ml-4")}>
        <div className="flex items-center">
          {hasChildren && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 mr-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  !isExpanded && "-rotate-90"
                )}
              />
            </Button>
          )}
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent flex-1",
              isActive && "bg-accent font-medium",
              !hasChildren && depth === 0 && "ml-7"
            )}
          >
            <FileText className="h-4 w-4" />
            {item.title}
          </Link>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.items!.map((child) => (
              <NavItem key={child.href} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background lg:flex">
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6" />
            <span>DocuWhat</span>
          </Link>
          <ThemeToggle />
        </div>
        
        <div className="flex items-center gap-2 border-b px-4 py-2">
          <Button
            variant="outline"
            className="w-full justify-start text-sm text-muted-foreground"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </ScrollArea>
      </aside>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}