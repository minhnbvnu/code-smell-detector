function getPosition( node ){
    if( options.positions == null ){
      return copyPosition( node.position() );
    }

    if( posIsFn ){
      return options.positions( node );
    }

    let pos = options.positions[ node._private.data.id ];

    if( pos == null ){
      return null;
    }

    return pos;
  }