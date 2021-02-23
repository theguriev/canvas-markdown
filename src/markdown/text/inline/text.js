import { List } from 'immutable'
import { calculateTextSize } from '@/utils'

const changeSpacePosition = text => {
    const found = text.match(/\s+$/g)
    if (found === null) {
        return text
    }
    return ''.padStart(found[0].length) + text
}

export const text = ({
    token,
    position,
    newLineX,
    theme,
    nodeID,
    isAlignRight
}) => {
    const lines = List(token.raw.split(/(\n)/g))
    const font = `${theme.fontSize}px ${theme.fontFamily}`
    const parts = lines.reduce(
        (acc, curr) => {
            const next = acc.last(position)
            if (curr === '\n') {
                return acc.concat({
                    tag: 'text',
                    type: 'position',
                    x: newLineX,
                    y: next.y + theme.fontSize * theme.fontLineHeight,
                    nodeID
                })
            }
            const textWidth = calculateTextSize(curr, { font }).width
            const fillText = isAlignRight ? changeSpacePosition(curr) : curr
            const el = {
                x: next.x,
                y: next.y,
                type: 'text',
                textBaseline: 'top',
                font,
                fillText,
                width: textWidth,
                height: theme.fontSize,
                nodeID
            }
            return acc.concat([
                el,
                {
                    ...next,
                    type: 'position',
                    text: curr,
                    nodeID
                }
            ])
        },
        List()
    )
    const last = parts.last()
    return parts.push({
        type: 'position',
        tag: 'text',
        x: last.x + calculateTextSize(last.text, { font }).width,
        y: last.y,
        nodeID
    })
}
