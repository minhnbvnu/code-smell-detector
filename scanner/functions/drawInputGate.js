function drawInputGate(args, key, reverse) {
    GatePainting.paintBackground(args, '#DDD', '#DDD');
    if (args.isInToolbox) {
        GatePainting.paintOutline(args);
    } else {
        args.painter.strokeRect(args.rect, '#888');
    }
    GatePainting.paintResizeTab(args);

    let {x, y} = args.rect.center();
    args.painter.print(
        'input',
        x,
        y-2,
        'center',
        'bottom',
        'black',
        '16px sans-serif',
        args.rect.w - 2,
        args.rect.h / 2);
    args.painter.print(
        key + (reverse ? '[::-1]' : ''),
        x,
        y+2,
        'center',
        'top',
        'black',
        '16px sans-serif',
        args.rect.w - 2,
        args.rect.h / 2);
}