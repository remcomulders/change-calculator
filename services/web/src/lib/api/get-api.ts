import { type IResponse } from "@/types/response.type";
import { createApi, type RequestResults } from "./create-api";
import type { IError } from "@/types/error.type";

interface ApiResults extends RequestResults {
    "/change": IResponse | IError;
}

const instance = (() => createApi<ApiResults>())();

export const getApi = () => instance;
