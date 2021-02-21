import { List } from 'immutable'
import { calculateTextSize } from '@/utils'

export const link = ({
    token,
    position,
    theme,
    paragraphID,
    nodeID
}) => {
    const font = `${theme.fontSize}px ${theme.fontFamily}`
    const textWidth = calculateTextSize(token.text, { font }).width
    return List([
        {
            ...position,
            type: 'text',
            textBaseline: 'top',
            font,
            fillText: token.text,
            fillStyle: theme.linkFillStyle,
            width: textWidth,
            height: theme.fontSize,
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
