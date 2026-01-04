import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tabs } from "./Tabs";

const MOCK_ITEMS = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
]

function getTabs(container: HTMLElement) {
    return Array.from(container.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
}

describe('Tabs test', () => {
    it('First tab should be first item active when not add default value', () => {
        const { container } = render(<Tabs items={MOCK_ITEMS} />)
        const tabs = getTabs(container);

        const tab = tabs[0];

        expect(tab).toHaveAttribute('aria-selected', 'true');
    })

    it('Should change active tab with onClick handler', async () => {
        const { container, getByText } = render(
            <Tabs
                items={MOCK_ITEMS}
            />
        )
        const tabs = getTabs(container);

        const tab1 = tabs[0];
        const tab2 = getByText('2');

        expect(tab1).toHaveAttribute('aria-selected', 'true');
        expect(tab2).toHaveAttribute('aria-selected', 'false');

        await tab2.click();

        expect(tab1).toHaveAttribute('aria-selected', 'false');
        expect(tab2).toHaveAttribute('aria-selected', 'true');
    })

    it('Should change tab when press ArrowRight', () => {
        const { container } = render(
            <Tabs
                items={MOCK_ITEMS}
            />
        )
        const tabs = getTabs(container);

        const tab1 = tabs[0];
        const tab2 = tabs[1]

        tab1.focus()

        fireEvent.keyDown(tab1, { key: 'ArrowRight', code: 'ArrowRight' });


        expect(tab1).toHaveAttribute('aria-selected', 'false');
        expect(tab2).toHaveAttribute('aria-selected', 'true');
    })


    it('Should return to home when is in last tab and touch ArrowRight', () => {
        const { container } = render(<Tabs items={MOCK_ITEMS} defaultValue="2" />)
        const tabs = getTabs(container);

        const firstTab = tabs[0];
        const lastTab = tabs[1];
        const tablist = screen.getByRole('tablist');

        expect(lastTab).toHaveAttribute('aria-selected', 'true');

        fireEvent.keyDown(tablist, { key: 'ArrowRight', code: 'ArrowRight' });

        expect(firstTab).toHaveAttribute('aria-selected', 'true');
        expect(lastTab).toHaveAttribute('aria-selected', 'false');
        expect(document.activeElement).toBe(firstTab);
    })

    it('Should go to last when press End', () => {
        const { container } = render(<Tabs items={MOCK_ITEMS} defaultValue="1" />)
        const tabs = getTabs(container);

        const firstTab = tabs[0];
        const lastTab = tabs[1];
        const tablist = screen.getByRole('tablist');

        expect(firstTab).toHaveAttribute('aria-selected', 'true');

        fireEvent.keyDown(tablist, { key: 'End', code: 'End' });

        expect(lastTab).toHaveAttribute('aria-selected', 'true');
        expect(firstTab).toHaveAttribute('aria-selected', 'false');
        expect(document.activeElement).toBe(lastTab);
    })

    it('Only active tab should have tabIndex=0', () => {
        const { container } = render(<Tabs items={MOCK_ITEMS} />)
        const tabs = getTabs(container);

        const tab1 = tabs[0];
        const tab2 = tabs[1];

        expect(tab1).toHaveAttribute('tabIndex', '0');
        expect(tab2).toHaveAttribute('tabIndex', '-1');

        fireEvent.click(tab2);

        expect(tab1).toHaveAttribute('tabIndex', '-1');
        expect(tab2).toHaveAttribute('tabIndex', '0');
    })

})