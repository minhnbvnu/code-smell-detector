function addChildren(node, nodesToVisit) {
    if (node instanceof _primitives.Dict) {
      node = node.getRawValues();
    } else if ((0, _primitives.isStream)(node)) {
      node = node.dict.getRawValues();
    } else if (!Array.isArray(node)) {
      return;
    }

    for (const rawValue of node) {
      if (mayHaveChildren(rawValue)) {
        nodesToVisit.push(rawValue);
      }
    }
  }