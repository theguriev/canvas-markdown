import { List } from 'immutable'
import { lexer } from 'marked'
import * as dict from './block'

export const parser = ({
    tokens,
    position,
    nodeID = 0,
    isAlignRight = false,
    ...rest
}) => tokens.reduce(
    (acc, token, index) => {
        const newLineX = position.x
        const fn = dict[token.type]
        if (typeof fn === 'function') {
            return acc.concat(
                fn({
                    ...rest,
                    isAlignRight,
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

const applyRightToLeft = (left, right) => el => {
    const diff = el.x - left
    const newX = right - diff - el.width
    return {
        ...el,
        x: newX
    }
}

export const parserText = ({
    text,
    position = { x: 0, y: 0 },
    width,
    isAlignRight = false,
    ...rest
}) => {
    console.log('lexer', lexer(text))
    const parts = parser({
        tokens: lexer(text),
        position,
        width,
        isAlignRight,
        ...rest
    })
        .filter(el => el.type !== 'position')

    if (isAlignRight) {
        console.log(parts
            .map(applyRightToLeft(position.x, position.x + width)).toJS())
        return parts
            .map(applyRightToLeft(position.x, position.x + width))
    }
    console.log('parts', parts.toJS())
    return parts
}
