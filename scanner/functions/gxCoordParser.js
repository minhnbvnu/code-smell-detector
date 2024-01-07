function gxCoordParser(node, objectStack) {
  const gxTrackObject =
    /** @type {GxTrackObject} */
    (objectStack[objectStack.length - 1]);
  const coordinates = gxTrackObject.coordinates;
  const s = getAllTextContent(node, false);
  const re =
    /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i;
  const m = re.exec(s);
  if (m) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    const z = parseFloat(m[3]);
    coordinates.push([x, y, z]);
  } else {
    coordinates.push([]);
  }
}