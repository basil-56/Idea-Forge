import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const researchResults = pgTable("research_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  topic: text("topic").notNull(),
  summary: text("summary").notNull(),
  marketAnalysis: text("market_analysis").notNull(),
  keyFindings: jsonb("key_findings").notNull(),
  productIdeas: jsonb("product_ideas").notNull(),
  futureDirections: text("future_directions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertResearchResultSchema = createInsertSchema(researchResults).omit({
  id: true,
  createdAt: true,
});

// Define Zod schema for product idea
export const productIdeaSchema = z.object({
  title: z.string(),
  description: z.string(),
  potentialImpact: z.string()
});

// Define Zod schema for research result
export const researchResultSchema = z.object({
  topic: z.string(),
  summary: z.string(),
  marketAnalysis: z.string(),
  keyFindings: z.array(z.string()),
  productIdeas: z.array(productIdeaSchema),
  futureDirections: z.string()
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ResearchResult = typeof researchResults.$inferSelect;
export type InsertResearchResult = z.infer<typeof insertResearchResultSchema>;
export type ProductIdea = z.infer<typeof productIdeaSchema>;
export type ResearchResultData = z.infer<typeof researchResultSchema>;
