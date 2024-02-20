function _extendBuffer(feature, size) {
    feature.vertices.length += size * feature.size;
    if (feature.normals) {
        feature.normals.length = feature.vertices.length;
    }
}