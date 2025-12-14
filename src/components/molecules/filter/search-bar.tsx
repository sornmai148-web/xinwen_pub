"use client";

import { Input } from "@/src/components/ui/input";
import { useMetadataPagination } from "@/hooks/use-metadata-pagination";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { sleep } from "radash";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const SearchBar = () => {
  const { search, updateSearch } = useMetadataPagination();
  const [loading, setLoading] = useState(false);
  const [debouncedValue, setValue] = useDebounceValue("", 150);
  const inputRef = useRef<HTMLInputElement>(null!);

  const t = useTranslations("common");

  async function handleSearch() {
    if (!!!debouncedValue) return;
    setLoading(true);
    await sleep(800);
    updateSearch(debouncedValue);
    window?.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(false);
  }

  useEffect(() => {
    if (!!!search && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [search]);

  return (
    <div className="relative grow overflow-hidden rounded-xl max-sm:shadow-[0px_0px_21px_0px_rgba(0,_0,_0,_0.1)] mt-2.5">
      <Input
        maxLength={50}
        defaultValue={search}
        type="search"
        ref={inputRef}
        placeholder={t("search-placeholder")}
        className={cn(
          "overflow-hidden focus-visible:ring-0 text-sm bg-white border-none md:bg-gray-200/60 placeholder:text-xs h-11 rounded-xl pr-10 pl-5",
          { "animate-pulse": loading }
        )}
        onChange={(event) => {
          if (!!!event?.target?.value) updateSearch(event?.target?.value);
          setValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSearch();
        }}
      />

      <button
        className="hover:scale-105 duration-500 transition-all hover:bg-primary/90 absolute right-2 my-auto top-0 bottom-0 cursor-pointer bg-amber-500 size-7 rounded-full flex justify-center items-center"
        onClick={async () => handleSearch()}
      >
        {!loading ? (
          <Search className="size-4 text-white" />
        ) : (
          <LoaderCircle className="size-4 text-white animate-spin" />
        )}
      </button>
    </div>
  );
};
