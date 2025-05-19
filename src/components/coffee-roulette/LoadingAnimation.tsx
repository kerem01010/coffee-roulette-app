"use client";

import { Loader2 } from "lucide-react";

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-8">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-muted-foreground">Brewing your suggestion...</p>
    </div>
  );
}
