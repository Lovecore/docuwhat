---
title: Agents
description: How to leverage Agents
tags: ["agents"]
order: 1
updated: 2025-09-06
---

## Overview

Claude Code sub-agents represent a paradigm shift in AI-assisted development. These specialized AI assistants operate with isolated contexts, custom tools, and focused expertise, enabling multi-agent orchestration for complex software development workflows. Unlike traditional single-context AI interactions, sub-agents allow parallel processing, specialized expertise, and context preservation across massive codebases.

Sub-agents transform Claude Code from a powerful coding assistant into a complete development orchestration platform, where multiple specialized AIs collaborate seamlessly while maintaining their individual contexts and expertise domains.

## Core Concepts

### Agent Architecture

Sub-agents operate as independent AI instances with:
- **Isolated Context Windows**: Each agent maintains its own conversation history and working memory
- **Custom System Prompts**: Tailored instructions defining agent behavior and expertise
- **Configurable Tool Access**: Granular permissions for file operations, web access, and system commands
- **Stateless Execution**: Each invocation is independent, providing a slightly more predictable behavior

### Invocation Patterns

#### Proactive Invocation
Claude automatically delegates to appropriate agents based on task context:
```markdown
User: "Can you review my code for security issues?"
Claude: [Automatically invokes security-audit-agent]
```

#### Explicit Invocation
Direct agent calls using the Task tool with specific instructions:
```markdown
Claude: "I'll use the qa-agent to generate comprehensive tests for this module"
[Invokes qa-agent with detailed test requirements]
```

### Context Management

Sub-agents excel at preserving main conversation context while handling specialized tasks:
- Main conversation remains focused on high-level objectives
- Sub-agents handle implementation details in isolated contexts
- Results are synthesized back into the main conversation
- No context pollution from verbose operations

## Example Agents

### Testing & Quality Assurance

#### qa-agent
**Purpose**: Comprehensive test suite creation and coverage analysis  
**Capabilities**:
- Generates unit, integration, and e2e tests
- Analyzes code coverage gaps
- Creates test fixtures and mocks
- Implements testing best practices for any language
- Sets up test automation frameworks

**Example Usage**:
```markdown
"Use qa-agent to create a complete test suite for the payment module with 90% coverage"
```

### Code Improvement

#### refactor-agent
**Purpose**: Code structure optimization without changing functionality  
**Capabilities**:
- Eliminates code duplication
- Improves naming conventions
- Simplifies complex logic
- Reorganizes code for better clarity
- Applies design patterns appropriately

**Example Usage**:
```markdown
"Use refactor-agent to clean up the authentication module and reduce complexity"
```

### Security & Compliance

#### security-audit-agent
**Purpose**: Comprehensive security vulnerability assessment  
**Capabilities**:
- OWASP Top 10 vulnerability scanning
- Authentication/authorization review
- Input validation analysis
- Dependency vulnerability checking
- Infrastructure security assessment
- Generates detailed security reports with remediation steps

**Example Usage**:
```markdown
"Use security-audit-agent to perform a full security audit before production deployment"
```

### GitHub Integration

#### pr-agent
**Purpose**: Pull request creation and GitHub workflow management  
**Capabilities**:
- Creates feature branches
- Commits changes with conventional messages
- Writes comprehensive PR descriptions
- Links PRs to issues
- Manages GitHub labels and reviewers
- Handles PR comments and updates

**Example Usage**:
```markdown
"Use pr-agent to create a PR for the new authentication feature linked to issue #123"
```

#### gh-issue-analyst
**Purpose**: GitHub issue analysis and planning  
**Capabilities**:
- Analyzes issue requirements
- Creates implementation plans
- Identifies dependencies
- Generates development documentation
- Plans workflow steps

#### gh-worker
**Purpose**: Long-duration implementation tasks  
**Capabilities**:
- Executes complex feature development
- Handles multi-component changes
- Performs system-wide refactoring
- Manages integration work

#### issue-extraction-agent
**Purpose**: Convert documents to actionable GitHub issues  
**Capabilities**:
- Parses meeting notes, audits, and reports
- Extracts actionable items
- Creates well-structured GitHub issues
- Generates tracking reports

### Documentation

#### docs-architect
**Purpose**: Technical documentation generation  
**Capabilities**:
- Creates architecture guides
- Generates API documentation
- Writes technical manuals
- Produces system design documents
- Creates onboarding materials

#### tech-writer
**Purpose**: Comprehensive documentation creation  
**Capabilities**:
- API documentation
- User guides
- Technical tutorials
- Architecture documentation
- README files

### Conflict Resolution

#### merge-conflict-agent
**Purpose**: Git merge conflict resolution guidance  
**Capabilities**:
- Analyzes conflict patterns
- Provides resolution strategies
- Handles complex merge scenarios
- Implements conflict prevention
- Manages different file type conflicts

