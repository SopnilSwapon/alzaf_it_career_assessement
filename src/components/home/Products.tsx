import { TProduct } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

export function Products({ products }: { products: TProduct[] }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No products found.
      </div>
    );
  }
  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold py-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className=" p-4 rounded border border-red-800"
          >
            <p>hello</p>
            <Image src={p.image} alt="" height={400} width={400} />
            <h3 className="mt-2 font-medium">{p.name}</h3>
            <p>hello</p>
            <p>${p.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
