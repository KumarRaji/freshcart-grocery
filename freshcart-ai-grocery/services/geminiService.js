import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the recipe.",
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the dish.",
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A single ingredient with its quantity.",
      },
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A single step of the cooking instructions.",
      },
    },
  },
  required: ["recipeName", "description", "ingredients", "instructions"],
};

export const suggestRecipe = async (ingredients) => {
  if (!ingredients || !ingredients.trim()) {
    throw new Error("Ingredients cannot be empty.");
  }

  const prompt = `Based on the following ingredients, suggest a delicious recipe. Be creative! Ingredients: ${ingredients}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: recipeSchema,
        },
      },
    });

    const text = response.text.trim();
    const parsed = JSON.parse(text);
    return parsed[0]; // Expecting an array with one recipe object
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(
      "Failed to generate recipe. The model may be unable to create a recipe from the provided ingredients."
    );
  }
};
