import { text } from '../inline/text'
import { space } from './space'

const getSpacesFromEnd = txt => {
    const spaces = ['\n', '\n']
    for (let i = txt.length - 1; i >= 0; i -= 1) {
        const char = txt[i]
        if (char === '\n') {
            spaces.push('\n')
            // eslint-disable-next-line no-continue
            continue
        }
        break
    }
    return spaces.join('')
}

export const code = ({
    position,
    width,
    token,
    newLineX,
    theme,
    nodeID
}) => {
    const parts = text({
        position: {
            x: position.x + theme.fontPadding,
            y: position.y + theme.fontPadding
        },
        width,
        token: {
            ...token,
            raw: token.text
        },
        newLineX: newLineX + theme.fontPadding,
        theme,
        nodeID
    })
    const last = parts.last()
    const block = {
        ...position,
        type: 'rect',
        width,
        height: (last.y - position.y) + theme.fontPadding * 3,
        radius: theme.blockRadius,
        strokeStyle: theme.codeStrokeStyle,
        fillStyle: theme.codeFillStyle,
        nodeID
    }
    const spaces = { raw: getSpacesFromEnd(token.raw) }
    return parts.unshift(block).concat(space({
        position: {
            x: last.x,
            y: last.y
        },
        newLineX,
        token: spaces,
        theme,
        nodeID
    }))
}
