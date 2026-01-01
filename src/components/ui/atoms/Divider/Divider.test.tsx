import { describe, expect, it, afterEach } from "vitest";
import { Divider } from "./Divider";
import { cleanup, render, screen } from "@testing-library/react";

afterEach(() => cleanup());

describe("Divider", () => {
    it("should exist in document", () => {
        render(<Divider />);
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("should render an <hr /> element", () => {
        render(<Divider />);
        const hr = screen.getByRole("separator");
        expect(hr).toBeInstanceOf(HTMLHRElement);
    });


    it("should render size: medium", () => {
        render(<Divider size="medium" />);
        const hr = screen.getByRole("separator");
        expect(hr).toHaveClass("h-[2px]");
    });

});