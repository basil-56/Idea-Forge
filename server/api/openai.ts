import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "missing_api_key" 
});

const DEFAULT_SYSTEM_PROMPT = `
You are an expert research assistant specializing in market analysis and product innovation. 
Your task is to generate a comprehensive research report based on the provided topic. 
Structure your response exactly according to the following JSON format:

{
  "topic": "The user's original topic",
  "summary": "Brief summary of this research",
  "marketAnalysis": "Market trends and projections",
  "keyFindings": ["Finding 1", "Finding 2", "Finding 3", "Finding 4"],
  "productIdeas": [
    {
      "title": "Product Idea Name",
      "description": "Detailed description of the product idea",
      "potentialImpact": "Analysis of the potential impact"
    },
    {
      "title": "Product Idea Name",
      "description": "Detailed description of the product idea",
      "potentialImpact": "Analysis of the potential impact"
    },
    {
      "title": "Product Idea Name",
      "description": "Detailed description of the product idea",
      "potentialImpact": "Analysis of the potential impact"
    }
  ],
  "futureDirections": "Potential future developments in this area"
}

Ensure all content is fact-based, balanced, and deeply insightful. 
Avoid using placeholder text or generic statements.
Response MUST be valid JSON.
`;

const DETAILED_SYSTEM_PROMPT = `
You are an expert research assistant specializing in market analysis and product innovation. 
Your task is to generate a detailed and comprehensive research report based on the provided topic. 
Go deeper into the analysis and provide more specific, actionable insights.
Structure your response exactly according to the following JSON format:

{
  "topic": "The user's original topic",
  "summary": "Detailed executive summary of this research",
  "marketAnalysis": "Comprehensive market trends, statistics, projections and competitive landscape",
  "keyFindings": ["Finding 1", "Finding 2", "Finding 3", "Finding 4", "Finding 5", "Finding 6"],
  "productIdeas": [
    {
      "title": "Product Idea Name",
      "description": "Detailed description of the product idea with technical considerations",
      "potentialImpact": "Analysis of the potential market impact, challenges, and opportunities"
    },
    {
      "title": "Product Idea Name",
      "description": "Detailed description of the product idea with technical considerations",
      "potentialImpact": "Analysis of the potential market impact, challenges, and opportunities"
    },
    {
      "title": "Product Idea Name",
      "description": "Detailed description of the product idea with technical considerations",
      "potentialImpact": "Analysis of the potential market impact, challenges, and opportunities"
    }
  ],
  "futureDirections": "Potential future developments, emerging technologies, and strategic considerations"
}

Ensure all content is fact-based, balanced, and deeply insightful. 
Include specific data points and detailed analysis where possible.
Response MUST be valid JSON.
`;

export async function generateResearch(topic: string, detailed: boolean = false) {
  try {
    const userPrompt = `Research topic: "${topic}". Generate a comprehensive research report including market analysis and innovative product ideas.`;
    
    const systemPrompt = detailed ? DETAILED_SYSTEM_PROMPT : DEFAULT_SYSTEM_PROMPT;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });
    
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Failed to generate research content");
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(`Failed to generate research: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
