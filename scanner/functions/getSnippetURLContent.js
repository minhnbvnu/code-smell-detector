function getSnippetURLContent (url, hasParams, hasHeaders, requestTimeout, followRedirect, httpMethod) {
  let optionsSnipppet = buildOptionsSnippet(hasParams, hasHeaders, requestTimeout, followRedirect);
  if (optionsSnipppet !== '') {
    return `res <- getURLContent("${url}", customrequest = "${httpMethod}", ${optionsSnipppet})\n`;
  }
  return `res <- getURLContent("${url}", customrequest = "${httpMethod}")\n`;
}