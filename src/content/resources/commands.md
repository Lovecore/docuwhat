---
title: Commands
description: How to save time with commands
tags: ["commands"]
updated: 2025-09-05
---

## Overview

Claude Code slash commands are powerful instructions that control behavior, automate workflows, and can integrate specialized sub-agents. They transform repetitive tasks into single commands, enabling developers to work more efficiently by combining multiple operations, shell commands, and AI capabilities into streamlined workflows.

## Key Features

- **Built-in System Commands**: Pre-configured commands for common development tasks
- **Custom Command Creation**: Project-specific and personal command libraries
- **Sub-Agent Integration**: Leverage specialized AI agents for complex tasks
- **Workflow Automation**: Chain multiple operations into single commands
- **Dynamic Arguments**: Pass parameters to customize command behavior
- **MCP Server Integration**: Connect to external tools and services

## Built-in Commands

### Essential System Commands

- `/agents` - Manage custom AI subagents for specialized tasks like security audits, refactoring, and QA
- `/clear` - Clear conversation history to start fresh
- `/review` - Request comprehensive code review
- `/init` - Initialize project with CLAUDE.md configuration guide
- `/mcp` - Manage Model Context Protocol server connections
- `/help` - Display available commands and usage information

## Custom Commands

### Creating Project Commands

At their core, commands are just `markdown` files that contain a set of instructions. You can use this to call installed system tools, aliases, sub agents and more.

```bash
# Create project-specific command directory
mkdir -p .claude/commands

# Create a deployment command
echo "Run all deployment checks and deploy to production" > .claude/commands/deploy.md

# Create a test suite command
cat > .claude/commands/test-all.md << 'EOF'
Run the following test suite:
1. Unit tests with coverage report
2. Integration tests
3. E2E tests
4. Performance benchmarks
Generate a summary report of all test results
EOF
```

### Creating Personal Commands

```bash
# Create personal command directory
mkdir -p ~/.claude/commands

# Create a git workflow command
cat > ~/.claude/commands/git-flow.md << 'EOF'
---
thinking: ultra think
---
Execute my standard git workflow:
1. Check current branch status
2. Run linters and formatters
3. Stage all changes
4. Create commit with conventional commit format
5. Push to remote with upstream tracking
EOF
```

## Advanced Command Patterns

### Multi-Agent Workflows

```markdown
# .claude/commands/feature-complete.md
---
thinking: ultra think
---
Complete feature implementation workflow:
1. Use qa-agent to write comprehensive tests
2. Use refactor-agent to optimize code structure
3. Use security-audit-agent to check for vulnerabilities
4. Use pr-agent to create pull request with detailed description
```

### Shell Command Sequences

```markdown
# .claude/commands/build-deploy.md
Execute build and deployment pipeline:

npm run lint && \
npm run test && \
npm run build && \
npm run deploy:staging && \
npm run e2e:staging && \
npm run deploy:production

Provide status updates after each step
```

### Dynamic Argument Usage

```markdown
# .claude/commands/scaffold.md
Scaffold a new $1 component named $2 with the following:
- Component file at src/components/$1/$2.tsx
- Test file at src/components/$1/$2.test.tsx
- Story file at src/components/$1/$2.stories.tsx
- Index export at src/components/$1/index.ts

Use existing component patterns from the codebase
```

Usage: `/scaffold ui Button`

## Workflow Examples

### Complete Feature Development

```markdown
# .claude/commands/feature.md
Implement complete feature: $ARGUMENTS
1. Create feature branch
2. Scaffold component structure
3. Implement business logic
4. Write comprehensive tests
5. Add documentation
6. Run all quality checks
7. Create pull request
```

### Advanced Git Operations

```markdown
# .claude/commands/git-rebase.md
Perform interactive rebase workflow:
1. Fetch latest from main
2. Start interactive rebase
3. Squash related commits
4. Update commit messages to conventional format
5. Force push with lease
6. Update PR description
```

### Database Migration Workflow

```markdown
# .claude/commands/migrate.md
Execute database migration:
1. Generate migration from schema changes
2. Review migration SQL
3. Run migration in test environment
4. Execute integration tests
5. Apply to production with backup
6. Verify data integrity
```

## Best Practices

### Command Organization

- **Naming Convention**: Use descriptive, action-oriented names (`deploy-staging`, `fix-lint`, `generate-docs`)
- **Namespacing**: Group related commands with prefixes (`db-migrate`, `db-seed`, `db-backup`)
- **Documentation**: Include clear descriptions in command files
- **Version Control**: Commit project commands to share with team

### Performance Optimization

- **Batch Operations**: Combine related tasks in single commands
- **Parallel Execution**: Use background processes for independent tasks
- **Caching**: Leverage command results across sessions
- **Selective Agents**: Choose appropriate sub-agents for specific tasks

### Security Considerations

- **Credential Management**: Never hardcode secrets in commands
- **Permission Scoping**: Limit command access appropriately
- **Audit Logging**: Track command execution for compliance
- **Input Validation**: Sanitize dynamic arguments

## Integration with Sub-Agents

### Available Specialized Agents

- **qa-agent**: Automated test generation and coverage analysis
- **refactor-agent**: Code structure optimization and cleanup
- **security-audit-agent**: Vulnerability scanning and remediation
- **pr-agent**: Pull request creation and management
- **docs-architect**: Technical documentation generation
- **merge-conflict-agent**: Conflict resolution guidance
- **repo-analysis-agent**: Architecture review and performance analysis

### Agent Coordination Example

```markdown
# .claude/commands/release.md
Coordinate release process:
1. repo-analysis-agent: Verify production readiness
2. qa-agent: Run full test suite
3. security-audit-agent: Final security scan
4. docs-architect: Update release documentation
5. pr-agent: Create release PR with changelog
```

## Troubleshooting

### Common Issues

- **Command Not Found**: Ensure correct directory structure (`.claude/commands/`)
- **Permission Errors**: Check file permissions and execution rights
- **Argument Parsing**: Use proper variable syntax (`$1`, `$2`, `$ARGUMENTS`)
- **Agent Conflicts**: Avoid overlapping agent responsibilities

## Additional Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Slash Commands Reference](https://docs.anthropic.com/en/docs/claude-code/slash-commands)
- [Creating Custom Commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands#creating-custom-commands)
- [Model Context Protocol](https://docs.anthropic.com/en/docs/claude-code/mcp)
