"use client";

import type { CoffeeRecipe } from "@/types/coffee";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, ListPlus } from "lucide-react"; // Removed Trash2 as it's not used

interface RecipeCardProps {
  recipe: CoffeeRecipe;
  onLogCoffee: (recipe: CoffeeRecipe) => void;
  onToggleFavorite: (recipe: CoffeeRecipe) => void;
  isFavorite: boolean;
}

export function RecipeCard({ recipe, onLogCoffee, onToggleFavorite, isFavorite }: RecipeCardProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <CoffeeIcon className="mr-2 h-6 w-6 text-primary" /> {/* Renamed for clarity */}
          {recipe.name}
        </CardTitle>
        <CardDescription>Your freshly brewed suggestion!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">Ingredients:</h3>
          <p className="text-muted-foreground">{recipe.ingredients}</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold text-lg mb-1">Instructions:</h3>
          <p className="text-muted-foreground whitespace-pre-line">{recipe.instructions}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Button onClick={() => onLogCoffee(recipe)} variant="outline" className="w-full sm:w-auto">
          <ListPlus className="mr-2 h-4 w-4" />
          Log this Coffee
        </Button>
        <Button onClick={() => onToggleFavorite(recipe)} variant={isFavorite ? "secondary" : "default"} className="w-full sm:w-auto">
          <Star className={`mr-2 h-4 w-4 ${isFavorite ? "fill-primary" : ""}`} />
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Renamed to avoid conflict with lucide-react if it were to be imported directly.
const CoffeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 2v2" />
    <path d="M14 2v2" />
    <path d="M16 8a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h1m5 0h.01" />
    <path d="M6 18h8" />
    <path d="M19 15V9a1 1 0 0 0-1-1h-1" />
  </svg>
);
