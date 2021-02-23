import { List } from 'immutable'
import { calculateTextSize } from '@/utils'
import { space } from './space'

export const heading = ({
    position,
    token,
    newLineX,
    theme,
    nodeID
}) => {
    const sizes = {
        1: theme.fontHeadingSize1,
        2: theme.fontHeadingSize2,
        3: theme.fontHeadingSize3,
        4: theme.fontHeadingSize4,
        5: theme.fontHeadingSize5,
        6: theme.fontHeadingSize6
    }
    const font = `${sizes[token.depth]}px ${theme.fontFamily}`
    const textWidth = calculateTextSize(token.text, { font }).width
    return List([
        {
            x: position.x,
            y: position.y,
            type: 'text',
            textBaseline: 'top',
            font,
            fillText: token.text,
            width: textWidth,
            nodeID
        },
        ...space({
            position: {
                x: position.x,
                y: position.y + sizes[token.depth]
            },
            newLineX,
            token,
            theme,
            nodeID
        })
    ])
}
