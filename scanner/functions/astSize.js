function astSize(node) {
    var size = 0;
    walk.simple(node, {
      Expression: function () {
        ++size;
      }
    });
    return size;
  }