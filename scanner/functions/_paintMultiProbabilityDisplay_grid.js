function _paintMultiProbabilityDisplay_grid(args) {
    let {painter, rect: {x, y, w, h}} = args;
    let n = 1 << args.gate.height;
    let d = h / n;
    painter.fillRect(args.rect, Config.DISPLAY_GATE_BACK_COLOR);

    if (d < 1) {
        args.painter.ctx.save();
        args.painter.ctx.globalAlpha *= 0.2;
        painter.fillRect(args.rect, 'lightgray');
        args.painter.ctx.restore();
        return;
    }
    let r = args.gate.height - 5;
    painter.trace(tracer => {
        for (let i = 1; i < n; i++) {
            tracer.line(x, y + d * i, x + w, y + d * i);
        }
    }).thenStroke('lightgray', r <= 0 ? 1 : 1 / r);
    painter.strokeRect(args.rect, 'lightgray');
}