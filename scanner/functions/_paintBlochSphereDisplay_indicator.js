function _paintBlochSphereDisplay_indicator(
        painter,
        x,
        y,
        z,
        drawArea,
        fillColor) {
    let c = drawArea.center();
    let u = Math.min(drawArea.w, drawArea.h) / 2;
    let {dx, dy, dz} = MathPainter.coordinateSystem(u);

    let p = c.plus(dx.times(x)).plus(dy.times(y)).plus(dz.times(z));
    let r = 3.8 / (1 + x / 6);

    // Draw state indicators (in not-quite-correct 3d).
    painter.strokeLine(c, p, 'black', 1.5);
    painter.fillCircle(p, r, fillColor);

    painter.ctx.save();
    painter.ctx.globalAlpha *= Math.min(1, Math.max(0, 1-x*x-y*y-z*z));
    painter.fillCircle(p, r, 'yellow');
    painter.ctx.restore();

    painter.strokeCircle(p, r, 'black');

    // Show depth by lerping the line from overlaying to being overlayd by the ball.
    painter.ctx.save();
    painter.ctx.globalAlpha *= Math.min(1, Math.max(0, 0.5+x*5));
    painter.strokeLine(c, p, 'black', 2);
    painter.ctx.restore();
}