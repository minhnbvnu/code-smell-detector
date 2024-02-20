function includeBody (request, snippetBody) {
  if (_.isEmpty(request.body) || snippetBody === '' || snippetBody.startsWith('$options')) {
    return false;
  }
  return true;
}