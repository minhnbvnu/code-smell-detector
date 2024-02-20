function _setGeometryValues(feature, coord) {
    if (feature.normals) {
        coord.geodesicNormal.toArray(feature.normals, feature._pos);
    }

    feature._pushValues(coord.x, coord.y, coord.z);
}