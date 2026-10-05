/**
 * Tags GitHub-style markdown alerts so CSS can render them as callout boxes:
 *
 *   > [!NOTE]
 *   >
 *   > Body text.
 *
 * GFM alerts are not part of the GFM spec, so Astro's Markdown engine
 * (Sätteri) emits a plain <blockquote> whose first paragraph is the literal
 * "[!NOTE]". This plugin recognises that marker and sets a class on the
 * blockquote; the stylesheet hides the marker paragraph and draws the title.
 *
 * The plugin API intentionally exposes only `setProperty`, so tagging is all
 * it does - the marker paragraph must be its own paragraph (blank `>` line
 * after the marker) for the stylesheet to be able to hide it.
 */

export const ALERT_TYPES = ["note", "tip", "important", "warning", "caution"];

const MARKER = new RegExp("^\\[!(" + ALERT_TYPES.join("|") + ")\\]", "i");

/** Returns the alert type for a blockquote's text, or null if it is not one. */
export function alertTypeOf(text) {
  const match = String(text ?? "")
    .trimStart()
    .match(MARKER);
  return match ? match[1].toLowerCase() : null;
}

export default function satteriAlerts() {
  return {
    name: "md-alerts",
    element: {
      filter: ["blockquote"],
      visit(node, ctx) {
        const type = alertTypeOf(ctx.textContent(node));
        if (!type) return;
        ctx.setProperty(node, "className", `md-alert md-alert-${type}`);
      },
    },
  };
}
