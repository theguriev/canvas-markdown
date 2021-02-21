export const line = ({
    ctx,
    x,
    y,
    x2,
    y2,
    lineWidth,
    strokeStyle
}) => {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + x2, y + y2)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle
    ctx.stroke()
}
