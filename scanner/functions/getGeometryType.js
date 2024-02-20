function getGeometryType(type) {
        switch (type) {
            case 'wkbPoint':
            case 'wkbMultiPoint':
                return itowns.FEATURE_TYPES.POINT;
            case 'wkbLineString':
            case 'wkbMultiLineString':
                return itowns.FEATURE_TYPES.LINE;
            case 'wkbPolygon':
            case 'wkbMultiPolygon':
                return itowns.FEATURE_TYPES.POLYGON;
            default:
                throw new Error('This type of GeometryType is not supported yet: ' + type);
        }
    }