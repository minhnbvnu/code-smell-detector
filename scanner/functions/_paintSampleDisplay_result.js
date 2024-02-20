function _paintSampleDisplay_result(args) {
    let {painter, rect: {x, y, w, h}} = args;
    let d = Config.WIRE_SPACING;
    let startY = y + h/2 - d*args.gate.height/2;

    let {i: sample, p} = sampleFromDistribution(args);
    for (let i = 0; i < args.gate.height; i++) {
        let bit = ((sample >> i) & 1) !== 0;
        if (bit) {
            painter.fillRect(
                new Rect(x, startY+d*i+5, w, d-10),
                Config.OPERATION_FORE_COLOR);
        }
        painter.print(
            bit ? 'on' : 'off',
            x+w/2,
            startY+d*(i+0.5),
            'center',
            'middle',
            'black',
            '16px sans-serif',
            w,
            d);
    }

    for (let pt of args.focusPoints) {
        let k = Math.floor((pt.y - y) * 2 / d) /2;
        if (args.rect.containsPoint(pt)) {
            MathPainter.paintDeferredValueTooltip(
                painter,
                x + w,
                y + k * d,
                `Sampled |${Util.bin(sample, args.gate.height)}⟩`,
                `decimal: |${sample}⟩`,
                "chance: " + (p * 100).toFixed(4) + "%",
                Config.OPERATION_BACK_COLOR);
        }
    }
}