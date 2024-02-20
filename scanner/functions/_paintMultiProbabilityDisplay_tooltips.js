function _paintMultiProbabilityDisplay_tooltips(args) {
    let {painter, rect: {x, y, w, h}, customStats: probabilities} = args;
    let n = 1 << args.gate.height;
    let d = h / n;

    for (let pt of args.focusPoints) {
        let k = Math.floor((pt.y - y) / d);
        if (args.rect.containsPoint(pt) && k >= 0 && k < n) {
            let p = probabilities === undefined ? NaN : probabilities.rawBuffer()[k * 2];
            painter.strokeRect(new Rect(x, y + k * d, w, d), 'orange', 2);
            MathPainter.paintDeferredValueTooltip(
                painter,
                x + w,
                y + k * d,
                `Chance of |${Util.bin(k, args.gate.height)}⟩ (decimal ${k}) if measured`,
                'raw: ' + (p * 100).toFixed(4) + "%",
                'log: ' + (Math.log10(p) * 10).toFixed(1) + " dB");
        }
    }
}