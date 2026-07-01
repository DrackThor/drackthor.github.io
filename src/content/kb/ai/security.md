---
title: "Security for AI Systems and Agents"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "security"
  - "guardrails"
  - "prompt-injection"
draft: true
sourcePath: "docs/ai/security.md"
---

AI security is a system problem, not just a model problem. Real risk appears at integration boundaries: prompts, retrieval pipelines, tools, APIs, and runtime permissions. You secure AI by combining protocol controls, least privilege, validation, monitoring, and governance frameworks [1]-[5].

## What is it?

AI security covers:

- Model misuse and unsafe outputs
- Prompt injection and context poisoning
- Data leakage and unauthorized tool execution
- API abuse and identity compromise
- Supply-chain and model governance risks

This includes both classic AppSec controls and AI-specific attack patterns.

## Why do we need it? Where do we use it?

Agentic systems can execute actions, not just generate text. That raises impact:

- Financial and operational damage from unauthorized actions
- Confidential data exposure via prompt/context leaks
- Compliance and legal risks in regulated domains
- Incident response complexity due to non-deterministic behavior

Use cases with the highest need:

- Production copilots with write privileges
- Enterprise RAG over sensitive documents
- Autonomous workflow orchestration

## History Lesson

| When      | What                                                                                  |
| --------- | ------------------------------------------------------------------------------------- |
| 2023      | NIST AI RMF 1.0 established governance baseline for AI risk [1].                      |
| 2024      | NIST Generative AI profile added GenAI-specific risk guidance [2].                    |
| 2024-2025 | OWASP GenAI and LLM Top 10 made common AI failure classes actionable [3], [4].        |
| 2025      | OAuth 2.0 security BCP (RFC 9700) reinforced API security posture [5].                |
| 2025-2026 | Guardrail frameworks and prompt-shielding controls matured in vendor stacks [6], [7]. |

## Interaction with other topics?

- [Agents](/kb/ai/agents): action boundaries and approval gates.
- [MCP](/kb/ai/mcp): protocol-level connectivity still requires policy and auth controls.
- [RAG](/kb/ai/rag): retrieval path can import malicious context.
- [AI APIs](/kb/ai/ai-apis): token handling, scopes, and schema validation.
- [AI solution architecture](/kb/ai/solution-architecture): where to enforce controls.

## How does it work?

### Threat classes you must model

1. Prompt injection
2. Data exfiltration via tool calls
3. Over-permissioned agents
4. Insecure output handling (unsafe downstream execution)
5. Retrieval poisoning (corrupted knowledge sources)
6. API token abuse and impersonation
7. Model abuse for prohibited content

### How to keep agents from doing something bad

Use defense in depth:

- Principle of least privilege for every tool/API scope
- Explicit tool allowlists and deny lists
- Argument schema and semantic validation
- Approval gates for sensitive actions
- Runtime sandboxing for command execution
- Network egress restrictions
- Per-action audit logs and trace IDs

### How APIs are secured

Baseline controls:

- OAuth/OIDC for delegated auth and scoped access [5]
- Short-lived tokens and rotation
- mTLS/service identity between internal services
- Per-endpoint authorization checks
- Rate limits and anomaly detection
- Signed webhook/event verification

### How to prevent prompt injection

No single control is sufficient. Combine:

- Input classification and prompt filtering [4], [6]
- Context isolation (do not trust retrieved text as instructions)
- Tool policy layer independent of model output
- Output validation and post-generation checks
- Canary prompts and attack test suites

### Observability tools/protocols available today

Common choices:

- OpenTelemetry semantic conventions for GenAI spans [8]
- Agent/runtime tracing (for example OpenAI Agents tracing) [9]
- Platform observability products (for example Langfuse) [10]
- Red-team/eval harnesses and policy violation dashboards

### Security frameworks and guardrails available

Frameworks:

- NIST AI RMF + GenAI profile [1], [2]
- OWASP GenAI Security Project and LLM risks [3], [4]
- Google SAIF (Secure AI Framework) [11]

Guardrail implementations:

- NVIDIA NeMo Guardrails [7]
- Microsoft Prompt Shields [6]
- Provider-side safety/moderation controls [12]

## Examples: Usage or Theory

### Example 1: Policy gate for tool execution

```yaml
tool_policy:
  default: deny
  allow:
    - tool: "search_docs"
      scopes: ["docs:read"]
    - tool: "create_ticket"
      scopes: ["tickets:write"]
      require_approval: true
  deny:
    - tool: "run_shell"
    - tool: "delete_resource"
```

### Example 2: Prompt-injection resilience checklist

| Control                                       | Implementation hint                       |
| --------------------------------------------- | ----------------------------------------- |
| Segregate instructions from retrieved content | Distinct prompt channels and trust labels |
| Validate tool arguments                       | JSON Schema + business-rule checks        |
| Restrict outbound requests                    | Domain allowlist + egress firewall        |
| Require citations for factual answers         | Reject uncited high-risk outputs          |
| Trace every tool call                         | Correlate to user/session/action ID       |

## References and further reading

[1] NIST, "Artificial Intelligence Risk Management Framework (AI RMF 1.0)," Jan. 26, 2023. Accessed: Mar. 10, 2026. [Online]. Available: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10

[2] NIST, "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile," Jul. 26, 2024. Accessed: Mar. 10, 2026. [Online]. Available: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

[3] OWASP, "OWASP Top 10 for LLM Applications 2025." Accessed: Mar. 10, 2026. [Online]. Available: https://genai.owasp.org/llm-top-10/

[4] OWASP, "LLM01: Prompt Injection." Accessed: Mar. 10, 2026. [Online]. Available: https://genai.owasp.org/llmrisk/llm01-prompt-injection/

[5] D. Fett, B. Campbell, and J. Bradley, "Best Current Practice for OAuth 2.0 Security," RFC 9700, Jan. 2025. [Online]. Available: https://www.rfc-editor.org/rfc/rfc9700

[6] Microsoft, "Prompt Shields documentation." Accessed: Mar. 10, 2026. [Online]. Available: https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection

[7] NVIDIA, "NeMo Guardrails documentation." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.nvidia.com/nemo/guardrails/index.html

[8] OpenTelemetry, "GenAI semantic conventions and traces." Accessed: Mar. 10, 2026. [Online]. Available: https://opentelemetry.io/docs/specs/semconv/gen-ai/

[9] OpenAI Agents SDK, "Tracing." Accessed: Mar. 10, 2026. [Online]. Available: https://openai.github.io/openai-agents-python/tracing/

[10] Langfuse, "Prompt Management & Observability." Accessed: Mar. 10, 2026. [Online]. Available: https://langfuse.com/docs/prompt-management/overview

[11] Google, "Secure AI Framework (SAIF)." Accessed: Mar. 10, 2026. [Online]. Available: https://security.googleblog.com/2023/06/introducing-googles-secure-ai-framework.html

[12] OpenAI, "Safety best practices." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/guides/safety-best-practices
