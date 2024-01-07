function writeColorTextNode(node, color) {
  const rgba = asArray(color);
  const opacity = rgba.length == 4 ? rgba[3] : 1;
  /** @type {Array<string|number>} */
  const abgr = [opacity * 255, rgba[2], rgba[1], rgba[0]];
  for (let i = 0; i < 4; ++i) {
    const hex = Math.floor(/** @type {number} */ (abgr[i])).toString(16);
    abgr[i] = hex.length == 1 ? '0' + hex : hex;
  }
  writeStringTextNode(node, abgr.join(''));
}