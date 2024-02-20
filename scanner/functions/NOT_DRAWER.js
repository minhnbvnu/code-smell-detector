function NOT_DRAWER(args) {
    if (args.isHighlighted) {
        GatePainting.DEFAULT_DRAWER(args);
        return;
    }

    // Show a box around the operation when it's not in the circuit.
    if (args.positionInCircuit === undefined) {
        GatePainting.paintBackground(args);
        GatePainting.paintOutline(args);
    }

    let drawArea = args.rect.scaledOutwardBy(0.6);
    args.painter.fillCircle(drawArea.center(), drawArea.w / 2);
    args.painter.strokeCircle(drawArea.center(), drawArea.w / 2);

    // Vertical stroke(s).
    let hasSingleWireControl =
        args.positionInCircuit !== undefined &&
        args.stats.circuitDefinition.colHasSingleWireControl(args.positionInCircuit.col);
    let hasDoubleWireControl =
        args.positionInCircuit !== undefined &&
        args.stats.circuitDefinition.colHasDoubleWireControl(args.positionInCircuit.col);
    if (hasSingleWireControl || !hasDoubleWireControl) {
        args.painter.strokeLine(drawArea.topCenter(), drawArea.bottomCenter());
    }
    if (hasDoubleWireControl) {
        args.painter.strokeLine(drawArea.topCenter().offsetBy(-1, 0), drawArea.bottomCenter().offsetBy(-1, 0));
        args.painter.strokeLine(drawArea.topCenter().offsetBy(+1, 0), drawArea.bottomCenter().offsetBy(+1, 0));
    }

    // Horizontal stroke(s).
    let isMeasured = args.positionInCircuit !== undefined && args.stats.circuitDefinition.locIsMeasured(
        new Point(args.positionInCircuit.col, args.positionInCircuit.row));
    if (isMeasured) {
        args.painter.strokeLine(drawArea.centerLeft().offsetBy(0, -1), drawArea.centerRight().offsetBy(0, -1));
        args.painter.strokeLine(drawArea.centerLeft().offsetBy(0, +1), drawArea.centerRight().offsetBy(0, +1));
    } else {
        args.painter.strokeLine(drawArea.centerLeft(), drawArea.centerRight());
    }
}