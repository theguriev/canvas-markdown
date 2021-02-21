import { List } from 'immutable'
import { calculateTextSize } from '@/utils/'

export const codespan = ({ token, position, theme, nodeID }) => List([
    {
        type: 'rect',
        x: position.x,
        y: position.y - theme.font.padding.normal / 2,
        width: calculateTextSize(
            token.text,
            {
                font: `${theme.font.size.normal}px ${theme.font.family.normal}`
            }
        ).width + theme.font.padding.normal * 2,
        height: theme.font.size.normal + theme.font.padding.normal,
        radius: theme.block.radius.normal,
        strokeStyle: theme.codespan.strokeStyle,
        fillStyle: theme.codespan.fillStyle,
        nodeID
    },
    {
        type: 'text',
        textBaseline: 'top',
        font: `${theme.font.size.normal}px ${theme.font.family.normal}`,
        x: position.x + theme.font.padding.normal,
        y: position.y,
        fillText: token.text,
        width: calculateTextSize(token.text, { font: `${theme.font.size.normal}px ${theme.font.family.normal}` }).width,
        height: theme.font.size.normal,
        nodeID
    },
    {
        type: 'position',
        x: position.x + calculateTextSize(
            token.text,
            {
                font: `${theme.font.size.normal}px ${theme.font.family.normal}`
            }
        ).width + theme.font.padding.normal * 2,
        y: position.y,
        nodeID
    }
])
