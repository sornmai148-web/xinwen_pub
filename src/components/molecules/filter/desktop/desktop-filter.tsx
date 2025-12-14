"use client";

import { useEffect } from "react";
import { OptionCollapse } from "./option-collapse";
import { useTranslations } from "next-intl";
import { useMetadataPagination } from "@/hooks/use-metadata-pagination";

interface IFilter {
  selfId?: number;
  fieldId: number;
  label: string;
  value: string;
  parentId: number | null;
}

interface Props {
  locale: Locale;
  firstLevel: Array<IFilter>;
  secondLevel: Array<IFilter> | null;
}

export const DesktopFilter: React.FC<Props> = ({ firstLevel, secondLevel }) => {
  const t = useTranslations("common");
  const { updateFieldId, updateParentLabel, updateFieldValue } =
    useMetadataPagination();
  const items = [
    {
      fieldId: -1,
      label: t("news-label"),
      value: t("news-label"),
      selfId: -1,
      parentId: -1,
    },
    ...firstLevel,
  ];

  const initialSelectedType = items?.[0];

  useEffect(() => {
    if (initialSelectedType) {
      updateFieldId("");
      updateFieldValue("");
      updateParentLabel("");
      updateParentLabel("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-2 flex flex-col space-y-2 max-h-[50dvh] overflow-y-auto scrollbar scrollbar-w-[3px] scrollbar-thumb-accent scrollbar-thumb-rounded-2xl px-2">
      {(items || [])?.map((x, i) => (
        <OptionCollapse
          key={i}
          parentLabel={x?.label}
          parentId={x?.selfId}
          parentFieldId={x?.fieldId} //-- Used for active
          parentValue={x?.value}
          filterOptions={secondLevel}
        />
      ))}
    </div>
  );
};
