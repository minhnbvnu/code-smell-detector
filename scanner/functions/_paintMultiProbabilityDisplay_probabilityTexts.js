function _paintMultiProbabilityDisplay_probabilityTexts(args) {
    let {painter, rect: {x, y, w, h}, customStats: probabilities} = args;
    let d = h / probabilities.height();

    for (let i = 0; i < probabilities.height(); i++) {
        let p = probabilities.rawBuffer()[i * 2];
        painter.print(
            (p * 100).toFixed(1) + "%",
            x + w - 2,
            y + d * (i + 0.5),
            'right',
            'middle',
            'black',
            '8pt monospace',
            w - 4,
            d);
    }
}