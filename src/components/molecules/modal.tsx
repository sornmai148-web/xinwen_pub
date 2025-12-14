"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMetadataPagination } from "@/hooks/use-metadata-pagination";
import { select } from "radash";
import { useTranslations } from "next-intl";
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
  locale: Locale;
  firstLevel: Array<IFilter> | null;
  secondLevel: Array<IFilter> | null;
}

export const FilterModal: React.FC<Props> = ({ firstLevel, secondLevel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("common");

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

  return (
    <>
      <Button
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
        variant="link"
        size="icon"
      >
        <SlidersHorizontal />
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none md:hidden"
        onClose={() => setIsOpen(false)}
        __demoMode
      >
        <div className="fixed w-screen inset-0 !z-50 overflow-y-auto">
          <div className="flex items-center justify-center">
            <DialogPanel
              transition
              className="w-full relative pt-20 h-[100dvh] bg-gray-100 px-6 pb-8 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3 pb-2">
                  <p className="text-xl font-bold text-amber-500">
                    {t("filter-label")}
                  </p>
                  <div className="grow h-[1px] bg-gray-300" />
                </div>

                <div className="flex flex-col space-y-3 h-[calc(100dvh-140px)] overflow-y-auto scrollbar-none">
                  {(firstLevel || [])?.map((x, i) => (
                    <div
                      key={i}
                      className={cn(
                        "cursor-pointer px-4 py-2.5 bg-white rounded-lg"
                      )}
                      onClick={() => {
                        const hasSecondLevel = secondLevel?.some(
                          (l) => l.parentId == x?.selfId
                        );

                        if (!!hasSecondLevel) return null;

                        setIsOpen(false);
                        updateFieldId(`${x?.fieldId}`);
                        updateFieldValue(`${x?.value}`);
                        updateParentLabel(`${x?.label}`);
                        updateSubLabel("");
                        setScrollY(0);
                        setSlug("");

                        //-- This line of code is scrolled to top andn jump to selected filter if matched
                        const el = document.getElementById(`${x.value}`);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                        window?.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <button
                        className={cn(
                          "hover:text-amber-500 hover:scale-105 duration-500 transition-all cursor-pointer flex items-center space-x-1",
                          {
                            "text-amber-500":
                              x?.label == parent_label ||
                              (x.value == t("news-label") && !!!field_id),
                          }
                        )}
                        onClick={() => {
                          setIsOpen(false);
                          updateFieldId(`${x?.fieldId}`);
                          updateFieldValue(`${x?.value}`);
                          updateParentLabel(`${x?.label}`);
                          updateSubLabel("");
                          setScrollY(0);
                          setSlug("");

                          //-- This line of code is scrolled to top andn jump to selected filter if matched
                          const el = document.getElementById(`${x.value}`);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                          window?.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <span>
                          <ArrowUpRight className="size-3" />
                        </span>
                        <span>{x.label}</span>
                      </button>

                      <SubType
                        parentId={x?.selfId}
                        parentFieldId={x?.fieldId}
                        parentLabel={x?.label}
                        filterOptions={secondLevel}
                        onClick={() => {
                          setIsOpen(false);
                          const el = document.getElementById(`${x.value}`);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                          window?.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/*-- Close Button --*/}
              <button
                className="cursor-pointer absolute top-8 right-6 p-1 bg-orange-400/10 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <X className="text-amber-500 size-5" />
              </button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

interface SubTypeProps {
  parentId?: number | null;
  parentFieldId?: number;
  parentLabel?: string;
  filterOptions: Array<IFilter> | null;
  onClick: () => void;
}

const SubType: React.FC<SubTypeProps> = ({
  parentId,
  parentLabel,
  filterOptions,
  onClick,
}) => {
  const {
    sub_label,
    updateFieldId,
    updateFieldValue,
    updateParentLabel,
    updateSubLabel,
  } = useMetadataPagination();

  const {
    contentRef,
    height,
    defaultHeight,
    revealExceedMax,
    revealHiddenContent,
  } = useAnimatedContentHeight({
    defaultHeight: 80,
    dependency: filterOptions?.length,
  });

  const subFilterOptions = select(
    filterOptions || [],
    (f) => f,
    (f) => f?.parentId == parentId
  );

  if (!subFilterOptions?.length) return null;

  return (
    <div className="relative">
      <AnimateHeight
        id="example-panel z-20"
        className="rounded-b-md"
        duration={150}
        easing="linear"
        height={height || defaultHeight}
      >
        <div ref={contentRef} className="flex flex-wrap gap-2 py-2">
          {(subFilterOptions || [])?.map((x, i) => (
            <button
              key={i}
              className={cn(
                "cursor-pointer bg-primary/5 hover:bg-amber-500 hover:text-white duration-500 transition-colors text-center py-1.5 px-1.5 grow rounded-md text-xs",
                { "text-amber-500": x?.label == sub_label }
              )}
              onClick={() => {
                updateFieldId(`${x?.fieldId}`);
                updateFieldValue(`${x?.value}`);
                updateParentLabel(`${parentLabel}`);
                updateSubLabel(`${x?.label}`);
                onClick();
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
            className="px-4 mt-1 bg-white border border-gray-100 cursor-pointer rounded-2xl"
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
    </div>
  );
};
