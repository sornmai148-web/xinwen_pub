import { Container } from "../container";

import { SearchBar } from "./search-bar";
import { IFilter } from "@/api/interface";
import { TagSection } from "./tag-section";
import { FilterModal } from "../modal";
import { select } from "radash";
import { ListFilter } from "lucide-react";
import { DesktopFilter } from "./desktop/desktop-filter";
import { NewsSection } from "../news";
import { Advertisement } from "../advertisement";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: Locale;
  filterOptions: Array<IFilter> | null;
}

export const FilterOptions: React.FC<Props> = async ({
  locale,
  filterOptions: items,
}) => {
  const t = await getTranslations("common");

  //-- 获取一级分类过滤配置数据
  const firstLevelFilterOption = select(
    items || [],
    (f) => f?.values,
    (f) => f?.parentId == null
  )
    ?.flatMap((x) => x)
    ?.map((y) => ({
      selfId: y?.id, //--过滤二级要用到
      fieldId: y?.fieldId, //-- 过滤字段
      label: y?.valueText, //-- 展示字段
      value: y?.fieldValue, //-- 过滤字段
      parentId: y.parentId,
    }));

  //-- 获取二级分类过滤配置数据
  const secondLevelFilterOptioin = select(
    items || [],
    (f) => f?.values,
    (f) => typeof f?.parentId == "number"
  )
    ?.flatMap((x) => x)
    ?.map((y) => ({
      selfId: y?.id, //--过滤二级要用到
      fieldId: y?.fieldId, //-- 过滤字段
      label: y?.valueText, //-- 展示字段
      value: y?.fieldValue, //-- 过滤字段
      parentId: y.parentId,
    }));

  //-- 渲染清空页面，如果没有过滤配置存在
  const shouldShow =
    Boolean(items?.length) || Boolean(firstLevelFilterOption?.length);

  return (
    <>
      {/*-- Min Lg show this UI --*/}
      <div className="max-md:hidden px-4">
        <Advertisement isPartialShow={false} />
      </div>

      <div className="relative max-md:hidden md:grid grid-cols-12 lg:gap-3 p-3">
        <div className="col-span-4 mb-4">
          <div className="sticky top-28">
            <div className="shadow-[0px_0px_21px_0px_rgba(0,_0,_0,_0.1)] bg-gray-50 rounded-md p-3 h-fit">
              <p className="text-sm font-bold px-1">{t("search-label")}</p>
              <SearchBar />
            </div>

            <div className="shadow-[0px_0px_21px_0px_rgba(0,_0,_0,_0.1)] bg-white rounded-md px-3 py-5 h-fit mt-3">
              <div className="flex items-center space-x-2 text-sm font-bold px-1">
                <ListFilter className="size-5 text-amber-500" />
                <span className="text-pretty/80">{t("filter-label")}</span>
              </div>

              <div className="w-full h-[1px] bg-gray-200/50 mt-3" />
              <DesktopFilter
                locale={locale}
                firstLevel={firstLevelFilterOption}
                secondLevel={secondLevelFilterOptioin}
              />
            </div>
          </div>
        </div>

        <div className="col-span-8 rounded-md mb-4">
          <NewsSection locale={locale} />
        </div>
      </div>

      {/*-- Max Lg show this UI --*/}
      <div className="md:hidden">
        <div className="sticky top-[3.5rem] !z-20">
          <Container className="flex flex-col space-y-2">
            <SearchBar />
            {shouldShow && (
              <div className="flex items-center space-x-2 px-1.5 py-2 rounded-2xl bg-white shadow-[0px_0px_21px_0px_rgba(0,_0,_0,_0.1)]">
                <div className="relative grow">
                  {/* scrollbar scrollbar-thumb-amber-500 scrollbar-h-[5px] pb-1.5 scrollbar-thumb-rounded-2xl */}
                  <div className="col-span-10 grow grid gap-2 grid-cols-2 rounded-lg overflow-x-auto scrollbar-none">
                    <TagSection
                      locale={locale}
                      filterOptions={firstLevelFilterOption}
                    />
                  </div>
                </div>

                <div className="flex mb-auto md:hidden">
                  <FilterModal
                    locale={locale}
                    firstLevel={firstLevelFilterOption}
                    secondLevel={secondLevelFilterOptioin}
                  />
                </div>
              </div>
            )}
          </Container>
        </div>
        <NewsSection locale={locale} />
      </div>
    </>
  );
};
