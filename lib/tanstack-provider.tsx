"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 300000, //5 minutes
    },
  },
});

export const TanstackProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function invalidateQuery(queryKey: string, dependencies?: any) {
  queryClient.invalidateQueries({
    queryKey: [queryKey, dependencies],
    exact: false,
  });
}

export function invalidateQueries() {
  queryClient.invalidateQueries();
}
