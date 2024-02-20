function redrawControlWires(args) {
    if (args.positionInCircuit === undefined || args.isHighlighted) {
        return;
    }
    let painter = args.painter;
    let columnIndex = args.positionInCircuit.col;
    let x = Math.round(args.rect.center().x - 0.5) + 0.5;

    // Dashed line indicates effects from non-unitary gates may affect, or appear to affect, other wires.
    let circuit = args.stats.circuitDefinition;
    if (circuit.columns[columnIndex].hasGatesWithGlobalEffects()) {
        painter.ctx.save();
        painter.ctx.setLineDash([1, 4]);
        painter.strokeLine(new Point(x, args.rect.y), new Point(x, args.rect.bottom()));
        painter.ctx.restore();
    }

    let row = args.positionInCircuit.row;
    for (let {first, last, measured} of circuit.controlLinesRanges(columnIndex)) {
        if (first <= row && row <= last) {
            let y1 = first === row ? args.rect.center().y : args.rect.y;
            let y2 = last === row ? args.rect.center().y : args.rect.bottom();
            if (measured) {
                painter.strokeLine(new Point(x + 1, y1), new Point(x + 1, y2));
                painter.strokeLine(new Point(x - 1, y1), new Point(x - 1, y2));
            } else {
                painter.strokeLine(new Point(x, y1), new Point(x, y2));
            }
        }
    }
}