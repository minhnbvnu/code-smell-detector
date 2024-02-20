function getSnippetDelete (url, hasParams, hasHeaders, requestTimeout, followRedirect) {
  let optionsSnipppet = buildOptionsSnippet(hasParams, hasHeaders, requestTimeout, followRedirect);
  if (optionsSnipppet !== '') {
    return `res <- httpDELETE("${url}", ${optionsSnipppet})\n`;
  }
  return `res <- httpDELETE("${url}")\n`;
}