export const text = ({
    ctx,
    textBaseline,
    font,
    x,
    y,
    fillText,
    fillStyle = '#000'
}) => {
    ctx.font = font
    ctx.textBaseline = textBaseline
    ctx.fillStyle = fillStyle
    ctx.fillText(fillText, x, y)
}
