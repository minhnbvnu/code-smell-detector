function b64UriToB64( b64uri ){
  var i = b64uri.indexOf(',');

  return b64uri.substr( i + 1 );
}