function clearPaths(observer, node) {
    delete node.____Path;
    Object.observe(node, observer);
    for (var key in node) {
      if (node.hasOwnProperty(key)) {
        var kid = node[key];
        if (kid instanceof Object) {
          clearPaths(observer, kid);
        }
      }
    }
  }