---
title: "Artificial Intelligence (AI)"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "machine-learning"
  - "llm"
  - "agents"
draft: true
sourcePath: "docs/ai/index.md"
---

Artificial Intelligence (AI) is the field of building systems that can perform tasks requiring human-like cognition: language understanding, perception, prediction, planning, and decision support. In 2026, AI is no longer a single model problem; it is an ecosystem problem across models, tools, APIs, governance, and operations [1], [2].

This section gives you a complete technical map of the modern AI landscape and then drills into each core building block: neural networks, LLMs, agents, MCP, RAG, APIs, and security.

## What is it?

AI is a family of computational methods that map inputs to outputs by learning patterns from data and feedback loops.

At a high level, today's production AI systems combine:

- Foundation models (LLMs, multimodal models)
- Retrieval systems (embeddings + vector indexes + knowledge stores)
- Tool-use runtimes (agents, function calling, MCP servers)
- API standards and contracts (OpenAPI, JSON-RPC, OAuth)
- Safety, governance, and observability controls

The key shift is from "single model answers everything" to "orchestrated systems with specialized components."

## Why do we need it? Where do we use it?

We use AI because it compresses knowledge work: parsing large context, drafting, summarizing, classifying, coding, searching, and automating repetitive decision flows.

Common deployment contexts:

- Developer productivity and software engineering assistants
- Enterprise search and knowledge assistants (RAG)
- Customer support and workflow automation
- Document processing and extraction pipelines
- Security operations (triage, enrichment, response recommendations)

## History Lesson

| When      | What                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| 1997      | LSTM formalized long-horizon sequence memory in neural nets [3].                                             |
| 2017      | Transformer architecture ("Attention Is All You Need") became the dominant architecture for modern LLMs [4]. |
| 2020      | Retrieval-Augmented Generation (RAG) formalized model + retrieval composition [5].                           |
| Jan 2023  | NIST published AI RMF 1.0 for trustworthy AI risk management [1].                                            |
| Jul 2024  | NIST published the Generative AI profile for AI RMF [2].                                                     |
| 2024-2025 | MCP evolved into a practical tool/data interoperability protocol for agentic systems [6], [7].               |
| Sep 2025  | OpenAPI 3.2.0 published, relevant for AI tool API contract design [8].                                       |
| Feb 2026  | Anthropic published RSP 3.0 update, reflecting accelerated frontier governance work [9].                     |

## Interaction with other topics?

- API design and contracts: [REST APIs](/kb/api/rest-api-versioning-structuring), plus AI-specific API patterns in [AI APIs](/kb/ai/ai-apis).
- Security and IAM: [OAuth 2.0](/kb/iam/authorization/oauth), [Token-based Authentication](/kb/iam/authentication/token-authn), and [AI Security](/kb/ai/security).
- Infrastructure and operations: [CI/CD](/kb/cicd), [Terraform](/kb/iac/terraform), and [Storage](/kb/storage) for vector/object persistence.

## How does it work?

A practical AI stack is layered:

1. Model layer: general-purpose and domain-specific models.
2. Context layer: prompt context, memory, retrieval, and tool outputs.
3. Orchestration layer: agents, policies, handoffs, retries, and approvals.
4. Integration layer: APIs, MCP, function calling, event/webhook workflows.
5. Governance layer: access control, safety filters, audit trails, and observability.

Important people and ideas to know:

- Sepp Hochreiter and Jurgen Schmidhuber (LSTM) [3]
- Ashish Vaswani et al. (Transformer) [4]
- Patrick Lewis et al. (RAG) [5]

Important vendors and platforms (active in 2026 docs):

- OpenAI [10]
- Anthropic [11]
- Google (Gemini / Vertex AI) [12]
- Mistral AI [13]
- Cohere [14]
- xAI [15]
- DeepSeek [16]

Important buzzwords you will see often:

