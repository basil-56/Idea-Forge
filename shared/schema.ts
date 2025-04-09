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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const researchSessions = pgTable("research_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  topic: text("topic").notNull(),
  researchDepth: text("research_depth").notNull().default("standard"),
  ideaType: text("idea_type").notNull().default("all"),
  results: jsonb("results"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertResearchSessionSchema = createInsertSchema(researchSessions).pick({
  userId: true,
  topic: true,
  researchDepth: true,
  ideaType: true,
});

export const researchSessionDepthSchema = z.enum(["basic", "standard", "deep"]);
export const researchSessionIdeaTypeSchema = z.enum(["all", "product", "service", "tech"]);

export type InsertResearchSession = z.infer<typeof insertResearchSessionSchema>;
export type ResearchSession = typeof researchSessions.$inferSelect;
