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
        y: position.y + (theme.fontSize * theme.fontLineHeight) * index,
        nodeID
    }))
