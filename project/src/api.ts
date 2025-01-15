import axios from 'axios';
import { Recipe } from './types';

const apiKey = import.meta.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: 'https://tasty.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'tasty.p.rapidapi.com',
  },
});

export const getRecipes = async (tags: string[] = ['under_30_minutes']) => {
  const response = await api.get('/recipes/list', {
    params: {
      from: '0',
      size: '20',
      tags: tags.join(','),
    },
  });
  return response.data.results as Recipe[];
};

export const getRandomRecipe = async (tags: string[] = ['under_30_minutes']): Promise<Recipe> => {
  const recipes = await getRecipes(tags);
  return recipes[Math.floor(Math.random() * recipes.length)];
};





/* const API_URL = 'https://tasty.p.rapidapi.com/recipes/list';
const API_KEY = apiKey;

export const fetchRecipes = async (tag: string) => {
    const response = await fetch(`${API_URL}?from=0&size=20&tags=${tag}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data.results;
}; */
