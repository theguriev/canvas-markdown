import React, { useState, useCallback, forwardRef } from 'react'
import Ui from '@you-eye/styled'
import { isFunction } from 'lodash-es'
import { useEvent } from 'react-use'
import { useCanvas } from '@/hooks'

const Canvas = forwardRef(({
    autoSize = true,
    before = () => {},
    after = () => {},
    draw = () => {},
    cursor = 'default'
}, ref) => {
    const [dom, setDom] = useState(null)
    const setReference = useCallback(element => {
        setDom(element)
        if (ref.current !== undefined) {
            // eslint-disable-next-line no-param-reassign
            ref.current = element
        } else if (isFunction(ref)) {
            ref(element)
        }
    }, [dom])
    const resize = useCallback(() => {
        if (!dom) {
            return
        }
        dom.width = window.innerWidth * 2
        dom.height = window.innerHeight * 2
        dom.style.width = `${window.innerWidth}px`
        dom.style.height = `${window.innerHeight}px`
    }, [dom, autoSize])

    useCanvas({
        dom,
        before: () => {
            if (autoSize) {
                resize()
            }
            before()
        },
        after,
        draw
    })

    useEvent(autoSize && 'resize', resize)

    return (
        <Ui.canvas ref={setReference} cursor={cursor} />
    )
})

export default Canvas
