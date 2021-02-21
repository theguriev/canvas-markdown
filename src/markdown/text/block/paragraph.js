import { List } from 'immutable'
import * as dict from '../inline'

export const paragraph = ({
    position,
    width,
    token,
    newLineX,
    theme,
    parser,
    nodeID
}) => {
    const parts = token.tokens.reduce(
        (acc, curr) => {
            const prev = acc.last(position)
            const fn = dict[curr.type]
            if (typeof fn === 'function') {
                return acc.concat(
                    fn({
                        token: curr,
                        position: prev,
                        newLineX,
                        width,
                        theme,
                        parser,
                        nodeID
                    })
                )
            }
            return acc
        },
        List()
    )
    if (parts.size) {
        const last = parts.last()
        return parts.push({
            type: 'position',
            x: position.x,
            y: last.y + theme.font.size.normal,
            nodeID
        })
    }
    return parts
}
