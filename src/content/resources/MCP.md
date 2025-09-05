---
title: What MCP Should We Use?
description: This is a quick document to outline what MCP servers offer great value.
tags: ["MCP"]
updated: 2025-09-03
---
## Overview

Here are some of the most useful MCP servers and what they offer.

## Key Features

- [Context 7](https://github.com/upstash/context7)
- [Serena](https://github.com/oraios/serena)
- [Archon](https://github.com/coleam00/Archon)

### Getting Started with Context 7

Context 7 MCP allows our AI coding assistant to pull updated documentation for libraries we are using or want to use.

Install the MCP Server

```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

Verify the MCP server

```bash
/mcp  (from inside Claude)
```
or
```bash
claude mcp list
```


### Getting Started with Serena

Serena MCP allows our AI coding assistant to be more optimal when searching though our codebase.

Install the MCP Server

```bash
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context ide-assistant --project $(pwd)
```

Verify the MCP server

```bash
/mcp  (from inside Claude)
```
or
```bash
claude mcp list
```

### Getting Started with Archon

Archon MCP is a full suite of functionality that helps bridge user tasks and knowledge with AI's integration into our codebase. Offering things such as documentation RAG, Task management, Project management and more. This MCP service requires more setup than a normal MCP server. The setup documentation can be found [here](https://github.com/coleam00/Archon?tab=readme-ov-file#quick-start).

Install the MCP Server

```bash
claude mcp add --transport http archon http://localhost:8051/mcp
```

Verify the MCP server

```bash
/mcp  (from inside Claude)
```
or
```bash
claude mcp list
```

## Additional Resources

- [Link to related documentation](/path/to/doc)
- [External resource](https://example.com)
