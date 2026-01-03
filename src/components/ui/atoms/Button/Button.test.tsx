import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

afterAll(() => cleanup())

describe("Button tests", () => {
    it('Should render correctly', () => {
        render(<Button>button</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    it('Should handle click with onClick prop', () => {
        const onClick = vi.fn()
        render(<Button onClick={onClick}>button</Button>)
        const button = screen.getByRole('button')
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalled()
    })

    it('Should not handle click when is disabled', () => {
        const onClick = vi.fn()
        render(<Button disabled onClick={onClick}>button</Button>)
        const button = screen.getByRole('button')
        fireEvent.click(button);
        expect(onClick).not.toHaveBeenCalled()
    })

    it('Should render with different variants and styles', () => {
        const variants = ['primary', 'secondary', 'accent', 'negative'] as const
        const styles = ['solid', 'outlined'] as const;
        variants.forEach(variant => {
            styles.forEach(style => {
                render(<Button variant={variant} style={style}>btn</Button>);
                expect(screen.getByRole('button')).toBeInTheDocument();
                cleanup();
            });
        });
    });

    it('Should render with different sizes', () => {
        const sizes = ['default', 'icon'] as const;
        sizes.forEach(size => {
            render(<Button size={size}>btn</Button>);
            expect(screen.getByRole('button')).toBeInTheDocument();
            cleanup();
        });
    });

    it('Should render as a child component (asChild)', () => {
        render(
            <Button asChild>
                <a href="#">link</a>
            </Button>
        );
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
    });

    it('Should apply custom className', () => {
        render(<Button className="custom-class">button</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/custom-class/);
    });

    it('Should be focusable and support keyboard events', () => {
        const onKeyDown = vi.fn();
        render(<Button onKeyDown={onKeyDown}>button</Button>);
        const button = screen.getByRole('button');
        button.focus();
        expect(button).toHaveFocus();
        fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
        expect(onKeyDown).toHaveBeenCalled();
    });
}) 