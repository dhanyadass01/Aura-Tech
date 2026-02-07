
import { GoogleGenAI } from "@google/genai";

export async function generateProjectSummary(projectName: string, projectType: string) {
  // Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, enthusiastic 2-sentence confirmation message for a new tech project titled "${projectName}" which is a "${projectType}". Keep it professional for a tech company named AURA TECH.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini failed, using fallback:", error);
    return `We are excited to begin work on ${projectName}. Our team will ensure top-notch quality for your ${projectType} project.`;
  }
}
