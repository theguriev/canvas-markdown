/* eslint-disable no-param-reassign */
import { useState, useCallback } from 'react'
import { useKeyPress, useEvent } from 'react-use'
import { DEVICE_PIXEL_RATIO } from '@/constants'

export const usePan = ({ dom, offsetX, offsetY }) => {
    const [[isMouseDown], setMouseDown] = useState([false, null])
    const [isSpacePressing] = useKeyPress(' ')

    const handleMouseDown = useCallback(event => {
        setMouseDown([true, event])
    }, [])

    const handleMouseUp = useCallback(event => {
        setMouseDown([false, event])
    }, [])

    const handleMouseMove = useCallback(event => {
        if (isSpacePressing && isMouseDown) {
            offsetX.current += event.movementX * DEVICE_PIXEL_RATIO
            offsetY.current += event.movementY * DEVICE_PIXEL_RATIO
        }
    }, [dom, isSpacePressing, isMouseDown])

    useEvent('mousemove', handleMouseMove, dom)
    useEvent('mousedown', handleMouseDown, dom)
    useEvent('mouseup', handleMouseUp, dom)
    return {
        isMouseDown,
        isSpacePressing,
        offsetX,
        offsetY,
        dom
    }
}
