function getCoordinatesAlts(coordinates, layerAlt, enableAltitude) {
    if (Array.isArray(coordinates)) {
        const alts = [];
        for (let i = 0, len = coordinates.length; i < len; i++) {
            alts.push(getCoordinatesAlts(coordinates[i], layerAlt, enableAltitude));
        }
        return alts;
    }
    if (isNumber(coordinates.z)) {
        return enableAltitude ? layerAlt + coordinates.z : coordinates.z;
    } else if (enableAltitude) {
        return layerAlt;
    } else {
        return 0;
    }
}