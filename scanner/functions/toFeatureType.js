function toFeatureType(jsonType) {
    switch (jsonType) {
        case 'point':
        case 'multipoint':
            return FEATURE_TYPES.POINT;
        case 'linestring':
        case 'multilinestring':
            return FEATURE_TYPES.LINE;
        case 'polygon':
        case 'multipolygon':
            return FEATURE_TYPES.POLYGON;
        case 'geometrycollection':
        default:
            throw new Error(`Unhandled geometry type ${jsonType}`);
    }
}