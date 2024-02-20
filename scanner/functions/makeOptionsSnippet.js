function makeOptionsSnippet (urlOrigin, options, indentString, headers) {
  let userAgentHeader,
    snippet = `var options = new RestClientOptions("${sanitize(urlOrigin)}")\n{\n`;
  if (Array.isArray(headers)) {
    userAgentHeader = headers.find((header) => {
      return (!header.disabled && sanitize(header.key, true).toLowerCase() === 'user-agent');

    });
  }
  if (options.requestTimeout) {
    snippet += `${indentString}MaxTimeout = ${options.requestTimeout},\n`;
  }
  else {
    snippet += `${indentString}MaxTimeout = -1,\n`;
  }
  if (!options.followRedirect) {
    snippet += `${indentString}FollowRedirects = false,\n`;
  }
  if (userAgentHeader) {
    snippet += `${indentString}UserAgent = "${userAgentHeader.value}",\n`;
  }
  snippet += '};\n';
  return snippet;
}