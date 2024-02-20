function updateSelectedArea(movingPosition, holdPosition, xScale, captureTo) {
    const band = positionToBand(
        Math.min(movingPosition, holdPosition),
        Math.max(movingPosition, holdPosition),
        xScale,
        captureTo
    );

    return {
        holdPosition,
        fromBand: band.from,
        toBand: band.to,
    };
}