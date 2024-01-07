function getEleDepth(ele){
    let style = ele.pstyle( 'z-index-compare' );
    if ( style.value === 'auto' ){
      return ele.isNode() ? 1 : 0;
    }
    // 'manual'
    return 0;
  }