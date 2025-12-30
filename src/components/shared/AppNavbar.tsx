import { TCategory } from "@/app/layout";
import Link from "next/link";

export function Header({ categories }: { categories: TCategory[] }) {
  if (!Array.isArray(categories)) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur ">
      <nav className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-md px-2 py-1 text-sm font-semibold tracking-tight transition hover:bg-accent hover:text-accent-foreground"
          >
            Home
          </Link>
        </div>

        <div className="flex max-w-[75%] flex-wrap items-center justify-end gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:border-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
