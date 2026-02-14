
import { GoogleGenAI } from "@google/genai";
import { SurveyData } from "../types";

export const getAIInsights = async (surveyData: SurveyData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze this comprehensive anonymous survey response about drug addiction prevention from a student.
    
    Student's Profile:
    - Class: ${surveyData.class}
    - Gender: ${surveyData.gender}
    - Leisure: ${surveyData.leisure}
    
    Awareness & Risks:
    - Knowledge about drugs: ${surveyData.healthAwareness}
    - Info Source: ${surveyData.infoSource}
    - Lifestyle Value (1-5): ${surveyData.lifestyleImportance}
    - Reasons identified: ${surveyData.reasons.join(', ')}
    - Online risk (seen ads): ${surveyData.onlineAds}
    - Trust circle: ${surveyData.trustPerson}
    
    Future/Prevention:
    - Reaction to offer: ${surveyData.reactionToOffer}
    - Improvement suggestion: ${surveyData.preventionSuggestions}

    Based on this data, provide a very short, warm, and highly personalized psychological insight in Kazakh (3-4 sentences). 
    Acknowledge their lifestyle choices (leisure/trust) and reinforce their strength in saying "no" if they showed resilience.
    Tone: Mentorship, Professional, Supportive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a top-tier educational psychologist and adolescent health expert. Your goal is to empower students based on their survey answers. Language: Kazakh.",
        temperature: 0.8,
      },
    });

    return response.text || "Белсенді қатысқаныңыз үшін рақмет. Сіздің болашағыңыз өз қолыңызда!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Сауалнамаға қатысқаныңыз үшін рақмет. Салауатты өмір салтын ұстану — сіздің ең дұрыс таңдауыңыз.";
  }
};
