function drawClick(args, axis) {
    // Draw tilted "*click*" text.
    let clicked = args.customStats;
    if (!clicked) {
        return;
}
    let r = Math.min(args.rect.h / 2, args.rect.w);
    args.painter.ctx.save();
    args.painter.ctx.translate(args.rect.center().x, args.rect.center().y);
    args.painter.ctx.rotate(axis === undefined ? Math.PI/3 : Math.PI/4);
    args.painter.ctx.strokeStyle = 'white';
    args.painter.ctx.lineWidth = 3;
    args.painter.print(
        '*click*',
        0,
        axis === undefined ? 0 : -5,
        'center',
        'middle',
        'black',
        'bold 16px sans-serif',
        r*2.8,
        r*2.8,
        undefined,
        true);

    if (axis !== undefined) {
        args.painter.print(
            axis,
            0,
            10,
            'center',
            'middle',
            'black',
            'bold 16px sans-serif',
            r * 2.8,
            r * 2.8,
            undefined,
            true);
    }
    args.painter.ctx.restore();
}