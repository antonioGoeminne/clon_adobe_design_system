import { useEffect, type RefObject } from "react";
import { isNull } from "../lib/utils";

export function useOnClickOutside(
    elRef: RefObject<HTMLDivElement> | null,
    fn: () => void,
) {

    // Add event handling for close when clicking outside.
    useEffect(() => {
        if (!isNull(elRef)) return () => { };

        function onClickOutside(
            event: MouseEvent | TouchEvent,
        ) {
            // No-op if clicked element is a descendant of element's contents.
            if (
                event.target instanceof Node &&
                elRef?.current != null &&
                !elRef.current?.contains(event.target)
            ) {
                fn();
            }
        }

        document.addEventListener('mousedown', onClickOutside);
        document.addEventListener('touchstart', onClickOutside);

        return () => {
            document.removeEventListener(
                'mousedown',
                onClickOutside,
            );
            document.removeEventListener(
                'touchstart',
                onClickOutside,
            );
        };
    }, [fn]);
}