function isEpsg(crs) {
    return isString(crs) && crs.startsWith('EPSG');
}