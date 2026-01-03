import { describe, it, expect, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useColorWheelState, useColorWheel } from "./use-color"
import { createRef } from "react"

describe("useColorWheelState", () => {
    it("should initialize with defaultValue", () => {
        const { result } = renderHook(() => useColorWheelState({ defaultValue: 120 }))
        expect(result.current.hue).toBe(120)
        expect(result.current.getDisplayColor()).toBe("hsl(120, 100%, 50%)")
    })

    it("should update hue with setHue", () => {
        const { result } = renderHook(() => useColorWheelState({ defaultValue: 0 }))
        act(() => {
            result.current.setHue(200)
        })
        expect(result.current.hue).toBe(200)
        expect(result.current.getDisplayColor()).toBe("hsl(200, 100%, 50%)")
    })

    it("should call onChange when hue changes", () => {
        const onChange = vi.fn()
        const { result } = renderHook(() => useColorWheelState({ defaultValue: 0, onChange }))
        act(() => {
            result.current.setHue(50)
        })
        expect(onChange).toHaveBeenCalledWith(50)
    })

    it("should use controlled value if provided", () => {
        const { result, rerender } = renderHook(({ value }) => useColorWheelState({ value }), { initialProps: { value: 10 } })
        expect(result.current.hue).toBe(10)
        rerender({ value: 77 })
        expect(result.current.hue).toBe(77)
    })
})

describe("useColorWheel", () => {
    const baseProps = {
        innerRadius: 60,
        outerRadius: 100,
    }

    it("should provide correct inputProps and update hue on change", () => {
        const inputRef = createRef<HTMLInputElement>()
        const containerRef = createRef<HTMLDivElement>()
        const { result } = renderHook(() => {
            const state = useColorWheelState({ defaultValue: 0 })
            const aria = useColorWheel(baseProps, state, inputRef, containerRef)
            return { aria, state }
        })
        expect(result.current.aria.inputProps.value).toBe(0)
        act(() => {
            const event = {
                target: { value: "180" }
            } as React.ChangeEvent<HTMLInputElement>
            result.current.aria.inputProps.onChange?.(event)
        })
        expect(result.current.state.hue).toBe(180)
    })

    it("should disable input when isDisabled is true", () => {
        const state = renderHook(() => useColorWheelState({ defaultValue: 0 })).result.current
        const inputRef = createRef<HTMLInputElement>()
        const containerRef = createRef<HTMLDivElement>()
        const { result } = renderHook(() => useColorWheel({ ...baseProps, isDisabled: true }, state, inputRef, containerRef))
        expect(result.current.inputProps.disabled).toBe(true)
    })
})
