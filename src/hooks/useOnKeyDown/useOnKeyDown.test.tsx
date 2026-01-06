import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useOnKeyDown } from "./useOnKeyDown";

function TestComponent({
    keyTarget,
    onKey,
}: {
    keyTarget: string;
    onKey: (event: KeyboardEvent) => void;
}) {
    useOnKeyDown(keyTarget, onKey);
    return <div />;
}

describe("useOnKeyDown", () => {
    it("calls handler when matching key is pressed", () => {
        const fn = vi.fn();
        render(<TestComponent keyTarget="Escape" onKey={fn} />);

        fireEvent.keyDown(document, { key: "Escape" });
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn.mock.calls[0][0].key).toBe("Escape");
    });

    it("does not call handler for non-matching key", () => {
        const fn = vi.fn();
        render(<TestComponent keyTarget="Escape" onKey={fn} />);

        fireEvent.keyDown(document, { key: "Enter" });
        expect(fn).not.toHaveBeenCalled();
    });

    it("cleans up listener on unmount", () => {
        const fn = vi.fn();
        const { unmount } = render(
            <TestComponent keyTarget="Escape" onKey={fn} />,
        );

        unmount();
        fireEvent.keyDown(document, { key: "Escape" });
        expect(fn).not.toHaveBeenCalled();
    });

    it("responds to key changes via rerender", () => {
        const fn = vi.fn();
        const { rerender } = render(
            <TestComponent keyTarget="Escape" onKey={fn} />,
        );

        fireEvent.keyDown(document, { key: "Escape" });
        expect(fn).toHaveBeenCalledTimes(1);

        rerender(<TestComponent keyTarget="Enter" onKey={fn} />);

        fireEvent.keyDown(document, { key: "Escape" });
        fireEvent.keyDown(document, { key: "Enter" });
        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn.mock.calls[1][0].key).toBe("Enter");
    });
});
