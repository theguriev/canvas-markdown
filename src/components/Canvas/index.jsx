import React, { useState, useCallback } from 'react'
import Ui from '@you-eye/styled'
import { useEvent } from 'react-use'
import { useCanvas } from '@/hooks'

const Canvas = ({
    autoSize = true,
    before = () => {},
    after = () => {},
    draw = () => {}
}) => {
    const [dom, setDom] = useState(null)

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
        <Ui.canvas ref={setDom} />
    )
}

export default Canvas
