// Adapted from https://equk.co.uk/2023/02/02/generating-slug-from-title-in-astro/

import { GENERATE_SLUG_FROM_TITLE } from "../config";

/**
 * Deterministic, URL-safe slug: decompose accents, lowercase, spaces to "-",
 * then strip anything outside [a-z0-9-]. Safe for tags/titles containing
 * spaces, slashes, Unicode or other special characters.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD") // split accented chars into base + combining mark
    .replace(/[̀-ͯ]/g, "") // drop the combining marks
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Slug for a tag used as a route segment and in tag links. */
export function tagSlug(tag: string): string {
  return slugify(tag);
}

/** Post slug: derived from the title when enabled, else the content id. */
export default function (title: string, staticSlug: string): string {
  return GENERATE_SLUG_FROM_TITLE ? slugify(title) : staticSlug;
}
