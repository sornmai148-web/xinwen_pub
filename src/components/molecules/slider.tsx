"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Image, { StaticImageData } from "next/image";

import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface IMedia {
  id: number;
  src: StaticImageData | string;
  alt: string;
}

interface Props {
  items: Array<IMedia>;
  hideAds?: boolean;
  isPartialShow?: boolean;
  hideHighlight?: boolean;
}

export const ImageSlider: React.FC<Props> = ({
  items,
  hideAds = false,
  isPartialShow = false,
  hideHighlight = false,
}) => {
  return (
    <div className="relative mb-3 mt-1">
      <Swiper
        loop
        effect="fade"
        speed={2000}
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "!size-2 bg-white/60 !rounded-md !mr-1 !px-0 flex items-center !space-x-1",
          bulletActiveClass: "!w-4 h-2 !rounded-sm !bg-amber-300",
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="advertisement-slider relative"
      >
        {(items || [])?.map((x) => (
          <SwiperSlide key={x.id}>
            <Item
              {...x}
              hideAds={hideAds}
              isPartialShow={isPartialShow}
              hideHighlight={hideHighlight}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination z-20 absolute bottom-2 w-full flex justify-center" />
    </div>
  );
};

const Item: React.FC<
  IMedia & {
    hideAds: boolean;
    isPartialShow?: boolean;
    hideHighlight?: boolean;
  }
> = ({
  src,
  alt,
  hideAds = false,
  isPartialShow = false,
  hideHighlight = false,
}) => {
  const t = useTranslations("common");

  return (
    <div>
      <div
        className={cn(
          "group relative rounded-xl md:rounded-lg lg:rounded-2xl mt-2 overflow-hidden",
          {
            "aspect-w-4 aspect-h-[1.2] md:aspect-h-[1.15]": !isPartialShow,
            "!aspect-w-16 !aspect-h-7": isPartialShow,
          }
        )}
      >
        <Image
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={src}
          alt={alt}
          className={cn(
            "object-cover object-[15%_0%] border group-hover:scale-105 duration-200 rounded-xl md:rounded-lg lg:rounded-2xl"
          )}
          priority
          fill
        />
        {!hideAds && (
          <div className="absolute w-3/4 top-0 left-0 bg-gradient-to-r from-black/80 via-black/20 group-hover:from-black/60 duration-500 transition-colors to-transparent rounded-xl">
            <span
              className={cn(
                "text-red-500 font-bold absolute top-3 left-3 md:top-5 md:left-5 rounded-lg outline outline-offset-2 text-xs outline-amber-200 bg-amber-400 px-4 py-0.5 md:px-6 md:py-1.5",
                { "!px-4 !py-0.5 !top-3 !left-3": hideHighlight }
              )}
            >
              {t("advert-label")}
            </span>

            {!hideHighlight && (
              <div
                id="2"
                className="absolute left-1/2 -translate-x-1/3 md:-translate-x-1/4 bottom-0 w-full md:w-3/4 bg-gray-50/10 backdrop-blur-sm py-1.5"
              >
                <p className="md:text-xl text-xs sm:text-sm font-bold text-center text-accent">
                  {t("advert")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
