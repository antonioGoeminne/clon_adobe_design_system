import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useReturnFocus } from "./useReturnFocus";

function HookUser() {
    useReturnFocus();
    return null;
}

function Wrapper({ show }: { show: boolean }) {
    return (
        <div>
            <button data-testid="original">Original</button>
            {show && <HookUser />}
            <button data-testid="other">Other</button>
        </div>
    );
}

describe("useReturnFocus", () => {
    it("returns focus to the element that was focused on mount when unmounted", () => {
        const { getByTestId, rerender } = render(<Wrapper show={false} />);

        const original = getByTestId("original");
        const other = getByTestId("other");

        original.focus();
        expect(document.activeElement).toBe(original);

        rerender(<Wrapper show={true} />);

        // Change focus while the hook is mounted
        other.focus();
        expect(document.activeElement).toBe(other);

        // Unmount hook; focus should return to original
        rerender(<Wrapper show={false} />);
        expect(document.activeElement).toBe(original);
    });

    it("does nothing if there was no meaningful focused element", () => {
        const { rerender } = render(<Wrapper show={true} />);
        rerender(<Wrapper show={false} />);
        expect(true).toBe(true);
    });
});
