function isFeatureSingleGeometryUnderCoordinate(coordinate, type, coordinates, epsilon, offset, count, size) {
    if ((type == FEATURE_TYPES.LINE) && pointIsOverLine(coordinate, coordinates, epsilon, offset, count, size)) {
        return true;
    } else if ((type == FEATURE_TYPES.POLYGON) && pointIsInsidePolygon(coordinate, coordinates, epsilon, offset, count, size)) {
        return true;
    } else if (type == FEATURE_TYPES.POINT) {
        const closestPoint = getClosestPoint(coordinate, coordinates, epsilon, offset, count, size);
        if (closestPoint) {
            return { coordinates: closestPoint };
        }
    }
}