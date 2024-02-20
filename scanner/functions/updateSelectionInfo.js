function updateSelectionInfo(cursorPosition, refPosition, xScale) {
    const from = cursorPosition < refPosition ? cursorPosition : refPosition;
    const to = cursorPosition < refPosition ? refPosition : cursorPosition;

    return {
        refPosition,
        fromPosition: from,
        toPosition: to,
        width: to - from,
        fromBand: positionToBand(from, xScale, true),
        toBand: positionToBand(to, xScale, false),
    };
}