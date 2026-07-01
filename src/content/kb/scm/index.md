---
title: "Source Code Management (SCM)"
category: "Software Development"
tags:
  - "git"
  - "scm"
draft: true
sourcePath: "docs/scm/index.md"
---

**Source Code Management (SCM)** refers to the tools and practices that help developers track and control changes to code over time.  
Think of SCM as the "time machine" for your software projects — it lets you go back in time, see what changed, who changed it, and why.

An SCM system records every modification to the codebase in a **repository**.
People can collaborate, merge their work, and roll back to previous versions when something breaks.

There are two main types of SCM systems:

| Type            | Description                                                                                           | Examples           |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------------------ |
| **Centralized** | One main server holds the code; all developers commit to it directly.                                 | SVN, CVS, Perforce |
| **Distributed** | Every developer has a full local copy of the repository. Changes are shared via push/pull operations. | Git, Mercurial     |

!! info
Centralized SCM systems are pretty much outdated at this point.
The most popular distributed SCM system today is Git, provided by platforms like GitHub, GitLab, and Bitbucket.

**Git vs GitHub/GitLab:**

Git is a distributed version control system (DVCS) that lets you work on the same project from multiple computers.
It is a CLI tool that runs on your local machine, managing your local repository.
GitHub and GitLab are software products, (cloud-based) hosting services for Git repositories.
With GitHub/GitLab etc. you have one "remote" repository, that you (and your colleagues) can clone to your local machine.
The local repository knows about the remote repository, and you can push and pull changes to and from it.
So you use git to work locally and pull/push to/from GitHub/GitLab.
Pull-Request / Merge-Requests are a GitHub/GitLab feature, not a `git` feature!
More on this at [Branching](/kb/scm/branching) and [Pull Requests](/kb/scm/mr-pr).

---

## Why do we need it? Where do we use it?

Without SCM, teamwork in coding projects would be chaos.
Imagine five people editing the same file and saving it as `final_v2_really_final_FIXED.cpp` 😬.
SCM solves that.

**Key benefits:**

- 🧩 **Collaboration** — Multiple developers can work on the same project without stepping on each other's toes.
- 🕵️ **Traceability** — Every change has a timestamp, author, and description (commit message).
- 🔙 **Version control** — You can revert to previous versions if something breaks.
- ⚙️ **Branching and merging** — Experiment safely on a separate branch and merge it when ready.
- 🧠 **Continuous integration** — SCM integrates tightly with CI/CD tools like Jenkins or GitHub Actions.

**Where SCM is used:**

- Software development (obviously 😄)
- DevOps stuff - pipelines, configs, manifests, ..
- Documentation (technical docs in Markdown or LaTeX)
- Configuration/Infrastructure management (e.g., "Infrastructure as Code" with Terraform, Ansible Playbooks, ..)

---

## History Lesson

SCM has evolved **massively** since the early days of software engineering.
Here’s a quick timeline:

| Year     | System                                | Description                                                                    | Related Topics                         |
| -------- | ------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| **1972** | **SCCS (Source Code Control System)** | One of the first SCM tools, created by Bell Labs for UNIX systems.             | UNIX, Shell scripting                  |
| **1982** | **RCS (Revision Control System)**     | Improved version tracking for individual files using delta compression.        | Text diffing algorithms                |
| **1990** | **CVS (Concurrent Versions System)**  | Introduced collaboration over networks — a game changer for teams.             | Networking, Client-Server architecture |
| **2000** | **Subversion (SVN)**                  | Designed as a "better CVS" — centralized but more robust and atomic.           | Client-Server models                   |
| **2005** | **Git** (by Linus Torvalds)           | Distributed version control, lightning-fast, and open-source. Dominates today. | Linux Kernel, Open Source, DevOps      |
| **2005** | **Mercurial**                         | Similar to Git but with a focus on simplicity and usability.                   | Git alternatives                       |

---

## Interaction with other topics?

TBD

## Examples: Usage or Theory

Let’s see SCM in action — using Git, the most popular SCM system today.

**Example 1: Basic Git Workflow**

```shell
# Clone a repository
git clone https://github.com/example/project.git

# Make changes
nano main.py

# Stage and commit changes
git add main.py
git commit -m "fix: fix bug in main loop"

# Push to remote
git push origin main
```

**Example 2: Branching**

```shell
git checkout -b feature/new-ui
# ... work on feature ...
git add .
git commit -m "feat: add new UI components"
git push origin feature/new-ui
```

This lets you experiment without touching the main branch — and merge it later with:

```shell
git merge feature/new-ui
```

**Example 3: Resolving Conflicts**

If two developers change the same file, Git marks the conflicting sections.
You’ll have to manually edit and resolve them before committing again.
Painful at first, but a great way to understand collaboration.

## References and Further Reading

- [Pro Git Book (free) — The official Git book, highly recommended 📖](https://git-scm.com/book/en/v2)
- [W3 Schools](https://www.w3schools.com/git/)
