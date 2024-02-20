function isBinaryXVIZ(arrayBuffer) {
  const isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  return (
    isArrayBuffer &&
    (checkMagic(arrayBuffer, {magic: MAGIC_XVIZ, magicAlt: MAGIC_GLTF}) ||
      checkMagic(arrayBuffer, {magic: MAGIC_PBE1}))
  );
}