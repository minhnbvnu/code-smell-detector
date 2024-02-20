function formatToTms(crs) {
    mustBeString(crs);
    return isTms(crs) ? crs : `TMS:${crs.match(/\d+/)[0]}`;
}