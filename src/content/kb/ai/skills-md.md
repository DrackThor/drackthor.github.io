---
title: "SKILLS.md / SKILL.md"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "skills"
  - "skill-md"
  - "coding-agents"
draft: true
sourcePath: "docs/ai/skills-md.md"
---

`SKILLS.md` (and per-skill `SKILL.md`) is a convention used by some coding-agent runtimes to package reusable capabilities: task-specific instructions, workflows, templates, scripts, and references.

## What is it?

A skill package usually contains:

- A `SKILL.md` file describing when and how to apply the skill
- Optional helper scripts
- Optional templates or assets
- Optional reference docs

Skills are a modular extension layer on top of a base agent runtime.

## Why do we need it? Where do we use it?

Why useful:

- Reuse proven workflows for recurring task classes.
- Keep agent prompts focused by loading only relevant skill context.
- Standardize outputs across contributors and teams.

Where used:

- Repo bootstrapping tasks
- Migration playbooks
- Documentation generation workflows
- Specialized coding/analysis assistants

## History Lesson

| When      | What                                                                                                            |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| 2024-2025 | Agent ecosystems began formalizing reusable "skills" as modular instruction bundles [1].                        |
| 2025-2026 | Skill catalogs became common in coding-agent environments to reduce prompt bloat and improve repeatability [2]. |

## Interaction with other topics?

- [AGENTS.md](/kb/ai/agents-md): `AGENTS.md` sets policy boundaries; skills execute within those boundaries.
- [Agents](/kb/ai/agents): skills provide domain-specific behavior modules.
- [MCP](/kb/ai/mcp): skills often call MCP tools, but are not an MCP protocol primitive.
- [Security](/kb/ai/security): skills must follow least-privilege and approval constraints.

## How does it work?

### Typical skill lifecycle

1. Runtime detects task intent (or user explicitly selects a skill).
2. Runtime loads the skill's `SKILL.md`.
3. Skill guidance shapes planning and execution.
4. Optional scripts/templates are executed/applied.
5. Runtime returns to baseline policy after task completion.

### Is `SKILLS.md` related to MCP?

Yes in architecture, no in protocol:

- Architectural relation: skills can orchestrate workflows that use MCP tools/resources.
- Protocol relation: MCP specification defines tools/resources/prompts and transport semantics, not a `skills` primitive [3].

For implementation details, see the dedicated section in [MCP](/kb/ai/mcp).

### Recommended `SKILL.md` structure

| Section            | Purpose                        |
| ------------------ | ------------------------------ |
| Description        | What problem this skill solves |
| Trigger rules      | When to use it                 |
| Workflow           | Ordered execution steps        |
| Inputs/outputs     | Expected artifacts             |
| Safety constraints | What must not happen           |
| Verification steps | How to prove correctness       |

## Examples: Usage or Theory

### Example 1: Minimal `SKILL.md`

```markdown
# Skill: API Doc Writer

## When to use

- User requests API documentation updates.

## Workflow

1. Inspect OpenAPI file.
2. Compare with current docs.
3. Update docs and examples.
4. Run doc build checks.

## Constraints

- Do not invent endpoints.
- Include source citations.
```

### Example 2: Skill + MCP in one flow

1. Skill "incident-runbook-writer" loads.
2. Skill asks MCP server for incident metrics and ticket history.
3. Agent synthesizes runbook draft from retrieved structured data.
4. Policy checks redact sensitive fields before output.

## References and further reading

[1] Cursor Documentation, "Rules and context." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.cursor.com/context/rules

[2] OpenAI, "MCP guide." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/guides/tools-remote-mcp

[3] Model Context Protocol, "Transports (Protocol Revision 2025-11-25)." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/specification/2025-11-25/basic/transports
