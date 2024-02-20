function createSelectionArea(cursorPosition, xScale, captureTo) {
    const band = positionToBand(cursorPosition, cursorPosition, xScale, captureTo);

    return {
        holdPosition: cursorPosition,
        fromBand: band.from,
        toBand: band.to,
    };
}