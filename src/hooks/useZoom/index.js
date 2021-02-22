import { useRef } from 'react'
import { useEvent } from 'react-use'
import { DEVICE_PIXEL_RATIO } from '@/constants'

const isWheelUp = ({ wheelDelta }) => {
    if (wheelDelta === 0) {
        return 0
    }
    return wheelDelta > 0 ? 1 : -1
}

export const useZoom = (
    {
        dom,
        startScale,
        startX = 0,
        startY = 0,
        maxZoom = 50,
        zoomStep = 0.2,
        minZoom = 0.25
    }
) => {
    const scale = useRef(startScale)
    const offsetX = useRef(startX)
    const offsetY = useRef(startY)

    const increase = (x, y) => {
        const newScale = scale.current + scale.current * zoomStep
        if (maxZoom > newScale) {
            return {
                newScale,
                newOffsetX: (x * zoomStep * -1)
                    * DEVICE_PIXEL_RATIO
                    + (offsetX.current * (zoomStep + 1)),
                newOffsetY: (y * zoomStep * -1)
                    * DEVICE_PIXEL_RATIO
                    + (offsetY.current * (zoomStep + 1))
            }
        }
        return undefined
    }

    const decrease = (x, y) => {
        const newScale = scale.current - scale.current * zoomStep
        if (minZoom < newScale) {
            return {
                newScale,
                newOffsetX: (x - x * (1 - zoomStep))
                    * DEVICE_PIXEL_RATIO
                    + (offsetX.current * (1 - zoomStep)),
                newOffsetY: (y - y * (1 - zoomStep))
                    * DEVICE_PIXEL_RATIO
                    + (offsetY.current * (1 - zoomStep))
            }
        }
        return undefined
    }
    const handleWheel = event => {
        const rect = event.target.getBoundingClientRect()
        const x = event.clientX - rect.x
        const y = event.clientY - rect.y

        const actionsMap = new Map([
            [1, increase],
            [-1, decrease],
            [0, () => undefined]
        ])
        const action = actionsMap.get(isWheelUp(event))
        const newCords = action(x, y)
        if (newCords) {
            scale.current = newCords.newScale
            offsetX.current = newCords.newOffsetX
            offsetY.current = newCords.newOffsetY
        }
    }

    useEvent('wheel', handleWheel, dom, { passive: true })

    return {
        handleWheel,
        scale,
        offsetX,
        offsetY
    }
}
