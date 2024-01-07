function found(node, cluster) {
    for (var n = 0; n < cluster.length; n++) {
      if (node === cluster[n]) {
        return true;
      }
    }
    return false;
  }