import { List } from 'immutable'
import { calculateTextSize } from '@/utils/'

export const link = ({
    token,
    position,
    theme,
    paragraphID,
    nodeID
}) => {
    const font = `${theme.font.size.normal}px ${theme.font.family.normal}`
    const textWidth = calculateTextSize(token.text, { font }).width
    return List([
        {
            ...position,
            type: 'text',
            textBaseline: 'top',
            font,
            fillText: token.text,
            fillStyle: theme.link.fillStyle,
            width: textWidth,
            height: theme.font.size.normal,
            paragraphID,
            nodeID
        },
        {
            type: 'position',
            x: position.x + textWidth,
            y: position.y,
            paragraphID,
            nodeID
        }
    ])
}
