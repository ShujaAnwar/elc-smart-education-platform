import { GoogleGenAI } from "@google/genai";

// Standard helper to get AI response following @google/genai guidelines
export const getAiResponse = async (userMessage: string) => {
  // Use process.env.API_KEY directly as a hard requirement. 
  // Cast to any to bypass TSC environment mismatch during build time.
  const apiKey = (process as any).env.API_KEY;

  if (!apiKey) {
    return "AI Chat is currently unavailable. Please contact us via phone or WhatsApp.";
  }

  try {
    // Initialize GoogleGenAI with named apiKey parameter using process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: (process as any).env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are the AI Assistant for "The Excellent Language Center" (ELC) in Karachi, Pakistan. 
        Founder: Sir Salman. 
        Services: English Language (Spoken, Grammar, IELTS) and Computer Training (Basic IT, Office, Web, AI tools).
        Address: Near Pearl Food Center, Saudabad, Malir, Karachi.
        Phone: 0321-2652922.
        Be helpful, professional, and encourage students to enroll. Keep responses concise and friendly.`,
      },
    });
    
    // Use .text property directly (do not call as a function)
    return response.text || "I'm sorry, I couldn't process that. Can you try again?";
  } catch (error) {
    console.error("AI Error:", error);
    return "Something went wrong. Please try again later or call us directly.";
  }
};
