function getDepth(ele){
    let style = ele.pstyle( 'z-compound-depth' );
    if ( style.value === 'auto' ){
      return hasCompoundNodes ? ele.zDepth() : 0;
    } else if ( style.value === 'bottom' ){
      return -1;
    } else if ( style.value === 'top' ){
      return util.MAX_INT;
    }
    // 'orphan'
    return 0;
  }