### Analysis & Architecture

#### repo-analysis-agent
**Purpose**: Codebase architectural review  
**Capabilities**:
- Performs architectural analysis
- Identifies performance bottlenecks
- Evaluates security posture
- Assesses production readiness
- Creates improvement roadmaps

### Meta Operations

#### meta-agent
**Purpose**: Generate new custom sub-agents  
**Capabilities**:
- Creates agent configurations from descriptions
- Generates system prompts
- Configures tool permissions
- Optimizes agent behavior

## Creating Custom Agents

### Interactive Creation

The recommended method using the `/agents` command:

```bash
/agents
```

This opens an interactive interface where you:
1. Define agent name and description
2. Select available tools
3. Write or generate system prompts
4. Test agent behavior

### Manual Creation

Create agents as Markdown files in `.claude/agents/` (project) or `~/.claude/agents/` (personal):

```markdown
# .claude/agents/database-migrator.md
---
name: database-migrator
description: Handles database schema migrations and data transformations
tools:
  - Bash
  - Read
  - Write
  - Edit
---

You are a database migration specialist. Your responsibilities include:

## Core Tasks
- Analyze existing database schemas
- Generate migration scripts
- Validate data integrity
- Handle rollback scenarios
- Document schema changes

## Guidelines
- Always create reversible migrations
- Test migrations on sample data first
- Preserve data integrity during transformations
- Generate comprehensive migration logs
- Follow project-specific database conventions

## Constraints
- Never delete data without explicit backup
- Avoid operations during peak hours
- Validate foreign key relationships
- Ensure index optimization
```

### Configuration Best Practices

#### System Prompt Design
- Start with clear role definition
- List specific responsibilities
- Include examples of expected behavior
- Define constraints and limitations
- Reference project conventions

#### Tool Selection
- Grant minimal necessary permissions
- Consider security implications
- Balance capability with safety
- Document tool usage patterns

#### Testing Agents
- Start with simple tasks
- Gradually increase complexity
- Verify output quality
- Monitor performance impact
- Iterate on prompt refinement

## Advanced Patterns

### Multi-Agent Workflows

#### The 3 Amigo Pattern
Orchestrate three specialized agents for complete feature development:

```markdown
# .claude/commands/3-amigo-feature.md
Implement feature using 3 Amigo pattern:
1. Product Manager Agent: Define requirements and acceptance criteria
2. UX Designer Agent: Create interface designs and user flows  
3. Developer Agent: Implement code based on requirements and designs

Coordinate outputs between agents for cohesive implementation
```

#### Pipeline Orchestration
Chain agents for complex workflows:

```markdown
# .claude/commands/release-pipeline.md
Execute release pipeline:
1. repo-analysis-agent: Assess production readiness
2. qa-agent: Run comprehensive test suite
3. security-audit-agent: Final vulnerability scan
4. docs-architect: Update release documentation
5. pr-agent: Create release PR with changelog
```

### Parallel Agent Execution
Agents can be run in parallel when asked to do so by the main thread. Leveraging this for accelerated development cant be critical. The trade off here is that API rate limiting can come into play. 

### Context Preservation Strategies

#### Checkpoint Pattern
Save progress between agent invocations:
```markdown
1. Main context: Define overall objective
2. Agent 1: Complete subtask, return summary
3. Main context: Checkpoint progress
4. Agent 2: Continue with next subtask
5. Main context: Synthesize results
```

#### Handoff Pattern
Pass specific context between agents:
```markdown
Agent 1 output → processed → Agent 2 input
Maintains continuity while preserving isolation
```

## Real-World Workflows

### Test-Driven Development

Complete TDD workflow using agents:

```markdown
# .claude/commands/tdd-flow.md
1. qa-agent: Write failing tests based on requirements
2. Verify tests fail appropriately
3. Developer: Implement minimal code to pass tests
4. refactor-agent: Optimize implementation
5. qa-agent: Add edge case tests
6. security-audit-agent: Review for vulnerabilities
```

### Security-First Development

```markdown
# .claude/commands/secure-feature.md
1. security-audit-agent: Review requirements for security implications
2. Developer: Implement with security guidelines
3. qa-agent: Write security-focused tests
4. security-audit-agent: Final vulnerability assessment
5. docs-architect: Document security considerations
```

### Full-Stack Feature Development

```markdown
# .claude/commands/fullstack-feature.md
1. repo-analysis-agent: Analyze current architecture
2. Backend development with API implementation
3. Frontend development with UI components
4. qa-agent: Comprehensive testing across stack
5. docs-architect: Update documentation
6. pr-agent: Create feature PR
```

## Best Practices

### Agent Design Principles

