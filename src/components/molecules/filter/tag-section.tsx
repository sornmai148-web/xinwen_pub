"use client";

import { useMetadataPagination } from "@/hooks/use-metadata-pagination";
import { usePreserveScroll } from "@/hooks/use-preserve-scroll";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const className =
  "shrink-0 px-3.5 bg-gray-200/80 cursor-pointer font-medium py-1.5 rounded-lg text-sm";

interface IFilter {
  fieldId: number;
  label: string;
  value: string;
}

interface Props {
  locale: Locale;
  filterOptions: Array<IFilter>;
}

export const TagSection: React.FC<Props> = ({ filterOptions }) => {
  const {
    field_id,
    parent_label,
    updateFieldId,
    updateFieldValue,
    updateParentLabel,
    updateSubLabel,
    setSlug,
  } = useMetadataPagination();

  const { setScrollY } = usePreserveScroll();

  const t = useTranslations("common");

  const items = [
    { fieldId: -1, label: t("news-label"), value: t("news-label") },
    ...filterOptions,
  ];

  const initialSelectedType = filterOptions?.[0];

  useEffect(() => {
    if (initialSelectedType) {
      updateFieldId("");
      updateFieldValue("");
      updateParentLabel("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex space-x-1.5 items-center">
      {(items || [])?.map((x, i) => (
        <button
          key={i}
          id={`${x.value}`} //-- Used for scroll to element animation, 滚动到目标元素动画使用
          className={cn(className, {
            "bg-amber-500 text-white":
              x?.label == parent_label ||
              (x.value == t("news-label") && !!!field_id),
          })}
          onClick={() => {
            if (x.value == t("news-label")) {
              updateFieldId("");
              updateFieldValue("");
              updateParentLabel("");
              updateSubLabel("");
              setScrollY(0);
              setSlug("latest");

              const el = document.getElementById(`${x.value}`);
              if (el) el.scrollIntoView({ behavior: "smooth" });
              window?.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }

            updateFieldId(`${x?.fieldId}`);
            updateFieldValue(`${x?.value}`);
            updateParentLabel(`${x?.label}`);
            updateSubLabel("");
            setScrollY(0);
            setSlug("");

            const el = document.getElementById(`${x.value}`);
            if (el) el.scrollIntoView({ behavior: "smooth" });
            window?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {x.label}
        </button>
      ))}
    </div>
  );
};
