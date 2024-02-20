function hierarchy(d) {
      var nodes = [];
      recurse(d, 0, nodes);
      return nodes;
    }