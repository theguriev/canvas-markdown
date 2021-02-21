import { List } from 'immutable'
import * as dict from './block'

export const parser = ({
    tokens,
    position,
    ...rest
}) => tokens.reduce(
    (acc, token, index) => {
        const newLineX = position.x
        const fn = dict[token.type]
        if (typeof fn === 'function') {
            return acc.concat(
                fn({
                    ...rest,
                    token,
                    position: acc.last(position),
                    newLineX,
                    parser,
                    index
                })
            )
        }
        return acc
    },
    List()
)
