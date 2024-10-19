"use client";

import { type ReactNode } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/client/get-query-client";

export const QueryProvider = function ({ children }: { children: ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                {children}
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    );
};
