import * as I from "./interface";
import { fetchApi, fetchClientApi } from "./main";

/**
 * Description : this funtion used to get the filter options
 */
export async function getFilterOptions(args: I.IFilterOptions) {
  const response = await fetchApi<I.IFilterResponse>("/filter/getFilters", {
    body: args,
  });

  return response;
}

/**
 * Description : this function used to get the list based on filter, search , pagination
 */
export async function getNewsList(args: I.ISearchOptions) {
  const response = await fetchClientApi<I.INewsListResponses>(
    "/content/searchContent",
    { body: args }
  );

  return response;
}

/**
 * Description : this function used to get the detail of a particular news
 */
export async function getNewsDetail(args: I.IDetailFilterOptions) {
  const response = await fetchApi<I.INewsDetailResponse>(
    "/content/getContentById",
    { body: args }
  );
  return response;
}
