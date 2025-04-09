import { users, type User, type InsertUser, researchSessions, type ResearchSession, type InsertResearchSession } from "@shared/schema";
import { ResearchResults } from "@shared/types";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Research Sessions
  createResearchSession(session: InsertResearchSession): Promise<ResearchSession>;
  getResearchSession(id: number): Promise<ResearchSession | undefined>;
  getUserResearchSessions(userId: number): Promise<ResearchSession[]>;
  saveResearchResults(id: number, results: ResearchResults): Promise<ResearchSession>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private researchSessions: Map<number, ResearchSession>;
  private userIdCounter: number;
  private sessionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.researchSessions = new Map();
    this.userIdCounter = 1;
    this.sessionIdCounter = 1;
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
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createResearchSession(session: InsertResearchSession): Promise<ResearchSession> {
    const id = this.sessionIdCounter++;
    const createdAt = new Date();
    const newSession: ResearchSession = { 
      ...session, 
      id, 
      results: null,
      createdAt
    };
    this.researchSessions.set(id, newSession);
    return newSession;
  }

  async getResearchSession(id: number): Promise<ResearchSession | undefined> {
    return this.researchSessions.get(id);
  }

  async getUserResearchSessions(userId: number): Promise<ResearchSession[]> {
    return Array.from(this.researchSessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async saveResearchResults(id: number, results: ResearchResults): Promise<ResearchSession> {
    const session = await this.getResearchSession(id);
    if (!session) {
      throw new Error(`Research session with id ${id} not found`);
    }
    
    const updatedSession: ResearchSession = {
      ...session,
      results
    };
    
    this.researchSessions.set(id, updatedSession);
    return updatedSession;
  }
}

export const storage = new MemStorage();
