function isPurePara(node) {
  return isPara(node) && !isLi(node);
}