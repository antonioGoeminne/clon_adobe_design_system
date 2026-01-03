import type React from "react"

import { useState, useCallback, useEffect, type RefObject } from "react"

export interface ColorWheelState {
    hue: number
    setHue: (hue: number) => void
    isDragging: boolean
    getDisplayColor: () => string
}

export interface UseColorWheelProps {
    defaultValue?: number
    value?: number
    onChange?: (hue: number) => void
    isDisabled?: boolean
    innerRadius: number
    outerRadius: number
    step?: number
}

export interface ColorWheelAria {
    trackProps: React.HTMLAttributes<HTMLElement>
    thumbProps: React.HTMLAttributes<HTMLElement> & { style: React.CSSProperties }
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
    state: ColorWheelState
}

export function useColorWheelState(props: {
    defaultValue?: number
    value?: number
    onChange?: (hue: number) => void
}): ColorWheelState {
    const { defaultValue = 0, value: controlledValue, onChange } = props
    const [internalHue, setInternalHue] = useState(defaultValue)
    const [isDragging] = useState(false)

    const hue = controlledValue !== undefined ? controlledValue : internalHue

    const setHue = useCallback(
        (newHue: number) => {
            const normalizedHue = ((newHue % 360) + 360) % 360
            if (controlledValue === undefined) {
                setInternalHue(normalizedHue)
            }
            onChange?.(normalizedHue)
        },
        [controlledValue, onChange],
    )

    return {
        hue,
        setHue,
        isDragging,
        getDisplayColor: () => `hsl(${hue}, 100%, 50%)`,
    }
}

export function useColorWheel(
    props: UseColorWheelProps,
    state: ColorWheelState,
    inputRef: RefObject<HTMLInputElement | null>,
    containerRef: RefObject<HTMLDivElement | null>,
): ColorWheelAria {
    const { innerRadius, outerRadius, isDisabled = false, step = 1 } = props
    const { hue, setHue } = state
    const [dragging, setDragging] = useState(false)

    const center = outerRadius

    const getAngleFromEvent = useCallback(
        (clientX: number, clientY: number) => {
            if (!containerRef.current) return hue
            const rect = containerRef.current.getBoundingClientRect()
            const x = clientX - rect.left - center
            const y = clientY - rect.top - center
            let angle = Math.atan2(x, -y) * (180 / Math.PI)
            angle = ((angle % 360) + 360) % 360
            return angle
        },
        [center, containerRef, hue],
    )

    const handleInteraction = useCallback(
        (clientX: number, clientY: number) => {
            if (isDisabled) return
            const newHue = getAngleFromEvent(clientX, clientY)
            setHue(newHue)
        },
        [getAngleFromEvent, setHue, isDisabled],
    )

    // Global event listeners for drag
    useEffect(() => {
        if (!dragging) return

        const handleMouseMove = (e: MouseEvent) => {
            handleInteraction(e.clientX, e.clientY)
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
            }
        }

        const handleEnd = () => {
            setDragging(false)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleEnd)
        window.addEventListener("touchmove", handleTouchMove, { passive: true })
        window.addEventListener("touchend", handleEnd)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleEnd)
            window.removeEventListener("touchmove", handleTouchMove)
            window.removeEventListener("touchend", handleEnd)
        }
    }, [dragging, handleInteraction])

    // Calculate thumb position
    const thumbRadius = (outerRadius + innerRadius) / 2
    const thumbAngleRad = (hue * Math.PI) / 180
    const thumbX = center + thumbRadius * Math.sin(thumbAngleRad)
    const thumbY = center - thumbRadius * Math.cos(thumbAngleRad)

    const trackProps: React.HTMLAttributes<HTMLElement> = {
        onMouseDown: (e: React.MouseEvent) => {
            if (isDisabled) return
            setDragging(true)
            handleInteraction(e.clientX, e.clientY)
            inputRef.current?.focus()
        },
        onTouchStart: (e: React.TouchEvent) => {
            if (isDisabled) return
            setDragging(true)
            if (e.touches[0]) {
                handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
            }
            inputRef.current?.focus()
        },
    }

    const thumbProps = {
        style: {
            left: thumbX,
            top: thumbY,
            transform: "translate(-50%, -50%)",
        } as React.CSSProperties,
    }

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
        type: "range",
        min: 0,
        max: 360,
        step,
        value: Math.round(hue),
        disabled: isDisabled,
        "aria-label": "Hue",
        "aria-valuemin": 0,
        "aria-valuemax": 360,
        "aria-valuenow": Math.round(hue),
        "aria-valuetext": `${Math.round(hue)}°`,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setHue(Number(e.target.value))
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isDisabled) return
            let newHue = hue
            const stepMultiplier = e.shiftKey ? 10 : 1
            switch (e.key) {
                case "ArrowRight":
                case "ArrowUp":
                    newHue = hue + step * stepMultiplier
                    e.preventDefault()
                    break
                case "ArrowLeft":
                case "ArrowDown":
                    newHue = hue - step * stepMultiplier
                    e.preventDefault()
                    break
                case "Home":
                    newHue = 0
                    e.preventDefault()
                    break
                case "End":
                    newHue = 359
                    e.preventDefault()
                    break
                case "PageUp":
                    newHue = hue + step * 10
                    e.preventDefault()
                    break
                case "PageDown":
                    newHue = hue - step * 10
                    e.preventDefault()
                    break
                default:
                    return
            }
            setHue(newHue)
        },
    }

    return {
        trackProps,
        thumbProps,
        inputProps,
        state: { ...state, isDragging: dragging },
    }
}
