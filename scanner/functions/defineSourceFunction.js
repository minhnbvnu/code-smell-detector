function defineSourceFunction( params ){
  return function sourceImpl( selector ){
    let sources = [];

    for( let i = 0; i < this.length; i++ ){
      let ele = this[ i ];
      let src = ele._private[ params.attr ];

      if( src ){
        sources.push( src );
      }
    }

    return this.spawn( sources, true ).filter( selector );
  };
}