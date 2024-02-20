function isSpacePoint(point) {
  if (!isText(point.node)) {
    return false;
  }

  var ch = point.node.nodeValue.charAt(point.offset - 1);
  return ch === ' ' || ch === NBSP_CHAR;
}