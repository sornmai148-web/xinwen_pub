"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/src/i18n/navigation";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";

const locales = [
  {
    code: "en",
    label: "English",
    countryCode: "gb",
    flag: (
      <ReactCountryFlag
        aria-label="English"
        className="!text-2xl"
        countryCode="gb"
      />
    ),
  },
  {
    code: "zh-cn",
    label: "中文 (简体)",
    countryCode: "cn",
    flag: (
      <ReactCountryFlag
        aria-label="中文 (简体)"
        className="!text-2xl"
        countryCode="cn"
      />
    ),
  },
  {
    code: "zh-tw",
    label: "中文（繁体)",
    countryCode: "tw",
    flag: (
      <ReactCountryFlag
        aria-label="中文（繁体)"
        className="!text-2xl"
        countryCode="tw"
      />
    ),
  },
  {
    code: "km",
    label: "ភាសាខ្មែរ",
    countryCode: "kh",
    flag: (
      <ReactCountryFlag
        aria-label="ភាសាខ្មែរ"
        className="!text-2xl"
        countryCode="kh"
      />
    ),
  },
  {
    code: "th",
    label: "ภาษาไทย",
    countryCode: "th",
    flag: (
      <ReactCountryFlag
        aria-label="ภาษาไทย"
        className="!text-2xl"
        countryCode="th"
      />
    ),
  },
  {
    code: "ms",
    label: "Bahasa Melayu",
    countryCode: "my",
    flag: (
      <ReactCountryFlag
        aria-label="Bahasa Melayu"
        className="!text-2xl"
        countryCode="my"
      />
    ),
  },
];

export const LocaleSwitcher = () => {
  const [countryCode, setCountryCode] = useState("");
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleChange = (locale: Locale) => {
    router.replace(pathname, { locale: locale });
  };

  if (pathname != "/") return null;
  const language = locales.find((x) => x.code == currentLocale);

  const defaultCountrycode = locales.find((c) => c.code == currentLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2">
          <ReactCountryFlag
            className="!text-3xl max-md:!hidden"
            countryCode={
              countryCode || (defaultCountrycode?.countryCode as never)
            }
          />
          <span className="text-xs font-bold text-white">
            {language?.label}
          </span>

          <button className="md:hidden p-2 !mr-0 cursor-pointer rounded-md bg-white/10">
            <Globe className="size-4 text-amber-500" />
          </button>

          <button className="max-md:hidden cursor-pointer p-0.5 mt-1 mr-2">
            <ChevronDown className="size-5 text-white" />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit rounded-xs mt-5" align="end">
        <DropdownMenuLabel>{t("choose-language")}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-100" />
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={(value) => {
            handleChange(value as Locale);
          }}
        >
          {locales.map((x, i) => (
            <DropdownMenuRadioItem
              key={i}
              value={x.code}
              className="cursor-pointer"
              onClick={() => setCountryCode(x.countryCode)}
            >
              <div className="flex items-center space-x-2.5">
                <span>{x.flag}</span>
                <span>{x.label}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
