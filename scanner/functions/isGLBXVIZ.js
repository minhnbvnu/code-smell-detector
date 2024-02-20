function isGLBXVIZ(arrayBuffer) {
  const isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  // MAGIC_XVIZ is a deprecated magic header
  return isArrayBuffer && checkMagic(arrayBuffer, {magic: MAGIC_XVIZ, magicAlt: MAGIC_GLTF});
}