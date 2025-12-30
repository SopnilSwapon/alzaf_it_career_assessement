import { endpoints } from "@/api/endpoints";
import { fetcher } from "@/api/fetcher";
import { TProduct } from "@/app/page";
import { Products } from "@/components/home/Products";
import { buildQuery } from "@/lib/utils";
import { notFound } from "next/navigation";

interface ICategoryResponse {
  success: boolean;
  data: {
    products: TProduct[];
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) notFound();

  const query = buildQuery({ category: slug });
  const res = await fetcher<ICategoryResponse>(endpoints.products(query));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      <Products products={res.data.products} />
    </div>
  );
}
