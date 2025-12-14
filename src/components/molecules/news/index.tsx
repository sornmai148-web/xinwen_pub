"use client";

import { Advertisement } from "../advertisement";
import { Container } from "../container";
import { NewsList } from "./news-list";

export const NewsSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  return (
    <Container className="pt-3 py-0">
      <div className="md:hidden">
        <Advertisement />
      </div>
      <NewsList locale={locale} />
    </Container>
  );
};
