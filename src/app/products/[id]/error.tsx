"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Something went wrong</CardTitle>
          <p className="text-sm text-muted-foreground">
            Oops!! This product didn’t load. Hit retry, or go back and choose
            another one.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-md border bg-muted/40 p-3 text-xs text-muted-foreground">
            {error.message}
            {error.digest ? (
              <div className="mt-1">Ref: {error.digest}</div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => reset()} className="cursor-pointer">
              Retry
            </Button>

            <Button asChild variant="outline" className="cursor-pointer">
              <Link href="/">Go back to products</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
