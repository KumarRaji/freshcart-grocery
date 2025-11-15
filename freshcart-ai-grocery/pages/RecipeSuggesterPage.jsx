import React, { useState } from 'react';
import { suggestRecipe } from '../services/geminiService';
import { Button } from '../components/Button';
import { SparklesIcon } from '../components/icons/SparklesIcon';

export const RecipeSuggesterPage = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const result = await suggestRecipe(ingredients);
      setRecipe(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const RecipeDisplay = ({ recipe }) => (
    <div className="mt-8 bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-brand-green-dark">
        {recipe.recipeName}
      </h2>
      <p className="mt-2 text-lg text-gray-600 italic">
        {recipe.description}
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold border-b-2 border-neutral-medium pb-2">
            Ingredients
          </h3>
          <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold border-b-2 border-neutral-medium pb-2">
            Instructions
          </h3>
          <ol className="mt-4 space-y-3 list-decimal list-inside text-gray-700">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <SparklesIcon className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="text-4xl font-extrabold mt-4">AI Recipe Suggester</h1>
        <p className="mt-2 text-lg text-gray-600">
          Got ingredients? Let our AI chef whip up a recipe for you!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white p-8 rounded-lg shadow-md"
      >
        <label
          htmlFor="ingredients"
          className="block text-lg font-semibold mb-2"
        >
          Enter ingredients you have (e.g., "chicken breast, rice, broccoli,
          soy sauce")
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="What's in your fridge?"
          rows={4}
          className="w-full p-4 border border-neutral-medium rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition"
        />
        <div className="mt-6 text-center">
          <Button type="submit" disabled={isLoading || !ingredients.trim()}>
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              'Create Recipe'
            )}
          </Button>
        </div>
      </form>

      {error && (
        <p className="mt-6 text-center text-red-600 bg-red-100 p-4 rounded-lg">
          {error}
        </p>
      )}

      {recipe && <RecipeDisplay recipe={recipe} />}
    </div>
  );
};
