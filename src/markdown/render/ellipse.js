export const ellipse = ({
    ctx,
    x,
    y,
    radius,
    startAngle,
    endAngle,
    anticlockwise,
    strokeStyle,
    fillStyle
}) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    if (strokeStyle) {
        ctx.strokeStyle = strokeStyle
        ctx.stroke()
    }
    if (fillStyle) {
        ctx.fillStyle = fillStyle
        ctx.fill()
    }
    ctx.closePath()
}
