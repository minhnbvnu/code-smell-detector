function getTransformValue(options) {
    const { projection, isArcgis, isGeoServer, isSuperMap } = options;
    //transform value, ArcGIS is different from others
    let transformValue = 0.0002645833333333333;
    if (isArcgis || isGeoServer || isSuperMap) {
        transformValue = 0.00028;
    }
    if (projection && projection.indexOf('4326') > -1) {
        transformValue = 2.3767925226029154e-9;
        if (isArcgis || isSuperMap) {
            transformValue = 2.518101729011901e-9;
        }
        if (isGeoServer) {
            transformValue = 2.51528279553466e-9;
        }
    }
    return transformValue;
}