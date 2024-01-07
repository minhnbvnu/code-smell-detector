function defineDegreeFunction( callback ){
  return function( includeLoops ){
    let self = this;

    if( includeLoops === undefined ){
      includeLoops = true;
    }

    if( self.length === 0 ){ return; }

    if( self.isNode() && !self.removed() ){
      let degree = 0;
      let node = self[0];
      let connectedEdges = node._private.edges;

      for( let i = 0; i < connectedEdges.length; i++ ){
        let edge = connectedEdges[ i ];

        if( !includeLoops && edge.isLoop() ){
          continue;
        }

        degree += callback( node, edge );
      }

      return degree;
    } else {
      return;
    }
  };
}