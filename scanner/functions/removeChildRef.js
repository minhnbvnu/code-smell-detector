function removeChildRef( parent, ele ){
    ele = ele[0];
    parent = parent[0];

    let children = parent._private.children;
    let pid = parent.id();

    util.removeFromArray( children, ele ); // remove parent => child ref

    ele._private.parent = null; // remove child => parent ref

    if( !alteredParents.ids[ pid ] ){
      alteredParents.ids[ pid ] = true;
      alteredParents.push( parent );
    }
  }