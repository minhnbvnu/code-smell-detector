function getSnippetRequest (url, method, style, hasParams, hasHeaders, contentTypeHeaderValue,
  request, requestTimeout, followRedirect, filesInfo) {
  const methodUC = method.toUpperCase();
  if (methodUC === 'GET') {
    return getSnippetGetURL(url, hasHeaders, requestTimeout, followRedirect);
  }
  if (methodUC === 'POST' && request.body && request.body.mode === 'file') {
    return getSnippetPostFormInOptions(url, 'post', hasParams, hasHeaders, requestTimeout, followRedirect);
  }
  if (methodUC === 'POST' && contentTypeHeaderValue === 'application/x-www-form-urlencoded' ||
    contentTypeHeaderValue === 'multipart/form-data' || filesInfo !== undefined) {
    return getSnippetPostFormInParams(url, style, hasParams, hasHeaders, requestTimeout, followRedirect,
      filesInfo);
  }
  if (methodUC === 'POST') {
    return getSnippetPostFormInOptions(url, style, hasParams, hasHeaders, requestTimeout, followRedirect);
  }
  if (methodUC === 'PUT') {
    return getSnippetPut(url, hasParams, hasHeaders, requestTimeout, followRedirect);
  }
  if (methodUC === 'DELETE') {
    return getSnippetDelete(url, hasParams, hasHeaders, requestTimeout, followRedirect);
  }
  return getSnippetURLContent(url, hasParams, hasHeaders, requestTimeout, followRedirect, methodUC);
}