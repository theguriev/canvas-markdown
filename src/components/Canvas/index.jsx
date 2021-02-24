import React, { useState, useCallback, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Ui from '@you-eye/styled'
import { isFunction } from 'lodash-es'
import { useEvent } from 'react-use'
import { useCanvas } from '@/hooks'

export const Canvas = forwardRef(({
    autoSize,
    before,
    after,
    draw,
    cursor,
    ...rest
}, ref) => {
    const [dom, setDom] = useState(null)
    const setReference = useCallback(element => {
        setDom(element)
        if (!ref) {
            return
        }
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
        <Ui.canvas
            tabIndex={-1}
            ref={setReference}
            cursor={cursor}
            {...rest}
        />
    )
})

Canvas.defaultProps = {
    autoSize: true,
    before: () => {},
    after: () => {},
    draw: () => {},
    cursor: 'default'
}

Canvas.propTypes = {
    autoSize: PropTypes.bool,
    before: PropTypes.func,
    after: PropTypes.func,
    draw: PropTypes.func,
    cursor: PropTypes.string
}

export default Canvas
