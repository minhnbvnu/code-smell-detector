function addConnectedEdges( node ){
    let edges = node._private.edges;
    for( let i = 0; i < edges.length; i++ ){
      add( edges[ i ] );
    }
  }