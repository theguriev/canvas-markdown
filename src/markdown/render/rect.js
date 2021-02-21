export const rect = ({
    ctx,
    x,
    y,
    width,
    height,
    radius,
    strokeStyle,
    fillStyle,
    lineWidth,
    cursorX,
    cursorY,
    identifyType,
    nodeID
}) => {
    let rounded = radius
    if (width < 2 * radius) {
        rounded = width / 2
    }
    if (height < 2 * radius) {
        rounded = height / 2
    }
    ctx.beginPath()
    ctx.moveTo(x + rounded, y)
    ctx.arcTo(x + width, y, x + width, y + height, rounded)
    ctx.arcTo(x + width, y + height, x, y + height, rounded)
    ctx.arcTo(x, y + height, x, y, rounded)
    ctx.arcTo(x, y, x + width, y, rounded)
    ctx.closePath()
    if (lineWidth) {
        ctx.lineWidth = lineWidth
    }
    if (strokeStyle) {
        ctx.strokeStyle = strokeStyle
        ctx.stroke()
    }
    if (fillStyle) {
        ctx.fillStyle = fillStyle
        ctx.fill()
    }
    if (identifyType === 'nodeBox' && ctx.isPointInPath(cursorX.current, cursorY.current)) {
        return { nodeID }
    }
}
