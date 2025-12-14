"use client";

import { NewsCard } from "./news-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Image as Photo, TextSearch, BookOpen } from "lucide-react";
import { EmptyState } from "../empty-state";
import { useMetadataPagination } from "@/hooks/use-metadata-pagination";
import { INews } from "@/api/interface";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useEffect } from "react";
import { usePreserveScroll } from "@/hooks/use-preserve-scroll";
import { ROUTES } from "@/config/routes";
import { useRouter } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearch } from "@/hooks/use-search";
import { useSearchParams } from "next/navigation";
import Loader from "../loader";

interface Props {
  locale: Locale;
}

export const NewsList: React.FC<Props> = () => {
  const router = useRouter();
  const { scrollY, setScrollY } = usePreserveScroll();

  const {
    search: keywords,
    field_id,
    field_value,
    parent_label,
    sub_label,
    slug,
  } = useMetadataPagination();

  const { isLoading, hasNextPage, fetchNextPage, data, total } = useSearch({
    keywords,
    field_id: +field_id,
    filter_value: field_value,
    parent_label: parent_label,
    sub_label: sub_label,
  });

  const t = useTranslations();
  const searchParams = useSearchParams().toString();

  useEffect(() => {
    const regex = /^sub_label=.*$/;
    if (!!regex.test(searchParams)) return router.replace(ROUTES.HOME);
    if (slug == "latest") return;

    if (searchParams && !searchParams?.includes("slug")) {
      sessionStorage.setItem("filter", searchParams);
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
    if (!searchParams && !searchParams?.includes("slug")) {
      const saved = sessionStorage.getItem("filter");
      if (saved) router.replace(`?${saved}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, slug]);

  if (!keywords && !isLoading && !data?.length)
    return (
      <>
        <div className="pl-2 py-2 mb-2 flex items-center space-x-4">
          <div className="flex items-center space-x-3 font-bold sm:text-xl text-amber-500">
            <span>
              <TextSearch className="size-5 md:size-6 lg:size-7" />
            </span>
            <span>{t("common.search-result", { total: `${total || 0}` })}</span>
          </div>
          <div className="grow h-[1px] bg-gray-200" />
        </div>

        <div className="bg-white rounded-xl max-md:my-4">
          <EmptyState
            type="default"
            title={t("components.list-empty-state.title")}
            subtitle={t("components.list-empty-state.subtitle")}
          />
        </div>
      </>
    );

  if (keywords && !isLoading && !data?.length)
    return (
      <>
        <div className="pl-2 py-2 mb-2 flex items-center space-x-4">
          <div className="flex items-center space-x-3 font-bold sm:text-xl text-amber-500">
            <span>
              <TextSearch className="size-5 md:size-6 lg:size-7" />
            </span>
            <span>{t("common.search-result", { total: `${total || 0}` })}</span>
          </div>
          <div className="grow h-[1px] bg-gray-200" />
        </div>

        <div className="bg-white rounded-xl max-md:my-4">
          <EmptyState
            type="search"
            title={t("components.search-empty-state.title")}
            subtitle={t("components.search-empty-state.subtitle")}
          />
        </div>
      </>
    );

  if (isLoading && !data?.length)
    return (
      <div className="flex flex-col space-y-4">
        <Skeleton className="flex items-center space-x-2">
          <Skeleton className="bg-gray-300/60 w-40 h-8" />
          <Skeleton className="grow bg-gray-200 h-[1.5px]" />
        </Skeleton>
        <div className="flex flex-col space-y-3 pb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="p-3 flex flex-col space-y-3 bg-gray-300/60 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="w-20 h-4 rounded-lg" />
                <Skeleton className="w-20 h-4 rounded-lg" />
              </div>
              <Skeleton className="w-72 h-4 rounded-lg" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="w-5/6 h-2 rounded-lg" />
                <Skeleton className="w-full h-2 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="w-full h-20 rounded-lg flex justify-center items-center">
                  <Photo className="size-9 text-gray-300" />
                </Skeleton>
                <Skeleton className="w-full h-20 rounded-lg flex justify-center items-center">
                  <Photo className="size-9 text-gray-300" />
                </Skeleton>
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    );

  const combineLabel =
    parent_label && sub_label ? `${parent_label} / ${sub_label}` : "";
  const selectedType = combineLabel || parent_label || sub_label;

  return (
    <div className="relative">
      <div className="relative pb-4 overflow-y-auto scrollbar-none">
        {!!keywords ? (
          <div className="flex items-center space-x-2 text-primary rounded-2xl pb-4 pt-1 px-1 font-bold">
            <span>
              {t("common.search-result", { total: `${total}` || `0` })}
            </span>
            <div className="grow h-[1px] bg-gray-300" />
          </div>
        ) : (
          <div className="px-2 pb-3 md:mb-2 flex items-center space-x-4">
            <div className="flex items-center space-x-3 font-bold sm:text-xl text-amber-500">
              <span>
                <BookOpen className="size-5 md:size-6 lg:size-7" />
              </span>
              <span>{selectedType || t("common.news-label")}</span>
            </div>
            <div className="grow h-[1px] bg-gray-200" />
          </div>
        )}

        <InfiniteScroll
          scrollThreshold={0.9}
          dataLength={data?.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          className="contents"
          loader={
            <div className="flex justify-center pb-3 pt-3.5 items-center">
              <Loader />
            </div>
          }
        >
          <div className="flex flex-col space-y-2">
            {(data || [])?.map((x, i) => {
              const selectParentDefaultCate = (x?.categoryCodes || [])
                ?.at(-1)
                ?.split("_")?.[1];

              return (
                <div key={i}>
                  <NewsCard
                    key={i}
                    {...(x as INews)}
                    onClick={() => {
                      setScrollY(window.scrollY);
                      router.push(
                        ROUTES.$NEWS_DETAIL({
                          id: x?.id as number,
                          parentLabel: parent_label || selectParentDefaultCate,
                          subLabel: sub_label || "",
                        })
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
