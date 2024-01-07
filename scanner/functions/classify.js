function classify(node, clusters) {
    var found = null;

    for (var c = 0; clusters.length; c++) {
      var cluster = clusters[c];
      for (var e = 0; e < cluster.length; e++) {
        if (node === cluster[e]) {
          found = c;
          return found;
        }
      }
    }
  }