import { List } from 'immutable'

export const blockquote = ({
    position,
    width,
    token,
    theme,
    parser,
    nodeID
}) => {
    const parts = parser({
        nodeID,
        tokens: token.tokens,
        position: {
            x: position.x + theme.blockquote.quoteWidth + theme.font.padding.normal * 2,
            y: position.y + theme.font.padding.normal * 2
        },
        width,
        theme,
        parser
    })
    if (parts.size === 0) {
        return List()
    }
    const last = parts.last()
    const quote = {
        type: 'rect',
        x: position.x,
        y: position.y + theme.font.padding.normal,
        width: theme.blockquote.quoteWidth,
        height: last.y - position.y,
        radius: 0,
        strokeStyle: theme.blockquote.strokeStyle,
        fillStyle: theme.blockquote.fillStyle,
        nodeID
    }
    return parts.unshift(quote)
        .push({
            nodeID,
            type: 'position',
            x: position.x,
            y: last.y + theme.font.padding.normal * 2
        })
}
