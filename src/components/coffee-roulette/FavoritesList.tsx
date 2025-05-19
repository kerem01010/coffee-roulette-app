"use client";

import type { CoffeeRecipe } from "@/types/coffee";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trash2 } from "lucide-react";

interface FavoritesListProps {
  favorites: CoffeeRecipe[];
  onRemoveFavorite: (recipe: CoffeeRecipe) => void;
  onSelectFavorite: (recipe: CoffeeRecipe) => void;
}

export function FavoritesList({ favorites, onRemoveFavorite, onSelectFavorite }: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>You haven't saved any favorite coffees yet.</p>
        <p>Find a recipe you love and add it here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((recipe, index) => (
        <Card key={`${recipe.name}-${index}`} className="flex flex-col justify-between shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Star className="mr-2 h-5 w-5 fill-primary text-primary" />
              {recipe.name}
            </CardTitle>
            <CardDescription className="truncate">{recipe.ingredients}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Optionally show a snippet of instructions or key features */}
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button variant="outline" size="sm" onClick={() => onSelectFavorite(recipe)}>
              View Recipe
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveFavorite(recipe)}
              aria-label="Remove from favorites"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
