function resetSelectionInfo(cursorPosition, xScale) {
    return {
        refPosition: cursorPosition,
        fromPosition: cursorPosition,
        toPosition: cursorPosition,
        width: 0,
        fromBand: positionToBand(cursorPosition, xScale, true),
        toBand: positionToBand(cursorPosition, xScale, false),
    };
}