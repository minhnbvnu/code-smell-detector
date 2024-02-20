function encodeBinaryXVIZ(xvizJson, options) {
  const gltfBuilder = new GLTFBuilder(options);

  // Pack appropriate large data elements (point clouds and images) in binary
  const packedData = packBinaryJson(xvizJson, gltfBuilder, null, options);

  // As permitted by glTF, we put all XVIZ data in a top-level subfield.
  const {useAVSXVIZExtension} = options;
  if (useAVSXVIZExtension === true) {
    gltfBuilder.addExtension(XVIZ_GLTF_EXTENSION, packedData, {nopack: true});
  } else {
    gltfBuilder.addApplicationData('xviz', packedData, {nopack: true});
  }

  return gltfBuilder.encodeAsGLB(options);
}