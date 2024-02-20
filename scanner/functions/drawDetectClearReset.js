function drawDetectClearReset(args, axis) {
    let fullRect = args.rect;
    let detectorRect = fullRect.leftHalf();
    let resetRect = fullRect.rightHalf();

    // Draw background.
    let clearWireRect = fullRect.rightHalf();
    clearWireRect.y += clearWireRect.h / 2 - 2;
    clearWireRect.h = 5;
    args.painter.fillRect(clearWireRect, 'white');
    drawHighlight(args);

    // Draw text elements.
    args.painter.printLine('|0⟩', resetRect, 1, undefined, undefined, undefined, 0.5);

    // Draw detector.
    args.rect = detectorRect;
    drawWedge(args, axis);

    args.rect = fullRect;
    drawControlBulb(args, axis);
    args.rect = detectorRect;
    drawClick(args, undefined);

    args.rect = fullRect;
}