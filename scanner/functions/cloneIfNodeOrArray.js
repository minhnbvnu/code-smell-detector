function cloneIfNodeOrArray(obj, deep, withoutLoc) {
  if (Array.isArray(obj)) {
    return obj.map(node => cloneIfNode(node, deep, withoutLoc));
  }

  return cloneIfNode(obj, deep, withoutLoc);
}