import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "km", "th", "ms", "zh-cn", "zh-tw"],
  // Used when no locale matches
  defaultLocale: "en",
});
