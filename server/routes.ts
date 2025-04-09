import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateResearch } from "./api/openai";
import { researchResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Research Generation Route
  app.post("/api/research/generate", async (req, res) => {
    try {
      const requestSchema = z.object({
        topic: z.string().min(3),
        detailed: z.boolean().optional().default(false),
      });
      
      const validatedData = requestSchema.parse(req.body);
      
      const researchData = await generateResearch(
        validatedData.topic, 
        validatedData.detailed
      );
      
      // Validate the research data against our schema
      const validatedResearch = researchResultSchema.parse(researchData);
      
      return res.status(200).json(validatedResearch);
    } catch (error) {
      console.error("Error generating research:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate research" 
      });
    }
  });

  // Save Research Result
  app.post("/api/research/save", async (req, res) => {
    try {
      const validatedData = researchResultSchema.parse(req.body);
      
      // In a real application with authentication, we would associate with user
      // const userId = req.user?.id; 
      
      const savedResearch = await storage.saveResearchResult({
        ...validatedData,
        userId: null, // Would come from authenticated user
      });
      
      return res.status(201).json(savedResearch);
    } catch (error) {
      console.error("Error saving research:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to save research" 
      });
    }
  });

  // Get Saved Research Results
  app.get("/api/research", async (req, res) => {
    try {
      // In a real application with authentication, we would filter by user
      // const userId = req.user?.id;
      
      const researchResults = await storage.getResearchResults();
      
      return res.status(200).json(researchResults);
    } catch (error) {
      console.error("Error fetching research results:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to fetch research results" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
