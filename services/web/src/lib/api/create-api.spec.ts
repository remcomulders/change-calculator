import { createApi, type IBaseApi, type RequestResults } from "./create-api";

global.fetch = jest.fn();

jest.mock("../app-settings", () => ({
    appSettings: {
        API_URL: "https://api.example.com",
    },
}));

type TestResults = RequestResults<"/test-endpoint">;

describe("createApi", () => {
    let api: IBaseApi<TestResults>;

    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
        api = createApi();
    });

    it("should create a valid URL with parameters", async () => {
        const expectedUrl = "https://api.example.com/test-endpoint?foo=bar";

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        });

        await api.post("/test-endpoint", JSON.stringify({ data: "test" }), {
            foo: "bar",
        });

        expect(global.fetch).toHaveBeenCalled();
        const fetchCalls = (global.fetch as jest.Mock).mock.calls;
        const actualUrl = fetchCalls[0][0];

        expect(actualUrl.toString()).toEqual(expectedUrl);
    });

    it("should use default headers", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        });

        await api.post("/test-endpoint", JSON.stringify({ data: "test" }));
        const fetchCalls = (global.fetch as jest.Mock).mock.calls;
        const [, body] = fetchCalls[0];

        expect(body).toMatchObject({
            headers: {
                "Content-Type": "application/json",
            },
        });
    });

    it("should merge default and custom headers", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        });

        const customHeaders = {
            Authorization: "Bearer token",
        };

        await api.post(
            "/test-endpoint",
            JSON.stringify({ data: "test" }),
            {},
            customHeaders
        );

        const fetchCalls = (global.fetch as jest.Mock).mock.calls;
        const [, body] = fetchCalls[0];

        expect(body).toMatchObject({
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer token",
            },
        });
    });

    it("should send the correct body", async () => {
        const requestBody = { data: "test" };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        });

        await api.post("/test-endpoint", JSON.stringify(requestBody));

        const fetchCalls = (global.fetch as jest.Mock).mock.calls;
        const [, body] = fetchCalls[0];

        expect(body).toMatchObject({
            body: JSON.stringify(requestBody),
        });
    });

    it("should return the response data", async () => {
        const responseData = { success: true };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve(responseData),
        });

        const result = await api.post(
            "/test-endpoint",
            JSON.stringify({ data: "test" })
        );

        expect(result).toEqual(responseData);
    });
});
