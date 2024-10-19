import { render } from "@testing-library/react";
import { Toaster } from "./toaster";
import { Button } from "./button";

global.fetch = jest.fn();

describe("toast component", () => {
    test("should be rendered", () => {
        const { getByText, getByRole } = render(
            <>
                <Button variant="outline">Show Toast</Button>
                <Toaster />
            </>
        );

        const toastTrigger = getByText("Show Toast");
        const toastContent = getByRole("region");

        expect(toastTrigger).toBeInTheDocument();
        expect(toastContent).toBeInTheDocument();
    });
});
