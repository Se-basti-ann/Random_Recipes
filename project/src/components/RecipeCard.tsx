/* import React from 'react';
import './index.css';

interface RecipeCardProps {
    title: string;
    imageUrl: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, imageUrl, description, ingredients, instructions }) => {
    return (
        <div className="recipe-card">
            <h2>{title}</h2>
            <img src={imageUrl} alt={title} />
            <p>{description}</p>
            <h3><b>Ingredientes:</b></h3>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3><b>Instrucciones:</b></h3>
            <ol>
                {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeCard;
 */


import React from 'react';
import { Recipe } from '../types';
import { ChefHat, Clock, Utensils, PlayCircle } from 'lucide-react';
import { ShoppingList } from './ShoppingList';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const formatIngredient = (quantity: string, unit: string, name: string) => {
    if (quantity === "0") return name;
    if (!unit && quantity) return `${quantity} ${name}`;
    if (quantity && unit) return `${quantity} ${unit} ${name}`;
    if (!quantity && unit) return `${unit} ${name}`;
    return name;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto transform transition-all hover:scale-[1.02]">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative group">
          <img
            src={recipe.thumbnail_url}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          {recipe.original_video_url && (
            <a
              href={recipe.original_video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <PlayCircle size={64} className="text-white" />
            </a>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-2">{recipe.name}</h2>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                <ChefHat size={16} />
                Recipe
              </span>
              <span className="inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                <Clock size={16} />
                30 min
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-gray-600 italic">{recipe.description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Utensils className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-800">Ingredients</h3>
            </div>
            <ul className="grid grid-cols-1 gap-2">
              {recipe.sections?.map((section, sectionIndex) =>
                section.components?.map((component, componentIndex) => (
                  <li
                    key={`${sectionIndex}-${componentIndex}`}
                    className="text-gray-600 flex items-center gap-2 before:content-['•'] before:text-orange-500"
                  >
                    {formatIngredient(
                      component.measurements[0]?.quantity || '',
                      component.measurements[0]?.unit?.name || '',
                      component.ingredient.name
                    )}
                  </li>
                ))
              )}
            </ul>
            <ShoppingList recipe={recipe} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
            <ol className="space-y-4">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-gray-600 flex-1 pt-1">{instruction.display_text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
