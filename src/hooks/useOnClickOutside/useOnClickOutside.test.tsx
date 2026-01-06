import { useRef, type RefObject } from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { useOnClickOutside } from "./useOnClickOutside";

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref as RefObject<HTMLDivElement>, onOutsideClick);
    return (
        <div>
            <div data-testid="inside" ref={ref}>
                <button>Inside Button</button>
            </div>
            <div data-testid="outside">Outside Area</div>
        </div>
    );
}

describe("useOnClickOutside", () => {
    it("should call handler on mousedown outside", () => {
        const fn = vi.fn();
        const { getByTestId } = render(<TestComponent onOutsideClick={fn} />);

        fireEvent.mouseDown(getByTestId("outside"));
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should not call handler on mousedown inside", () => {
        const fn = vi.fn();
        const { getByTestId } = render(<TestComponent onOutsideClick={fn} />);

        fireEvent.mouseDown(getByTestId("inside"));
        expect(fn).not.toHaveBeenCalled();
    });

    it("should call handler on touchstart outside", () => {
        const fn = vi.fn();
        const { getByTestId } = render(<TestComponent onOutsideClick={fn} />);

        fireEvent.touchStart(getByTestId("outside"));
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should clean up listeners on unmount", () => {
        const fn = vi.fn();
        const { unmount } = render(<TestComponent onOutsideClick={fn} />);

        unmount();
        fireEvent.mouseDown(document.body);
        expect(fn).not.toHaveBeenCalled();
    });
});