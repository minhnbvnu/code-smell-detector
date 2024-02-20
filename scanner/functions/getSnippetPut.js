function getSnippetPut (url, hasParams, hasHeaders, requestTimeout, followRedirect) {
  let optionsSnipppet = buildOptionsSnippet(false, hasHeaders, requestTimeout, followRedirect);
  if (optionsSnipppet !== '' && hasParams) {
    return `res <- httpPUT("${url}", params, ${optionsSnipppet})\n`;
  }
  else if (optionsSnipppet !== '' && !hasParams) {
    return `res <- httpPUT("${url}", ${optionsSnipppet})\n`;
  }
  else if (optionsSnipppet === '' && hasParams) {
    return `res <- httpPUT("${url}", params)\n`;
  }
  else if (optionsSnipppet === '' && !hasParams) {
    return `res <- httpPUT("${url}")\n`;
  }
  return '';
}