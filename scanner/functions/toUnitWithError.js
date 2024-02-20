function toUnitWithError(crs) {
    mustBeString(crs);
    const u = toUnit(crs);
    if (u === undefined) {
        throw new Error(`No unit found for crs: '${crs}'`);
    }
    return u;
}