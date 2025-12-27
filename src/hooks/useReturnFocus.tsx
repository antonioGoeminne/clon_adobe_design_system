import { useEffect } from "react";

export function useReturnFocus() {
    const elementToReturnFocusTo = document.activeElement as HTMLElement;

    useEffect(() => {
        return () => {
            if (elementToReturnFocusTo) {
                elementToReturnFocusTo.focus();
            }
        };
    }, [elementToReturnFocusTo]);
}