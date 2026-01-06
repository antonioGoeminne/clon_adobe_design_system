
import { useRef, type RefObject } from "react";
import { render, fireEvent } from "@testing-library/react";
import { useFocus } from "./useFocus";
import { describe, expect, it } from "vitest";

function TestComponent() {
    const ref = useRef<HTMLDivElement>(null);
    useFocus(ref as RefObject<HTMLDivElement>);
    return (
        <div ref={ref}>
            <button data-testid="btn-1">Button 1</button>
            <button data-testid="btn-2">Button 2</button>
            <a href="#" data-testid="link-1">Link</a>
        </div>
    );
}

describe("useFocus", () => {
    it("should focus the first tabbable element on mount", () => {
        const { getByTestId } = render(<TestComponent />);
        const btn1 = getByTestId("btn-1");
        expect(document.activeElement).toBe(btn1);
    });

    it("should trap focus with Tab and Shift+Tab", () => {
        const { getByTestId } = render(<TestComponent />);
        const btn1 = getByTestId("btn-1");
        const link1 = getByTestId("link-1");

        link1.focus();
        expect(document.activeElement).toBe(link1);

        fireEvent.keyDown(document, { key: "Tab" });
        expect(document.activeElement).toBe(btn1);

        btn1.focus();
        expect(document.activeElement).toBe(btn1);

        fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
        expect(document.activeElement).toBe(link1);
    });
});
