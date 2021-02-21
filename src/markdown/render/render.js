import { line } from './line'
import { text } from './text'
import { rect } from './rect'
import { ellipse } from './ellipse'
import { image } from './image'
import { path } from './path'
import { plus } from './plus'

export const dict = {
    line,
    text,
    rect,
    ellipse,
    image,
    path,
    plus
}

export const render = ({
    ctx,
    parts,
    hoveredNode,
    hoveredPath,
    hoveredPlusArea,
    isCtrlPressing,
    cursorX,
    cursorY
}) => parts.reduce(
    (acc, part) => {
        const fn = dict[part.type]
        if (typeof fn === 'function') {
            const id = fn({
                hoveredNode,
                hoveredPath,
                hoveredPlusArea,
                isCtrlPressing,
                cursorX,
                cursorY,
                ctx,
                ...part
            })
            if (id) {
                return id
            }
        }
        return acc
    },
    undefined
)
