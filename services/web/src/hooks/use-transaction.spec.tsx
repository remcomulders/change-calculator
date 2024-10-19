import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTransaction } from "./use-transaction";
import { getApi } from "@/lib/api/get-api";
import { isApiError } from "@/lib/utils";
import type { IRequest } from "@/types/request.type";

jest.mock("../lib/api/get-api", () => ({
    getApi: jest.fn(),
}));

jest.mock("../lib/utils", () => ({
    isApiError: jest.fn(),
}));

describe("useTransaction", () => {
    const mockInput: IRequest = {
        currency: "EUR",
        totalGiven: 100,
        transactionAmount: 80,
    };
    const mockPostResponse = { success: true };
    const queryClient = new QueryClient();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should call the mutation function and handle success", async () => {
        const apiMock = {
            post: jest.fn().mockResolvedValue(mockPostResponse),
        };
        (getApi as jest.Mock).mockReturnValue(apiMock);

        const { result } = renderHook(() => useTransaction(), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            ),
        });

        await act(async () => {
            await result.current.mutateAsync(mockInput);
        });

        expect(apiMock.post).toHaveBeenCalledWith(
            "/change",
            JSON.stringify(mockInput)
        );
    });

    it("should call the mutation function and handle error", async () => {
        const mockErrorResponse = { message: "API error occurred" };
        const apiMock = {
            post: jest.fn().mockResolvedValue(mockErrorResponse),
        };
        (getApi as jest.Mock).mockReturnValue(apiMock);

        (isApiError as unknown as jest.Mock).mockReturnValue(true);

        const { result } = renderHook(() => useTransaction(), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            ),
        });

        await act(async () => {
            await expect(result.current.mutateAsync(mockInput)).rejects.toThrow(
                "API error occurred"
            );
        });

        expect(apiMock.post).toHaveBeenCalledWith(
            "/change",
            JSON.stringify(mockInput)
        );
    });
});
