"use client";

import { createTransactionOptions } from "@/lib/api/options/create-transaction-options";
import { useMutation } from "@tanstack/react-query";

export const useTransaction = () => {
    return useMutation(createTransactionOptions());
};
