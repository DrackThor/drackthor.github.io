---
title: "AI APIs in the Current Ecosystem"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "api"
  - "openapi"
  - "mcp"
  - "oauth"
draft: true
sourcePath: "docs/ai/ai-apis.md"
---

The AI ecosystem is API-first. Models, tools, retrieval, observability, and governance are stitched together through multiple API styles, each optimized for a different integration boundary [1]-[5].

## What is it?

There is no single "AI API." Production systems combine several interface types:

- Model inference APIs (LLM/multimodal completion and tool-calling)
- Tool APIs (internal/external business systems)
- Protocol APIs (MCP for tool/resource interoperability)
- Contract specifications (OpenAPI/JSON Schema/AsyncAPI)
- Security APIs (OAuth token services, key management, policy checks)

## Why do we need it? Where do we use it?

Each API type solves a different concern:

- Inference APIs: language/multimodal generation
- Tool APIs: business actions and enterprise data access
- Protocol APIs: reusable interoperability across hosts and tools
- Contract specs: validation, compatibility, SDK generation
- Security APIs: authentication, authorization, and auditability

## History Lesson

| When      | What                                                                                                        |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| 2010      | JSON-RPC 2.0 finalized and later reused by modern AI protocols [6].                                         |
| 2023      | AsyncAPI 3.0 published for event-driven API contracts [7].                                                  |
| 2025      | OpenAPI 3.2.0 published, improving modern API contract clarity [1].                                         |
| 2024-2025 | MCP emerged as a tool/resource protocol for AI applications [4], [8].                                       |
| 2025-2026 | Multiple model vendors expose OpenAI-compatible or similar API surfaces to reduce switching costs [3], [9]. |

## Interaction with other topics?

- [AI solution architecture](/kb/ai/solution-architecture): shows where each API surface lives.
- [MCP](/kb/ai/mcp): deep protocol internals and lifecycle.
- [Agents](/kb/ai/agents): execution loop and tool communication.
- [RAG](/kb/ai/rag): embedding and retrieval APIs.
- [Security](/kb/ai/security): API hardening and abuse resistance.

## How does it work?

### API taxonomy for modern AI systems

| API layer                   | Typical protocol                 | Example usage                                 |
| --------------------------- | -------------------------------- | --------------------------------------------- |
| Model inference             | HTTPS JSON                       | `responses` call with tools enabled           |
| Tool execution              | HTTPS/gRPC/queue                 | Create ticket, read metrics, trigger pipeline |
| Agent-tool interoperability | MCP over stdio/HTTP              | Discover and call tools/resources             |
| Contract specification      | OpenAPI / JSON Schema / AsyncAPI | Validation, codegen, integration testing      |
| Security                    | OAuth/OIDC, API keys, mTLS       | Token issuance, service auth, authorization   |
| Telemetry                   | OpenTelemetry                    | Traces/spans for prompts and tool calls       |

### OpenAI-style API structure (representative)

Common request structure:

```json
{
  "model": "<MODEL_ID>",
  "input": [
    {
      "role": "user",
      "content": "Summarize today's incident report."
    }
  ],
  "tools": [
    {
      "type": "function",
      "name": "get_incident_data",
      "parameters": {
        "type": "object",
        "properties": {
          "incident_id": { "type": "string" }
        },
        "required": ["incident_id"]
      }
    }
  ]
}
```

Key point: model APIs increasingly include first-class tool schemas, enabling agent workflows without custom parsing glue [2], [5].

### MCP and OpenAPI are complementary

- OpenAPI describes HTTP contract shape.
- MCP standardizes AI host <-> tool server communication.
- Teams often expose internal APIs using OpenAPI and wrap selected operations through MCP servers for agent use.

### Security posture for AI APIs

Minimum controls:

- Authn/authz on every API boundary
- Scope-limited tokens and short lifetimes [10]
- Request/response schema validation
- Rate limits and anomaly detection
- Audit logging with correlation IDs

## Examples: Usage or Theory

### Example 1: API composition for one agentic task

1. Client calls model inference API with tools enabled.
2. Model proposes `search_runbooks` tool call.
3. Agent runtime routes tool call to MCP server.
4. MCP server calls internal REST API documented by OpenAPI.
5. Tool result returns to model for final answer synthesis.

### Example 2: Contract stack in one deployment

| Component             | Contract/Spec    |
| --------------------- | ---------------- |
| Internal incident API | OpenAPI 3.2      |
| Event notifications   | AsyncAPI 3.0     |
| Agent tool bridge     | MCP              |
| Token service         | OAuth 2.0 / OIDC |
| Trace export          | OpenTelemetry    |

## References and further reading

[1] OpenAPI Initiative, "OpenAPI Specification v3.2.0," Sep. 19, 2025. Accessed: Mar. 10, 2026. [Online]. Available: https://spec.openapis.org/oas/latest.html

[2] OpenAI, "Function calling." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/guides/function-calling

[3] DeepSeek, "Your First API Call." Accessed: Mar. 10, 2026. [Online]. Available: https://api-docs.deepseek.com/

[4] Model Context Protocol, "Introduction." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/docs/getting-started/intro

[5] OpenAI, "Responses API." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/api-reference/responses

[6] JSON-RPC Working Group, "JSON-RPC 2.0 Specification." Accessed: Mar. 10, 2026. [Online]. Available: https://www.jsonrpc.org/specification

[7] AsyncAPI Initiative, "AsyncAPI 3.0.0 release." Accessed: Mar. 10, 2026. [Online]. Available: https://www.asyncapi.com/blog/release-notes-3.0.0

[8] Model Context Protocol, "Transports (Protocol Revision 2025-11-25)." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/specification/2025-11-25/basic/transports

[9] xAI, "Overview." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.x.ai/docs

[10] D. Fett, B. Campbell, and J. Bradley, "Best Current Practice for OAuth 2.0 Security," RFC 9700, Jan. 2025. [Online]. Available: https://www.rfc-editor.org/rfc/rfc9700
