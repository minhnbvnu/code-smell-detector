function getGeometryCoordinatesAlts(geometry, layerAlt, enableAltitude) {
    const coordinates = geometry.getCoordinates ? geometry.getCoordinates() : null;
    if (coordinates) {
        const tempAlts = [];
        coordinatesHasAlt(coordinates, tempAlts);
        if (tempAlts.length) {
            const alts = getCoordinatesAlts(coordinates, layerAlt, enableAltitude);
            if (geometry.getShell && Array.isArray(alts[0])) {
                return alts[0][0];
            }
            return alts;
        }
    }
    return null;
}