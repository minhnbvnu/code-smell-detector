function _readTextureValueNearestFiltering(metadata, texture, vertexU, vertexV) {
    const coords = _convertUVtoTextureCoords(texture, vertexU, vertexV);

    const u = (coords.wu <= 0) ? coords.u1 : coords.u2;
    const v = (coords.wv <= 0) ? coords.v1 : coords.v2;

    return _readTextureValueAt(metadata, texture, u, v);
}