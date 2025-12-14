import { getNewsList } from "@/api/resource";
import { ROUTES } from "@/config/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { sleep } from "radash";
import { useState } from "react";

const PAGE_LIMIT = 20;

export const useSearch = (queryParams: QueryParams) => {
  const [total, setTotal] = useState(0);
  const { keywords, field_id, filter_value } = queryParams || {};
  const router = useRouter();
  const locale = useLocale();

  const validSearchKeyword =
    (keywords || "")?.length > 50 ? keywords?.slice(0, 50) : keywords;

  const searchByKeyword = {
    fieldName: "searchText",
    inputText: validSearchKeyword,
  };

  const filterByFieldId = {
    fieldId: field_id,
    values: [filter_value?.trim()],
  };

  const searchFilter = Boolean(validSearchKeyword)
    ? searchByKeyword
    : Boolean(field_id)
    ? filterByFieldId
    : {};

  const {
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: [
      "news-search",
      locale,
      validSearchKeyword,
      field_id,
      filter_value,
      total,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getNewsList({
        contentType: "news",
        langCode: locale || "en",
        pageNum: pageParam || 1,
        pageSize: PAGE_LIMIT,
        filters: [{ ...searchFilter }],
      });

      if (response?.code != 200) {
        return router.replace(ROUTES.SERVER_ERROR);
      }

      setTotal(response?.data?.total || 0);

      await sleep(1000);
      return response;
    },

    getNextPageParam: (lastPage, __, lastPageParam) => {
      const page =
        (lastPage?.data?.data?.length || 0) < PAGE_LIMIT
          ? undefined
          : lastPageParam + 1;

      return page;
    },
  });

  const flatData = data?.pages.flatMap((x) => x?.data?.data) || [];

  return {
    isFetching,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data: flatData,
    total,
  };
};
