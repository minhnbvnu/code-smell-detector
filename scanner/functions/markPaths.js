function markPaths(observer, node) {
    for (var key in node) {
      if (node.hasOwnProperty(key)) {
        var kid = node[key];
        if (kid instanceof Object) {
          Object.unobserve(kid, observer);
          kid.____Path = node.____Path + "/" + key;
          markPaths(observer, kid);
        }
      }
    }
  }