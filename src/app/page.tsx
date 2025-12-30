import { endpoints } from "@/api/endpoints";
import { fetcher } from "@/api/fetcher";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import { Products } from "@/components/home/Products";
import { buildQuery } from "@/lib/utils";

// banner types
export type TBanner = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  active: boolean;
  link?: string;
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
type SearchParams = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = buildQuery({
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    search: params.search,
    sort: params.sort,
    page: params.page ?? 1,
    limit: params.limit ?? 8,
  });
  console.log(query, "check the query");
  const [banners, products] = await Promise.all([
    fetcher<IBannersResponse>(endpoints.banners()),
    fetcher<IProductsResponse>(endpoints.products(query)),
  ]);
  return (
    <div>
      <BannerCarousel banners={banners.data.banners} />
      <Products products={products.data.products} />
    </div>
  );
}
