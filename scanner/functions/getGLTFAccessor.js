function getGLTFAccessor(attribute, gltfAttributeName) {
  const {buffer, size, count} = getAccessorData(attribute, gltfAttributeName);

  const glTFAccessor = {
    // TODO: Deprecate `value` in favor of bufferView?
    value: buffer,
    size, // Decoded `type` (e.g. SCALAR)

    // glTF Accessor values
    // TODO: Instead of a bufferView index we could have an actual buffer (typed array)
    bufferView: null,
    byteOffset: 0,
    count,
    type: getAccessorTypeFromSize(size),
    componentType: getComponentTypeFromArray(buffer)
  };

  return glTFAccessor;
}