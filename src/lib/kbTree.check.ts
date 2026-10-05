/**
 * Self-check for the KB tree builder. Run with: node src/lib/kbTree.check.ts
 * (Node 22 strips the types; `make test` runs this.)
 */
import assert from "node:assert/strict";
import { breadcrumbsFor, buildKbTree, type TreeNode } from "./kbTree.ts";

const tree = buildKbTree([
  { id: "scm/git", title: "Git" },
  { id: "scm/index", title: "Source Code Management (SCM)" },
  { id: "scm/branching", title: "Git Branching Strategies" },
  { id: "iam/authentication/oidc", title: "OpenID Connect (OIDC)" },
  { id: "iam/authentication/index", title: "Authentication (AuthN) and MFA" },
  { id: "misc/dag", title: "Directed Acyclic Graph (DAG)" },
  { id: "virtualization/index", title: "Virtualization" },
]);

const find = (nodes: TreeNode[], name: string): TreeNode => {
  const hit = nodes.find((n) => n.name === name);
  assert.ok(hit, `expected a node named "${name}"`);
  return hit;
};

// Directories sort before files, alphabetically within each group.
assert.deepEqual(
  tree.map((n) => n.name),
  ["iam", "misc", "scm", "virtualization"],
);

// An index entry titles and links its *directory*, and is not a child of it.
const scm = find(tree, "scm");
assert.equal(scm.title, "Source Code Management (SCM)");
assert.equal(scm.href, "/kb/scm");
assert.deepEqual(
  scm.children.map((n) => n.name),
  ["branching", "git"],
);

// Nesting deeper than one level keeps working.
const authn = find(find(tree, "iam").children, "authentication");
assert.equal(authn.href, "/kb/iam/authentication");
assert.deepEqual(
  authn.children.map((n) => n.name),
  ["oidc"],
);

// A directory with no index entry is still a node, just without a link.
const iam = find(tree, "iam");
assert.equal(iam.href, null);
assert.equal(iam.title, null);

// A leaf keeps its own link.
assert.equal(find(scm.children, "git").href, "/kb/scm/git");

// A folder holding only an index.md is still a folder, not a file - it mirrors
// a real directory on disk, it just has nothing inside it yet.
const virt = find(tree, "virtualization");
assert.equal(virt.isDirectory, true);
assert.deepEqual(virt.children, []);

// A leaf is not a directory.
assert.equal(find(scm.children, "git").isDirectory, false);

// Breadcrumbs name every ancestor, using titles where a page supplies one.
assert.deepEqual(breadcrumbsFor(tree, "/kb/scm/git"), [
  { title: "Source Code Management (SCM)", href: "/kb/scm" },
  { title: "Git", href: "/kb/scm/git" },
]);

// A folder with no index.md is a label in the trail, not a link.
assert.deepEqual(breadcrumbsFor(tree, "/kb/misc/dag"), [
  { title: "misc", href: null },
  { title: "Directed Acyclic Graph (DAG)", href: "/kb/misc/dag" },
]);

// Three levels deep still resolves each ancestor.
assert.equal(breadcrumbsFor(tree, "/kb/iam/authentication/oidc").length, 3);

// The root itself has no trail, and an unknown path degrades instead of throwing.
assert.deepEqual(breadcrumbsFor(tree, "/kb"), []);
assert.deepEqual(breadcrumbsFor(tree, "/kb/nope/deeper"), []);

// A numeric filename prefix orders siblings but never reaches the URL.
const ordered = buildKbTree([
  { id: "scm/index", title: "SCM" },
  { id: "scm/02-branching", title: "Branching" },
  { id: "scm/01-git", title: "Git" },
  { id: "scm/10-mr-pr", title: "PRs" },
  { id: "scm/03-naming", title: "Naming" },
]);
const scmOrdered = find(ordered, "scm");

// Order follows the prefix, so 10 sorts after 03 rather than after 01.
assert.deepEqual(
  scmOrdered.children.map((n) => n.name),
  ["git", "branching", "naming", "mr-pr"],
);

// Links carry the clean name, so reordering files never breaks a link.
assert.deepEqual(
  scmOrdered.children.map((n) => n.href),
  ["/kb/scm/git", "/kb/scm/branching", "/kb/scm/naming", "/kb/scm/mr-pr"],
);

// Breadcrumbs resolve against the clean path too.
assert.deepEqual(breadcrumbsFor(ordered, "/kb/scm/git"), [
  { title: "SCM", href: "/kb/scm" },
  { title: "Git", href: "/kb/scm/git" },
]);

console.log("kbTree: all checks passed");
