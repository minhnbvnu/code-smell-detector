function updateConflicts(v) {
      var k = pos[v];
      if (k < k0 || k > k1) {
        conflicts[undirEdgeId(currLayer[l], v)] = true;
      }
    }