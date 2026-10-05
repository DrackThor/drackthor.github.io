---
title: "Source Code Management (SCM)"
category: "Software Development"
tags:
  - "git"
  - "scm"
draft: false
---

**Source Code Management (SCM)** refers to the tools and practices that help developers track and control changes to code over time.

Think of SCM as the "time machine" for your software projects - you can go back, see what changed, who changed it, and why.

An SCM system records every modification to the codebase in a **repository**.
People collaborate, merge their work, and roll back to previous versions when something breaks.
Which it will.

There are two main types of SCM systems:

| Type            | Description                                                                                           | Examples           |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------------------ |
| **Centralized** | One main server holds the code; all developers commit to it directly.                                 | SVN, CVS, Perforce |
| **Distributed** | Every developer has a full local copy of the repository. Changes are shared via push/pull operations. | Git, Mercurial     |

> **📝 Note**
>
> Centralized SCM systems are pretty much outdated at this point.
> The distributed one that won is Git, hosted on platforms like GitHub, GitLab and Bitbucket.

**Git vs GitHub/GitLab:**

Git is a distributed version control system (DVCS) that lets you work on the same project from multiple machines.
It's a CLI tool running locally, managing your local repository.

GitHub and GitLab are software products - (cloud-based) hosting services for Git repositories.
With GitHub/GitLab you have one "remote" repository that you and your colleagues clone to your machines.
Your local repository knows about the remote, and you push and pull changes to and from it.

So: you use `git` to work locally, and push/pull to/from GitHub/GitLab.
Pull Requests / Merge Requests are a GitHub/GitLab feature, **not** a `git` feature - this one catches a lot of people out.

---

## Where to go from here

| Topic                                            | What's in it                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| [Git](/kb/scm/git)                               | How Git actually works - the object model, `.git`, the three areas      |
| [Branching Strategies](/kb/scm/branching)        | What a branch is, plus Trunk-Based, GitHub Flow, Git Flow, Release Flow |
| [Pull Requests / Merge Requests](/kb/scm/mr-pr)  | Reviews, protected branches, merge strategies, fork workflow            |
| [Naming Conventions](/kb/scm/naming-conventions) | Conventional Commits, SemVer, tags, releases, branch names              |

Reading order if you're starting cold: **Git → Branching → Pull Requests → Naming Conventions**.

---

## Why do we need it? Where do we use it

Without SCM, teamwork in coding projects would be chaos.
Imagine five people editing the same file and saving it as `final_v2_really_final_FIXED.cpp` 😬.
SCM solves that.

**Key benefits:**

- 🧩 **Collaboration** - Multiple developers work on the same project without stepping on each other's toes.
- 🕵️ **Traceability** - Every change has a timestamp, author, and description (commit message).
- 🔙 **Version control** - Revert to previous versions if something breaks.
- ⚙️ **Branching and merging** - Experiment safely on a separate branch, merge it when ready.
- 🧠 **Continuous integration** - SCM integrates tightly with CI/CD tools like Jenkins or GitHub Actions.

**Where SCM is used:**

- Software development (obviously 😄)
- DevOps stuff - pipelines, configs, manifests, ..
- Documentation (technical docs in Markdown or AsciiDoc)
- Configuration/Infrastructure management (e.g. "Infrastructure as Code" with Terraform, Ansible Playbooks, ..)

---

## History Lesson

SCM has evolved **massively** since the early days of software engineering.
Here's a quick timeline:

| Year     | System                                | Description                                                                    | Related Topics                         |
| -------- | ------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| **1972** | **SCCS (Source Code Control System)** | One of the first SCM tools, created by Bell Labs for UNIX systems.             | UNIX, Shell scripting                  |
| **1982** | **RCS (Revision Control System)**     | Improved version tracking for individual files using delta compression.        | Text diffing algorithms                |
| **1990** | **CVS (Concurrent Versions System)**  | Introduced collaboration over networks - a game changer for teams.             | Networking, Client-Server architecture |
| **2000** | **Subversion (SVN)**                  | Designed as a "better CVS" - centralized but more robust and atomic.           | Client-Server models                   |
| **2005** | **Git** (by Linus Torvalds)           | Distributed version control, lightning-fast, and open-source. Dominates today. | Linux Kernel, Open Source, DevOps      |
| **2005** | **Mercurial**                         | Similar to Git but with a focus on simplicity and usability.                   | Git alternatives                       |

The platform layer came later - GitHub in 2008, GitLab in 2011 - and brought the branching models with it.
That half of the story is in [Branching Strategies](/kb/scm/branching).

---

## Interaction with other topics

SCM is rarely the end goal - it's the foundation almost everything else sits on:

- **[CI/CD](/kb/cicd)** - Pipelines trigger on pushes, tags and pull requests.
  No SCM, no CI.
  See [CI](/kb/cicd/ci) and [CD](/kb/cicd/cd).
- **[Infrastructure as Code](/kb/iac)** - Terraform and friends are only useful because the state of your infrastructure lives in a repo with a history.
- **[Configuration as Code](/kb/config)** - Same story for application config.
- **Security** - Signed commits and tags, branch protection and reviews are a real part of software supply chain security.
  The review gate in a [Pull Request](/kb/scm/mr-pr) is a control, not just a courtesy.
- **Release management** - Tags drive releases, and [Conventional Commits](/kb/scm/naming-conventions) let the version number and changelog generate themselves.

---

## Examples: Usage or Theory

Let's see SCM in action - using Git, because let's be honest, that's the one you'll use.

**Example 1: Basic Git Workflow**

```shell
# Clone a repository
git clone https://github.com/example/project.git

# Make changes
nano main.py

# Stage and commit changes
git add main.py
git commit -m "fix: handle empty input in main loop"

# Push to remote
git push origin main
```

**Example 2: Branching**

```shell
git switch -c feature/new-ui
# ... work on feature ...
git add .
git commit -m "feat: add new UI components"
git push origin feature/new-ui
```

This lets you experiment without touching the main branch - and merge it later with:

```shell
git switch main
git merge feature/new-ui
```

In a team you'd open a [Pull Request](/kb/scm/mr-pr) instead of merging locally, so the change gets reviewed and CI-checked first.

**Example 3: Resolving Conflicts**

If two developers change the same lines of a file, Git marks the conflicting sections and stops.
You edit the file, pick what's correct, then `git add` and commit.

Painful the first time, genuinely useful the rest of the time - a conflict means Git caught something that would otherwise have been silently overwritten.
Merge often and conflicts stay small.

## References and Further Reading

- [Pro Git Book (free) - the official Git book, highly recommended 📖](https://git-scm.com/book/en/v2)
- [Official Git documentation](https://git-scm.com/doc)
- [W3 Schools Git tutorial](https://www.w3schools.com/git/)
