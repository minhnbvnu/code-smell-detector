function idEq(id) {
    return function (node) {
      return node.model.id === id;
    };
  }