"use client";

import Image from "next/image";

import LogoImg from "@/public/images/news-logo.png";
import { ROUTES } from "@/config/routes";
import { useRouter } from "@/src/i18n/navigation";

export const Logo = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.replace(`${ROUTES.HOME}?slug=latest`);
        const el = document.getElementById(`x--1`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        window?.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Image
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={LogoImg}
        alt="news-logo.png"
        className="object-contain w-24 h-16 sm:w-34 sm:h-20"
        priority
      />
    </button>
  );
};
