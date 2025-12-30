import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import { TBanner } from "@/app/page";

export function BannerCarousel({ banners }: { banners: TBanner[] }) {
  return (
    <section className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((item, idx) => (
            <CarouselItem key={item.id}>
              <div className="relative overflow-hidden rounded-2xl border bg-muted">
                <div className="relative aspect-16/7 w-full sm:aspect-16/6 md:aspect-16/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={idx === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-transparent" />
                </div>

                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-4 sm:p-6 md:p-8">
                    <div className="max-w-xl space-y-2">
                      <p className="text-pretty text-sm text-white/85 sm:text-base">
                        {item.description}
                      </p>

                      <div className="pt-2">
                        <Button asChild className={cn("cursor-pointer")}>
                          <Link href={item.link}>
                            {item.buttonText ?? "Explore"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* changing item buttons */}
                <CarouselPrevious className="left-3 cursor-pointer top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-3 top-1/2 cursor-pointer -translate-y-1/2" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
