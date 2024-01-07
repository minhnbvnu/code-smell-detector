function whenParser(node, objectStack) {
  const gxTrackObject =
    /** @type {GxTrackObject} */
    (objectStack[objectStack.length - 1]);
  const whens = gxTrackObject.whens;
  const s = getAllTextContent(node, false);
  const when = Date.parse(s);
  whens.push(isNaN(when) ? 0 : when);
}