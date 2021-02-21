export const space = ({
    position,
    token,
    newLineX,
    theme,
    nodeID
}) => token.raw
    .split(/(\n)/g)
    .filter(el => el === '\n')
    .map((_, index) => ({
        type: 'position',
        tag: 'space',
        x: newLineX,
        y: position.y + (theme.font.size.normal * theme.font.lineHeight.normal) * index,
        nodeID
    }))
