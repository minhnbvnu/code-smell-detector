function parseRawBody (body, mode, trim) {
  if (_.isEmpty(body)) {
    return '';
  }
  var bodySnippet;
  bodySnippet = `let parameters = ${sanitize(body, mode, trim)}\n`;
  bodySnippet += 'let postData = parameters.data(using: .utf8)';
  return bodySnippet;
}