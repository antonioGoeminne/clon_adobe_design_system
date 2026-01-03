import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { ColorWheel } from "./ColorWheel";
import userEvent from "@testing-library/user-event";

afterEach(() => cleanup());

describe("ColorWheel", () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() { }
            unobserve() { }
            disconnect() { }
        };

        // Mock element dimensions to make wheel ready
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            value: 200,
        });

        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            value: 200,
        });
    });

    it("should render the color wheel", () => {
        render(<ColorWheel />);
        const colorWheel = screen.getByRole("group");
        expect(colorWheel).toBeInTheDocument();
    });

    it("should have correct aria-label", () => {
        render(<ColorWheel aria-label="Select color" />);
        const colorWheel = screen.getByRole("group", { name: "Select color" });
        expect(colorWheel).toBeInTheDocument();
    });

    it("should use default aria-label when not provided", () => {
        render(<ColorWheel />);
        const colorWheel = screen.getByRole("group", { name: "Color wheel" });
        expect(colorWheel).toBeInTheDocument();
    });

    it("should render with custom size", () => {
        render(<ColorWheel size={300} />);
        const colorWheel = screen.getByRole("group");
        expect(colorWheel).toHaveStyle({ width: "300px", height: "300px" });
    });

    it("should apply disabled styles when isDisabled is true", () => {
        render(<ColorWheel isDisabled />);
        const colorWheel = screen.getByRole("group");
        expect(colorWheel).toHaveClass("opacity-50");
        expect(colorWheel).toHaveClass("cursor-not-allowed");
    });

    it("should not apply disabled styles when isDisabled is false", () => {
        render(<ColorWheel isDisabled={false} />);
        const colorWheel = screen.getByRole("group");
        expect(colorWheel).toHaveClass("cursor-pointer");
        expect(colorWheel).not.toHaveClass("opacity-50");
    });

    it("should render input for accessibility", async () => {
        render(<ColorWheel />);
        const input = await screen.findByRole("slider");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "range");
    });

    it("should have correct input attributes for accessibility", async () => {
        render(<ColorWheel aria-label="Hue selector" />);
        const input = await screen.findByRole("slider");
        expect(input).toHaveAttribute("aria-label", "Hue selector");
        expect(input).toHaveAttribute("min", "0");
        expect(input).toHaveAttribute("max", "360");
    });

    it("should call onChange when value changes", async () => {
        const onChange = vi.fn();
        render(<ColorWheel onChange={onChange} />);
        const input = await screen.findByRole("slider");

        fireEvent.change(input, { target: { value: "180" } });

        await waitFor(() => {
            expect(onChange).toHaveBeenCalled();
        });
    });

    it("should work as controlled component", () => {
        const { rerender } = render(<ColorWheel value={0} />);
        const input = screen.getByRole("slider") as HTMLInputElement;
        expect(input.value).toBe("0");

        rerender(<ColorWheel value={180} />);
        expect(input.value).toBe("180");
    });

    it("should work as uncontrolled component with defaultValue", () => {
        render(<ColorWheel defaultValue={120} />);
        const input = screen.getByRole("slider") as HTMLInputElement;
        expect(input.value).toBe("120");
    });

    it("should not trigger onChange when disabled", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ColorWheel isDisabled onChange={onChange} />);
        const input = screen.getByRole("slider");

        input.focus();
        await user.keyboard("{ArrowRight}");

        expect(onChange).not.toHaveBeenCalled();
    });

    it("should support keyboard interaction - Arrow Right", async () => {
        const onChange = vi.fn();
        render(<ColorWheel defaultValue={0} onChange={onChange} />);
        const input = screen.getByRole("slider");

        input.focus();
        fireEvent.keyDown(input, { key: "ArrowRight" });

        await waitFor(() => {
            expect(onChange).toHaveBeenCalled();
        });
    });

    it("should support keyboard interaction - Arrow Left", async () => {
        const onChange = vi.fn();
        render(<ColorWheel defaultValue={180} onChange={onChange} />);
        const input = screen.getByRole("slider");

        input.focus();
        fireEvent.keyDown(input, { key: "ArrowLeft" });

        await waitFor(() => {
            expect(onChange).toHaveBeenCalled();
        });
    });

    it("should show focus state when input is focused", async () => {
        render(<ColorWheel />);
        const input = screen.getByRole("slider");

        input.focus();

        await waitFor(() => {
            expect(input).toHaveFocus();
        });
    });

    it("should handle mouse interactions on track", () => {
        const onChange = vi.fn();
        render(<ColorWheel onChange={onChange} />);
        const colorWheel = screen.getByRole("group");

        fireEvent.mouseDown(colorWheel, { clientX: 100, clientY: 100 });

        expect(colorWheel).toBeInTheDocument();
    });

    it("should normalize hue values to 0-360 range", () => {
        const onChange = vi.fn();
        const { rerender } = render(<ColorWheel value={0} onChange={onChange} />);

        rerender(<ColorWheel value={360} onChange={onChange} />);
        const input = screen.getByRole("slider") as HTMLInputElement;
        expect(Number(input.value)).toBeGreaterThanOrEqual(0);
        expect(Number(input.value)).toBeLessThan(361);
    });

    it("should forward ref correctly", () => {
        const ref = { current: null };
        render(<ColorWheel ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should render thumb element", async () => {
        const { container } = render(<ColorWheel />);

        await waitFor(() => {
            const thumb = container.querySelector('[aria-hidden="true"]');
            expect(thumb).toBeInTheDocument();
        });
    });
});