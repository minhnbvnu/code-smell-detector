function parseContentType (request) {
  if (request.body && request.body.mode === 'graphql') {
    return 'application/json';
  }
  return request.getHeaders({enabled: true, ignoreCase: true})['content-type'] || 'text/plain';
}