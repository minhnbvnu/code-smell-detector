function getSnippetRequestObject (method, url, hasBody, snippetHeaders) {
  if (hasBody && snippetHeaders !== '') {
    return `$request = new Request('${method}', '${url}', $headers, $body);\n`;
  }
  if (!hasBody && snippetHeaders !== '') {
    return `$request = new Request('${method}', '${url}', $headers);\n`;
  }
  if (hasBody && snippetHeaders === '') {
    return `$request = new Request('${method}', '${url}', [], $body);\n`;
  }
  return `$request = new Request('${method}', '${url}');\n`;
}