import { getApi } from "@/lib/api/get-api";
import { isApiError } from "@/lib/utils";
import { type IRequest } from "@/types/request.type";

export const createTransactionOptions = () => {
    return Object.freeze({
        mutationKey: ["use-transaction"],
        mutationFn: async (input: IRequest) => {
            const api = getApi();
            const response = await api.post("/change", JSON.stringify(input));
            if (isApiError(response)) {
                throw new Error(response.message);
            } else {
                return response;
            }
        },
    });
};
