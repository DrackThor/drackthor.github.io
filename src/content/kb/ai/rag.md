---
title: "Retrieval-Augmented Generation (RAG)"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "rag"
  - "embeddings"
  - "vector-database"
draft: true
sourcePath: "docs/ai/rag.md"
---

RAG is an architecture pattern that combines a generator model with a retrieval system so answers are grounded in external knowledge instead of relying only on model parameters [1]. In production, RAG is the default pattern for factual enterprise assistants.

## What is it?

RAG integrates two subsystems:

- Retriever: finds relevant evidence from knowledge stores
- Generator: produces a final response conditioned on retrieved evidence

This separation is critical: retrieval handles freshness and coverage, generation handles synthesis and explanation.

## Why do we need it? Where do we use it?

RAG solves common LLM limitations:

- Stale knowledge
- Hallucinated facts
- Missing enterprise-private context
- Weak traceability to source evidence

Where used:

- Internal knowledge assistants
- Policy/legal retrieval assistants
- Technical support bots
- Documentation and runbook copilots

## History Lesson

| When      | What                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| 2020      | RAG formalized in the Lewis et al. paper [1].                                   |
| 2021-2024 | Vector databases and dense retrieval stacks became mainstream [2]-[4].          |
| 2024-2026 | Agentic RAG added tool-use, iterative retrieval, and evaluation loops [5], [6]. |

## Interaction with other topics?

- [LLMs](/kb/ai/llms): generator component.
- [Neural networks](/kb/ai/neural-networks): embedding models are neural encoders.
- [Agents](/kb/ai/agents): can orchestrate multi-hop or tool-assisted retrieval.
- [AI solution architecture](/kb/ai/solution-architecture): production topology and controls.
- [Security](/kb/ai/security): retrieval can be a prompt-injection ingress path.

## How does it work?

### Technical pipeline (step-by-step)

1. Ingest source data (documents, wiki pages, tickets, code, PDFs, structured records).
2. Normalize and chunk content into retrievable units.
3. Vectorize chunks with an embedding model.
4. Store vectors + metadata in vector index.
5. Encode user query into embedding.
6. Retrieve top-k candidates (semantic, keyword, or hybrid search).
7. Re-rank and filter candidates.
8. Build prompt context with selected evidence.
9. Generate response with citations.
10. Log feedback/evaluation for continuous improvement.

### What is vectorization?

Vectorization converts text (or multimodal content) into dense numeric vectors in an embedding space where semantic similarity corresponds to geometric proximity [7].

### What are embeddings, and how are they created and stored?

Embeddings are high-dimensional numeric representations created by specialized neural encoders [7].

Creation:

- Input text chunk -> tokenizer -> embedding model -> vector (for example 768/1024/1536 dims)

Storage:

- Vector DB index stores vectors for nearest-neighbor search
- Metadata store holds document IDs, source, timestamp, ACL tags
- Object/doc store keeps original chunk content

Typical backends:

- Postgres + pgvector [2]
- Pinecone [3]
- Weaviate [4]

### RAG architecture diagram

```d2
direction: down

classes: {
  ingest: {
    style: {
      fill: "#E8F5E9"
      stroke: "#2E7D32"
      border-radius: 8
    }
  }
  search: {
    style: {
      fill: "#E3F2FD"
      stroke: "#1565C0"
      border-radius: 8
    }
  }
  gen: {
    style: {
      fill: "#FFF3E0"
      stroke: "#EF6C00"
      border-radius: 8
    }
  }
}

source_docs: "Source Knowledge (PDF/HTML/MD/DB)" {
  class: ingest
}
chunker: "Ingestion + Chunking Pipeline" {
  class: ingest
}
embed_ingest: "Embedding Model (Index Time)" {
  class: ingest
}
vectordb: "Vector Index (ANN + Metadata)" {
  class: search
}
docstore: "Chunk Store / Blob Store" {
  class: search
}

user: "User Query" {
  shape: person
}
query_embed: "Embedding Model (Query Time)" {
  class: search
}
retriever: "Retriever + Hybrid Search" {
  class: search
}
reranker: "Re-ranker / Filter" {
  class: search
}
prompt_builder: "Prompt Builder" {
  class: gen
}
llm: "Generator LLM" {
  class: gen
}
answer: "Answer + Citations" {
  class: gen
}

source_docs -> chunker: "raw content"
chunker -> embed_ingest: "chunk text"
embed_ingest -> vectordb: "vectors + metadata"
chunker -> docstore: "chunk payloads"

user -> query_embed: "question text"
query_embed -> retriever: "query vector"
retriever -> vectordb: "ANN/hybrid lookup"
vectordb -> reranker: "candidate IDs + scores"
reranker -> docstore: "fetch chunk payloads"
docstore -> prompt_builder: "top evidence"
user -> prompt_builder: "user intent"
prompt_builder -> llm: "grounded prompt"
llm -> answer: "generated response"
```

## Examples: Usage or Theory

### Example 1: RAG pipeline input/output

Input (query):

```json
{
  "user_query": "What changed in OAuth 2.0 security guidance?",
  "top_k": 8,
  "filters": {
    "source": ["rfc", "internal-security-standards"],
    "updated_after": "2024-01-01"
  }
}
```

Output (grounded answer shape):

```json
{
  "answer": "The current guidance deprecates several legacy patterns and tightens redirect URI and token handling requirements.",
  "citations": [
    {
      "source_id": "rfc9700",
      "chunk_id": "rfc9700#4.14",
      "score": 0.91
    }
  ],
  "confidence": 0.83,
  "retrieval": {
    "candidate_count": 42,
    "top_k": 8
  }
}
```

### Example 2: Engineering checklist for robust RAG

| Control                                 | Why                                |
| --------------------------------------- | ---------------------------------- |
| Chunking strategy per document type     | Better retrieval precision         |
| Metadata filters (ACL, recency, source) | Correctness and access control     |
| Re-ranker                               | Better relevance than ANN alone    |
| Citation requirement                    | Auditable grounded outputs         |
| Retrieval evaluation set                | Prevent silent quality regressions |

## References and further reading

[1] P. Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," arXiv:2005.11401, 2020/2021. [Online]. Available: https://arxiv.org/abs/2005.11401

[2] pgvector, "pgvector README." Accessed: Mar. 10, 2026. [Online]. Available: https://github.com/pgvector/pgvector

[3] Pinecone, "Semantic search." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.pinecone.io/guides/search/semantic-search

[4] Weaviate, "Vector search concepts." Accessed: Mar. 10, 2026. [Online]. Available: https://docs.weaviate.io/weaviate/search/similarity

[5] OpenAI, "Embeddings." Accessed: Mar. 10, 2026. [Online]. Available: https://platform.openai.com/docs/guides/embeddings

[6] OpenAI Agents SDK, "Tracing." Accessed: Mar. 10, 2026. [Online]. Available: https://openai.github.io/openai-agents-python/tracing/

[7] OpenAI, "Embeddings FAQ." Accessed: Mar. 10, 2026. [Online]. Available: https://help.openai.com/en/articles/6824809-embeddings-faq
