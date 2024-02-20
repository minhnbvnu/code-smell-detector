function paintBlochSphereDisplay(
        painter,
        qubitDensityMatrix,
        drawArea,
        focusPoints = [],
        backgroundColor = Config.DISPLAY_GATE_BACK_COLOR,
        fillColor = Config.DISPLAY_GATE_FORE_COLOR) {
    let c = drawArea.center();
    let u = Math.min(drawArea.w, drawArea.h) / 2;
    let {dx, dy, dz} = MathPainter.coordinateSystem(u);

    // Draw sphere and axis lines (in not-quite-proper 3d).
    painter.fillCircle(c, u, backgroundColor);
    painter.trace(trace => {
        trace.circle(c.x, c.y, u);
        trace.ellipse(c.x, c.y, dy.x, dx.y);
        trace.ellipse(c.x, c.y, dx.x, dz.y);
        for (let d of [dx, dy, dz]) {
            trace.line(c.x - d.x, c.y - d.y, c.x + d.x, c.y + d.y);
        }
    }).thenStroke('#BBB');

    let [x, y, z] = [NaN, NaN, NaN];
    if (qubitDensityMatrix.hasNaN()) {
        painter.printParagraph("NaN", drawArea, new Point(0.5, 0.5), 'red');
    } else {
        [x, y, z] = qubitDensityMatrix.qubitDensityMatrixToBlochVector();
        _paintBlochSphereDisplay_indicator(painter, x, y, z, drawArea, fillColor);
    }

    _paintBlochSphereDisplay_tooltips(painter, drawArea, x, y, z, focusPoints);
}