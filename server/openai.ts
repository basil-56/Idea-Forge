import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const OPENAI_MODEL = "gpt-4o";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY not set. AI generation features will not work.");
}

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "missing-api-key"
});

export async function generateResearch(topic: string, researchDepth: string, ideaType: string) {
  try {
    const detailLevel = researchDepth === "basic" ? "brief" : 
                       researchDepth === "deep" ? "comprehensive and detailed" : 
                       "thorough";
                       
    const ideaFocus = ideaType === "all" ? "product, service, and technology" :
                     ideaType === "product" ? "product" :
                     ideaType === "service" ? "service" :
                     "technology";
    
    const systemPrompt = `You are an expert research assistant that creates detailed analysis and generates innovative ideas based on research topics.
    
Based on the topic provided, generate a comprehensive research analysis and innovative ideas package structured exactly according to the JSON format below.
Provide ${detailLevel} research focused primarily on ${ideaFocus} innovations.

Return the response in the following JSON format:
{
  "overview": {
    "summary": "A paragraph summarizing the topic, key challenges, and opportunities",
    "keyChallenges": ["Challenge 1", "Challenge 2", "Challenge 3"],
    "currentSolutions": ["Solution 1", "Solution 2", "Solution 3"],
    "opportunityAreas": ["Opportunity 1", "Opportunity 2", "Opportunity 3"]
  },
  "marketAnalysis": {
    "marketSize": "A paragraph about market size, growth projections, and key segments",
    "keyPlayers": [
      {
        "name": "Player/Company/Initiative Name",
        "description": "Brief description of what they're doing",
        "icon": "A Font Awesome icon class that represents this player (e.g. fa-building, fa-globe-americas)"
      }
    ],
    "fundingLandscape": "A paragraph about investment trends in this area",
    "fundingItems": ["Bullet point about funding source 1", "Bullet point about funding source 2"]
  },
  "technicalAnalysis": {
    "technologies": [
      {
        "name": "Technology Name",
        "effectiveness": 85, (a percentage between 60-99),
        "cost": "$-$$$$ rating",
        "maintenance": "Low/Medium/High",
        "lifespan": "Expected lifespan"
      }
    ],
    "emergingTechnologies": [
      {
        "name": "Emerging Technology Name",
        "description": "Description of the emerging technology and its potential impact"
      }
    ]
  },
  "innovativeIdeas": [
    {
      "id": "unique-id-1",
      "title": "Innovative idea title",
      "description": "Detailed paragraph describing the innovative idea",
      "category": "Product/Service/Technology",
      "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
      "targetImpact": ["Target audience or impact area 1", "Target audience or impact area 2"],
      "developmentNeeds": ["Development need 1", "Development need 2"],
      "isSaved": false
    }
  ],
  "nextSteps": {
    "research": ["Research step 1", "Research step 2", "Research step 3"],
    "ideaDevelopment": ["Development step 1", "Development step 2", "Development step 3"],
    "stakeholders": ["Stakeholder engagement step 1", "Stakeholder engagement step 2", "Stakeholder engagement step 3"]
  }
}

Generate at least 3 innovative ideas related to the topic focusing on the requested idea type. Make the research and ideas highly specific, actionable, and based on current real-world understanding.`;

    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Research Topic: ${topic}` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    return JSON.parse(content);
  } catch (error: any) {
    console.error("Error generating research:", error);
    throw new Error(`Failed to generate research: ${error.message}`);
  }
}
