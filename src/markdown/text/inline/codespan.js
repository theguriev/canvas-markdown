import { List } from 'immutable'
import { calculateTextSize } from '@/utils'

export const codespan = ({
    token,
    position,
    theme,
    nodeID
}) => List([
    {
        type: 'rect',
        x: position.x,
        y: position.y - theme.fontPadding / 2,
        width: calculateTextSize(
            token.text,
            {
                font: `${theme.fontSize}px ${theme.fontFamily}`
            }
        ).width + theme.fontPadding * 2,
        height: theme.fontSize + theme.fontPadding,
        radius: theme.blockRadius,
        strokeStyle: theme.codespanStrokeStyle,
        fillStyle: theme.codespanFilleStyle,
        nodeID
    },
    {
        type: 'text',
        textBaseline: 'top',
        font: `${theme.fontSize}px ${theme.fontFamily}`,
        x: position.x + theme.fontPadding,
        y: position.y,
        fillText: token.text,
        width: calculateTextSize(token.text, { font: `${theme.fontSize}px ${theme.fontFamily}` }).width,
        height: theme.fontSize,
        nodeID
    },
    {
        type: 'position',
        x: position.x + calculateTextSize(
            token.text,
            {
                font: `${theme.fontSize}px ${theme.fontFamily}`
            }
        ).width + theme.fontPadding * 2,
        y: position.y,
        nodeID
    }
])
