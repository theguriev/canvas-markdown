export const plus = ({
    ctx,
    x,
    y,
    radius,
    strokeStyle,
    lineWidth,
    isCtrlPressing,
    fillStyle,
    hoveredNode,
    hoveredPlusArea,
    nodeID,
    cursorX,
    cursorY
}) => {
    let result
    const hovered = hoveredNode.current === nodeID || hoveredPlusArea.current === nodeID
    const fill = hovered ? fillStyle : 'transparent'
    const stroke = hovered ? strokeStyle : 'transparent'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
    if (lineWidth) {
        ctx.lineWidth = lineWidth
    }
    ctx.strokeStyle = stroke
    ctx.stroke()
    ctx.fillStyle = fill
    ctx.fill()
    ctx.closePath()

    if (ctx.isPointInPath(cursorX.current, cursorY.current)) {
        result = { plusAreaID: nodeID }
    }

    ctx.beginPath()
    ctx.moveTo(x - radius + (radius / 4), y)
    ctx.lineTo(x + radius - (radius / 4), y)
    ctx.lineWidth = lineWidth - 1
    ctx.stroke()
    if (!isCtrlPressing.current) {
        ctx.beginPath()
        ctx.moveTo(x, y - radius + (radius / 4))
        ctx.lineTo(x, y + radius - (radius / 4))
        ctx.lineWidth = lineWidth - 1
        ctx.stroke()
    }
    return result
}
