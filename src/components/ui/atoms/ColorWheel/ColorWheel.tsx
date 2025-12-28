import React, { useRef, useState, useCallback } from "react"
import { cn } from "../../../../lib/utils"
import { useColorWheel, useColorWheelState } from "./hooks/use-color"
import { useResizeObserver } from "../../../../hooks/useResizeObserver"

interface ColorWheelProps {
    size?: number | string
    defaultValue?: number
    value?: number
    onChange?: (hue: number) => void
    isDisabled?: boolean
    className?: string
    "aria-label"?: string
}

const WHEEL_THICKNESS = 24

function generateHueSegments(cx: number, cy: number, outerRadius: number, innerRadius: number, segments = 360) {
    const paths: React.ReactNode[] = []
    const angleStep = 360 / segments

    for (let i = 0; i < segments; i++) {
        const startAngle = (i * angleStep - 90) * (Math.PI / 180)
        const endAngle = ((i + 1) * angleStep - 90) * (Math.PI / 180)

        const x1Outer = cx + outerRadius * Math.cos(startAngle)
        const y1Outer = cy + outerRadius * Math.sin(startAngle)
        const x2Outer = cx + outerRadius * Math.cos(endAngle)
        const y2Outer = cy + outerRadius * Math.sin(endAngle)

        const x1Inner = cx + innerRadius * Math.cos(endAngle)
        const y1Inner = cy + innerRadius * Math.sin(endAngle)
        const x2Inner = cx + innerRadius * Math.cos(startAngle)
        const y2Inner = cy + innerRadius * Math.sin(startAngle)

        const d = [
            `M ${x1Outer} ${y1Outer}`,
            `A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer}`,
            `L ${x1Inner} ${y1Inner}`,
            `A ${innerRadius} ${innerRadius} 0 0 0 ${x2Inner} ${y2Inner}`,
            "Z",
        ].join(" ")

        paths.push(<path key={i} d={d} fill={`hsl(${i * angleStep}, 100%, 50%)`} />)
    }

    return paths
}

export const ColorWheel = React.forwardRef<HTMLDivElement, ColorWheelProps>(function ColorWheel(props, forwardedRef) {
    const {
        size = 200,
        defaultValue = 0,
        value,
        onChange,
        isDisabled = false,
        className,
        "aria-label": ariaLabel = "Color wheel",
    } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [wheelRadius, setWheelRadius] = useState(0)

    const resizeHandler = useCallback(() => {
        if (containerRef.current) {
            setWheelRadius(containerRef.current.offsetWidth / 2)
        }
    }, [])

    useResizeObserver(containerRef, resizeHandler)

    const state = useColorWheelState({ defaultValue, value, onChange })
    const {
        trackProps,
        thumbProps,
        inputProps,
        state: wheelState,
    } = useColorWheel(
        {
            defaultValue,
            value,
            onChange,
            isDisabled,
            innerRadius: wheelRadius - WHEEL_THICKNESS,
            outerRadius: wheelRadius,
        },
        state,
        inputRef,
        containerRef,
    )

    const computedSize = typeof size === "number" ? `${size}px` : size
    const innerRadius = wheelRadius - WHEEL_THICKNESS
    const center = wheelRadius

    const setRefs = useCallback(
        (node: HTMLDivElement | null) => {
            ; (containerRef as React.RefObject<HTMLDivElement | null>).current = node
            if (typeof forwardedRef === "function") {
                forwardedRef(node)
            } else if (forwardedRef) {
                forwardedRef.current = node
            }
            if (node) {
                setWheelRadius(node.offsetWidth / 2)
            }
        },
        [forwardedRef],
    )

    const [isFocused, setIsFocused] = useState(false)

    const isWheelReady = wheelRadius > 0

    return (
        <div
            ref={setRefs}
            role="group"
            aria-label={ariaLabel}
            className={cn(
                "relative select-none",
                isDisabled && "opacity-50 cursor-not-allowed",
                !isDisabled && "cursor-pointer",
                className,
            )}
            style={{ width: computedSize, height: computedSize }}
        >
            <div {...trackProps} className="absolute inset-0" aria-hidden="true">
                {isWheelReady && (
                    <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${wheelRadius * 2} ${wheelRadius * 2}`}
                        className="absolute inset-0"
                    >
                        {generateHueSegments(center, center, wheelRadius, innerRadius)}
                    </svg>
                )}
            </div>

            {isWheelReady && (
                <div
                    className="absolute rounded-full bg-background"
                    style={{
                        width: innerRadius * 2 - 2,
                        height: innerRadius * 2 - 2,
                        top: center - innerRadius + 1,
                        left: center - innerRadius + 1,
                    }}
                    aria-hidden="true"
                />
            )}

            {isWheelReady && (isFocused || wheelState.isDragging) && (
                <div
                    style={{
                        position: "absolute",
                        left: (typeof thumbProps.style?.left === "number" ? thumbProps.style.left : 0) + (WHEEL_THICKNESS - 6) / 2 - 35,
                        top: (typeof thumbProps.style?.top === "number" ? thumbProps.style.top : 0) - 62,
                        zIndex: 10,
                        width: 40,
                        height: 48,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        pointerEvents: "none",
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                            background: wheelState.getDisplayColor(),
                            border: "3px solid white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 14,
                        }}
                    >
                    </div>
                </div>
            )}

            {isWheelReady && (
                <div
                    {...thumbProps}
                    className={cn(
                        "absolute rounded-full border-3 border-white pointer-events-none",
                        "transition-transform duration-150",
                        isFocused && "ring-2 ring-ring ring-offset-2 ring-offset-background",
                    )}
                    style={{
                        ...thumbProps.style,
                        width: WHEEL_THICKNESS - 6,
                        height: WHEEL_THICKNESS - 6,
                        backgroundColor: wheelState.getDisplayColor(),
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        left: typeof thumbProps.style?.left === "number" ? thumbProps.style.left : 0,
                        top: typeof thumbProps.style?.top === "number" ? thumbProps.style.top : 0,
                        transform: `translate(-50%, -50%) scale(${isFocused || wheelState.isDragging ? 1.5 : 1})`,
                        transformOrigin: "center",
                    }}
                    aria-hidden="true"
                >
                    <input
                        {...inputProps}
                        ref={inputRef}
                        style={{
                            position: "absolute",
                            width: 1,
                            height: 1,
                            padding: 0,
                            margin: -1,
                            overflow: "hidden",
                            clip: "rect(0, 0, 0, 0)",
                            whiteSpace: "nowrap",
                            borderWidth: 0,
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
            )}
        </div>
    )
})
