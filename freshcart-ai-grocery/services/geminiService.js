import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY; // stays as is

let ai = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const recipeSchema = {
  // ... your existing schema
};

export const suggestRecipe = async (ingredients) => {
  if (!ingredients.trim()) {
    throw new Error("Ingredients cannot be empty.");
  }

  if (!API_KEY || !ai) {
    throw new Error("AI recipe feature is not configured (missing API key).");
  }

  const prompt = `Based on the following ingredients, suggest a delicious recipe. Be creative! Ingredients: ${ingredients}`;

  // ...rest of your existing code
};
