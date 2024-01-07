function( method, length, getP, getQ, nodeP, nodeQ ){
  let impl;

  if( is.fn( method ) ){
    impl = method;
  } else {
    impl = distances[ method ] || distances.euclidean;
  }

  if( length === 0 && is.fn( method ) ){
    return impl( nodeP, nodeQ );
  } else {
    return impl( length, getP, getQ, nodeP, nodeQ );
  }
}