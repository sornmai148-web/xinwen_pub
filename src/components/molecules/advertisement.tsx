"use client";

import { ImageSlider } from "./slider";
import Advert2 from "@/public/images/advert-2.jpg";
import Advert5 from "@/public/images/advert-5.jpg";
import Advert6 from "@/public/images/advert-6.jpg";
import Advert7 from "@/public/images/advert-7.png";

interface Props {
  isPartialShow?: boolean;
  hideHighlight?: boolean;
}

export const Advertisement: React.FC<Props> = ({
  isPartialShow = false,
  hideHighlight = false,
}) => {
  return (
    <ImageSlider
      items={[
        { id: 6, alt: "advert_6", src: Advert6 },
        { id: 5, alt: "advert_5", src: Advert5 },
        { id: 7, alt: "advert_7", src: Advert7 },
        { id: 2, alt: "advert_2", src: Advert2 },
      ]}
      isPartialShow={isPartialShow}
      hideHighlight={hideHighlight}
    />
  );
};
