function proj4cache(crsIn, crsOut) {
    if (!projectionCache[crsIn]) {
        projectionCache[crsIn] = {};
    }

    if (!projectionCache[crsIn][crsOut]) {
        projectionCache[crsIn][crsOut] = proj4(crsIn, crsOut);
    }

    return projectionCache[crsIn][crsOut];
}