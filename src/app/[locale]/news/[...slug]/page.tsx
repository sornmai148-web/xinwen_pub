import { getNewsDetail } from "@/api/resource";
import { Container } from "@/src/components/molecules/container";
import { getFormatDatetime, getFormatHumanReadable } from "@/config/dayjs";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { Clock, Megaphone } from "lucide-react";
import { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";
import { GallerSlider } from "@/src/components/organisms/sliders/gallery-slider";
import { NewsBreadcrumb } from "@/src/components/molecules/news-breadcrumb";
import { getTranslations } from "next-intl/server";
import { Advertisement } from "@/src/components/molecules/advertisement";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string[] }>;
  searchParams: Promise<{ parent_label: string; sub_label: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params)?.slug[0];

  const response = await getNewsDetail({ id: +slug });
  const seoImages = response?.data?.medias?.map((x) => x.url);

  if (response?.code == 500) return redirect(ROUTES.SERVER_ERROR);

  return {
    title: response?.data?.seoTitle || siteConfig?.siteTitle,
    description: response?.data?.seoDescription || siteConfig?.siteDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.siteName }],
    openGraph: {
      title: response?.data?.seoTitle || siteConfig?.siteTitle,
      description:
        response?.data?.seoDescription || siteConfig?.siteDescription,
      url: response?.data?.medias?.[0]?.url || siteConfig?.siteUrl,
      type: "website",
      images: [
        {
          url: seoImages?.[0] || siteConfig?.imgUrl,
          width: 1200,
          height: 630,
          alt: "banner.jpg",
        },
      ],
      siteName: siteConfig.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: response?.data?.seoTitle || siteConfig?.siteTitle,
      description:
        response?.data?.seoDescription || siteConfig?.siteDescription,
      images: seoImages,
    },
    icons: {
      icon: siteConfig.icon,
      apple: siteConfig.logo,
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Company",
        name: siteConfig.siteName,
        url: `${siteConfig.siteUrl}/news/${slug[0]}`,
        location: response?.data?.meta?.location,
        description:
          response?.data?.seoDescription || siteConfig?.siteDescription,
      }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const routeParams = await params;
  const locale = routeParams?.locale || "en";
  const slug = routeParams?.slug?.[0];

  const { parent_label, sub_label } = await searchParams;

  const t = await getTranslations("common");

  const response = await getNewsDetail({ id: +slug || -1 });

  if (response?.code == 500) return redirect(ROUTES.SERVER_ERROR);

  const categories = (response?.data?.categoryCodes || [])?.map(
    (l) => `${l?.split("_")[1] ? `# ${l?.split("_")[1]}` : ""}`
  );

  return (
    <div className="grid grid-cols-12 max-w-6xl mx-auto min-h-[calc(100dvh-145px)] md:min-h-[calc(100dvh-210px)]">
      <div className="col-span-12 md:col-span-8 max-md:border-r max-md:border-l border-gray-200/50 md:pt-2 px-1">
        <div className="pb-2 px-1 z-10">
          <div className="py-2 md:py-3 md:px-2 rounded-xs flex items-center justify-between bg-white">
            <NewsBreadcrumb parentLabel={parent_label} subLabel={sub_label} />
          </div>
        </div>

        <Container className="max-md:py-6 md:p-6 bg-white mx-1.5 mb-4 rounded-xs">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] sm:text-sm text-gray-500">
                {!!response?.data?.publishTime
                  ? getFormatDatetime(
                      new Date(response?.data?.publishTime || ""),
                      locale as Locale
                    )
                  : null}
              </span>

              <div className="flex space-x-1 md:space-x-2.5 items-center max-md:text-[10px] md:text-sm text-black backdrop-blur-sm px-2 rounded-sm py-1 md:px-3.5 md:py-1.5 w-fit">
                <Clock className="inline size-3 md:size-4 text-amber-500" />
                <span>
                  {!!response?.data?.publishTime
                    ? getFormatHumanReadable(
                        new Date(response?.data?.publishTime as string),
                        locale as Locale
                      )
                    : null}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 md:space-y-4">
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug font-bold wrap-break-word">
                {response?.data?.title || ""}
              </h1>
              <p className="text-gray-500 whitespace-pre-line wrap-break-word leading-relaxed 2xl:text-lg">
                {response?.data?.summary}
              </p>
              <p className="text-xs text-amber-500 md:text-sm font-medium">
                {categories.join("  ")}
              </p>
            </div>

            {(response?.data?.medias?.length || 0) > 0 && (
              <GallerSlider items={response?.data?.medias || []} hideAds />
            )}

            <div className="flex flex-col space-y-2 md:space-y-3">
              <p className="text-gray-500 whitespace-pre-line wrap-break-word 2xl:text-lg leading-relaxed">
                {response?.data?.body}
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="sticky top-20 md:mt-4 p-4 max-md:hidden col-span-4 h-fit bg-white mx-1.5 rounded-md md:rounded-xl lg:rounded-2xl mb-4 shadow-[0px_0px_21px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center space-x-2 text-amber-500">
          <Megaphone className="size-4" />
          <h4 className="font-bold md:text-sm lg:text-base">
            {t("advert-label")}
          </h4>
        </div>
        <div className="w-full h-px bg-gray-200/50 my-2 lg:my-3" />
        <div>
          <Advertisement isPartialShow hideHighlight />
        </div>
      </div>
    </div>
  );
};

export default Page;
