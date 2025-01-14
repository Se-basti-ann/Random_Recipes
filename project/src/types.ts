/* export interface Recipe {
  id: number;
  title: string;
  image: string;
  instructions: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}

export interface DeutscheRecipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  image_url: string;
  cooking_time: string;
  servings: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'dessert'; */

export interface Recipe {
  id: number;
  name: string;
  thumbnail_url: string;
  original_video_url: string | null;
  description: string;
  instructions: {
    display_text: string;
    time?: {
      minutes?: number;
      seconds?: number;
    };
  }[];
  sections: {
    components: {
      ingredient: {
        name: string;
      };
      measurements: {
        quantity: string;
        unit: {
          name: string;
        };
      }[];
    }[];
  }[];
}