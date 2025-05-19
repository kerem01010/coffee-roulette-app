"use client";

import type { LoggedCoffee } from "@/types/coffee";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

interface CoffeeLogTableProps {
  log: LoggedCoffee[];
  onDeleteEntry: (id: string) => void;
  onClearLog: () => void;
}

export function CoffeeLogTable({ log, onDeleteEntry, onClearLog }: CoffeeLogTableProps) {
  if (log.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Your coffee log is empty.</p>
        <p>Try a new coffee and log it here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>A record of your coffee adventures.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Coffee Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {log.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{format(new Date(entry.date), "PPP")}</TableCell>
              <TableCell className="font-medium">{entry.recipe.name}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteEntry(entry.id)}
                  aria-label="Delete log entry"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {log.length > 0 && (
        <div className="text-right">
          <Button variant="destructive" onClick={onClearLog}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear Entire Log
          </Button>
        </div>
      )}
    </div>
  );
}
