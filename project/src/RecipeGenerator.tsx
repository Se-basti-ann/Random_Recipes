/* import React, { useState } from 'react';
import { fetchRecipes } from './api';
import RecipeCard from './components/RecipeCard';


const RecipeGenerator: React.FC<{ tag: string }> = ({ tag }) => {
    const [recipe, setRecipe] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generateRecipe = async () => {
        try {
            const recipes = await fetchRecipes(tag);
            const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
            setRecipe(randomRecipe);
        } catch (err) {
            setError('Could not fetch a recipe. Please try again later.');
        }
    };

    return (
        <div className="mb-8 flex justify-center gap-4">
            <button 
            onClick={generateRecipe}
            className={`px-6 py-2 rounded-lg transition-colors ${
        recipe ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'
    } hover:bg-orange-600 hover:text-white`}
            >Generar Receta</button>
            {error && <p>{error}</p>}
            {recipe && (
                <RecipeCard
                    title={recipe.name}
                    imageUrl={recipe.thumbnail_url}
                    description={recipe.description || 'No description available'}
                    ingredients={recipe.sections[0].components.map((comp: any) => comp.raw_text)}
                    instructions={recipe.instructions.map((inst: any) => inst.display_text)}
                />
            )}
        </div>
    );
};

export default RecipeGenerator;
 */