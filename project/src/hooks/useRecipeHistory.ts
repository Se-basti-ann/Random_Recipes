import { useState, useEffect } from 'react';
import { Recipe, RecipeHistory } from '../types';

const MAX_REPEATS = 3;
const HISTORY_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const useRecipeHistory = () => {
  const [history, setHistory] = useState<RecipeHistory[]>([]);

  useEffect(() => {
    // Clean expired history entries
    const now = Date.now();
    setHistory(prev => prev.filter(entry => now - entry.timestamp < HISTORY_EXPIRY));
  }, []);

  const canShowRecipe = (recipe: Recipe) => {
    const recipeOccurrences = history.filter(entry => entry.id === recipe.id).length;
    return recipeOccurrences < MAX_REPEATS;
  };

  const addToHistory = (recipe: Recipe) => {
    const now = Date.now();
    setHistory(prev => [...prev, { id: recipe.id, timestamp: now }]);
  };

  return { canShowRecipe, addToHistory };
};