function bindOptionalNode() {
  // this hack allows to keep bindOptionalNode as compact as possible
  // and doesn't require to flip args and support all bindNode variations
  bindNode.temporaryOptionalFlag = true;
  return apply(bindNode, this, arguments);
}