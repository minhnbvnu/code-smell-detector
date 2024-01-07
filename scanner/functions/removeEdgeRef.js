function removeEdgeRef( node, edge ){
    let connectedEdges = node._private.edges;

    util.removeFromArray( connectedEdges, edge );

    // removing an edges invalidates the traversal cache for its nodes
    node.clearTraversalCache();
  }