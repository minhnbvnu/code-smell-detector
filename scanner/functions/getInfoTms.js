function getInfoTms(crs) {
    const epsg = CRS.formatToEPSG(crs);
    const globalExtent = globalExtentTMS.get(epsg);
    const globalDimension = globalExtent.planarDimensions(_dim2);
    const tms = CRS.formatToTms(crs);
    const sTs = schemeTiles.get(tms) || schemeTiles.get('default');
    // The isInverted parameter is to be set to the correct value, true or false
    // (default being false) if the computation of the coordinates needs to be
    // inverted to match the same scheme as OSM, Google Maps or other system.
    // See link below for more information
    // https://alastaira.wordpress.com/2011/07/06/converting-tms-tile-coordinates-to-googlebingosm-tile-coordinates/
    // in crs includes ':NI' => tms isn't inverted (NOT INVERTED)
    const isInverted = !tms.includes(':NI');
    return { epsg, globalExtent, globalDimension, sTs, isInverted };
}