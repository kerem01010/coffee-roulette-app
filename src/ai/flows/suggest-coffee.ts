// This is an auto-generated file from Firebase Studio.
'use server';

/**
 * @fileOverview A coffee suggestion AI agent.
 *
 * - suggestCoffee - A function that handles the coffee suggestion process.
 * - SuggestCoffeeInput - The input type for the suggestCoffee function.
 * - SuggestCoffeeOutput - The return type for the suggestCoffee function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCoffeeInputSchema = z.object({
  availableIngredients: z
    .string()
    .describe(
      'A comma-separated list of ingredients available to make coffee, e.g., coffee, milk, sugar, chocolate.'
    ),
  preferredFlavor: z
    .string()
    .optional()
    .describe('The preferred flavor profile, e.g., sweet, strong, bitter.'),
});
export type SuggestCoffeeInput = z.infer<typeof SuggestCoffeeInputSchema>;

const SuggestCoffeeOutputSchema = z.object({
  name: z.string().describe('The name of the suggested coffee.'),
  ingredients: z.string().describe('A list of ingredients for the suggested coffee.'),
  instructions: z.string().describe('Instructions for making the suggested coffee.'),
});
export type SuggestCoffeeOutput = z.infer<typeof SuggestCoffeeOutputSchema>;

export async function suggestCoffee(input: SuggestCoffeeInput): Promise<SuggestCoffeeOutput> {
  return suggestCoffeeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCoffeePrompt',
  input: {schema: SuggestCoffeeInputSchema},
  output: {schema: SuggestCoffeeOutputSchema},
  prompt: `You are a world-class barista, skilled at creating unique and delicious coffee recipes.

  Based on the available ingredients and the user's preferred flavor, suggest a coffee recipe.

  Available Ingredients: {{{availableIngredients}}}
  Preferred Flavor: {{{preferredFlavor}}}

  Consider these examples:
  - If the available ingredients are coffee, milk, sugar, and the preferred flavor is sweet, suggest a Caramel Latte.
  - If the available ingredients are coffee, water, and the preferred flavor is strong, suggest an Americano.

  Please suggest a coffee recipe with a name, ingredients, and instructions.
  Make sure the output can be parsed as a JSON object with "name", "ingredients", and "instructions" fields.
  Do not include extra text or explanations.

  Example:
  {
    "name": "Mocha",
    "ingredients": "Coffee, chocolate syrup, milk, whipped cream",
    "instructions": "Brew coffee, add chocolate syrup, steam milk, combine, top with whipped cream."
  }`,
});

const suggestCoffeeFlow = ai.defineFlow(
  {
    name: 'suggestCoffeeFlow',
    inputSchema: SuggestCoffeeInputSchema,
    outputSchema: SuggestCoffeeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
