function paintSampleDisplay(args) {
    args.painter.fillRect(args.rect, Config.OPERATION_BACK_COLOR);

    let probabilities = args.customStats;
    let noData = probabilities === undefined || probabilities.hasNaN();
    if (noData) {
        args.painter.printParagraph("NaN", args.rect, new Point(0.5, 0.5), 'red');
    } else {
        _paintSampleDisplay_result(args);
    }

    args.painter.strokeRect(args.rect, 'lightgray');
}