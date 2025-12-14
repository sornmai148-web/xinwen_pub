import { getFilterOptions } from "@/api/resource";
import { FilterOptions } from "@/src/components/molecules/filter";
import { ROUTES } from "@/config/routes";
import { NextPage } from "next";

import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const Page: NextPage<PageProps> = async ({ params }) => {
  const queryParams = await params;
  const locale = queryParams?.locale || "en";

  const response = await getFilterOptions({
    platType: "news",
    langCode: locale,
  });

  if (response?.code == 500) {
    return redirect(ROUTES.SERVER_ERROR);
  }

  return (
    <div className="relative min-h-[calc(100dvh-150px)] h-auto lg:max-w-5xl xl:max-w-6xl mx-auto">
      <FilterOptions locale={locale} filterOptions={response?.data || null} />
    </div>
  );
};

export default Page;
