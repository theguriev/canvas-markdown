import { el } from 'date-fns/locale'
import { List } from 'immutable'
import { cond, stubTrue, identity } from 'lodash'
import { space } from './space'

const fitWidth = width => cond([
    [item => item.identifyType === 'hr', item => ({ ...item, width, x2: width })],
    [stubTrue, identity]
])

export const fitHRItemsWidth = (width, items) => items.map(fitWidth(width))

export const hr = ({
    position,
    width,
    token,
    newLineX,
    theme,
    nodeID
}) => List([
    {
        type: 'line',
        identifyType: 'hr',
        x: position.x,
        y: position.y + theme.fontPadding,
        x2: width,
        y2: 0,
        width: Math.abs(width - position.x),
        height: Math.abs(position.y + theme.fontPadding),
        lineWidth: 1,
        strokeStyle: theme.hrStrokeStyle,
        nodeID
    },
    ...space({
        position: {
            x: position.x,
            y: position.y + theme.fontPadding * 2
        },
        newLineX,
        token,
        theme,
        nodeID
    })
])
