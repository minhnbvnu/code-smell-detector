function genArrayExpression(node, context) {
    genNodeListAsArray(node.elements, context);
  }