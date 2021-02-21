import { List } from 'immutable'
import {
    cond,
    stubTrue,
    identity,
    conforms
} from 'lodash-es'
import { calculateTextSize } from '@/utils/'

const textTypeToParagraph = cond([
    [conforms({ type: t => t === 'text' }), el => ({ ...el, type: 'paragraph' })],
    [stubTrue, identity]
])

const counter = ({ x, y }, { list, font: fontOption }, { ordered, start }, index, nodeID) => {
    if (ordered) {
        const number = (start || 0) + index
        const font = `${fontOption.size.normal}px ${fontOption.family.normal}`
        return {
            type: 'text',
            textBaseline: 'top',
            font,
            x: x + list.marginLeft - list.radius * 2,
            y,
            width: calculateTextSize(`${number}.`, { font }).width,
            height: fontOption.size.normal,
            fillText: `${number}.`,
            nodeID
        }
    }
    return {
        type: 'ellipse',
        x: x + list.marginLeft,
        y: y + fontOption.size.normal / 2,
        radius: list.radius,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        anticlockwise: true,
        fillStyle: list.fillStyle,
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
            x: position.x + theme.list.radius * 6,
            y: position.y
        })
        const tmpAcc = acc.concat(
            parser({
                tokens: [prepared],
                position: {
                    ...prev,
                    x: prev.x + theme.list.marginLeft
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
                y: tmpAcc.last().y + theme.list.marginBottom,
                nodeID
            })
        }
        return tmpAcc
    },
    List()
).unshift(counter(position, theme, parent, index, nodeID))
