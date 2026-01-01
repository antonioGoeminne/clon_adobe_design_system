import { useEffect } from "react";

export function useOnKeyDown(
    key: string,
    fn: (event: KeyboardEvent) => void,
) {
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === key) {
                fn(event);
            }
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [fn, key]);
}
