import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ServerErrorState from "@/public/images/server-error-state.png";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/config/routes";
import { Home } from "lucide-react";

export default async function Page() {
  const t = await getTranslations("page.error");

  return (
    <div className="flex space-y-2 md:space-y-3 h-screen bg-gray-100 flex-col items-center justify-center">
      <div className="relative size-24 md:size-28 xl:size-52">
        <Image
          src={ServerErrorState}
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
          <span>{t("btn")}</span>
        </Link>
      </Button>
    </div>
  );
}
