"use client";

import { useMetadataPagination } from "@/hooks/use-metadata-pagination";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { select } from "radash";
import { useState } from "react";
import { useCollapse } from "react-collapsed";
import AnimateHeight from "react-animate-height";
import { useAnimatedContentHeight } from "@/hooks/use-animated-content-height";
import { usePreserveScroll } from "@/hooks/use-preserve-scroll";

interface IFilter {
  selfId?: number;
  fieldId: number;
  label: string;
  value: string;
  parentId: number | null;
}

interface Props {
  parentFieldId?: number;
  parentId?: number;
  parentLabel?: string;
  parentValue?: string;
  filterOptions: Array<IFilter> | null;
}

export const OptionCollapse: React.FC<Props> = ({
  parentLabel,
  parentValue,
  parentFieldId,
  parentId,
  filterOptions,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const {
    height,
    defaultHeight,
    contentRef,
    revealExceedMax,
    revealHiddenContent,
  } = useAnimatedContentHeight({ defaultHeight: 115, dependency: isExpanded });

  const {
    field_id,
    field_value,
    parent_label,
    updateFieldId,
    updateFieldValue,
    updateParentLabel,
    updateSubLabel,
    setSlug,
  } = useMetadataPagination();
  const { setScrollY } = usePreserveScroll();

  const t = useTranslations("common");

  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded,
    collapsedHeight: 0,
    easing: "linear",
    duration: 200,
  });

  const subFilterOptions = select(
    filterOptions || [],
    (f) => ({
      ...f,
      label: f.label?.trim(),
      value: f.value?.trim(),
    }),
    (f) => f?.parentId == parentId
  );

  return (
    <div
      id={`x-${parentFieldId}`}
      className="px-2.5 py-2.5 bg-gray-100/80 rounded-sm"
    >
      <div className="flex items-center justify-between">
        <button
          className={cn(
            "hover:scale-105 bg-white md:px-2 lg:px-4 py-1 rounded-sm text-sm md:text-xs lg:text-sm max-w-5/6 text-start hover:text-amber-500 hover:bg-amber-50 duration-300 transition-all cursor-pointer",
            {
              "text-amber-500 font-bold":
                parentLabel == parent_label ||
                (parentValue == t("news-label") && !!!field_id),
            }
          )}
          onClick={() => {
            if (parentValue == t("news-label")) {
              updateFieldId("");
              updateFieldValue("");
              updateParentLabel("");
              updateSubLabel("");

              setSlug("latest");

              const el = document.getElementById(`x-${parentFieldId}`);
              if (el) el.scrollIntoView({ behavior: "smooth" });
              window?.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }

            updateFieldId(`${parentFieldId}`);
            updateFieldValue(`${parentValue}`);
            updateParentLabel(`${parentLabel}`);
            updateSubLabel("");

            setSlug("");
            setScrollY(0);

            const el = document.getElementById(`x-${parentFieldId}`);
            if (el) el.scrollIntoView({ behavior: "smooth" });

            window?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {parentLabel}
        </button>

        {subFilterOptions?.length > 0 && (
          <span
            className="cursor-pointer"
            role="button"
            {...getToggleProps({
              onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })}
          >
            {isExpanded ? (
              <ChevronUp className="size-4 text-amber-500 mr-1" />
            ) : (
              <ChevronDown className="size-4 text-gray-500 mr-1" />
            )}
          </span>
        )}
      </div>

      <section
        {...getCollapseProps()}
        className="!w-full bg-white/50 mt-3 rounded-sm border border-gray-200/60"
      >
        <AnimateHeight
          id="example-panel z-20"
          className="rounded-b-md"
          duration={150}
          easing="linear"
          height={height || defaultHeight}
        >
          <div
            ref={contentRef}
            className="grid grid-cols-2 gap-2 py-2 px-2 text-[13px] md:text-[10px] lg:text-xs"
          >
            {(subFilterOptions || [])?.map((x, i) => (
              <button
                key={i}
                className={cn(
                  "bg-gray-100 py-1.5 rounded-sm hover:bg-amber-500/60 hover:text-white cursor-pointer duration-300 transition-colors",
                  { "text-white bg-amber-500": x?.value == field_value }
                )}
                onClick={() => {
                  updateFieldId(`${x?.fieldId}`);
                  updateFieldValue(`${x?.value}`);
                  updateParentLabel(`${parentLabel}`);
                  updateSubLabel(`${x?.label}`);

                  setSlug("");
                  setScrollY(0);

                  window?.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {x?.label}
              </button>
            ))}
          </div>
        </AnimateHeight>

        {revealExceedMax && (
          <div className="flex justify-center items-center">
            <button
              className="px-4 mt-1 mb-2 bg-white border border-gray-100 cursor-pointer rounded-2xl"
              aria-expanded={height !== 0}
              aria-controls="filter-type2"
              onClick={revealHiddenContent}
            >
              {+height >= defaultHeight ? (
                <ChevronDown className="size-4 text-amber-500" />
              ) : (
                <ChevronUp className="size-4 text-amber-500" />
              )}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
