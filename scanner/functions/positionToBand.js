function positionToBand(fromPosition, toPosition, xScale, captureTo) {
    const po = xScale.paddingOuter();
    const pi = xScale.paddingInner();
    const bandWidth = xScale.bandwidth();
    const step = xScale.step();
    const domain = xScale.domain();

    const fromIndex = (fromPosition - (po - pi / 2) * step) / (bandWidth + pi * step);
    const roundFromIndex = Math.trunc(fromIndex);

    const toIndex = (toPosition - (po - pi / 2) * step) / (bandWidth + pi * step);
    const roundToIndex = Math.trunc(toIndex);
    const toAdjustment = toIndex === roundToIndex ? 0 : 1;

    return {
        from: roundFromIndex >= 0 ? domain[roundFromIndex] : domain[0],
        to: roundToIndex < domain.length - 1 ? domain[roundToIndex + toAdjustment] : captureTo,
    };
}