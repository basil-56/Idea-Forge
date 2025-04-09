export interface ResearchResults {
  overview: {
    summary: string;
    keyChallenges: string[];
    currentSolutions: string[];
    opportunityAreas: string[];
  };
  marketAnalysis: {
    marketSize: string;
    keyPlayers: {
      name: string;
      description: string;
      icon: string;
    }[];
    fundingLandscape: string;
    fundingItems: string[];
  };
  technicalAnalysis: {
    technologies: {
      name: string;
      effectiveness: number;
      cost: string;
      maintenance: string;
      lifespan: string;
    }[];
    emergingTechnologies: {
      name: string;
      description: string;
    }[];
  };
  innovativeIdeas: {
    id: string;
    title: string;
    description: string;
    category: "Product" | "Service" | "Technology";
    benefits: string[];
    targetImpact: string[];
    developmentNeeds: string[];
    isSaved: boolean;
  }[];
  nextSteps: {
    research: string[];
    ideaDevelopment: string[];
    stakeholders: string[];
  };
}

export interface GenerateResearchRequest {
  topic: string;
  researchDepth: "basic" | "standard" | "deep";
  ideaType: "all" | "product" | "service" | "tech";
}
