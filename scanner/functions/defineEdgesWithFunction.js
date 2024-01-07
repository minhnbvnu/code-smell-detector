function defineEdgesWithFunction( params ){

  return function edgesWithImpl( otherNodes ){
    let elements = [];
    let cy = this._private.cy;
    let p = params || {};

    // get elements if a selector is specified
    if( is.string( otherNodes ) ){
      otherNodes = cy.$( otherNodes );
    }

    for( let h = 0; h < otherNodes.length; h++ ){
      let edges = otherNodes[ h ]._private.edges;

      for( let i = 0; i < edges.length; i++ ){
        let edge = edges[ i ];
        let edgeData = edge._private.data;
        let thisToOther = this.hasElementWithId( edgeData.source ) && otherNodes.hasElementWithId( edgeData.target );
        let otherToThis = otherNodes.hasElementWithId( edgeData.source ) && this.hasElementWithId( edgeData.target );
        let edgeConnectsThisAndOther = thisToOther || otherToThis;

        if( !edgeConnectsThisAndOther ){ continue; }

        if( p.thisIsSrc || p.thisIsTgt ){
          if( p.thisIsSrc && !thisToOther ){ continue; }

          if( p.thisIsTgt && !otherToThis ){ continue; }
        }

        elements.push( edge );
      }
    }

    return this.spawn( elements, true );
  };
}