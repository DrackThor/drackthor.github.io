---
title: "Large Language Models (LLMs)"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "llm"
  - "nlp"
  - "transformer"
draft: true
sourcePath: "docs/ai/llms.md"
---

Large Language Models (LLMs) are Transformer-based neural networks trained on massive text/code/multimodal corpora to predict and generate tokens. They are the core engine behind modern assistants, copilots, and agentic systems [1], [2].

## What is it?

An LLM is a probabilistic sequence model:

- Input: tokenized context (instructions, conversation, retrieved data, tool outputs)
- Output: next-token probability distribution
- Behavior: sampling/decoding from that distribution into responses

LLMs are generalists by default. Production value comes from constraints and context engineering, not from raw model size alone.

## Why do we need it? Where do we use it?

LLMs are used when a problem involves language-heavy transformation, synthesis, or reasoning:

- Coding assistants
- Enterprise knowledge assistants
- Document and policy analysis
- Workflow automation with tool use
- Customer support and operations copilots

## History Lesson

| When      | What                                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 2017      | Transformer architecture introduced and became the backbone for modern LLMs [1].                                                    |
| 2020      | RAG pattern formalized grounding of generation on retrieved knowledge [3].                                                          |
| 2023-2026 | Rapid provider competition produced specialized model families for coding, reasoning, multimodal, and low-latency serving [4]-[10]. |

## Interaction with other topics?

- [Neural networks](/kb/ai/neural-networks): LLMs are a specific deep-learning architecture family.
- [RAG](/kb/ai/rag): LLMs need high-quality retrieval context for factual tasks.
- [Agents](/kb/ai/agents): LLMs provide planning/reasoning for tool-driven workflows.
- [MCP](/kb/ai/mcp): LLM runtimes use MCP to access tools and resources.
- [Security](/kb/ai/security): LLM behavior must be constrained with policy and guardrails.

## How does it work?

### Why context is the most important thing

For production behavior, context quality usually dominates outcome quality.

Context includes:

- System/developer instructions
- User request
- Conversation history
- Retrieved evidence
- Tool outputs
- Structured constraints (JSON schemas, policies)

Why this matters:

1. LLMs do not have guaranteed up-to-date factual memory.
2. Retrieval and tool outputs inject fresh, task-specific truth.
3. Constraint context (schemas/policies) improves action reliability.
4. Long context still has attention allocation tradeoffs ("lost in the middle" effects) [11].

Practical rule: spend at least as much engineering effort on context architecture as on model selection.

### Why there are so many different LLM models

Different models exist because optimization targets are different:

- Latency vs quality
- Cost vs context size
- General reasoning vs domain specialization
- Multimodal support vs text-only efficiency
- Hosted SaaS APIs vs self-hosted/open-weight deployment

No single model dominates all workloads. Teams maintain a model portfolio and route tasks by policy.

### Prominent model ecosystems (current practice)

| Provider   | Public model ecosystem docs                 | Typical fit                                                    |
| ---------- | ------------------------------------------- | -------------------------------------------------------------- |
| OpenAI     | GPT model families, Responses API [4], [12] | General assistant workflows, coding, multimodal                |
| Anthropic  | Claude model families [5]                   | Long-context enterprise assistants, safety-focused deployments |
| Google     | Gemini models via Vertex AI [6]             | Multimodal apps, Google Cloud integration                      |
| Mistral AI | Mistral model lineup [7]                    | Cost/performance tradeoffs, EU-focused stacks                  |
| Cohere     | Command model families [8]                  | Enterprise language workflows and RAG                          |
| xAI        | Grok API docs [9]                           | API-based LLM integration                                      |
| DeepSeek   | OpenAI-compatible API mode [10]             | Cost-sensitive OpenAI-style API integration                    |

### Prominent LLM examples (as documented in Mar. 2026)

Model IDs and availability change quickly. Use the linked provider docs as source of truth [4]-[10].

| Provider   | Example prominent models (family/examples)                            | Typical use-case focus                                            |
| ---------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| OpenAI     | GPT model families (for example GPT-5 class models)                   | General-purpose reasoning, coding, multimodal assistant workflows |
| Anthropic  | Claude model families (Opus/Sonnet/Haiku lines)                       | Long-context enterprise assistants, document-heavy workflows      |
| Google     | Gemini model families (Pro/Flash style variants)                      | Multimodal applications with cloud-native integration             |
| Mistral AI | Mistral Large / specialized lines (for example code-focused variants) | Cost/performance balancing and regional deployment choices        |
| Cohere     | Command model families                                                | Enterprise retrieval and workflow assistants                      |
| xAI        | Grok model line                                                       | API assistant integrations                                        |
| DeepSeek   | DeepSeek model families exposed via OpenAI-compatible API             | Cost-sensitive integration and experimentation                    |

## Examples: Usage or Theory

### Example 1: LLM routing policy (theory)

```yaml
routes:
  - task: "high_stakes_policy_answer"
    strategy: "use_high_reliability_model"
    require_rag: true
    require_tool_citations: true
  - task: "bulk_summarization"
    strategy: "use_low_cost_fast_model"
    max_latency_ms: 2000
  - task: "code_generation"
    strategy: "use_code_specialized_model"
    run_static_checks: true
```

### Example 2: Context packing checklist

1. Put non-negotiable instructions first.
2. Add concise task restatement.
3. Inject only relevant retrieved chunks (not full documents).
4. Include tool results as structured JSON, not raw logs.
5. Add explicit output schema (JSON Schema/OpenAPI-like constraints).
6. Add refusal/safety criteria for out-of-policy requests.

## References and further reading

[1] A. Vaswani et al., "Attention Is All You Need," arXiv:1706.03762, 2017/2023. [Online]. Available: https://arxiv.org/abs/1706.03762

[2] T. Brown et al., "Language Models are Few-Shot Learners," arXiv:2005.14165, 2020. [Online]. Available: https://arxiv.org/abs/2005.14165

[3] P. Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," arXiv:2005.11401, 2020/2021. [Online]. Available: https://arxiv.org/abs/2005.11401

[4] OpenAI, "Models." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/models

[5] Anthropic, "Models overview." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.anthropic.com/en/docs/models-overview

[6] Google Cloud, "Google models (Vertex AI)." Accessed: Mar. 10, 2026. [Online]. Available: https://cloud.google.com/vertex-ai/generative-ai/docs/models

[7] Mistral AI, "Models." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.mistral.ai/getting-started/models

[8] Cohere, "An Overview of Cohere's Models." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.cohere.com/docs/models

[9] xAI, "Overview." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.x.ai/docs

[10] DeepSeek, "Your First API Call." Accessed: Mar. 10, 2026. [Online]. Available: https://api-docs.deepseek.com/

[11] N. F. Liu et al., "Lost in the Middle: How Language Models Use Long Contexts," arXiv:2307.03172, 2023/2024. [Online]. Available: https://arxiv.org/abs/2307.03172

[12] OpenAI, "Responses API." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/api-reference/responses
