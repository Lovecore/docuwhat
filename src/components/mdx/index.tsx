import { VideoPlayer } from "./video-player";
import { CodeBlock } from "./code-block";
import { Callout } from "./callout";
import { FileTree } from "./file-tree";

export const MDXComponents = {
  VideoPlayer,
  CodeBlock,
  Callout,
  FileTree,
  pre: CodeBlock,
  code: (props: any) => {
    if (props.className) {
      return <CodeBlock {...props} />;
    }
    return <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />;
  },
};