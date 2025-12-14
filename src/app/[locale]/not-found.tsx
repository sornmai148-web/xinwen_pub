"use client";
/**
 * @link forum : https://github.com/amannn/next-intl/discussions/329
 * @link https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/%5Blocale%5D/%5B...rest%5D/page.tsx
 */

import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import NotFoundState from "@/public/images/not-found-state.png";
import { ROUTES } from "@/config/routes";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("page.not-found");

  return (
    <div className="flex space-y-2 md:space-y-3 h-screen bg-gray-100 flex-col items-center justify-center">
      <div className="relative size-24 md:size-28 xl:size-52">
        <Image
          src={NotFoundState}
          alt="error-state.png"
          className="object-cover"
          fill
        />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold">{t("title")}</h2>
      <p className="text-sm md:text-base">{t("sub-title")}</p>

      <Button
        className="!text-sm md:text-base py-5 !bg-orange-500 !cursor-pointer"
        asChild
      >
        <Link href={ROUTES.HOME}>
          <Home />
          <span> {t("btn")}</span>
        </Link>
      </Button>
    </div>
  );
}
