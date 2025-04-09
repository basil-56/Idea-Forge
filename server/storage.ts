import { users, type User, type InsertUser, type ResearchResult, type ResearchResultData } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveResearchResult(result: ResearchResultData & { userId?: number | null }): Promise<ResearchResult>;
  getResearchResults(userId?: number): Promise<ResearchResult[]>;
  getResearchResultById(id: number): Promise<ResearchResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private researchResults: Map<number, ResearchResult>;
  private currentUserId: number;
  private currentResearchId: number;

  constructor() {
    this.users = new Map();
    this.researchResults = new Map();
    this.currentUserId = 1;
    this.currentResearchId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveResearchResult(result: ResearchResultData & { userId?: number | null }): Promise<ResearchResult> {
    const id = this.currentResearchId++;
    const timestamp = new Date();
    
    const researchResult: ResearchResult = {
      id,
      userId: result.userId || null,
      topic: result.topic,
      summary: result.summary,
      marketAnalysis: result.marketAnalysis,
      keyFindings: result.keyFindings,
      productIdeas: result.productIdeas,
      futureDirections: result.futureDirections,
      createdAt: timestamp
    };
    
    this.researchResults.set(id, researchResult);
    return researchResult;
  }

  async getResearchResults(userId?: number): Promise<ResearchResult[]> {
    const results = Array.from(this.researchResults.values());
    
    if (userId) {
      return results.filter(result => result.userId === userId);
    }
    
    return results;
  }

  async getResearchResultById(id: number): Promise<ResearchResult | undefined> {
    return this.researchResults.get(id);
  }
}

export const storage = new MemStorage();
