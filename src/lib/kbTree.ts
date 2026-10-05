/**
 * Builds a directory tree from flat KB entry ids, mirroring the real folder
 * layout under src/content/kb/.
 *
 * An `index` entry (e.g. "scm/index") is the page of its *directory*, so the
 * folder name itself becomes the link. Everything else is a leaf. A directory
 * without an index entry is still rendered, just without a link.
 *
 * A numeric filename prefix ("01-git.md") orders the entry but is stripped from
 * the URL, so reordering files never changes a link.
 */

/** Leading "01-", "02_", "03." used purely to order files in a folder. */
const ORDER_PREFIX = /^\d+[-_.]/;

const stripOrder = (segment: string) => segment.replace(ORDER_PREFIX, "");

export interface TreeNode {
  /** Path segment, e.g. "scm" or "branching". */
  name: string;
  /** Full path from the kb root, e.g. "scm/branching" - prefix stripped. */
  path: string;
  /** Original segment including any "01-" prefix; orders siblings. */
  sortKey: string;
  /** Title of the page backing this node, if there is one. */
  title: string | null;
  /** Link target, if a page backs this node. */
  href: string | null;
  /**
   * True for a real directory on disk. Set by an `index` entry or by having
   * children, so a folder holding only an index.md still reads as a folder.
   */
  isDirectory: boolean;
  children: TreeNode[];
}

export interface TreeInput {
  /** Collection entry id, e.g. "scm/git" or "scm/index". */
  id: string;
  title: string;
}

export function buildKbTree(entries: TreeInput[]): TreeNode[] {
  const root: TreeNode = {
    name: "",
    path: "",
    sortKey: "",
    title: null,
    href: null,
    isDirectory: true,
    children: [],
  };
  const byPath = new Map<string, TreeNode>([["", root]]);

  // Walks (creating as needed) to the node addressed by `parts`.
  const nodeAt = (parts: string[]): TreeNode => {
    let node = root;
    let path = "";
    for (const segment of parts) {
      const name = stripOrder(segment);
      path = path ? `${path}/${name}` : name;
      let child = byPath.get(path);
      if (!child) {
        child = {
          name,
          path,
          sortKey: segment,
          title: null,
          href: null,
          isDirectory: false,
          children: [],
        };
        byPath.set(path, child);
        node.children.push(child);
      }
      node = child;
    }
    return node;
  };

  for (const entry of entries) {
    const parts = entry.id.split("/");
    // "scm/index" describes the "scm" directory, not a file inside it.
    const fromIndex = stripOrder(parts.at(-1) ?? "") === "index";
    if (fromIndex) parts.pop();
    const node = nodeAt(parts);
    node.title = entry.title;
    node.href = node.path ? `/kb/${node.path}` : "/kb";
    // An index.md proves this path is a directory even before it has children.
    if (fromIndex) node.isDirectory = true;
  }

  // Anything with children is a directory too, however it was discovered.
  const markDirectories = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      if (node.children.length > 0) node.isDirectory = true;
      markDirectories(node.children);
    }
  };
  markDirectories(root.children);

  // Directories before files, alphabetical within each - the convention every
  // file browser uses, and kinder to read than `tree`'s pure alpha sort.
  const sortTree = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      const dirFirst = Number(b.isDirectory) - Number(a.isDirectory);
      // sortKey keeps the "01-" prefix, so filenames control the order.
      return dirFirst || a.sortKey.localeCompare(b.sortKey);
    });
    for (const node of nodes) sortTree(node.children);
  };
  sortTree(root.children);

  return root.children;
}

export interface Crumb {
  title: string;
  /** null for a folder with no index.md - a label, not a destination. */
  href: string | null;
}

/**
 * Walks the tree along `path` to produce the breadcrumb trail, excluding the
 * "/kb" root itself (the layout renders that crumb). Unknown segments stop the
 * walk rather than throwing, so a stale link degrades to a shorter trail.
 */
export function breadcrumbsFor(nodes: TreeNode[], path: string): Crumb[] {
  const segments = path
    .replace(/^\/kb(?=\/|$)/, "")
    .split("/")
    .filter(Boolean);

  const crumbs: Crumb[] = [];
  let level = nodes;
  for (const segment of segments) {
    const node = level.find((n) => n.name === segment);
    if (!node) break;
    crumbs.push({ title: node.title ?? node.name, href: node.href });
    level = node.children;
  }
  return crumbs;
}
