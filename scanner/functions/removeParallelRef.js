function removeParallelRef( pllEdge ){
    // removing an edge invalidates the traversal caches for the parallel edges
    pllEdge.clearTraversalCache();
  }