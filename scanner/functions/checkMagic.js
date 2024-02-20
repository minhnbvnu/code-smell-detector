function checkMagic(glbArrayBuffer, options = {}) {
  const {magic, magicAlt} = options;

  // GLB Header
  const dataView = new DataView(glbArrayBuffer);
  const magic1 = dataView.getUint32(0, BE); // Magic number (the ASCII string 'glTF').

  return magic1 === magic || (magicAlt && magicAlt === magic1);
}