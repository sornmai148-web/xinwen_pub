export const ROUTES = {
  //-- Default-Routing
  HOME: "/",
  DETAIL: "/news",
  SERVER_ERROR: "/server-error",

  $NEWS_DETAIL: function (args: {
    id: number | string;
    parentLabel?: string;
    subLabel?: string;
  }) {
    return `${this.DETAIL}/${args?.id}?${
      args?.parentLabel ? `parent_label=${args?.parentLabel}` : ""
    }${args?.subLabel ? `&sub_label=${args?.subLabel}` : ""}`;
  },
} as const;
