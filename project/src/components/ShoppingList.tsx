import React from 'react';
import { Recipe } from '../types';
import { Download, Share2, MessageCircle } from 'lucide-react';

interface ShoppingListProps {
  recipe: Recipe;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ recipe }) => {
  const ingredients = recipe.sections.flatMap(section =>
    section.components.map(component => ({
      name: component.ingredient.name,
      quantity: component.measurements[0]?.quantity || '',
      unit: component.measurements[0]?.unit?.name || '',
    }))
  ).filter(ing => ing.quantity !== '0');

  const formatIngredient = (quantity: string, unit: string, name: string) => {
    if (!quantity) return name;
    if (!unit) return `${quantity} ${name}`;
    return `${quantity} ${unit} ${name}`;
  };

  const generateList = () => {
    const list = `Shopping List for ${recipe.name}\n\n${ingredients
      .map(ing => `□ ${formatIngredient(ing.quantity, ing.unit, ing.name)}`)
      .join('\n')}`;
    
    const blob = new Blob([list], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${recipe.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

/*   const emailList = () => {
    const subject = encodeURIComponent(`Shopping List for ${recipe.name}`);
    const body = encodeURIComponent(
      `Shopping List for ${recipe.name}\n\n${ingredients
        .map(ing => `□ ${formatIngredient(ing.quantity, ing.unit, ing.name)}`)
        .join('\n')}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }; */

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out this recipe for ${recipe.name}!\n\nIngredients:\n${ingredients
        .map(ing => `• ${formatIngredient(ing.quantity, ing.unit, ing.name)}`)
        .join('\n')}\n\nView full recipe: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareGeneral = async () => {
    const shareData = {
      title: `Recipe: ${recipe.name}`,
      text: `Check out this recipe for ${recipe.name}!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support the Web Share API
        const text = encodeURIComponent(`${shareData.text}\n${shareData.url}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generateList}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Download size={20} />
          Download List
        </button>
        {/* <button
          onClick={emailList}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Mail size={20} />
          Email List
        </button> */}
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors"
        >
          <MessageCircle size={20} />
          Share on WhatsApp
        </button>
        <button
          onClick={shareGeneral}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Share2 size={20} />
          Share Recipe
        </button>
      </div>
    </div>
  );
};