
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles } from "lucide-react";
import type { SuggestCoffeeInput } from "@/ai/flows/suggest-coffee";

const COMMON_INGREDIENTS = [
  "Coffee Beans", "Ground Coffee", "Instant Coffee",
  "Water", "Milk", "Soy Milk", "Almond Milk", "Oat Milk",
  "Sugar", "Brown Sugar", "Simple Syrup", "Honey", 
  "Chocolate Syrup", "Caramel Syrup", "Vanilla Syrup", "Hazelnut Syrup",
  "Cinnamon", "Nutmeg", "Cardamom", "Cocoa Powder", 
  "Whipped Cream", "Ice", "Espresso Shot"
] as const;

const FormSchema = z.object({
  availableIngredients: z.array(z.string()).min(1, {
    message: "Please select at least one ingredient.",
  }),
  preferredFlavor: z.string().optional(),
});

interface CoffeeSuggestionFormProps {
  onSubmit: (data: SuggestCoffeeInput) => Promise<void>;
  isLoading: boolean;
}

export function CoffeeSuggestionForm({ onSubmit, isLoading }: CoffeeSuggestionFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      availableIngredients: [],
      preferredFlavor: "",
    },
  });

  async function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    const submissionData: SuggestCoffeeInput = {
      preferredFlavor: data.preferredFlavor,
      availableIngredients: data.availableIngredients.join(", "),
    };
    await onSubmit(submissionData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="availableIngredients"
          render={() => ( 
            <FormItem>
              <FormLabel className="text-base">Available Ingredients</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2">
                {COMMON_INGREDIENTS.map((ingredient) => (
                  <FormField
                    key={ingredient}
                    control={form.control}
                    name="availableIngredients"
                    render={({ field }) => { 
                      return (
                        <FormItem
                          key={ingredient}
                          className="flex flex-row items-center space-x-2.5 space-y-0 bg-card p-3 rounded-lg border hover:bg-accent/80 transition-colors shadow-sm"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(ingredient)}
                              onCheckedChange={(checkedState) => {
                                const currentValue = field.value || [];
                                return checkedState
                                  ? field.onChange([...currentValue, ingredient])
                                  : field.onChange(
                                      currentValue.filter(
                                        (value) => value !== ingredient
                                      )
                                    );
                              }}
                              className="h-5 w-5"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal leading-tight cursor-pointer">
                            {ingredient}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="preferredFlavor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Preferred Flavor (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., sweet, strong, fruity, nutty" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-base py-6 rounded-lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Brewing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Suggest My Coffee
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

// Minimal Loader2 for button internal use
const Loader2 = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );

