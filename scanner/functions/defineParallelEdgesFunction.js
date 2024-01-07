function defineParallelEdgesFunction( params ){
  let defaults = {
    codirected: false
  };
  params = util.extend( {}, defaults, params );

  return function parallelEdgesImpl( selector ){ // micro-optimised for renderer
    let elements = [];
    let edges = this.edges();
    let p = params;

    // look at all the edges in the collection
    for( let i = 0; i < edges.length; i++ ){
      let edge1 = edges[ i ];
      let edge1_p = edge1._private;
      let src1 = edge1_p.source;
      let srcid1 = src1._private.data.id;
      let tgtid1 = edge1_p.data.target;
      let srcEdges1 = src1._private.edges;

      // look at edges connected to the src node of this edge
      for( let j = 0; j < srcEdges1.length; j++ ){
        let edge2 = srcEdges1[ j ];
        let edge2data = edge2._private.data;
        let tgtid2 = edge2data.target;
        let srcid2 = edge2data.source;

        let codirected = tgtid2 === tgtid1 && srcid2 === srcid1;
        let oppdirected = srcid1 === tgtid2 && tgtid1 === srcid2;

        if( (p.codirected && codirected) || (!p.codirected && (codirected || oppdirected)) ){
          elements.push( edge2 );
        }
      }
    }

    return this.spawn( elements, true ).filter( selector );
  };

}