function formatToEPSG(crs) {
    mustBeString(crs);
    return isEpsg(crs) ? crs : `EPSG:${crs.match(/\d+/)[0]}`;
}