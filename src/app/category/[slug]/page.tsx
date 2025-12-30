import { SearchParams } from "next/dist/server/request/search-params";
import { notFound } from "next/navigation";

import { endpoints } from "@/api/endpoints";
import { fetcher } from "@/api/fetcher";
import { TProduct } from "@/app/page";
import { Products } from "@/components/home/Products";
import { buildQuery } from "@/lib/utils";

interface ICategoryResponse {
  success: boolean;
  data: {
    products: TProduct[];
    filters: {
      categories: string[];
      appliedFilters: SearchParams;
    };
    pagination: {
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit?: number;
      totalProducts: number;
    };
  };
}

export default async function page({
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
      <h1 className="text- mt-4 font-bold capitalize">
        Category: {slug.replace(/-/g, " ")}
      </h1>
      <Products products={res.data.products} />
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNext={hasNextPage}
        hasPrev={hasPrevPage}
      /> */}
    </div>
  );
}
