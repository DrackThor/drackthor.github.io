---
title: "Agents"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "agents"
  - "orchestration"
  - "tool-calling"
draft: true
sourcePath: "docs/ai/agents.md"
---

In modern AI systems, an agent is a runtime that can plan, act, observe outcomes, and iterate toward a goal using models plus tools. It is not just a chatbot wrapper; it is a control loop with memory, policy, and integrations [1], [2].

## What is it?

An agent is typically composed of:

- A reasoning model (LLM or model ensemble)
- A planner/executor loop
- Tool interfaces (MCP, REST, SDKs)
- State/memory (session + optional long-term stores)
- Guardrails/policy controls
- Observability hooks

Agent behavior is emergent from orchestration design, not from the model alone.

## Why do we need it? Where do we use it?

Agents are useful when a task is:

- Multi-step
- Tool-dependent
- Context-dependent
- Recoverable with retries/fallbacks

Typical domains:

- Software engineering assistants
- Incident response copilots
- Internal operations automation
- Data analysis workflows

## History Lesson

| When      | What                                                                                     |
| --------- | ---------------------------------------------------------------------------------------- |
| 2022      | ReAct pattern combined reasoning and acting in one loop [3].                             |
| 2023      | Toolformer highlighted self-supervised tool-use behavior [4].                            |
| 2024-2026 | Production agent SDKs and runtimes matured around tools, handoffs, and tracing [1], [5]. |

## Interaction with other topics?

- [LLMs](/kb/ai/llms): provide reasoning and language generation.
- [MCP](/kb/ai/mcp): standardized tool/resource communication channel.
- [RAG](/kb/ai/rag): grounded context retrieval.
- [AI solution architecture](/kb/ai/solution-architecture): production topology.
- [Security](/kb/ai/security): policy boundaries and abuse prevention.

## How does it work?

### Core control loop

1. Receive goal and constraints.
2. Build context (history + retrieval + tool state).
3. Produce next action candidate.
4. Validate action against policy.
5. Execute tool/API call if allowed.
6. Observe result and update state.
7. Stop on completion criterion or escalation trigger.

### How agents communicate

Agents communicate through explicit protocol interfaces:

- LLM message turns
- Tool call requests/responses with JSON schemas
- MCP request/response channels [6]
- Event buses or queue messages for asynchronous workflows
- Shared state stores for checkpoints and handoffs

Multi-agent systems add:

- Handoffs (agent A delegates subtask to agent B) [1]
- Supervisor/coordinator patterns
- Message envelopes with task IDs, deadlines, and trust labels

### How to restrict what an agent can really do

Apply restrictions in layers:

- Tool allowlist: only expose approved tools
- Argument schema validation: reject dangerous shapes
- Policy engine: deny high-risk actions without approval
- Sandboxing: isolate command execution and file access
- Network egress controls: restrict outbound destinations
- Human approval gates for destructive actions

If you only rely on prompt instructions for restrictions, you do not have a reliable control model.

## Examples: Usage or Theory

### Example 1: Agent action policy contract

```yaml
agent_policy:
  allowed_tools:
    - "search_docs"
    - "create_ticket"
    - "read_ci_status"
  denied_tools:
    - "run_shell"
    - "delete_resource"
  approval_required:
    - "create_production_change"
  allowed_domains:
    - "api.internal.example.com"
    - "status.internal.example.com"
```

### Example 2: Agent loop pseudocode

```python
while not done:
    action = planner.next_action(state)
    decision = policy.evaluate(action)
    if decision == "deny":
        state = state.add_violation(action)
        continue
    if decision == "require_approval" and not approved(action):
        break
    result = tools.execute(action)
    state = state.update(result)
    done = stop_condition(state)
```

## References and further reading

[1] OpenAI Agents SDK, "Quickstart and core concepts." Accessed: Mar. 10, 2026. [Online]. Available: https://openai.github.io/openai-agents-python/quickstart/

[2] OpenAI, "Function calling." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/guides/function-calling

[3] S. Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models," arXiv:2210.03629, 2022/2023. [Online]. Available: https://arxiv.org/abs/2210.03629

[4] T. Schick et al., "Toolformer: Language Models Can Teach Themselves to Use Tools," arXiv:2302.04761, 2023. [Online]. Available: https://arxiv.org/abs/2302.04761

[5] OpenAI Agents SDK, "Tracing." Accessed: Mar. 10, 2026. [Online]. Available: https://openai.github.io/openai-agents-python/tracing/

[6] Model Context Protocol, "Introduction." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/docs/getting-started/intro
