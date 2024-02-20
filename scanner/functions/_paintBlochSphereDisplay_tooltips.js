function _paintBlochSphereDisplay_tooltips(
        painter,
        drawArea,
        x,
        y,
        z,
        focusPoints) {
    let c = drawArea.center();
    let u = Math.min(drawArea.w, drawArea.h) / 2;
    if (focusPoints.every(pt => pt.distanceTo(c) >= u)) {
        return;
    }

    const τ = Math.PI * 2;
    let deg = v => (v >= 0 ? '+' : '') + (v*360/τ).toFixed(2) + '°';
    let forceSign = v => (v >= 0 ? '+' : '') + v.toFixed(4);
    let d = Math.sqrt(x*x + y*y + z*z);
    let ϕ = Math.atan2(y, -x);
    let θ = Math.max(0, Math.PI/2 - Math.atan2(-z, Math.sqrt(y*y + x*x)));
    painter.strokeCircle(c, u, 'orange', 2);
    MathPainter.paintDeferredValueTooltip(
        painter,
        c.x+u*Math.sqrt(0.5),
        c.y-u*Math.sqrt(0.5),
        'Bloch sphere representation of local state',
        `r:${forceSign(d)}, ϕ:${deg(ϕ)}, θ:${deg(θ)}`,
        `x:${forceSign(-x)}, y:${forceSign(y)}, z:${forceSign(-z)}`);
}