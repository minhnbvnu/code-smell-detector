function getSnippetPostFormInParams (url, style, hasParams, hasHeaders, requestTimeout, followRedirect,
  filesInfo) {
  let optionsSnipppet = buildOptionsSnippet(false, hasHeaders, requestTimeout, followRedirect),
    fileRequestSnippet = buildFileRequestSnippet(filesInfo),
    paramsSnippet = hasParams ? '.params = params, ' : '';
  if (optionsSnipppet !== '') {
    return `res <- postForm("${url}", ${fileRequestSnippet}${paramsSnippet}.opts=list(${optionsSnipppet}),` +
    ` style = "${style}")\n`;
  }
  return `res <- postForm("${url}", ${fileRequestSnippet}${paramsSnippet}style = "${style}")\n`;
}