import { List } from 'immutable'

export const image = ({ token, position, theme, nodeID }) => {
    let [width = 100, height = 100] = token.text.split('x')
    width = parseInt(width, 10) || 100
    height = parseInt(height, 10) || 100
    return List([
        {
            ...position,
            type: 'image',
            src: token.href,
            width,
            height,
            nodeID
        },
        {
            type: 'position',
            x: position.x,
            y: position.y + height + theme.font.size.normal * theme.font.lineHeight.normal,
            nodeID
        }
    ])
}
