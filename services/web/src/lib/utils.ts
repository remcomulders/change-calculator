import type { IError } from "@/types/error.type";
import type { IResponse } from "@/types/response.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isApiError(type: IResponse | IError): type is IError {
    return "error" in type;
}
