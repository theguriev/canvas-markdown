import { useEffect, useRef } from 'react'

export const useCanvas = ({
    dom = null,
    draw = () => {},
    before = () => {},
    after = () => {}
}) => {
    const ctxRef = useRef(null)
    useEffect(() => {
        if (dom === null) {
            return
        }
        let requestAnimationId
        let counter = 0
        ctxRef.current = dom.getContext('2d')
        before({
            context: ctxRef.current,
            dom
        })

        const render = () => {
            counter += 1
            draw({
                context: ctxRef.current,
                dom,
                counter
            })
            requestAnimationId = requestAnimationFrame(render)
        }
        render()
        return () => {
            cancelAnimationFrame(requestAnimationId)
            after()
        }
    }, [ctxRef, dom, draw])
}
