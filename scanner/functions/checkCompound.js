function checkCompound( ele, parentOk ){
  let _p = ele._private;
  let parents = _p.data.parent ? ele.parents() : null;

  if( parents ){ for( let i = 0; i < parents.length; i++ ){
    let parent = parents[ i ];

    if( !parentOk( parent ) ){ return false; }
  } }

  return true;
}