import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.string().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "tags must be unique",
    })
    .optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: blogSchema,
});

const kbSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "tags must be unique",
    })
    .optional(),
  // Unpublished by default. Flip to false to publish an article.
  draft: z.boolean().default(true),
  // Original mkdocs path, kept for provenance during review.
  sourcePath: z.string().optional(),
});

export type KbSchema = z.infer<typeof kbSchema>;

const kbCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/kb" }),
  schema: kbSchema,
});

export const collections = {
  blog: blogCollection,
  kb: kbCollection,
};
