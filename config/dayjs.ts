import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/km";
import "dayjs/locale/zh-cn";
import "dayjs/locale/zh-tw";
import "dayjs/locale/ms";
import "dayjs/locale/th";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

/**
 * @link (参考链接) : https://day.js.org/docs/en/installation/installation
 */
export function getFormatDate(date: Date, locale?: string) {
  extend(relativeTime);
  return dayjs(date)
    .locale(locale || "en")
    .format("YYYY-MM-DD");
}

export function getFormatDatetime(date: Date, locale?: Locale) {
  // List of supported locales
  const supportedLocales = ["en", "km", "zh-cn", "zh-tw", "ms", "th"];

  // Use default 'en' if locale is not found in supported locales
  const selectedLocale = supportedLocales.includes(locale || "en")
    ? locale || "en"
    : "en";

  // Set the locale in dayjs
  dayjs.locale(selectedLocale);

  // Format the date based on locale
  return dayjs(date).format(getLocaleFormat(selectedLocale));
}

// Define the date format structure for each locale
function getLocaleFormat(locale: Locale): string {
  switch (locale) {
    case "en":
      return "MMMM D, YYYY HH:mm"; // "August 8, 2025 10:30"
    case "km":
      return "D MMMM YYYY HH:mm"; // Khmer: "8 ខែសីហា 2025 10:30"
    case "zh-cn":
      return "YYYY年M月D日 HH:mm"; // Simplified Chinese: "2025年8月8日 10:30"
    case "zh-tw":
      return "YYYY年M月D日 HH:mm"; // Traditional Chinese: "2025年8月8日 10:30"
    case "ms":
      return "D MMMM YYYY HH:mm"; // Malay: "8 Ogos 2025 10:30"
    case "th":
      return "D MMMM YYYY HH:mm"; // Thai: "8 สิงหาคม 2025 10:30"
    default:
      return "MMMM D, YYYY HH:mm"; // Default to English format
  }
}

// export function getFormatHumanReadable(
//   date: Date,
//   locale?: string,
//   flag?: boolean
// ) {
//   extend(relativeTime);
//   const relative = dayjs(date)
//     .locale(locale || "en")
//     .fromNow(flag); // "3天前" or "1分钟前"
//   return relative;
// }

export function getFormatHumanReadable(
  date: Date,
  locale: keyof typeof TRANSLATIONS = "en"
) {
  const now = dayjs();
  const past = dayjs(date);
  const diffSeconds = now.diff(past, "second");

  const { year, month, day, hour, minute, second, and, ago, justNow } =
    TRANSLATIONS[locale as Locale] || TRANSLATIONS["en"];

  if (diffSeconds < 5) return justNow;

  const years = now.diff(past, "year");
  const months = now.diff(past.add(years, "year"), "month");
  const days = now.diff(past.add(years, "year").add(months, "month"), "day");
  const hours = now.diff(
    past.add(years, "year").add(months, "month").add(days, "day"),
    "hour"
  );
  const minutes = now.diff(
    past
      .add(years, "year")
      .add(months, "month")
      .add(days, "day")
      .add(hours, "hour"),
    "minute"
  );
  const seconds =
    diffSeconds -
    (years * 365 * 24 * 60 * 60 +
      months * 30 * 24 * 60 * 60 +
      days * 24 * 60 * 60 +
      hours * 60 * 60 +
      minutes * 60);

  const parts = [];

  if (years) parts.push(year(years));
  if (months) parts.push(month(months));
  if (!years && !months && days) parts.push(day(days));
  if (!years && !months && !days && hours) parts.push(hour(hours));
  if (!years && !months && !days && !hours && minutes)
    parts.push(minute(minutes));
  if (!years && !months && !days && !hours && !minutes && seconds)
    parts.push(second(seconds));

  return parts.join(and) + ago;
}

//--- Test translation
const TRANSLATIONS = {
  en: {
    year: (n: number) => `${n} year${n !== 1 ? "s" : ""}`,
    month: (n: number) => `${n} month${n !== 1 ? "s" : ""}`,
    day: (n: number) => `${n} day${n !== 1 ? "s" : ""}`,
    hour: (n: number) => `${n} hour${n !== 1 ? "s" : ""}`,
    minute: (n: number) => `${n} minute${n !== 1 ? "s" : ""}`,
    second: (n: number) => `${n} second${n !== 1 ? "s" : ""}`,
    and: " and ",
    ago: " ago",
    justNow: "just now",
  },
  "zh-cn": {
    year: (n: number) => `${n}年`,
    month: (n: number) => `${n}个月`,
    day: (n: number) => `${n}天`,
    hour: (n: number) => `${n}小时`,
    minute: (n: number) => `${n}分钟`,
    second: (n: number) => `${n}秒`,
    and: "",
    ago: "前",
    justNow: "刚刚",
  },
  "zh-tw": {
    year: (n: number) => `${n}年`,
    month: (n: number) => `${n}个月`,
    day: (n: number) => `${n}天`,
    hour: (n: number) => `${n}小时`,
    minute: (n: number) => `${n}分钟`,
    second: (n: number) => `${n}秒`,
    and: "",
    ago: "前",
    justNow: "刚刚",
  },
  km: {
    year: (n: number) => `${n} ឆ្នាំ`,
    month: (n: number) => `${n} ខែ`,
    day: (n: number) => `${n} ថ្ងៃ`,
    hour: (n: number) => `${n} ម៉ោង`,
    minute: (n: number) => `${n} នាទី`,
    second: (n: number) => `${n} វិនាទី`,
    and: " និង ",
    ago: "មុន",
    justNow: "ម្សិលមិញ",
  },
  th: {
    year: (n: number) => `${n} ปี`,
    month: (n: number) => `${n} เดือน`,
    day: (n: number) => `${n} วัน`,
    hour: (n: number) => `${n} ชั่วโมง`,
    minute: (n: number) => `${n} นาที`,
    second: (n: number) => `${n} วินาที`,
    and: " และ ",
    ago: "ที่แล้ว",
    justNow: "เมื่อครู่",
  },
  ms: {
    year: (n: number) => `${n} tahun`,
    month: (n: number) => `${n} bulan`,
    day: (n: number) => `${n} hari`,
    hour: (n: number) => `${n} jam`,
    minute: (n: number) => `${n} minit`,
    second: (n: number) => `${n} saat`,
    and: " dan ",
    ago: "yang lalu",
    justNow: "sebentar tadi",
  },
};
