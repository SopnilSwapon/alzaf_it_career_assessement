import { endpoints } from "@/api/endpoints";
import { fetcher } from "@/api/fetcher";
import { BannerCarousel } from "@/components/home/BannerCarousel";

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

export default async function Home() {
  const [banners] = await Promise.all([
    fetcher<IBannersResponse>(endpoints.banners()),
  ]);
  return (
    <div>
      <BannerCarousel banners={banners.data.banners} />
    </div>
  );
}
