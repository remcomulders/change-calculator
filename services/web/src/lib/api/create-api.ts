import { type StringKey } from "@/types/common.type";
import { appSettings } from "../app-settings";

const DEFAULT_HEADERS = Object.freeze({
    "Content-Type": "application/json",
});

export type RequestResults<Endpoint extends string = string> = Record<
    Endpoint,
    unknown
>;

export type RequestParameters = Record<string, string | number>;

export type IBaseApi<Results extends RequestResults> = {
    post<Path extends StringKey<keyof Results>>(
        path: Path,
        body: BodyInit,
        parameters?: RequestParameters,
        headers?: Record<string, string>
    ): Promise<Results[Path]>;
};

export const createApi = <
    EndpointResults extends RequestResults = RequestResults
>(
    defaultHeaders?: Record<string, string>
): IBaseApi<EndpointResults> => {
    const createUrl = (path: string, parameters?: RequestParameters) => {
        const url = new URL(appSettings.API_URL + path);

        for (const [key, value] of Object.entries(parameters ?? {})) {
            url.searchParams.set(key, String(value));
        }

        return url;
    };

    const post: IBaseApi<EndpointResults>["post"] = async (
        path,
        body,
        parameters,
        headers
    ) => {
        const url = createUrl(path, parameters);
        const allHeaders: Record<string, string> = {
            ...DEFAULT_HEADERS,
            ...defaultHeaders,
            ...headers,
        };

        const response = await fetch(url, {
            method: "POST",
            body,
            headers: allHeaders,
        });

        return response.json();
    };

    return { post };
};
