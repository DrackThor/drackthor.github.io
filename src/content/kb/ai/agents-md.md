---
title: "AGENTS.md"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "agents-md"
  - "repository-governance"
  - "coding-agents"
draft: true
sourcePath: "docs/ai/agents-md.md"
---

`AGENTS.md` is a repository-level instruction contract for coding agents. It defines how an autonomous/semi-autonomous agent should behave in that codebase: scope, quality bar, safety constraints, workflow steps, and formatting conventions.

## What is it?

`AGENTS.md` is a machine-readable and human-readable policy file. It typically includes:

- Operating principles (truthfulness, verification, smallest safe diff)
- Workflow model (plan -> verify -> change -> prove)
- Repository map and ownership boundaries
- Documentation/code style requirements
- Security and escalation behavior
- Override hierarchy for nested subprojects

This repository's own `AGENTS.md` follows exactly that pattern.

## Why do we need it? Where do we use it?

Why it matters:

- Gives consistent behavior across different agent runs.
- Reduces unsafe or low-quality edits.
- Encodes repo-specific requirements that generic model behavior will miss.
- Improves reviewability because agent outputs become predictable.

Where used:

- Coding agent runs (IDE agents, CLI agents, CI assistant bots)
- Documentation automation workflows
- PR generation and review assistants

## History Lesson

| When      | What                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| 2023-2024 | "Rules files" for coding assistants became common in IDE workflows [1].                                                  |
| 2025      | OpenAI MCP integration guidance explicitly references adding project-specific notes to `AGENTS.md` for server usage [2]. |
| 2025-2026 | Teams increasingly treat instruction files as versioned engineering policy artifacts [3].                                |

## Interaction with other topics?

- [Agents](/kb/ai/agents): `AGENTS.md` constrains agent behavior.
- [MCP](/kb/ai/mcp): `AGENTS.md` can declare which MCP servers/tools are allowed.
- [Security](/kb/ai/security): `AGENTS.md` is where least-privilege and approval gates are often codified.
- [SKILLS.md](/kb/ai/skills-md): skills usually extend capabilities inside boundaries defined by `AGENTS.md`.

## How does it work?

### Typical evaluation logic inside agent runtimes

1. Load root `AGENTS.md`.
2. If working in a subdirectory, load nested overrides.
3. Resolve precedence (closest file wins for local subtree).
4. Apply constraints while planning and executing edits.
5. Enforce formatting/testing/reporting requirements before final output.

### Recommended sections for a high-quality `AGENTS.md`

| Section                          | Purpose                                     |
| -------------------------------- | ------------------------------------------- |
| Mission and non-negotiables      | Define quality and safety baseline          |
| Workflow contract                | Require plan/verify/change/prove discipline |
| Repo map                         | Prevent edits in wrong locations            |
| Documentation and code standards | Keep output consistent and maintainable     |
| Escalation rules                 | Clarify approvals for risky actions         |
| Override model                   | Support monorepos cleanly                   |

## Examples: Usage or Theory

### Example 1: Minimal `AGENTS.md` policy snippet

```markdown
# AGENTS.md

## Non-negotiables

- Never invent API behavior.
- Run tests for touched components.
- Keep diffs scoped to requested task.

## Workflow

1. Plan
2. Verify against implementation
3. Change
4. Prove with commands
```

### Example 2: Operational impact in daily work

With a strong `AGENTS.md`, two different agent tools should produce similarly constrained outputs on the same task, because repository policy is explicit and version controlled.

## References and further reading

[1] Cursor Documentation, "Rules and context." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.cursor.com/context/rules

[2] OpenAI, "MCP guide." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/guides/tools-remote-mcp

[3] Model Context Protocol, "Introduction." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/docs/getting-started/intro
