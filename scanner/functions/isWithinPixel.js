function isWithinPixel(painter) {
    if (!painter || !painter._containerBbox) {
        TEMP_WITHIN.within = false;
    } else {
        TEMP_WITHIN.within = false;
        const { minx, miny, maxx, maxy } = painter._containerBbox;
        const offsetx = Math.abs(maxx - minx);
        const offsety = Math.abs(maxy - miny);
        if (offsetx <= 1 && offsety <= 1) {
            TEMP_WITHIN.within = true;
            TEMP_WITHIN.center[0] = (minx + maxx) / 2;
            TEMP_WITHIN.center[1] = (miny + maxy) / 2;
        }
        delete painter._containerBbox;
    }
    return TEMP_WITHIN;
}