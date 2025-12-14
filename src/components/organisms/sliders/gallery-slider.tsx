/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "yet-another-react-lightbox/styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs, Parallax } from "swiper/modules";
import { cn } from "@/lib/utils";
import { IMedia } from "@/api/interface";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Play,
  ScanEye,
  Video,
} from "lucide-react";
import { NextImage } from "../../molecules/next-image";
import ReactPlayer from "react-player";

interface Props {
  items: Array<IMedia>;
  hideAds?: boolean;
}

export const GallerSlider: React.FC<Props> = ({ items, hideAds = false }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [imgViewer, setImgViewer] = useState({ open: false, src: "" });

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | any>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const zoomRef = useRef(null);

  const allImages = (items || [])
    ?.filter((x) => x.mediaType != "video" && x.url != imgViewer.src)
    ?.map((x) => ({ src: x.url }));

  return (
    <>
      <Lightbox
        zoom={{
          ref: zoomRef,
          minZoom: 1,
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleClickMaxStops: 3,
          scrollToZoom: true,
          wheelZoomDistanceFactor: 50,
        }}
        plugins={[Zoom]}
        open={imgViewer.open}
        close={() => setImgViewer((pre) => ({ ...pre, open: false }))}
        slides={[{ src: imgViewer.src }, ...allImages]}
      />

      <div className="relative pb-4">
        <div className="relative">
          {items?.length > 1 && <NavigationButtons swiperRef={swiperRef} />}
          <Swiper
            onSwiper={(swiper: any) => (swiperRef.current = swiper)}
            // loop={true}
            speed={600}
            spaceBetween={10}
            navigation={items?.length > 1}
            parallax
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Parallax]}
            className="main-slider relative rounded-xl"
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
          >
            {(items || [])?.map((x, i) => (
              <SwiperSlide
                className="relative rounded-2xl overflow-hidden"
                key={x.id}
              >
                <>
                  {x.mediaType == "video" ? (
                    <MainVideoThumb
                      shouldPlay={i == activeIndex + 1}
                      src={x.url}
                    />
                  ) : (
                    <Item {...x} hideAds={hideAds} />
                  )}

                  {x?.mediaType == "image" && (
                    <button
                      className="group absolute size-fit right-6 bg-black/5 rounded-sm cursor-pointer backdrop-blur-sm p-1 bottom-5 !z-20"
                      onClick={() => setImgViewer({ open: true, src: x?.url })}
                    >
                      <ScanEye className="text-amber-400 duration-300 transition-colors" />
                    </button>
                  )}
                </>
              </SwiperSlide>
            ))}
            {items?.length > 1 && (
              <div className="absolute z-10 top-4 right-1.5 text-[11px] text-amber-500 bg-primary backdrop-blur-xs px-2.5 py-0.5 rounded-md shadow-md sm:text-sm sm:right-4 sm:top-6">
                {activeIndex + 1} / {items?.length}
              </div>
            )}
          </Swiper>
        </div>

        {/*-- Sub slider --*/}
        {items?.length > 1 && (
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={3}
            breakpoints={{
              "320": { spaceBetween: 5 },
              "768": { spaceBetween: 10 },
            }}
            speed={600}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="sub-main-slider relative"
          >
            {(items || [])?.map((x, i) => (
              <SwiperSlide
                className="relative mt-2 rounded-lg md:rounded-xl overflow-hidden"
                key={x.id}
              >
                {x.mediaType == "video" ? (
                  <VideoThumb src={x.url} active={i == activeIndex} />
                ) : (
                  <SubItem {...x} hideAds={hideAds} active={i == activeIndex} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

interface ItemProps extends IMedia {
  type?: "image" | "video";
  hideAds: boolean;
}

const Item: React.FC<ItemProps> = ({ url, altText, hideAds = false }) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl sm:rounded-2xl aspect-w-16 aspect-h-8 mt-2 overflow-hidden",
        { "aspect-w-16 aspect-h-9": hideAds }
      )}
    >
      <NextImage
        src={url}
        alt={altText}
        className="object-contain px-2.5 border border-gray-200/40 bg-gray-100/50 rounded-xl sm:rounded-2xl"
        priority
        fill
      />
    </div>
  );
};

const MainVideoThumb: React.FC<{
  shouldPlay?: boolean;
  src: string;
}> = ({ src }) => {
  return (
    <div className="relative rounded-xl mt-2 !aspect-w-16 !aspect-h-9 !sm:aspect-w-16 !sm:aspect-h-8 overflow-hidden">
      <ReactPlayer
        playing={false}
        controls
        className="!size-full !object-contain"
        src={src}
        fallback={
          <div className="relative rounded-xl bg-gray-200 aspect-w-16 aspect-h-9 sm:aspect-w-16 sm:aspect-h-8 animate-pulse">
            <div className="size-full flex justify-center items-center">
              <Video className="size-10 text-gray-400" />
            </div>
          </div>
        }
      />
    </div>
  );
};

interface SubItemProps extends ItemProps {
  active: boolean;
}

const SubItem: React.FC<SubItemProps> = ({
  url,
  altText,
  hideAds = false,
  active = false,
}) => {
  return (
    <div className="relative !cursor-pointer">
      <div
        className={cn(
          "group relative rounded-lg md:rounded-xl aspect-w-16 aspect-h-9 overflow-hidden",
          { "aspect-w-16 aspect-h-8": hideAds }
        )}
      >
        <NextImage
          src={url}
          alt={altText}
          className="object-contain px-2.5 border border-gray-100 bg-gray-100 group-hover:scale-105 duration-200 rounded-lg md:rounded-xl"
          priority
          fill
        />

        {active && (
          <div className="absolute left-1.5 top-0.5 md:left-4 md:top-2">
            <Eye className="size-4 md:size-5 text-amber-500" />
          </div>
        )}
      </div>
    </div>
  );
};

const VideoThumb: React.FC<{ src: string; active: boolean }> = ({
  src,
  active = false,
}) => {
  return (
    <div className="relative !aspect-w-16 !aspect-h-9">
      <div className="!size-full absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-primary/30 to-transparent z-10 cursor-pointer" />
      <ReactPlayer
        suppressHydrationWarning
        className="!size-full border border-gray-50"
        src={src}
        fallback={
          <div className="relative rounded-xl bg-gray-200 aspect-w-16 aspect-h-9 animate-pulse">
            <div className="size-full flex justify-center items-center">
              <Video className="size-10 text-gray-400" />
            </div>
          </div>
        }
      />

      {active && (
        <div className="absolute !size-fit ml-1.5 mt-1">
          <Eye className="size-4 text-amber-400" />
        </div>
      )}

      <div
        className={cn(
          "size-full bg-gradient-to-t from-amber-400/30 to-transparent absolute bottom-0 right-0",
          { "bg-transparent": active }
        )}
      />

      <span className="absolute !m-auto !size-fit bg-black/10 backdrop-blur-sm p-2 rounded-full">
        <Play className="text-amber-400" />
      </span>
    </div>
  );
};

//-- Swiper Button Navigation
export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperType | null>; // Define the type for swiperRef
}

const NavigationButtons = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <>
      <button
        onClick={() => swiperRef?.current?.slidePrev()}
        className="p-1 disabled:invisible bg-black/10 backdrop-blur-sm text-white rounded-full cursor-pointer hover:bg-amber-400 duration-300 transition-colors absolute top-1/2 z-10 left-2 -translate-y-1/2 md:left-4 md:p-1"
      >
        <ChevronLeft className="size-5 md:size-7" />
      </button>

      <button
        onClick={() => swiperRef?.current?.slideNext()}
        className="disabled:invisible p-1 bg-black/10 backdrop-blur-sm text-white rounded-full cursor-pointer hover:bg-amber-400 duration-500 transition-colors z-10 top-1/2 right-2 absolute -translate-y-1/2 md:right-4 md:p-1"
      >
        <ChevronRight className="size-5 md:size-7" />
      </button>
    </>
  );
};
