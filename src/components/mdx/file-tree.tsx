"use client";

import { File, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileTreeNode {
  name: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
}

interface FileTreeProps {
  data: FileTreeNode[];
}

function TreeNode({ node, depth = 0 }: { node: FileTreeNode; depth?: number }) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  const toggleExpanded = () => {
    if (node.type === "folder") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer",
          depth > 0 && "ml-4"
        )}
        onClick={toggleExpanded}
      >
        {node.type === "folder" ? (
          isExpanded ? (
            <FolderOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          ) : (
            <Folder className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          )
        ) : (
          <File className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-sm font-mono">{node.name}</span>
      </div>
      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <TreeNode key={`${child.name}-${index}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ data }: FileTreeProps) {
  return (
    <div className="my-6 rounded-lg border bg-muted/30 p-4">
      <div className="font-mono text-sm">
        {data.map((node, index) => (
          <TreeNode key={`${node.name}-${index}`} node={node} />
        ))}
      </div>
    </div>
  );
}