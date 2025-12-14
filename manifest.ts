import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "海外新闻",
    short_name: "海外新闻",
    description:
      "海外新闻，第一时间为您报道全球重大事件与最新动态，涵盖国际政治、经济、科技、文化等领域。关注世界风云变幻，获取权威、及时、多角度的国际资讯，让您足不出户了解全球。",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
