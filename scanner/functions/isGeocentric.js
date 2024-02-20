function isGeocentric(crs) {
    mustBeString(crs);
    const projection = proj4.defs(crs);
    return !projection ? false : projection.projName == 'geocent';
}