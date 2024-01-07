function defineDegreeBoundsFunction( degreeFn, callback ){
  return function( includeLoops ){
    let ret;
    let nodes = this.nodes();

    for( let i = 0; i < nodes.length; i++ ){
      let ele = nodes[ i ];
      let degree = ele[ degreeFn ]( includeLoops );
      if( degree !== undefined && (ret === undefined || callback( degree, ret )) ){
        ret = degree;
      }
    }

    return ret;
  };
}