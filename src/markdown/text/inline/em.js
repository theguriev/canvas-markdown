import { List } from 'immutable'
import { calculateTextSize } from '@/utils/'

export const em = ({ token, position, theme, nodeID }) => {
    const font = `italic ${theme.font.size.normal}px ${theme.font.family.normal}`
    const textWidth = calculateTextSize(token.text, { font }).width
    return List([
        {
            ...position,
            type: 'text',
            textBaseline: 'top',
            font,
            fillText: token.text,
            width: textWidth,
            height: theme.font.size.normal,
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
