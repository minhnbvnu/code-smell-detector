function coordinatesToFeature(type, feature, crsIn, coordinates, collection, properties) {
    if (coordinates.length == 0) {
        return;
    }
    switch (type) {
        case 'point':
        case 'linestring':
            return toFeature.default(feature, crsIn, coordinates, collection, properties);
        case 'multipoint':
            return toFeature.multi('point', feature, crsIn, coordinates, collection, properties);
        case 'multilinestring':
            return toFeature.multi('default', feature, crsIn, coordinates, collection, properties);
        case 'polygon':
            return toFeature.polygon(feature, crsIn, coordinates, collection, properties);
        case 'multipolygon':
            return toFeature.multi('polygon', feature, crsIn, coordinates, collection, properties);
        case 'geometrycollection':
        default:
            throw new Error(`Unhandled geojson type ${feature.type}`);
    }
}