import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, //-- allow all domain
    ],
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./locales/en.json",
  },
});

export default withNextIntl(nextConfig);
