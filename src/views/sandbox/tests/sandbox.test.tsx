import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Sandbox from "@/views/sandbox/ts/Sandbox";

describe("Sandbox view", () => {
    test("renders title", () => {
        const { queryByText } = render(<Sandbox />);
        expect(queryByText("Sandbox Page")).toBeTruthy();
    });
});
