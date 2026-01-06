/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useRef, type RefObject } from "react";
import { useResizeObserver } from "./useResizeObserver";

function WithElement({ onResize }: { onResize: () => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    useResizeObserver(ref as RefObject<HTMLElement>, onResize);
    return <div data-testid="el" ref={ref} />;
}

function WithoutElement({ onResize }: { onResize: () => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    // Not attaching ref to any element keeps ref.current null
    useResizeObserver(ref as RefObject<HTMLElement>, onResize);
    return null;
}

describe("useResizeObserver", () => {
    const originalRO = globalThis.ResizeObserver;
    let lastInstance: ResizeObserver | null = null;

    beforeEach(() => {
        lastInstance = null;
    });

    afterEach(() => {
        (globalThis as any).ResizeObserver = originalRO as any;
    });

    it("calls callback on mount when element exists", () => {
        const fn = vi.fn();
        render(<WithElement onResize={fn} />);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("uses ResizeObserver when available and triggers callback on observation", () => {
        class ResizeObserverMock {
            callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;
            observe = vi.fn<(target: Element) => void>();
            unobserve = vi.fn<(target: Element) => void>();
            disconnect = vi.fn<() => void>();
            constructor(cb: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void) {
                // El hook pasa una función; ignoramos 'entries'.
                this.callback = cb;
                lastInstance = this;
            }
        }
        (globalThis as any).ResizeObserver = ResizeObserverMock as any;

        const fn = vi.fn();
        const { getByTestId } = render(<WithElement onResize={fn} />);

        // Initial call on mount
        expect(fn).toHaveBeenCalledTimes(1);

        // Observer should start observing the element
        expect((lastInstance as ResizeObserverMock).observe).toHaveBeenCalledWith(
            getByTestId("el")
        );

        // Simular callback de RO
        (lastInstance as ResizeObserverMock).callback([], (lastInstance as unknown) as ResizeObserver);
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it("falls back to window resize when ResizeObserver is undefined", () => {
        const saved = (globalThis as any).ResizeObserver;
        (globalThis as any).ResizeObserver = undefined;

        const fn = vi.fn();
        render(<WithElement onResize={fn} />);

        // Initial call on mount
        expect(fn).toHaveBeenCalledTimes(1);

        // Simulate window resize
        fireEvent(window, new Event("resize"));
        expect(fn).toHaveBeenCalledTimes(2);

        (globalThis as any).ResizeObserver = saved;
    });

    it("removes window resize listener on unmount (fallback path)", () => {
        const saved = (globalThis as any).ResizeObserver;
        (globalThis as any).ResizeObserver = undefined;

        const fn = vi.fn();
        const { unmount } = render(<WithElement onResize={fn} />);
        expect(fn).toHaveBeenCalledTimes(1);

        unmount();
        fireEvent(window, new Event("resize"));
        expect(fn).toHaveBeenCalledTimes(1);

        (globalThis as any).ResizeObserver = saved;
    });

    it("does nothing when ref.current is null", () => {
        const fn = vi.fn();
        render(<WithoutElement onResize={fn} />);
        expect(fn).not.toHaveBeenCalled();
    });
});
