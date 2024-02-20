function drawCircuitTooltip(painter, circuitDefinition, rect, showWires, time) {
    let displayed = new DisplayedCircuit(
        0,
        circuitDefinition,
        undefined,
        undefined,
        undefined);
    let neededWidth = displayed.desiredWidth(true);
    let neededHeight = displayed.desiredHeight(true);
    let scaleX = rect.w / neededWidth;
    let scaleY = rect.h / neededHeight;
    if (showWires) {
        let s = Math.min(scaleX, scaleY);
        scaleX = s;
        scaleY = s;
    }
    let stats = CircuitStats.withNanDataFromCircuitAtTime(circuitDefinition, time);
    try {
        painter.ctx.save();
        painter.ctx.translate(rect.x, rect.y);
        painter.ctx.scale(Math.min(1, scaleX), Math.min(1, scaleY));
        painter.ctx.translate(0, 0);
        displayed.paint(
            painter,
            Hand.EMPTY,
            stats,
            true,
            showWires);
    } finally {
        painter.ctx.restore();
    }
    return {maxW: neededWidth*scaleX, maxH: neededHeight*scaleY};
}