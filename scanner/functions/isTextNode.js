function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}