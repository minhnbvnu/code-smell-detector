function addParent( q, did, ele ){
  if( ele.isChild() ){
    let parent = ele._private.parent;

    if( !did.has( parent.id() ) ){
      q.push( parent );
    }
  }
}