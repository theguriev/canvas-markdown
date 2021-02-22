import { useRef, useCallback } from 'react'
import { useEvent } from 'react-use'

export const calcPoint = (canvas, x, y) => {
    const rect = canvas.getBoundingClientRect()
    const screenX = (x - rect.left) * (canvas.width / rect.width)
    const screenY = (y - rect.top) * (canvas.height / rect.height)
    const ctx = canvas.getContext('2d')
    const transform = ctx.getTransform()
    if (transform.isIdentity) {
        return {
            x: screenX,
            y: screenY
        }
    }
    const invMat = transform.invertSelf()

    return {
        x: Math.round(screenX * invMat.a + screenY * invMat.c + invMat.e),
        y: Math.round(screenX * invMat.b + screenY * invMat.d + invMat.f)
    }
}

export const usePosition = ({ dom, offsetX, offsetY }) => {
    const x = useRef(offsetX.current)
    const y = useRef(offsetY.current)
    const hoverX = useRef(0)
    const hoverY = useRef(0)

    const handleMouseMove = useCallback(event => {
        const rect = dom.getBoundingClientRect()
        const { x: newX, y: newY } = calcPoint(dom, event.clientX, event.clientY)
        x.current = newX
        y.current = newY
        hoverX.current = ((event.clientX - rect.left) / (rect.right - rect.left)) * dom.width
        hoverY.current = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * dom.height
    }, [dom])

    useEvent('mousemove', handleMouseMove, dom)
    return {
        x,
        y,
        hoverX,
        hoverY
    }
}
