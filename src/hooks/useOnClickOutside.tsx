import { useEffect, type RefObject } from "react";
import { isNull } from "../lib/utils";

export function useOnClickOutside(
    elRef: RefObject<HTMLDivElement> | null,
    fn: () => void,
) {

    useEffect(() => {
        if (isNull(elRef)) return () => { };

        function onClickOutside(
            event: MouseEvent | TouchEvent,
        ) {
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