function drawControlBulb(args, axis) {
    redrawControlWires(args);
    let p = args.rect.center();
    switch (axis) {
        case 'X':
            args.painter.fillCircle(p, 5);
            args.painter.strokeCircle(p, 5);
            args.painter.strokeLine(p.offsetBy(0, -5), p.offsetBy(0, +5));
            args.painter.strokeLine(p.offsetBy(-5, 0), p.offsetBy(+5, 0));
            break;
        case 'Y':
            args.painter.fillCircle(p, 5);
            args.painter.strokeCircle(p, 5);
            let r = 5*Math.sqrt(0.5)*1.1;
            args.painter.strokeLine(p.offsetBy(+r, -r), p.offsetBy(-r, +r));
            args.painter.strokeLine(p.offsetBy(-r, -r), p.offsetBy(+r, +r));
            break;
        case 'Z':
            args.painter.fillCircle(p, 5, "black");
            break;
        default:
            throw new DetailedError('Unrecognized axis.', {axis});
    }
}