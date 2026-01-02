import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AlertDialog } from "./AlertDialog";

describe("AlertDialog", () => {
    it('Should open when the "open" prop is true', () => {
        render(<AlertDialog open={true} title="Test Title" onClose={() => { }}>Test Body</AlertDialog>);
        const title = screen.getByText("Test Title");
        expect(title).toBeInTheDocument();
    });

    it('Should not be in the dom when the "open" prop is false', () => {
        render(<AlertDialog open={false} title="Test Title" onClose={() => { }}>Test Body</AlertDialog>);
        const title = screen.queryByText("Test Title");
        expect(title).not.toBeInTheDocument();
    });

    it('Should call onClose when Escape key is pressed', () => {
        const onClose = vi.fn();
        const title = screen.queryByText("Test Title");

        render(<AlertDialog open={true} title="Test Title" onClose={onClose}>Test Body</AlertDialog>);
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
        expect(onClose).toHaveBeenCalled();

        expect(title).not.toBeInTheDocument();
    });

    it('Should close wen clicking outside the dialog', () => {
        const onClose = vi.fn();
        render(<AlertDialog open={true} title="Test Title" onClose={onClose}>Test Body</AlertDialog>);
        const backdrop = screen.getByTestId("backdrop");

        if (backdrop) {
            fireEvent.mouseDown(backdrop);
            fireEvent.mouseUp(backdrop);
            fireEvent.click(backdrop);
        }

        expect(onClose).toHaveBeenCalled();
    });

    it('Should render actionButtons if provided', () => {
        const actionButtonText = "Custom Action";
        render(
            <AlertDialog
                open={true}
                title="Test Title"
                onClose={() => { }}
                actionButtons={<button>{actionButtonText}</button>}
            >
                Test Body
            </AlertDialog>
        );
        expect(screen.getByText(actionButtonText)).toBeInTheDocument();
    });

    it('Should call onClose when clicking the Cancel button', () => {
        const onClose = vi.fn();
        render(<AlertDialog open={true} title="Test Title" onClose={onClose}>Test Body</AlertDialog>);
        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);
        expect(onClose).toHaveBeenCalled();
    });


    it('Should return focus to the previously focused element after closing', () => {
        const onClose = vi.fn();
        const { rerender } = render(
            <>
                <button data-testid="trigger">Open Dialog</button>
                <AlertDialog open={false} title="Test Title" onClose={onClose}>Test Body</AlertDialog>
            </>
        );
        const trigger = screen.getByTestId("trigger");
        trigger.focus();
        rerender(
            <>
                <button data-testid="trigger">Open Dialog</button>
                <AlertDialog open={true} title="Test Title" onClose={onClose}>Test Body</AlertDialog>
            </>
        );
        rerender(
            <>
                <button data-testid="trigger">Open Dialog</button>
                <AlertDialog open={false} title="Test Title" onClose={onClose}>Test Body</AlertDialog>
            </>
        );
        expect(document.activeElement).toBe(trigger);
    });
});