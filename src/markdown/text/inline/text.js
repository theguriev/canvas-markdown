import { List } from 'immutable'
import { calculateTextSize } from '@/utils'

export const text = ({
    token,
    position,
    newLineX,
    theme,
    nodeID
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
            return acc.concat([
                {
                    ...next,
                    type: 'text',
                    textBaseline: 'top',
                    font,
                    fillText: curr,
                    width: calculateTextSize(curr, { font }).width,
                    height: theme.fontSize,
                    nodeID
                },
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
