import { createTransactionOptions } from "./create-transaction-options";
import { getApi } from "@/lib/api/get-api";
import { isApiError } from "@/lib/utils";
import { type IRequest } from "@/types/request.type";

global.fetch = jest.fn();

jest.mock("../get-api", () => ({
    getApi: jest.fn(),
}));

jest.mock("../../utils", () => ({
    isApiError: jest.fn(),
}));

describe("createTransactionOptions", () => {
    const input: IRequest = {
        currency: "EUR",
        totalGiven: 100,
        transactionAmount: 80,
    };

    it("should return the correct mutation key", () => {
        const options = createTransactionOptions();
        expect(options.mutationKey).toEqual(["use-transaction"]);
    });

    it("should call the API and return the response on success", async () => {
        const mockResponse = { success: true };
        const apiMock = { post: jest.fn().mockResolvedValue(mockResponse) };

        (getApi as jest.Mock).mockReturnValue(apiMock);

        const options = createTransactionOptions();
        const response = await options.mutationFn(input);

        expect(apiMock.post).toHaveBeenCalledWith(
            "/change",
            JSON.stringify(input)
        );
        expect(response).toEqual(mockResponse);
    });

    it("should throw an error when the API response is an error", async () => {
        const mockErrorResponse = { message: "API error occurred" };
        const apiMock = {
            post: jest.fn().mockResolvedValue(mockErrorResponse),
        };

        (getApi as jest.Mock).mockReturnValue(apiMock);
        (isApiError as unknown as jest.Mock).mockReturnValue(true);

        const options = createTransactionOptions();

        await expect(options.mutationFn(input)).rejects.toThrow(
            "API error occurred"
        );
        expect(apiMock.post).toHaveBeenCalledWith(
            "/change",
            JSON.stringify(input)
        );
    });
});
