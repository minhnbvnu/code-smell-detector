function unpackAccessors(arrayBuffer, bufferViews, json) {
  // unpack accessors
  const accessors = json.accessors || [];

  const accessorBuffers = [];

  for (let i = 0; i < accessors.length; ++i) {
    const accessor = accessors[i];
    assert(accessor);

    const bufferView = bufferViews[accessor.bufferView];
    // Draco encoded meshes don't have bufferView in accessor
    if (bufferView) {
      // Create a new typed array as a view into the combined buffer
      const {ArrayType, length} = getAccessorArrayTypeAndLength(accessor, bufferView);
      const array = new ArrayType(arrayBuffer, bufferView.byteOffset, length);
      // Store the metadata on the array (e.g. needed to determine number of components per element)
      array.accessor = accessor;
      accessorBuffers.push(array);
    }
  }

  return accessorBuffers;
}