import { useEffect, type RefObject } from "react";
import { useOnKeyDown } from "./useOnKeyDown";


function getTabbableElements(
    elRef: RefObject<HTMLDivElement>,
) {
    if (elRef.current == null) {
        return [];
    }

    return elRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
}

export function useFocus(
    elRef: RefObject<HTMLDivElement>,
) {
    useEffect(() => {
        const tabbableElements = getTabbableElements(elRef);
        const firstElement = tabbableElements[0];
        if (firstElement instanceof HTMLElement) {
            firstElement.focus();
        }
    }, [elRef]);

    function trapFocus(event: KeyboardEvent) {
        if (elRef.current == null) {
            return;
        }

        const tabbableElements = getTabbableElements(elRef);
        const firstElement = tabbableElements[0];
        const lastElement =
            tabbableElements[tabbableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab event
            if (
                document.activeElement === firstElement &&
                lastElement instanceof HTMLElement
            ) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab event
            if (
                document.activeElement === lastElement &&
                firstElement instanceof HTMLElement
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    useOnKeyDown('Tab', trapFocus);
}