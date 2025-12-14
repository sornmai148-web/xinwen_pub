import Image from "next/image";

import EmptyStateImg from "@/public/images/empty-news.png";
import EmptyStateSearchImg from "@/public/images/empty-search-result.png";
import { cn } from "@/lib/utils";

interface Props {
  type?: "default" | "search";
  title: string;
  subtitle: string;
}

export const EmptyState: React.FC<Props> = ({
  type = "default",
  title,
  subtitle,
}) => {
  const img = getImage(type);
  return (
    <div
      className={cn(
        "h-[calc(60dvh)] md:h-[calc(55dvh)] rounded-t-xl flex justify-center items-center",
        {
          "h-[calc(60dvh)] md:h-[calc(55dvh)]": type == "default",
        }
      )}
    >
      <div className="size-fit flex flex-col justify-center items-center">
        <Image
          src={img}
          alt="empty-state"
          className="object-cover"
          width={100}
          height={62}
        />
        <div className="flex flex-col space-y-1 mt-4 justify-center items-center">
          <h2 className="text-xl font-bold text-primary text-center">
            {title}
          </h2>
          <span className="font-medium w-full px-10 text-gray-500 text-center text-sm">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};

function getImage(type: Exclude<Props["type"], undefined>) {
  switch (type) {
    default:
    case "default":
      return EmptyStateImg;

    case "search":
      return EmptyStateSearchImg;
  }
}
