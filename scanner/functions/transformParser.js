function transformParser (node) {
    return parseTransformString(node.getAttribute('data-fa-transform'));
  }