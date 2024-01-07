function forEachCompound( eles, fn, includeSelf, recursiveStep ){
  let q = [];
  let did = new Set();
  let cy = eles.cy();
  let hasCompounds = cy.hasCompoundNodes();

  for( let i = 0; i < eles.length; i++ ){
    let ele = eles[i];

    if( includeSelf ){
      q.push( ele );
    } else if( hasCompounds ){
      recursiveStep( q, did, ele );
    }
  }

  while( q.length > 0 ){
    let ele = q.shift();

    fn( ele );

    did.add( ele.id() );

    if( hasCompounds ){
      recursiveStep( q, did, ele );
    }
  }

  return eles;
}