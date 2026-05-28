import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Astro 5 content layer: load all markdown/mdx from src/content/blog
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().max(70, "Keep titles <=70 chars for full SERP display"),
    description: z
      .string()
      .max(170, "Meta descriptions get truncated past ~160 chars"),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Hero image: remote URL or path under /public. Used for og:image too.
    heroImage: z.string().optional(),
    heroAlt: z.string().default(""),
    category: z
      .enum(["Travel", "Food", "Lifestyle", "Health", "Fitness", "Motivation"])
      .default("Travel"),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    // Set true to hide from production builds.
    draft: z.boolean().default(false),
    // Set true to label a post as paid/sponsored (adds disclosure + rel).
    sponsored: z.boolean().default(false),

    // Optional FAQ → FAQPage rich result. Keep answers plain text.
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),

    // Optional Recipe → Recipe rich result (great for food posts).
    // Durations are ISO-8601, e.g. "PT20M" = 20 minutes.
    recipe: z
      .object({
        prepTime: z.string().optional(),
        cookTime: z.string().optional(),
        totalTime: z.string().optional(),
        recipeYield: z.string().optional(),
        recipeCategory: z.string().optional(),
        recipeCuisine: z.string().optional(),
        calories: z.string().optional(),
        ingredients: z.array(z.string()),
        instructions: z.array(z.string()),
      })
      .optional(),
  }),
});

export const collections = { blog };
