function cloneBufferAttribute(attribute) {

  if (attribute.isInterleavedBufferAttribute) {

    var count = attribute.count;
    var itemSize = attribute.itemSize;
    var array = attribute.array.slice(0, count * itemSize);

    for (var i = 0; i < count; ++i) {

      array[i] = attribute.getX(i);
      if (itemSize >= 2) array[i + 1] = attribute.getY(i);
      if (itemSize >= 3) array[i + 2] = attribute.getZ(i);
      if (itemSize >= 4) array[i + 3] = attribute.getW(i);

    }

    return new THREE.BufferAttribute(array, itemSize, attribute.normalized);

  }

  return attribute.clone();

}