function getSnippetGetURL (url, hasHeaders, requestTimeout, followRedirect) {
  let optionsSnipppet = buildOptionsSnippet(false, hasHeaders, requestTimeout, followRedirect);

  if (optionsSnipppet !== '') {
    return `res <- getURL("${url}", .opts=list(${optionsSnipppet}))\n`;
  }
  return `res <- getURL("${url}")\n`;
}