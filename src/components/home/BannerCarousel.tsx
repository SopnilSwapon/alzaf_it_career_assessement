import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
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
          {banners.map((b, idx) => (
            <CarouselItem key={b.id}>
              <div className="relative overflow-hidden rounded-2xl border bg-muted">
                <div className="relative aspect-16/7 w-full sm:aspect-16/6 md:aspect-16/5">
                  <Image
                    src={b.image}
                    alt={b.title}
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
                      {b.subtitle ? (
                        <Badge className="w-fit" variant="secondary">
                          {b.subtitle}
                        </Badge>
                      ) : null}

                      <h2 className="text-balance text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                        {b.title}
                      </h2>

                      {b.description ? (
                        <p className="text-pretty text-sm text-white/85 sm:text-base">
                          {b.description}
                        </p>
                      ) : null}

                      <div className="pt-2">
                        {b.link ? (
                          <Button asChild className={cn("cursor-pointer")}>
                            <Link href={b.link}>
                              {b.buttonText ?? "Explore"}
                            </Link>
                          </Button>
                        ) : (
                          <Button className="cursor-pointer" disabled>
                            {b.buttonText ?? "Explore"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* changing item buttons */}
                <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
