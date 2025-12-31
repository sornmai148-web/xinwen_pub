"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { useRouter } from "@/src/i18n/navigation";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  parentLabel?: string;
  subLabel?: string;
}

export const NewsBreadcrumb: React.FC<Props> = ({ parentLabel, subLabel }) => {
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex flex-nowrap">
        <BreadcrumbItem
          className="pl-2.5 py-0.5 text-amber-500 rounded-sm cursor-pointer"
          onClick={() => router.back()}
        >
          <div className="flex space-x-2 px-3 py-1.5 cursor-pointer items-center bg-amber-500 rounded-xs">
            <span>
              <Home className="size-4 text-white" />
            </span>
            <span className="text-xs text-white font-bold md:text-sm">
              {t("btn-back")}
            </span>
          </div>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {!!parentLabel && (
          <BreadcrumbItem className="px-0.5">
            <BreadcrumbPage className="shrink-0 max-w-24 line-clamp-1 wrap-break-word text-xs md:text-sm xl:text-base">
              {parentLabel}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {!!parentLabel && <BreadcrumbSeparator />}

        {!!subLabel && (
          <BreadcrumbItem className="px-0.5">
            <BreadcrumbPage className="shrink-0 max-w-24 line-clamp-1 wrap-break-word text-xs md:text-sm">
              {subLabel}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {!!subLabel && <BreadcrumbSeparator />}

        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1 text-xs md:text-sm pr-1.5">
            {t("view-detail")}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
