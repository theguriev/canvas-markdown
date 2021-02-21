import { List } from 'immutable'
import {
    cond,
    stubTrue,
    identity,
    conforms
} from 'lodash-es'
import { calculateTextSize } from '@/utils'

const textTypeToParagraph = cond([
    [conforms({ type: t => t === 'text' }), el => ({ ...el, type: 'paragraph' })],
    [stubTrue, identity]
])

const counter = (
    { x, y },
    {
        listMarginLeft,
        listRadius,
        listFillStyle,
        fontSize,
        fontFamily
    },
    { ordered, start },
    index,
    nodeID
) => {
    if (ordered) {
        const number = (start || 0) + index
        const font = `${fontSize}px ${fontFamily}`
        return {
            type: 'text',
            textBaseline: 'top',
            font,
            x: x + listMarginLeft - listRadius * 2,
            y,
            width: calculateTextSize(`${number}.`, { font }).width,
            height: fontSize,
            fillText: `${number}.`,
            nodeID
        }
    }
    return {
        type: 'ellipse',
        x: x + listMarginLeft,
        y: y + fontSize / 2,
        radius: listRadius,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        anticlockwise: true,
        fillStyle: listFillStyle,
        nodeID
    }
}

export const listItem = ({
    position,
    width,
    token,
    newLineX,
    theme,
    index,
    parser,
    parent,
    nodeID
}) => token.tokens.reduce(
    (acc, curr) => {
        const prepared = textTypeToParagraph(curr)
        const prev = acc.last({
            x: position.x + theme.listRadius * 6,
            y: position.y
        })
        const tmpAcc = acc.concat(
            parser({
                tokens: [prepared],
                position: {
                    ...prev,
                    x: prev.x + theme.listMarginLeft
                },
                width,
                theme,
                parser,
                nodeID
            })
        )
        if (tmpAcc.last().tag !== 'listItem') {
            return tmpAcc.push({
                type: 'position',
                tag: 'listItem',
                x: newLineX,
                y: tmpAcc.last().y + theme.listMarginBottom,
                nodeID
            })
        }
        return tmpAcc
    },
    List()
).unshift(counter(position, theme, parent, index, nodeID))
