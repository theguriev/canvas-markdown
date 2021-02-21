import { List } from 'immutable'
import { lexer } from 'marked'
import * as dict from './block'

export const parser = ({
    tokens,
    position,
    nodeID = 0,
    ...rest
}) => tokens.reduce(
    (acc, token, index) => {
        const newLineX = position.x
        const fn = dict[token.type]
        if (typeof fn === 'function') {
            return acc.concat(
                fn({
                    ...rest,
                    nodeID,
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

export const parserText = ({
    text,
    position = { x: 0, y: 0 },
    ...rest
}) => parser({
    tokens: lexer(text),
    position,
    ...rest
})
