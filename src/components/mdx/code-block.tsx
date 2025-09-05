"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  children: string;
  className?: string;
  [key: string]: any;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const language = className?.replace(/language-/, "") || "text";
  const code = typeof children === "string" ? children : String(children);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 px-2"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="bg-muted rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
      {language !== "text" && (
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {language}
        </div>
      )}
    </div>
  );
}