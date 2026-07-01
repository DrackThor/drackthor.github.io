---
title: "Model Context Protocol (MCP)"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "mcp"
  - "protocol"
  - "json-rpc"
  - "interoperability"
draft: true
sourcePath: "docs/ai/mcp.md"
---

Model Context Protocol (MCP) is a protocol standard for connecting AI runtimes to tools, resources, and prompt templates through a consistent interface. It gives models structured access to external capabilities without hard-coding every integration [1], [2].

## What is it?

MCP defines:

- Roles: host, client, server
- Capability discovery
- Structured tool/resource/prompt interfaces
- Transport behaviors and lifecycle
- Request/response and notification semantics via JSON-RPC 2.0 [3]

Think of MCP as "USB-C for AI tool connectivity": one protocol, many integrations.

## Why do we need it? Where do we use it?

Without MCP, each AI application invents custom adapters for every tool.

MCP solves:

- Integration sprawl
- Inconsistent tool contracts
- Weak portability between AI hosts/frameworks
- Poor reuse of server-side integrations

Used in:

- Coding agents
- Enterprise copilots
- Internal assistant platforms
- Workflow automation runtimes

## History Lesson

| When     | What                                                                             |
| -------- | -------------------------------------------------------------------------------- |
| 2024     | MCP introduced publicly with initial protocol shape [1].                         |
| Mar 2025 | MCP transport and lifecycle details refined in protocol revision 2025-03-26 [4]. |
| Jun 2025 | MCP announced OAuth-based authorization support evolution [5].                   |
| Nov 2025 | Protocol revision 2025-11-25 published with updated transport guidance [2].      |

## Interaction with other topics?

- [Agents](/kb/ai/agents): agent runtimes use MCP clients for tool execution.
- [AI solution architecture](/kb/ai/solution-architecture): MCP is a key integration container.
- [AI APIs](/kb/ai/ai-apis): MCP complements REST/OpenAPI APIs, not replaces them.
- [Security](/kb/ai/security): MCP still requires authn/authz, least privilege, and audit controls.
- [SKILLS.md](/kb/ai/skills-md): related in practice, but not part of MCP protocol.

## How does it work?

### Protocol building blocks

MCP server exposes three high-value primitives:

- Tools: executable functions with argument schema
- Resources: retrievable context artifacts
- Prompts: reusable prompt templates/instructions

MCP client flow:

1. Open transport channel.
2. Initialize protocol and exchange capabilities.
3. Discover available tools/resources/prompts.
4. Invoke tools or fetch resources as needed.
5. Handle responses/errors/notifications.

### Transport and message model

MCP uses JSON-RPC message envelopes [2], [3]:

- Request: has `id`, expects response
- Response: result or error linked to request `id`
- Notification: no `id`, no response expected

Transports include:

- `stdio` (local process integration)
- Streamable HTTP variants (service/network integration) [2]

### Example MCP request/response

```json
{
  "jsonrpc": "2.0",
  "id": 42,
  "method": "tools/call",
  "params": {
    "name": "search_docs",
    "arguments": {
      "query": "oauth token rotation"
    }
  }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": 42,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 3 matching policy documents..."
      }
    ]
  }
}
```

### How MCP fits into agent communication

Agents typically communicate through:

- Internal planning messages
- Model API messages
- MCP protocol calls for tool/resource access
- External REST/gRPC calls where MCP is not available

MCP is the tool/resource communication channel, not the whole agent runtime.

### Dedicated section: Is `SKILLS.md` related to MCP?

Short answer: indirectly, yes; protocol-wise, no.

- `SKILLS.md`/`SKILL.md` is a runtime or repository convention for packaging reusable agent behavior, instructions, templates, or helper scripts.
- MCP is a wire protocol for runtime interoperability.
- A skill can internally use MCP servers, and an MCP server can expose resources that a skill consumes.
- But `SKILLS.md` is not a first-class MCP primitive defined by the specification [2].

Practical mapping:

- Skill defines "what workflow to do."
- MCP defines "how to access tools/resources during that workflow."

## Examples: Usage or Theory

### Example 1: Minimal MCP server contract thinking

| Primitive | Example                          | Why it matters                   |
| --------- | -------------------------------- | -------------------------------- |
| Tool      | `create_ticket(title, severity)` | Controlled action execution      |
| Resource  | `kb://incident-handbook`         | Deterministic context retrieval  |
| Prompt    | `postmortem_writer`              | Reusable instruction scaffolding |

### Example 2: Host selection strategy

| Deployment mode           | Recommended transport        | Notes                                |
| ------------------------- | ---------------------------- | ------------------------------------ |
| Local coding assistant    | `stdio`                      | Low latency, local trust boundary    |
| Internal platform service | HTTP transport               | Service auth, network policies       |
| Multi-tenant SaaS         | HTTP + OAuth + strict policy | Isolate tenants and audit everything |

## References and further reading

[1] Model Context Protocol, "Introduction." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/docs/getting-started/intro

[2] Model Context Protocol, "Transports (Protocol Revision 2025-11-25)." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/specification/2025-11-25/basic/transports

[3] JSON-RPC Working Group, "JSON-RPC 2.0 Specification." Accessed: Mar. 10, 2026. [Online]. Available: https://www.jsonrpc.org/specification

[4] Model Context Protocol, "Transports (Protocol Revision 2025-03-26)." Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports

[5] Model Context Protocol Blog, "MCP Spec Update: OAuth 2.1 Support and Streamable HTTP." Jun. 18, 2025. Accessed: Mar. 10, 2026. [Online]. Available: https://modelcontextprotocol.io/specification/2025-06-18/changelog

[6] OpenAI Agents SDK, "Model context protocol (MCP)." Accessed: Mar. 10, 2026. [Online]. Available: https://openai.github.io/openai-agents-python/mcp/

[7] OpenAI, "MCP guide." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/guides/tools-remote-mcp
