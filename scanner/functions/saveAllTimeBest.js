function saveAllTimeBest() {
    g.eachNode(function(u, value) { allTimeBest[u] = value.order; });
  }