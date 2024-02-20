function switchToBasis(ctx, axis, inverse) {
    switch (axis) {
        case 'X':
            GateShaders.applyMatrixOperation(ctx, HalfTurnGates.H.knownMatrixAt(0));
            break;
        case 'Y':
            if (inverse) {
                GateShaders.applyMatrixOperation(ctx, QuarterTurnGates.SqrtXBackward.knownMatrixAt(0));
            } else {
                GateShaders.applyMatrixOperation(ctx, QuarterTurnGates.SqrtXForward.knownMatrixAt(0));
            }
            break;
        case 'Z':
            break; // Already in the right basis.
        default:
            throw new DetailedError('Unrecognized axis.', {axis});
    }

}