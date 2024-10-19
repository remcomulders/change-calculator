import { getApi } from "./get-api";

global.fetch = jest.fn();

jest.mock("../app-settings", () => ({
    appSettings: {
        API_URL: "https://api.example.com",
    },
}));

describe("getApi", () => {
    it("should return the same instance of the API each time", () => {
        const api1 = getApi();
        const api2 = getApi();

        expect(api1).toBe(api2);
    });

    it("should have a post method", () => {
        const api = getApi();
        expect(typeof api.post).toBe("function");
    });

    it("should make a successful API call with the post method", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        });

        const api = getApi();
        const result = await api.post(
            "/change",
            JSON.stringify({ data: "test" })
        );

        const fetchCalls = (global.fetch as jest.Mock).mock.calls;
        const [url, body] = fetchCalls[0];

        expect(result).toEqual({ success: true });
        expect(url.toString()).toEqual("https://api.example.com/change");
        expect(body).toMatchObject({
            body: JSON.stringify({ data: "test" }),
        });
    });

    it("should handle errors from the API", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ error: "Something went wrong" }),
        });

        const api = getApi();
        const result = await api.post(
            "/change",
            JSON.stringify({ data: "test" })
        );

        const fetchCalls = (global.fetch as jest.Mock).mock.calls;
        const [url, body] = fetchCalls[0];

        expect(result).toEqual({ error: "Something went wrong" });
        expect(url.toString()).toEqual("https://api.example.com/change");
        expect(body).toMatchObject({
            body: JSON.stringify({ data: "test" }),
        });
    });
});
