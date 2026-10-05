---
title: "Naming Conventions: Commits, Branches, Tags & Releases"
category: "Software Development"
tags:
  - "git"
  - "scm"
  - "branching"
  - "conventions"
draft: false
---

Naming is the part of version control nobody teaches and everybody argues about.

The payoff isn't aesthetic.
Consistent names let machines do work for you: generate changelogs, calculate the next version number, trigger the right pipeline, enforce the right branch protection.
Inconsistent names mean somebody writes release notes by hand on a Friday afternoon 😬

This page covers the four conventions that actually show up in real repositories: **Conventional Commits**, **Semantic Versioning**, tag/release naming, and branch naming.

---

## Conventional Commits

A spec for commit message _structure_.
The format:

```
<type>(<optional scope>)<optional !>: <description>

<optional body>

<optional footer(s)>
```

Real examples:

```bash
git commit -m "feat(auth): add OIDC login flow"
git commit -m "fix(api): handle empty pagination cursor"
git commit -m "docs: explain the staging area"
git commit -m "chore(deps): bump astro to 7.3.5"
```

### The types

| Type         | Use for                                           | Version impact |
| ------------ | ------------------------------------------------- | -------------- |
| **feat**     | A new feature                                     | MINOR          |
| **fix**      | A bug fix                                         | PATCH          |
| **docs**     | Documentation only                                | none           |
| **refactor** | Code change that neither fixes a bug nor adds one | none           |
| **perf**     | Performance improvement                           | PATCH          |
| **test**     | Adding or fixing tests                            | none           |
| **build**    | Build system or dependencies                      | none           |
| **ci**       | CI configuration and pipelines                    | none           |
| **chore**    | Everything else (housekeeping)                    | none           |
| **style**    | Formatting, whitespace, no logic change           | none           |
| **revert**   | Reverts a previous commit                         | varies         |

### Breaking changes

Two ways to flag one, both valid:

```bash
# 1. the bang
git commit -m "feat(api)!: drop support for v1 endpoints"

# 2. the footer
git commit -m "feat(api): restructure response envelope

BREAKING CHANGE: the data field is now nested under result."
```

Either one bumps **MAJOR**.
The footer version is better when you want to explain _what_ broke - which you do, because that text lands in the changelog.

> [!NOTE]
>
> The real reason to adopt this: tooling reads it.
> `semantic-release`, `release-please` and `changesets` derive the next version number and generate the changelog straight from your commit messages.
> You stop maintaining a CHANGELOG.md by hand, which is the kind of work nobody misses.

### Writing a decent description

- Imperative mood: "add retry logic", not "added" or "adds".
  Reads like a command, matching Git's own generated messages ("Merge branch...").
- Lowercase, no trailing period.
- Keep the subject under ~50 characters, hard limit 72.
- Describe **what and why**, not how.
  The diff already shows how.
- One logical change per commit.
  If the description needs an "and", you probably want two commits.

