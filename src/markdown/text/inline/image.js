import { List } from 'immutable'

export const image = ({
    token,
    position,
    theme,
    nodeID
}) => {
    let [width = 100, height = 100] = token.text.split('x')
    width = parseInt(width, 10) || 100
    height = parseInt(height, 10) || 100
    return List([
        {
            x: position.x,
            y: position.y,
            type: 'image',
            src: token.href,
            width,
            height,
            nodeID
        },
        {
            type: 'position',
            x: position.x,
            y: position.y + height + theme.fontSize * theme.fontLineHeight,
            nodeID
        }
    ])
}
