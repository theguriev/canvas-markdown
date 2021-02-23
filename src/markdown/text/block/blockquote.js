import { List } from 'immutable'

export const blockquote = ({
    position,
    width,
    token,
    theme,
    parser,
    nodeID,
    isAlignRight,
    ...rest
}) => {
    const offsetX = theme.blockquoteWidth + theme.fontPadding * 2
    const parts = parser({
        ...rest,
        nodeID,
        tokens: token.tokens,
        position: {
            x: position.x + offsetX,
            y: position.y + theme.fontPadding * 2
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
        y: position.y + theme.fontPadding,
        width: theme.blockquoteWidth,
        height: last.y - position.y,
        radius: 0,
        strokeStyle: theme.blockquoteStrokeStyle,
        fillStyle: theme.blockquoteFillStyle,
        nodeID
    }
    return parts.unshift(quote)
        .push({
            nodeID,
            type: 'position',
            x: position.x,
            y: last.y + theme.fontPadding * 2
        })
}