#### Single Responsibility
- Each agent should excel at one domain
- Avoid overlapping capabilities
- Clear boundaries between agents
- Compose complex tasks from simple agents

#### Explicit Instructions
- Provide detailed system prompts
- Include examples in prompts
- Define success criteria
- Specify output formats

#### Error Handling
- Agents should gracefully handle failures
- Provide clear error messages
- Include fallback strategies
- Log issues for debugging

### Performance Optimization

#### Context Management
- Keep agent contexts focused
- Summarize results for main conversation
- Avoid unnecessary detail transfer
- Use checkpoints for long workflows (todo.md)

#### Parallel Processing
- Identify independent tasks
- Execute agents concurrently
- Synchronize results efficiently
- Monitor resource usage

### Team Collaboration

#### Version Control
```bash
# Commit project agents
git add .claude/agents/
git commit -m "Add custom agents for feature development"
```

#### Documentation
- Document agent purposes
- Provide usage examples
- Maintain changelog
- Share best practices

#### Standardization
- Establish naming conventions
- Define common patterns
- Create agent templates
- Review and iterate

## Examples

### Complete Agent Configuration

```markdown
# .claude/agents/api-designer.md
---
name: api-designer
description: REST API design and OpenAPI specification expert
tools:
  - Read
  - Write
  - Edit
  - WebSearch
---

You are an API design specialist focused on creating robust, scalable REST APIs.

## Expertise Areas
- RESTful design principles
- OpenAPI/Swagger specifications
- API versioning strategies
- Authentication/authorization patterns
- Rate limiting and throttling
- Error handling standards

## Design Process
1. Analyze requirements and use cases
2. Define resource models and relationships
3. Design endpoint structure
4. Specify request/response formats
5. Document with OpenAPI spec
6. Include example requests/responses
7. Define error scenarios

## Standards to Follow
- Use consistent naming conventions
- Implement HATEOAS where appropriate
- Follow RFC standards
- Ensure backward compatibility
- Include comprehensive documentation

## Output Format
Always provide:
- Complete OpenAPI 3.0 specification
- Implementation notes
- Security considerations
- Performance recommendations
- Client SDK examples
```

### Multi-Agent Workflow Script

```markdown
# .claude/commands/microservice-development.md
---
thinking: ultra think
---

Develop complete microservice: $ARGUMENTS

## Phase 1: Architecture
1. repo-analysis-agent: Analyze existing service architecture
2. Identify integration points
3. Define service boundaries

## Phase 2: Implementation
1. Create service scaffold
2. Implement business logic
3. refactor-agent: Optimize code structure

## Phase 3: Testing
1. qa-agent: Write comprehensive tests
2. Integration testing with existing services
3. Performance testing

## Phase 4: Security
1. security-audit-agent: Vulnerability assessment
2. Implement security recommendations
3. Penetration testing

## Phase 5: Documentation
1. docs-architect: Generate service documentation
2. API documentation
3. Deployment guide

## Phase 6: Deployment
1. pr-agent: Create deployment PR
2. Configure CI/CD
3. Monitor initial deployment

Report progress after each phase completion.
```

### Integration with Slash Commands

```markdown
# .claude/commands/agent-cascade.md
---
thinking: ultra think
---

Execute agent cascade for feature: $ARGUMENTS

# First, check current branch
git status

Now orchestrate agents:
1. gh-issue-analyst: Analyze related issues
2. repo-analysis-agent: Understand impact areas
3. Implement core functionality
4. qa-agent: Generate test coverage
5. refactor-agent: Optimize implementation
6. security-audit-agent: Security review
7. docs-architect: Update documentation
8. pr-agent: Create comprehensive PR

Provide status updates between each agent invocation.
```

## Troubleshooting

### Common Issues

#### Agent Not Found
- Verify file location: `.claude/agents/` or `~/.claude/agents/`
- Check file extension: Must be `.md`
- Validate YAML frontmatter syntax
- Ensure proper naming conventions

#### Poor Agent Performance
- Review and refine system prompt
- Verify appropriate tool access
- Check for prompt conflicts
- Test with simpler tasks first

#### Context Overflow
- Break complex tasks into smaller steps
- Use summarization between agents
- Implement checkpoint strategies

#### Tool Permission Errors
- Verify tools are properly configured
- Check for typos in tool names
- Ensure tools are available in environment
- Review security restrictions

### Performance Considerations

#### Latency Factors
- Context gathering adds ~2-5 seconds
- Complex prompts increase processing time
- Tool execution may add delays

## Additional Resources

### Official Documentation
- [Claude Code Sub-Agents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Creating Custom Agents](https://docs.anthropic.com/en/docs/claude-code/sub-agents#creating-custom-subagents)
- [Agent Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Anthropic Teams Usage](https://www.anthropic.com/news/how-anthropic-teams-use-claude-code)