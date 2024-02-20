function drawWedge(args, axis) {
    // Draw semi-circle wedge.
    const τ = Math.PI * 2;
    let r = Math.min(args.rect.h / 2, args.rect.w) - 1;
    let {x, y} = args.rect.center();
    x -= r*0.5;
    x += 0.5;
    y += 0.5;
    args.painter.trace(trace => {
        trace.ctx.arc(x, y, r, τ*3/4, τ/4);
        trace.ctx.lineTo(x, y - r - 1);
    }).thenStroke('black', 2).thenFill(Config.TIME_DEPENDENT_HIGHLIGHT_COLOR);
    args.painter.printLine(axis, args.rect, 0.5, undefined, undefined, undefined, 0.5);
}