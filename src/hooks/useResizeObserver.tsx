import { useEffect, type RefObject } from "react"

export function useResizeObserver(ref: RefObject<HTMLElement | null>, callback: () => void) {
    useEffect(() => {
        const element = ref.current
        if (!element) return

        callback()

        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(() => {
                callback()
            })
            observer.observe(element)
            return () => observer.disconnect()
        }

        window.addEventListener("resize", callback)
        return () => window.removeEventListener("resize", callback)
    }, [ref, callback])
}