- Agentic workflows
- Tool calling
- MCP servers
- RAG grounding
- Context window
- Embeddings / vectorization
- Guardrails
- Evaluation and tracing

## Examples: Usage or Theory

### Example 1: AI system taxonomy (quick mental model)

| Layer         | Typical Components                     | Primary Goal                |
| ------------- | -------------------------------------- | --------------------------- |
| Model         | LLM, multimodal model, embedding model | Generate / reason / encode  |
| Context       | Prompt templates, memory, retrieval    | Relevance and grounding     |
| Orchestration | Agent runtime, planner, policy engine  | Multi-step execution        |
| Integration   | MCP, REST APIs, webhooks, queues       | External actions and data   |
| Governance    | IAM, moderation, observability         | Safety, trust, auditability |

### Example 2: Where your additional questions are answered

| Question                                             | Document                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| How do agents communicate?                           | [Agents](/kb/ai/agents), [AI solution architecture](/kb/ai/solution-architecture)     |
| What is vectorization?                               | [RAG](/kb/ai/rag)                                                                     |
| What are embeddings and how are they created/stored? | [RAG](/kb/ai/rag), [AI APIs](/kb/ai/ai-apis)                                          |
| Why are there so many LLM models?                    | [LLMs](/kb/ai/llms)                                                                   |
| How can I restrict what an agent can do?             | [Agents](/kb/ai/agents), [Security](/kb/ai/security)                                  |
| Observability tools/protocols available?             | [AI solution architecture](/kb/ai/solution-architecture), [Security](/kb/ai/security) |
| Security frameworks/guardrails available?            | [Security](/kb/ai/security)                                                           |

## References and further reading

[1] NIST, "Artificial Intelligence Risk Management Framework (AI RMF 1.0)," Jan. 26, 2023. Accessed: Mar. 10, 2026. [Online]. Available: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10

[2] NIST, "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile," Jul. 26, 2024. Accessed: Mar. 10, 2026. [Online]. Available: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

[3] S. Hochreiter and J. Schmidhuber, "Long Short-Term Memory," _Neural Computation_, vol. 9, no. 8, pp. 1735-1780, 1997. [Online]. Available: https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory

[4] A. Vaswani et al., "Attention Is All You Need," arXiv:1706.03762, 2017/2023. [Online]. Available: https://arxiv.org/abs/1706.03762

[5] P. Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," arXiv:2005.11401, 2020/2021. [Online]. Available: https://arxiv.org/abs/2005.11401

[6] Model Context Protocol, "Transports (Protocol Revision 2025-11-25)." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/specification/2025-11-25/basic/transports

[7] Model Context Protocol Blog, "Update on the Next MCP Protocol Release," Sep. 26, 2025. Accessed: Mar. 10, 2026. [Online]. Available: https://blog.modelcontextprotocol.io/posts/2025-09-26-mcp-next-version-update/

[8] OpenAPI Initiative, "OpenAPI Specification v3.2.0," Sep. 19, 2025. Accessed: Mar. 10, 2026. [Online]. Available: https://spec.openapis.org/oas/latest.html

[9] Anthropic, "Responsible Scaling Policy Updates," last updated Feb. 24, 2026. Accessed: Mar. 10, 2026. [Online]. Available: https://www.anthropic.com/responsible-scaling-policy

[10] OpenAI, "Models." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/models

[11] Anthropic, "Models overview." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.anthropic.com/en/docs/models-overview

[12] Google Cloud, "Google models (Vertex AI)." Accessed: Mar. 10, 2026. [Online]. Available: https://cloud.google.com/vertex-ai/generative-ai/docs/models

[13] Mistral AI, "Models." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.mistral.ai/getting-started/models

[14] Cohere, "An Overview of Cohere's Models." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.cohere.com/docs/models

[15] xAI, "Overview." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.x.ai/docs

[16] DeepSeek, "Your First API Call." Accessed: Mar. 10, 2026. [Online]. Available: https://api-docs.deepseek.com/
