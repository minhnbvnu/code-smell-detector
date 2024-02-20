function getSnippetPostFormInOptions (url, style, hasParams, hasHeaders, requestTimeout, followRedirect) {
  let optionsSnipppet = buildOptionsSnippet(hasParams, hasHeaders, requestTimeout, followRedirect);
  if (optionsSnipppet !== '') {
    return `res <- postForm("${url}", .opts=list(${optionsSnipppet}),` +
    ` style = "${style}")\n`;
  }
  return `res <- postForm("${url}", style = "${style}")\n`;
}