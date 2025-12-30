import { notFound } from "next/navigation";
import Image from "next/image";
import { endpoints } from "@/api/endpoints";
import { fetcher } from "@/api/fetcher";
import { TProduct } from "@/app/page";
import { Products } from "@/components/home/Products";

interface IProductDetailsResponse {
  success: boolean;
  data?: {
    product: TProduct;
    similarProducts: TProduct[];
  };
}

async function getProductDetails(id: string) {
  try {
    const res = await fetcher<IProductDetailsResponse>(endpoints.product(id));

    if (!res.success || !res.data?.product) notFound();

    return {
      product: res.data.product,
      similarProducts: res.data.similarProducts ?? [],
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.status === 404) notFound();
    throw err;
  }
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { product, similarProducts } = await getProductDetails(id);

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div className="border rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={700}
            className="w-full h-auto object-cover"
            priority
            loading="eager"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p>{product.description}</p>
          <p className="text-lg font-semibold">${product.price}</p>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Similar Products</h2>
          <Products products={similarProducts} />
        </div>
      )}
    </div>
  );
}
