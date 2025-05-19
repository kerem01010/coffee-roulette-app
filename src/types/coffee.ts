import type { SuggestCoffeeOutput } from "@/ai/flows/suggest-coffee";

export type CoffeeRecipe = SuggestCoffeeOutput;

export interface LoggedCoffee {
  id: string;
  date: string; // ISO string format
  recipe: CoffeeRecipe;
}
