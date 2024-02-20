function _cloneNode(deep, sourceNode, parentNode) {
  const clone = new sourceNode.constructor(sourceNode[symbols.windowSymbol]);
  clone.attrs = sourceNode.attrs;
  clone.tagName = sourceNode.tagName;
  clone.value = sourceNode.value;

  // Link the parent.
  if (parentNode) { clone.parentNode = parentNode; }

  // Copy children.
  if (deep) {
    clone.childNodes = new NodeList(
      sourceNode.childNodes.map(childNode =>
        _cloneNode(true, childNode, clone)
      )
    );
  }

  return clone;
}