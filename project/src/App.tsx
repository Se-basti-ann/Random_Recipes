import React, { useState } from 'react';
import { getRandomRecipe } from './api';
import { Recipe } from './types';
import { RecipeCard } from './components/RecipeCard';
import { Loader2, UtensilsCrossed, Cookie } from 'lucide-react';
import { useRecipeHistory } from './hooks/useRecipeHistory';

function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [dessertRecipe, setDessertRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [dessertLoading, setDessertLoading] = useState(false);
  const { canShowRecipe, addToHistory } = useRecipeHistory();

  const generateRecipe = async () => {
    setLoading(true);
    try {
      let newRecipe;
      do {
        newRecipe = await getRandomRecipe(['under_30_minutes']);
      } while (!canShowRecipe(newRecipe));
      
      setRecipe(newRecipe);
      addToHistory(newRecipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
    setLoading(false);
  };

  const generateDessertRecipe = async () => {
    setDessertLoading(true);
    try {
      let newRecipe;
      do {
        newRecipe = await getRandomRecipe(['under_30_minutes', 'desserts']);
      } while (!canShowRecipe(newRecipe));
      
      setDessertRecipe(newRecipe);
      addToHistory(newRecipe);
    } catch (error) {
      console.error('Error fetching dessert recipe:', error);
    }
    setDessertLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <UtensilsCrossed className="text-orange-500" />
              Random Recipe Generator
            </h1>
            <button
              onClick={generateRecipe}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Generate Recipe'
              )}
            </button>
          </div>
          {recipe && <RecipeCard recipe={recipe} />}
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Cookie className="text-pink-500" />
              Random Dessert Recipe
            </h2>
            <button
              onClick={generateDessertRecipe}
              disabled={dessertLoading}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {dessertLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Generate Dessert'
              )}
            </button>
          </div>
          {dessertRecipe && <RecipeCard recipe={dessertRecipe} />}
        </div>
      </div>
    </div>
  );
}

export default App;