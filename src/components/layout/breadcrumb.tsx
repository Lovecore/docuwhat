import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  slug: string[];
}

export function Breadcrumb({ slug }: BreadcrumbProps) {
  const breadcrumbItems = slug.map((segment, index) => {
    const href = "/" + slug.slice(0, index + 1).join("/");
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return { href, label };
  });

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      {breadcrumbItems.map((item, index) => (
        <span key={item.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}