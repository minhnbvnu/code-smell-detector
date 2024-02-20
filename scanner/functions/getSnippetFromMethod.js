function getSnippetFromMethod (url, hasParams, hasHeaders, methodUC, mode, requestTimeout = 0) {
  let paramsSnippet = hasParams ? ', body = body' : '',
    headersSnippet = hasHeaders ? ', add_headers(headers)' : '',
    encodeSnippet = getEncodeSnippetByMode(mode),
    timeoutSnippet = requestTimeout ? `, timeout(${requestTimeout})` : '';

  return `res <- VERB("${methodUC}", url = "${url}"` +
    `${paramsSnippet}${headersSnippet}${encodeSnippet}${timeoutSnippet})\n\n`;
}