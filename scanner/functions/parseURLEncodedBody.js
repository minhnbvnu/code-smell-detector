function parseURLEncodedBody (body, mode, trim) {
  if (_.isEmpty(body)) {
    return '';
  }
  var payload, bodySnippet;
  payload = _.reduce(body, function (accumulator, data) {
    if (!data.disabled) {
      accumulator.push(`${sanitize(data.key, mode, trim)}=${sanitize(data.value, mode, trim)}`);
    }
    return accumulator;
  }, []).join('&');

  bodySnippet = `let parameters = "${payload}"\n`;
  bodySnippet += 'let postData =  parameters.data(using: .utf8)';
  return bodySnippet;
}