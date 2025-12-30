export const endpoints = {
  banners: () => `${process.env.BASE_URL}/banners`,
  categories: () => `${process.env.BASE_URL}/categories`,
  products: (query = "") =>
    `${process.env.BASE_URL}/products${query ? `?${query}` : ""}`,
  product: (id: string) => `${process.env.BASE_URL}/products/${id}`,
};
