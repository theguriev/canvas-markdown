import { List } from 'immutable'
import { calculateTextSize } from '@/utils'

export const del = ({ token, position, theme, nodeID }) => {
    const font = `${theme.fontSize}px ${theme.fontFamily}`
    const strikeWidth = calculateTextSize(token.text, { font }).width
    return List([
        {
            ...position,
            type: 'text',
            textBaseline: 'top',
            font,
            fillText: token.text,
            width: strikeWidth,
            height: theme.fontSize,
            nodeID
        },
        {
            type: 'line',
            x: position.x,
            y: position.y + theme.fontSize / 2,
            x2: strikeWidth,
            y2: 0,
            width: strikeWidth,
            height: 0,
            lineWidth: 1,
            nodeID
        },
        {
            type: 'position',
            x: position.x + strikeWidth,
            y: position.y,
            nodeID
        }
    ])
}
