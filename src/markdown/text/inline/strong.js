import { List } from 'immutable'
import { calculateTextSize } from '@/utils'

export const strong = ({ token, position, theme, nodeID }) => {
    const font = `bold ${theme.fontSize}px ${theme.fontFamily}`
    const textWidth = calculateTextSize(token.text, { font }).width
    return List([
        {
            ...position,
            type: 'text',
            textBaseline: 'top',
            font,
            fillText: token.text,
            width: textWidth,
            height: theme.fontSize,
            nodeID
        },
        {
            type: 'position',
            x: position.x + textWidth,
            y: position.y,
            nodeID
        }
    ])
}
