import type { Metadata } from "next";
import { Ubuntu, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/lib/tanstack-provider";
import { Header } from "@/src/components/menu/header";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { siteConfig } from "@/config/site";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { getMessages } from "next-intl/server";
import { Footer } from "@/src/components/menu/footer";
import ScrollToTopButton from "@/src/components/molecules/scroll-to-top";

const enFont = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const chFont = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: siteConfig?.siteUrl,
  title: siteConfig.siteName,
  description: siteConfig.siteDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.siteName }],
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    url: siteConfig.siteUrl,
    type: "website",
    images: [
      { url: siteConfig.imgUrl, width: 1200, height: 630, alt: "banner.jpg" },
    ],
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    images: [siteConfig.imgUrl],
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
      url: siteConfig.siteUrl,
      logo: siteConfig.logo,
      description: siteConfig.siteDescription,
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale: locale as Locale });

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale as Locale}>
      <body
        className={`relative ${
          locale == "zh-cn" || locale == "zh-tw"
            ? chFont.className
            : enFont.className
        } antialiased`}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <NextIntlClientProvider locale={locale as Locale} messages={messages}>
            <TanstackProvider>
              <main className="bg-gray-100 relative">
                <Header />
                {children}

                <Footer />
              </main>
            </TanstackProvider>
          </NextIntlClientProvider>
        </NuqsAdapter>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
