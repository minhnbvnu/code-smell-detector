function packBinaryJsonTypedArray(gltfBuilder, object, objectKey, info) {
  if (gltfBuilder.isImage(object) || (info && info.isImage)) {
    const imageIndex = gltfBuilder.addImage(object);
    return `#/images/${imageIndex}`;
  }
  // if not an image, pack as accessor
  const opts = info && info.size ? {size: info.size} : {size: 3};
  const bufferIndex = gltfBuilder.addBuffer(object, opts);
  return `#/accessors/${bufferIndex}`;
}