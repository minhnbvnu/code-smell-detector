function isFeatureUnderCoordinate(coordinate, feature, epsilon, result) {
    const featCoord = coordinate.as(feature.crs);
    for (const geometry of feature.geometries) {
        if (geometry.extent == undefined || geometry.extent.isPointInside(featCoord, epsilon)) {
            const offset = geometry.indices[0].offset * feature.size;
            const count = geometry.indices[0].count * feature.size;
            const under = isFeatureSingleGeometryUnderCoordinate(featCoord, feature.type, feature.vertices, epsilon, offset, count, feature.size);
            if (under) {
                result.push({
                    type: feature.type,
                    geometry,
                    coordinates: under.coordinates /* || coordinates */,
                    style: feature.style,
                });
            }
        }
    }
}