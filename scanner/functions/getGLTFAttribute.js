function getGLTFAttribute(data, gltfAttributeName) {
  return data.attributes[data.glTFAttributeMap[gltfAttributeName]];
}