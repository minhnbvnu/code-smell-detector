function readTextureValueWithBilinearFiltering(metadata, texture, vertexU, vertexV) {
    const coords = _convertUVtoTextureCoords(texture, vertexU, vertexV);

    const [z11, z21, z12, z22] = _readTextureValueAt(metadata, texture,
        coords.u1, coords.v1,
        coords.u2, coords.v1,
        coords.u1, coords.v2,
        coords.u2, coords.v2);


    // horizontal filtering
    const zu1 = _lerpWithUndefinedCheck(z11, z21, coords.wu);
    const zu2 = _lerpWithUndefinedCheck(z12, z22, coords.wu);
    // then vertical filtering
    return _lerpWithUndefinedCheck(zu1, zu2, coords.wv);
}