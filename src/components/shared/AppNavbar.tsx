import { TCategory } from "@/app/layout";
import Link from "next/link";

export function Header({ categories }: { categories: TCategory[] }) {
  if (!Array.isArray(categories)) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex w-full items-center gap-3 py-3">
        <Link
          href="/"
          className="shrink-0 rounded-md px-2 py-1 text-sm font-semibold"
        >
          Home
        </Link>

        <div
          className="
            flex flex-1 items-center gap-2
            overflow-x-auto
            scrollbar-hide
            md:flex-wrap md:justify-end md:overflow-visible
          "
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="
                shrink-0
                rounded-full border bg-background
                py-1 text-xs font-medium
                hover:bg-accent
              "
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
