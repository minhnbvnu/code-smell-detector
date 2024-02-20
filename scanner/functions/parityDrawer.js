function parityDrawer(name) {
    return args => {
        if (args.isInToolbox || args.isHighlighted) {
            GatePainting.paintBackground(args);
            GatePainting.paintOutline(args);
        }
        let center = args.rect.paddedBy(-10);
        args.painter.fillRect(center);
        args.painter.strokeRect(center);
        args.painter.fillRect(center.paddedBy(-4).skipBottom(-6).skipTop(-6));
        args.painter.printLine(name, center, 0.5, undefined, undefined, undefined, 0);
        args.painter.printLine('par', center, 0.5, 'red', 10, undefined, 1);
    }
}