type IResponseWrapper<T> = {
  msg: string;
  code: number;
  data: T;
};

type CMSType = "news" | "job" | "rental" | "feibo";

export interface IFilterOptions {
  platType: CMSType;
  langCode: Locale;
}

interface SearchInnerFilter {
  fieldId?: number;
  values?: string[];
  fieldName?: "searchText";
  inputText?: string;
}

export interface ISearchOptions {
  contentType: CMSType;
  langCode: Locale;
  pageNum: number;
  pageSize: number;
  filters: Array<SearchInnerFilter>;
}

export interface IDetailFilterOptions {
  id: number;
}

export interface IFilterValue {
  id: number;
  createTime: string;
  updateTime: string;
  fieldId: number;
  fieldValue: string;
  valueText: string;
  sort: number;
  status: number;
  parentId: number | null;
}

//-- Filter Option
export interface IFilter {
  id: number;
  platType: CMSType;
  langCode: string;
  sort: number;
  parentId: number;
  fieldName: string;
  displayName: string;
  fieldType: string;
  operator: string;
  values: Array<IFilterValue>;
}

export interface IMedia {
  id: number;
  createTime: string;
  updateTime: string;
  contentId: number;
  mediaType: string;
  url: string;
  sort: number;
  altText: string;
}

export interface INews {
  id: number;
  createTime: string;
  updateTime: string;
  contentId: number;
  platType: CMSType;
  status: number;
  code: string;
  regionCode: string;
  isFeatured: number;
  publishTime: string;
  langCode: Locale;
  langId: number;
  title: string;
  body: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  searchText: string;
  url: string | null;
  categoryCodes: string[] | null;
  meta: { salary: number; location: string };
  medias: IMedia[];
  actionTarget: { id: number; url: string | null };
}

//--- All export responses
export type IFilterResponse = IResponseWrapper<Array<IFilter>>;
export type INewsDetailResponse = IResponseWrapper<INews>;
export type INewsListResponses = IResponseWrapper<{
  total: number;
  data: Array<INews>;
}>;
