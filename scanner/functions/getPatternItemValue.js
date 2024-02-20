function getPatternItemValue(node, patternItem) {
  return node.type === Syntax.ObjectPattern
    ? patternItem.value
    : patternItem;
}