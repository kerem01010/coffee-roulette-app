
"use client";

import { useState, useEffect, useCallback } from "react";
import { suggestCoffee, type SuggestCoffeeInput, type SuggestCoffeeOutput } from "@/ai/flows/suggest-coffee";
import { CoffeeSuggestionForm } from "@/components/coffee-roulette/CoffeeSuggestionForm";
import { RecipeCard } from "@/components/coffee-roulette/RecipeCard";
import { CoffeeLogTable } from "@/components/coffee-roulette/CoffeeLogTable";
import { FavoritesList } from "@/components/coffee-roulette/FavoritesList";
import { LoadingAnimation } from "@/components/coffee-roulette/LoadingAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { CoffeeRecipe, LoggedCoffee } from "@/types/coffee";
import { Coffee, ListChecks, Star } from "lucide-react";

export default function CoffeeRoulettePage() {
  const [currentSuggestion, setCurrentSuggestion] = useState<CoffeeRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [coffeeLog, setCoffeeLog] = useLocalStorage<LoggedCoffee[]>("coffeeLog", []);
  const [favoriteCoffees, setFavoriteCoffees] = useLocalStorage<CoffeeRecipe[]>("favoriteCoffees", []);

  const handleSuggestCoffee = async (data: SuggestCoffeeInput) => {
    setIsLoading(true);
    setCurrentSuggestion(null);
    try {
      const suggestion = await suggestCoffee(data);
      setCurrentSuggestion(suggestion);
      toast({
        title: "☕️ Suggestion Brewed!",
        description: `We found a new coffee for you: ${suggestion.name}`,
      });
    } catch (error) {
      console.error("Error suggesting coffee:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Could not fetch a coffee suggestion. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogCoffee = (recipe: CoffeeRecipe) => {
    const newLogEntry: LoggedCoffee = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      recipe,
    };
    setCoffeeLog([newLogEntry, ...coffeeLog]);
    toast({
      title: "📝 Coffee Logged!",
      description: `${recipe.name} has been added to your log.`,
    });
  };

  const handleDeleteLogEntry = (id: string) => {
    setCoffeeLog(coffeeLog.filter((entry) => entry.id !== id));
    toast({
      title: "🗑️ Log Entry Removed",
      description: "The coffee has been removed from your log.",
    });
  };
  
  const handleClearLog = () => {
    setCoffeeLog([]);
    toast({
      title: "🗑️ Log Cleared",
      description: "Your coffee log is now empty.",
    });
  };

  const isRecipeFavorite = useCallback(
    (recipe: CoffeeRecipe | null) => {
      if (!recipe) return false;
      return favoriteCoffees.some((fav) => fav.name === recipe.name);
    },
    [favoriteCoffees]
  );

  const handleToggleFavorite = (recipe: CoffeeRecipe) => {
    if (isRecipeFavorite(recipe)) {
      setFavoriteCoffees(favoriteCoffees.filter((fav) => fav.name !== recipe.name));
      toast({
        title: "💔 Unfavorited",
        description: `${recipe.name} removed from your favorites.`,
      });
    } else {
      setFavoriteCoffees([recipe, ...favoriteCoffees]);
      toast({
        title: "⭐ Favorited!",
        description: `${recipe.name} added to your favorites.`,
      });
    }
  };

  const handleSelectFavorite = (recipe: CoffeeRecipe) => {
    setCurrentSuggestion(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
     toast({
        title: "☕️ Favorite Selected!",
        description: `Showing details for ${recipe.name}.`,
      });
  };


  return (
    <div className="container mx-auto max-w-xl min-h-screen p-4 md:p-6 bg-background">
      <header className="mb-8 text-center pt-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-center">
          <Coffee className="mr-3 h-10 w-10 md:h-12 md:w-12" />
          Coffee Roulette
        </h1>
        <p className="text-muted-foreground text-md md:text-lg mt-2">
          Let fate decide your next cup of coffee!
        </p>
      </header>

      <main className="space-y-8 md:space-y-12">
        <Card className="shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Find Your Next Coffee</CardTitle>
          </CardHeader>
          <CardContent>
            <CoffeeSuggestionForm onSubmit={handleSuggestCoffee} isLoading={isLoading} />
            {isLoading && <LoadingAnimation />}
            {currentSuggestion && !isLoading && (
              <div className="mt-6 md:mt-8">
                <RecipeCard
                  recipe={currentSuggestion}
                  onLogCoffee={handleLogCoffee}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isRecipeFavorite(currentSuggestion)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        <Card className="shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl flex items-center">
              <ListChecks className="mr-2 h-7 w-7 md:h-8 md:w-8 text-primary" />
              My Coffee Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CoffeeLogTable 
              log={coffeeLog} 
              onDeleteEntry={handleDeleteLogEntry}
              onClearLog={handleClearLog}
            />
          </CardContent>
        </Card>

        <Separator />

        <Card className="shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl flex items-center">
              <Star className="mr-2 h-7 w-7 md:h-8 md:w-8 text-primary fill-primary" />
              My Favorite Coffees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FavoritesList 
              favorites={favoriteCoffees} 
              onRemoveFavorite={handleToggleFavorite} 
              onSelectFavorite={handleSelectFavorite}
            />
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 md:mt-16 py-6 md:py-8 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Coffee Roulette. Brewed with 🖤.</p>
      </footer>
    </div>
  );
}
