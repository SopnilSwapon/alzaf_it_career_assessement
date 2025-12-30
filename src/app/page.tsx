import { endpoints } from "@/api/endpoints";
import { fetcher } from "@/api/fetcher";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import { Products } from "@/components/home/Products";
import { Pagination } from "@/components/shared/Pagination";
import { buildQuery } from "@/lib/utils";

// banner types
export type TBanner = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  active: boolean;
  link: string;
  order: number;
  buttonText: string;
};

interface IBannersResponse {
  success: boolean;
  data: {
    total: number;
    banners: TBanner[];
  };
}

// product types
export type TProduct = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  brand: string;
  category: string;
};
interface IProductsResponse {
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

// search params types

type SearchParams = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // current params
  const query = buildQuery({
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    search: params.search,
    sort: params.sort,
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  });

  const [banners, products] = await Promise.all([
    fetcher<IBannersResponse>(endpoints.banners()),
    fetcher<IProductsResponse>(endpoints.products(query)),
  ]);

  const { currentPage, totalPages, hasNextPage, hasPrevPage } =
    products.data.pagination;

  return (
    <div>
      {/*banner carousels */}
      <BannerCarousel banners={banners.data.banners} />
      {/* All products */}
      <Products products={products.data.products} />
      {/* Products pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNext={hasNextPage}
        hasPrev={hasPrevPage}
      />
    </div>
  );
}
