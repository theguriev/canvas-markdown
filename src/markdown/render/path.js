const GAP_FIXING = 0.3
const draw = ({
    ctx,
    x,
    y,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    strokeWidth,
    stroke,
    strokeDasharray,
    isRightSide,
    cursorX,
    cursorY,
    nodeID
}) => {
    const p = new Path2D()
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = stroke
    if (isRightSide) {
        p.moveTo(x + ((strokeWidth / 2) + 1), y)
    } else {
        p.moveTo(x - ((strokeWidth / 2) + 1), y)
    }
    ctx.setLineDash(strokeDasharray || [])
    p.bezierCurveTo(x + x2, y + y2, x + x3, y + y3, x + x4, y + y4)
    ctx.stroke(p)
    let result
    if (ctx.isPointInStroke(p, cursorX.current, cursorY.current)) {
        result = { pathID: nodeID }
    }
    // Arrow for the end.
    ctx.fillStyle = stroke
    ctx.beginPath()
    if (isRightSide) {
        ctx.moveTo(x + x4, y + y4 - strokeWidth / 2)
        ctx.lineTo(x + x4 + strokeWidth / 2, y + y4)
        ctx.lineTo(x + x4, y + y4 + strokeWidth / 2)
        ctx.lineTo(x + x4 - GAP_FIXING, y + y4 + strokeWidth / 2)
        ctx.lineTo(x + x4 - GAP_FIXING, y + y4 - strokeWidth / 2)
    } else {
        ctx.moveTo(x + x4, y + y4 - strokeWidth / 2)
        ctx.lineTo(x + x4 - strokeWidth / 2, y + y4)
        ctx.lineTo(x + x4, y + y4 + strokeWidth / 2)
        ctx.lineTo(x + x4 + GAP_FIXING, y + y4 + strokeWidth / 2)
        ctx.lineTo(x + x4 + GAP_FIXING, y + y4 - strokeWidth / 2)
    }
    ctx.fill()
    ctx.closePath()

    // Arrow for the start
    ctx.beginPath()
    if (isRightSide) {
        ctx.moveTo(x + 1, y - (strokeWidth / 2))
        // ->
        ctx.lineTo(x + (strokeWidth / 2) + 1 + GAP_FIXING, y - (strokeWidth / 2))
        // down
        ctx.lineTo(x + (strokeWidth / 2) + 1 + GAP_FIXING, y + (strokeWidth / 2))
        // <-
        ctx.lineTo(x + 1, y + (strokeWidth / 2))
        // from bottom to center
        ctx.lineTo(x + (strokeWidth / 2) + 1, y)
    } else {
        ctx.moveTo(x - 1, y - (strokeWidth / 2))
        // ->
        ctx.lineTo(x - (strokeWidth / 2) - 1 - GAP_FIXING, y - (strokeWidth / 2))
        // down
        ctx.lineTo(x - (strokeWidth / 2) - 1 - GAP_FIXING, y + (strokeWidth / 2))
        // <-
        ctx.lineTo(x - 1, y + (strokeWidth / 2))
        // from bottom to center
        ctx.lineTo(x - (strokeWidth / 2) - 1, y)
    }
    ctx.fill()
    ctx.closePath()
    return result
}

export const path = ({
    ctx,
    x,
    y,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    strokeWidth,
    stroke,
    strokeDasharray,
    isRightSide,
    cursorX,
    cursorY,
    nodeID,
    selected
}) => {
    if (selected) {
        draw({
            ctx,
            x,
            y,
            x2,
            y2,
            x3,
            y3,
            x4,
            y4,
            strokeWidth: strokeWidth * 1.4,
            stroke: 'rgba(64, 158, 255, 0.5)',
            strokeDasharray,
            isRightSide,
            cursorX,
            cursorY,
            nodeID
        })
    }
    return draw({
        ctx,
        x,
        y,
        x2,
        y2,
        x3,
        y3,
        x4,
        y4,
        strokeWidth,
        stroke,
        strokeDasharray,
        isRightSide,
        cursorX,
        cursorY,
        nodeID
    })
}
