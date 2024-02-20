function isPBEXVIZ(arrayBuffer) {
  const isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  return isArrayBuffer && checkMagic(arrayBuffer, {magic: MAGIC_PBE1});
}