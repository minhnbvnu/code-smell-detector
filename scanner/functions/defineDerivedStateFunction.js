function defineDerivedStateFunction( specs ){
  let ok = specs.ok;
  let edgeOkViaNode = specs.edgeOkViaNode || specs.ok;
  let parentOk = specs.parentOk || specs.ok;

  return function(){
    let cy = this.cy();
    if( !cy.styleEnabled() ){ return true; }

    let ele = this[0];
    let hasCompoundNodes = cy.hasCompoundNodes();

    if( ele ){
      let _p = ele._private;

      if( !ok( ele ) ){ return false; }

      if( ele.isNode() ){
        return !hasCompoundNodes || checkCompound( ele, parentOk );
      } else {
        let src = _p.source;
        let tgt = _p.target;

        return ( edgeOkViaNode(src) && (!hasCompoundNodes || checkCompound(src, edgeOkViaNode)) ) &&
          ( src === tgt || ( edgeOkViaNode(tgt) && (!hasCompoundNodes || checkCompound(tgt, edgeOkViaNode)) ) );
      }
    }
  };
}