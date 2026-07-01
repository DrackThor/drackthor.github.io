---
title: "Neural Networks"
category: "Artificial Intelligence"
tags:
  - "ai"
  - "machine-learning"
  - "deep-learning"
  - "neural-networks"
draft: true
sourcePath: "docs/ai/neural-networks.md"
---

Neural networks are parameterized function approximators built from layers of linear operations and non-linear activations. Modern AI systems rely on neural networks for language, vision, speech, recommendation, forecasting, and control tasks [1], [2].

## What is it?

A neural network maps an input vector `x` to an output `y` through learned weights.

Core concepts:

- Parameters: weights and biases to optimize
- Forward pass: compute predictions
- Loss function: measure prediction error
- Backpropagation: compute gradients
- Optimizer: update parameters (for example SGD, Adam)

Neural networks are trained statistically; they do not "store facts" as a database. They encode patterns in weights and activations.

## Why do we need it? Where do we use it?

We use neural networks when rule-based systems cannot model complexity well enough:

- Natural language understanding and generation
- Computer vision and video tasks
- Speech recognition and synthesis
- Anomaly detection and forecasting
- Policy/control in robotics and operations

In 2026, most high-value AI systems are hybrid: neural models + retrieval + tools.

## History Lesson

| When | What                                                                                            |
| ---- | ----------------------------------------------------------------------------------------------- |
| 1997 | LSTM introduced a practical mechanism for long-range sequence dependencies [3].                 |
| 2015 | ResNet demonstrated deep residual learning at scale in vision [4].                              |
| 2017 | Transformer replaced recurrence with attention and became the dominant foundation for LLMs [1]. |
| 2020 | Diffusion modeling became practical for high-quality generation tasks [5].                      |

## Interaction with other topics?

- [LLMs](/kb/ai/llms): Transformer-based neural networks for language and reasoning.
- [RAG](/kb/ai/rag): Neural encoders create embeddings used for retrieval.
- [AI solution architecture](/kb/ai/solution-architecture): Places model inference inside a full runtime.
- [Security](/kb/ai/security): Adversarial robustness and misuse resistance are system-level concerns.

## How does it work?

### From neurons to deep networks

At layer `l`, a common form is:

```text
h_l = activation(W_l * h_(l-1) + b_l)
```

The network stacks many such layers. During training:

1. Run a forward pass to compute prediction.
2. Compute loss against target.
3. Backpropagate gradients.
4. Update parameters with optimizer.
5. Repeat across batches and epochs.

### Major architecture families

| Family             | Core Idea                               | Typical Use Cases                          |
| ------------------ | --------------------------------------- | ------------------------------------------ |
| MLP / Feed-forward | Dense layers over feature vectors       | Tabular ML, simple classifiers             |
| CNN                | Local kernels + weight sharing          | Vision, medical imaging, detection         |
| RNN / LSTM / GRU   | Recurrent state across sequence steps   | Time series, speech, legacy NLP            |
| Transformer        | Self-attention over token sequences     | LLMs, multimodal foundation models         |
| Autoencoder / VAE  | Learn compressed latent representations | Representation learning, anomaly detection |
| GAN                | Generator vs discriminator game         | Image synthesis, style transfer            |
| Diffusion          | Iterative denoising generation process  | Image/audio/video generation               |

### Training modes you should know

- Supervised learning: labeled data and explicit targets
- Self-supervised learning: supervision from data structure itself (dominant for LLM pretraining)
- Fine-tuning: adapt base model to domain/task
- Reinforcement learning: optimize policy by reward signals

### Common failure modes

- Overfitting (good training loss, poor real-world generalization)
- Data leakage (evaluation contamination)
- Distribution shift (production inputs differ from training)
- Spurious correlations (model learns shortcuts)

## Examples: Usage or Theory

### Example 1: Architecture selection by problem type

| Problem                    | Recommended Starting Architecture  | Why                                   |
| -------------------------- | ---------------------------------- | ------------------------------------- |
| FAQ chatbot                | Transformer + RAG                  | Language quality + grounded retrieval |
| Defect detection on images | CNN or Vision Transformer          | Spatial pattern modeling              |
| Next-day demand forecast   | LSTM/Transformer time-series model | Sequence dependency modeling          |
| Log anomaly detection      | Autoencoder + thresholding         | Reconstruction-based anomaly signal   |

### Example 2: Minimal training loop skeleton (theory)

```python
for epoch in range(num_epochs):
    for x_batch, y_batch in dataloader:
        optimizer.zero_grad()
        y_pred = model(x_batch)
        loss = criterion(y_pred, y_batch)
        loss.backward()
        optimizer.step()
```

This loop appears simple, but practical systems add mixed precision, gradient clipping, checkpointing, distributed training, and validation gates.

## References and further reading

[1] A. Vaswani et al., "Attention Is All You Need," arXiv:1706.03762, 2017/2023. [Online]. Available: https://arxiv.org/abs/1706.03762

[2] I. Goodfellow, Y. Bengio, and A. Courville, _Deep Learning_. MIT Press, 2016. [Online]. Available: https://www.deeplearningbook.org/

[3] S. Hochreiter and J. Schmidhuber, "Long Short-Term Memory," _Neural Computation_, vol. 9, no. 8, pp. 1735-1780, 1997. [Online]. Available: https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory

[4] K. He, X. Zhang, S. Ren, and J. Sun, "Deep Residual Learning for Image Recognition," arXiv:1512.03385, 2015/2016. [Online]. Available: https://arxiv.org/abs/1512.03385

[5] J. Ho, A. Jain, and P. Abbeel, "Denoising Diffusion Probabilistic Models," arXiv:2006.11239, 2020. [Online]. Available: https://arxiv.org/abs/2006.11239
