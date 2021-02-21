import { List } from 'immutable'
import { calculateTextSize } from '@/utils/'
import { space } from './space'

export const heading = ({
    position,
    token,
    newLineX,
    theme,
    nodeID
}) => {
    const font = `${theme.font.headingSizes[token.depth]}px ${theme.font.family.normal}`
    return List([
        {
            ...position,
            type: 'text',
            textBaseline: 'top',
            font,
            fillText: token.text,
            width: calculateTextSize(token.text, { font }).width,
            nodeID
        },
        ...space({
            position: {
                x: position.x,
                y: position.y + theme.font.headingSizes[token.depth]
            },
            newLineX,
            token,
            theme,
            nodeID
        })
    ])
}
