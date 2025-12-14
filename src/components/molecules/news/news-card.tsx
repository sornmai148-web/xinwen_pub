"use client";

import { INews } from "@/api/interface";
import { getFormatHumanReadable } from "@/config/dayjs";
import { cn } from "@/lib/utils";
import { Bookmark, Film, Video } from "lucide-react";
import { NextImage } from "../next-image";
import { useLocale, useTranslations } from "next-intl";
import ReactPlayer from "react-player";

export const NewsCard: React.FC<INews & { onClick: () => void }> = (props) => {
  const {
    title,
    body,
    summary,
    medias,
    categoryCodes,
    isFeatured,
    publishTime,
    onClick,
  } = props;

  const locale = useLocale();
  const t = useTranslations("common");

  const categories = (categoryCodes || [])?.map((l) => `# ${l?.split("_")[1]}`);

  if (!title && !summary && !body) return null;
  if (!medias?.length || medias == null)
    return (
      <div
        onClick={onClick}
        className="!cursor-pointer hover:-translate-y-0.5 transition-transform duration-500 bg-white p-3 sm:p-4 lg:p-5 mb-2 border rounded-xl"
      >
        <div className="relative flex flex-col overflow-hidden">
          <div className="basis-3/5 flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-black backdrop-blur-sm bg-amber-300 lg:text-xs px-3 pt-1 pb-0.5 md:pt-1.5 md:pb-1 rounded-sm w-fit">
                {getFormatHumanReadable(
                  new Date(publishTime as string),
                  locale
                )}
              </span>

              {!!isFeatured && (
                <div className="flex items-center space-x-1.5 text-[9px] md:text-[10px] bg-purple-500/10 px-1.5 py-1 md:px-4 md:py-1.5 rounded-sm">
                  <Bookmark className="size-3 text-purple-600" />
                  <span>{t("recommended-label")}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col mt-2 space-y-1.5">
              <span className="text-xs text-amber-500 lg:text-sm mt-2">
                {categories.join(" ")}
              </span>

              <h4 className="font-bold md:text-xl lg:text-2xl text-gray-700 line-clamp-1 break-words">
                {title}
              </h4>
              <p className="text-[13px] md:text-sm lg:text-base leading-tight line-clamp-3 text-gray-500 break-words">
                {summary || body}
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  if (medias?.length == 1)
    return (
      <div
        onClick={onClick}
        className="!cursor-pointer hover:-translate-y-0.5 transition-transform duration-500 bg-white border p-3 sm:p-4 lg:p-5 rounded-xl"
      >
        <div className="relative flex space-x-2.5 overflow-hidden">
          {medias?.[0]?.mediaType == "video" ? (
            <div className="relative basis-2/5 rounded-lg min-h-30">
              <VideoThumb src={medias?.[0]?.url} />
            </div>
          ) : (
            <div className="shrink-0 relative basis-2/5 rounded-lg overflow-hidden min-h-30 lg:h-44 mr-2">
              <NextImage
                src={medias?.[0]?.url || ""}
                alt={title}
                className="object-contain px-2.5 border border-gray-100 bg-gray-100/50 rounded-lg"
                priority
                fill
              />
            </div>
          )}

          <div className="basis-3/5 flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-black backdrop-blur-sm bg-amber-300 lg:text-xs px-3 pt-1 pb-0.5 md:pt-1.5 md:pb-1 rounded-sm w-fit">
                {getFormatHumanReadable(
                  new Date(publishTime as string),
                  locale
                )}
              </span>

              {!!isFeatured && (
                <div className="flex items-center space-x-1.5 text-[9px] md:text-[10px] bg-purple-500/10 px-1.5 py-1 md:px-4 md:py-1.5 rounded-sm">
                  <Bookmark className="size-3 text-purple-600" />
                  <span>{t("recommended-label")}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-0.5">
              <span className="text-xs lg:text-sm mt-2 text-amber-500">
                {categories.join(" ")}
              </span>

              <h4 className="font-bold md:text-xl lg:text-2xl text-gray-700 line-clamp-1 break-words">
                {title}
              </h4>
              <p className="text-[13px] md:text-sm lg:text-base leading-tight line-clamp-2 text-gray-500 break-words">
                {summary || body}
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div
      onClick={onClick}
      className="!cursor-pointer hover:-translate-y-0.5 transition-transform duration-500 flex flex-col space-y-3 bg-white p-3 sm:p-4 lg:p-5 border rounded-xl"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-black backdrop-blur-sm bg-amber-300 lg:text-xs px-3 pt-1 pb-0.5 md:pt-1.5 md:pb-1 rounded-sm w-fit">
            {getFormatHumanReadable(new Date(publishTime as string), locale)}
          </span>

          {!!isFeatured && (
            <div className="flex items-center space-x-1.5 text-[9px] md:text-[10px] bg-purple-500/10 px-1.5 py-1 md:px-4 md:py-1.5 rounded-sm">
              <Bookmark className="size-3 text-purple-600" />
              <span>{t("recommended-label")}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <span className="text-xs lg:text-sm mt-2 text-amber-500">
            {categories.join(" ")}
          </span>

          <h4 className="font-bold md:text-xl lg:text-2xl text-gray-700 line-clamp-1 break-words">
            {title}
          </h4>
          <p className="text-[13px] md:text-sm lg:text-base leading-tight line-clamp-3 text-gray-500 break-words">
            {summary || body}
          </p>
        </div>
      </div>

      <div className={cn("grid grid-cols-2 gap-2")}>
        {(medias || [])?.slice(0, 2).map((x, i) => {
          if (x?.mediaType == "video")
            return <VideoThumb key={i} src={x?.url} />;

          return (
            <div
              key={i}
              className={cn(
                "relative w-full min-h-30 lg:h-[11.9rem] h-full rounded-lg overflow-hidden"
              )}
            >
              <NextImage
                src={x?.url}
                alt={title}
                className="object-contain py-2 px-2 border border-gray-100 bg-gray-100/50 rounded-lg overflow-hidden"
                fill
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VideoThumb: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="relative h-30 md:!aspect-w-16 md:!aspect-h-9 overflow-hidden rounded-xl">
      <div className="absolute top-0 right-0 bottom-0 left-0 z-10 cursor-pointer" />
      <div className="size-full bg-gray-100/60 p-2 border border-gray-100">
        <ReactPlayer
          className="!size-full"
          src={src}
          fallback={
            <div className="relative rounded-xl !bg-gray-100 !aspect-w-16 !aspect-h-8 animate-pulse">
              <div className="size-full flex justify-center items-center">
                <Video className="size-10 text-gray-100" />
              </div>
            </div>
          }
        />
        <span className="absolute left-1/2 -translate-y-1/2 -translate-x-1/2 top-1/2 !size-fit bg-black/10 backdrop-blur-sm p-2 rounded-full">
          <Film className="text-white" />
        </span>
      </div>
    </div>
  );
};