Enforce it with [commitlint](https://commitlint.js.org/) in a pre-commit hook or CI job - ten minutes of setup, and the argument never comes up again.

---

## Semantic Versioning (SemVer)

The version number format: **MAJOR.MINOR.PATCH**, e.g. `2.4.1`.

| Part      | Bump when                                   | Example            |
| --------- | ------------------------------------------- | ------------------ |
| **MAJOR** | You break backwards compatibility           | `1.9.3` → `2.0.0`  |
| **MINOR** | You add functionality, backwards compatible | `1.9.3` → `1.10.0` |
| **PATCH** | You fix a bug, backwards compatible         | `1.9.3` → `1.9.4`  |

Note `1.9.3` → `1.10.0`: these are **numbers, not decimals**.
`1.10.0` is newer than `1.9.0`.
Sorting them as strings is a classic bug.

### Pre-releases and build metadata

```
1.0.0-alpha.1       # pre-release, lower precedence than 1.0.0
1.0.0-rc.2          # release candidate
1.0.0+20260715.sha  # build metadata, ignored for precedence
```

Pre-release versions sort _before_ the plain version: `1.0.0-alpha.1` < `1.0.0-rc.1` < `1.0.0`.
Anything after `+` is informational and does not affect ordering.

### The 0.x escape hatch

`0.y.z` means "anything may change at any time".
Nothing in SemVer protects you below 1.0.0 - which is exactly why so many projects stay at 0.x forever 😅

Once you publish `1.0.0`, you've made a promise about your public API.
Take that seriously or stay on 0.x honestly.

Related: [API Versioning and Structuring](/kb/api/rest-api-versioning-structuring) - SemVer describes your package, API versioning describes your contract over the wire.
They are not the same problem.

---

## Tags and Releases

A **tag** is a Git ref pointing at a specific commit - a bookmark that doesn't move.
A **release** is a platform feature (GitHub/GitLab) built _on top of_ a tag, adding release notes and downloadable artifacts.

```bash
# annotated tag - has author, date, message, can be signed. Use this one.
git tag -a v1.4.0 -m "Release 1.4.0"

# lightweight tag - just a pointer, no metadata
git tag v1.4.0

# tags are NOT pushed by default
git push origin v1.4.0
git push origin --tags   # all of them
```

> [!NOTE]
>
> Use **annotated** tags for releases.
> Lightweight tags carry no author or date, and `git describe` treats them differently.
> The two-character difference (`-a`) is worth the habit.

### Conventions that hold up

- **Prefix with `v`:** `v1.4.0`.
  Technically redundant, universally expected, and it makes tags trivially greppable.
  SemVer itself is neutral on this - just be consistent.
- **One tag per release, never move it.**
  If `v1.4.0` was wrong, ship `v1.4.1`.
  Moving a published tag breaks everyone who already fetched it.
- **Sign release tags** (`git tag -s`) if your artifacts matter to anyone downstream.
- **Calendar versioning** (`v2026.04.0`) is a legitimate alternative when "breaking change" isn't a meaningful concept for your product - think internal services or an OS distribution.
  Pick one scheme and stick with it.

---

## Branch Names

No Git rule here, only convention - but a consistent prefix lets you write branch protection rules, CI triggers and cleanup jobs that actually work.

```
<type>/<short-description>
<type>/<ticket-id>-<short-description>
```

| Pattern    | Use for                     | Example                     |
| ---------- | --------------------------- | --------------------------- |
| `feature/` | New functionality           | `feature/oidc-login`        |
| `fix/`     | Bug fix                     | `fix/pagination-cursor`     |
| `hotfix/`  | Urgent production fix       | `hotfix/1.4.1-token-expiry` |
| `release/` | Release preparation branch  | `release/1.4.0`             |
| `chore/`   | Housekeeping, deps, tooling | `chore/bump-node-22`        |
| `docs/`    | Documentation only          | `docs/branching-guide`      |

**Rules worth following:**

- **lowercase-kebab-case.**
  Git is case-sensitive, macOS and Windows filesystems usually aren't - mixed case branch names cause genuinely confusing cross-platform bugs.
- **No spaces, no umlauts, no `~ ^ : ? * [ \`** - Git rejects most of these outright (`git check-ref-format` is the authority).
- **Include the ticket ID** if you have an issue tracker: `feature/PROJ-1234-oidc-login`.
  Most platforms then auto-link the branch to the ticket.
- **Keep it short.**
  You will type it, and it shows up in every CI log.
- **Delete merged branches.**
  A repo with 200 stale branches is a repo where nobody can find anything.
  Most platforms do it automatically on merge - turn that on.

> [!WARNING]
>
> You cannot have both a branch named `feature` and a branch named `feature/login`.
> Git stores refs as files, so `refs/heads/feature` can't be a file and a directory at the same time.
> Pick one level of nesting and stay there.

---

## Putting it together

A single change, named consistently from start to finish:

```bash
git switch -c feature/PROJ-1234-oidc-login    # branch
git commit -m "feat(auth): add OIDC login flow"  # commit
# ... review, merge via PR ...
git switch main && git pull --ff-only
git tag -a v1.5.0 -m "Release 1.5.0"          # tag (feat → MINOR bump)
git push origin v1.5.0                        # release notes generated from commits
```

The commit type decided the version bump.
The version decided the tag.
The tag triggered the release.
Nobody wrote a changelog by hand.
That's the entire point of this page.

See also: [Branching Strategies](/kb/scm/branching), [Pull Requests / Merge Requests](/kb/scm/mr-pr), [Git](/kb/scm/git).

## References and further reading

- Conventional Commits: <https://www.conventionalcommits.org/en/v1.0.0/>
- Semantic Versioning: <https://semver.org/>
- commitlint: <https://commitlint.js.org/>
- semantic-release: <https://semantic-release.gitbook.io/>
- release-please: <https://github.com/googleapis/release-please>
- Calendar Versioning: <https://calver.org/>
- `git check-ref-format` (what's actually legal in a ref name): <https://git-scm.com/docs/git-check-ref-format>
