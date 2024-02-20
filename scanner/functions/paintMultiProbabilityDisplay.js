function paintMultiProbabilityDisplay(args) {
    _paintMultiProbabilityDisplay_grid(args);

    let probabilities = args.customStats;
    let noData = probabilities === undefined || probabilities.hasNaN();
    if (noData) {
        args.painter.printParagraph("NaN", args.rect, new Point(0.5, 0.5), 'red');
    } else {
        let textFits = args.rect.h / probabilities.height() > 8;
        if (!textFits) {
            _paintMultiProbabilityDisplay_logarithmHints(args);
        }
        _paintMultiProbabilityDisplay_probabilityBars(args);
        if (textFits) {
            _paintMultiProbabilityDisplay_probabilityTexts(args);
        }
    }

    _paintMultiProbabilityDisplay_tooltips(args);
}