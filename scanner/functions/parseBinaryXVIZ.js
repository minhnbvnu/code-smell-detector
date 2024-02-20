function parseBinaryXVIZ(arrayBuffer, opts) {
  if (
    (opts && opts.messageFormat === XVIZ_FORMAT.BINARY_PBE) ||
    checkMagic(arrayBuffer, {magic: MAGIC_PBE1})
  ) {
    return parsePBEXVIZ(arrayBuffer, opts);
  }

  const gltfParser = new GLTFParser();
  gltfParser.parse(arrayBuffer, {createImages: false});

  // TODO/ib - Fix when loaders.gl API is fixed
  let xviz = gltfParser.getApplicationData('xviz');

  if (xviz === undefined) {
    xviz = gltfParser.getExtension(XVIZ_GLTF_EXTENSION);
  }

  return xviz;
}