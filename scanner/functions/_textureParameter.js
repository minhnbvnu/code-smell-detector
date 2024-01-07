function _textureParameter(name, channel = true, vertexColor = true) {
    const result = {};
    result[`${name}Map`] = 'texture';
    result[`${name}MapTiling`] = 'vec2';
    result[`${name}MapOffset`] = 'vec2';
    result[`${name}MapRotation`] = 'number';
    result[`${name}MapUv`] = 'number';
    if (channel) {
        result[`${name}MapChannel`] = 'string';
        if (vertexColor) {
            result[`${name}VertexColor`] = 'boolean';
            result[`${name}VertexColorChannel`] = 'string';
        }
    }
    return result;
}