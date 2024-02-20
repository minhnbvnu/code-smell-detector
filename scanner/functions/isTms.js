function isTms(crs) {
    return isString(crs) && crs.startsWith('TMS');
}