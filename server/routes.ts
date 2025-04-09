import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateResearch } from "./openai";
import { z } from "zod";
import { researchSessionDepthSchema, researchSessionIdeaTypeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate research API endpoint
  app.post("/api/research/generate", async (req, res) => {
    try {
      // Validate request body
      const schema = z.object({
        topic: z.string().min(3, "Topic must be at least 3 characters long").max(300),
        researchDepth: researchSessionDepthSchema,
        ideaType: researchSessionIdeaTypeSchema,
      });

      const parsedBody = schema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ 
          message: "Invalid request body", 
          errors: parsedBody.error.format() 
        });
      }

      const { topic, researchDepth, ideaType } = parsedBody.data;

      // Create research session
      const session = await storage.createResearchSession({
        topic,
        researchDepth,
        ideaType,
        userId: null, // No authentication in this version
      });

      // Generate research
      try {
        const results = await generateResearch(topic, researchDepth, ideaType);
        
        // Save results to session
        const updatedSession = await storage.saveResearchResults(session.id, results);
        
        // Return results
        return res.status(200).json({
          sessionId: updatedSession.id,
          results,
        });
      } catch (error: any) {
        console.error("Error generating research:", error);
        return res.status(500).json({ 
          message: "Failed to generate research", 
          error: error.message,
          sessionId: session.id
        });
      }
    } catch (error: any) {
      console.error("Server error:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // Get research session by ID
  app.get("/api/research/session/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid session ID" });
      }

      const session = await storage.getResearchSession(id);
      if (!session) {
        return res.status(404).json({ message: "Research session not found" });
      }

      return res.status(200).json(session);
    } catch (error: any) {
      console.error("Server error:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
