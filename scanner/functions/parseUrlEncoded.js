function parseUrlEncoded (body, indent, trim) {
  var bodySnippet = 'request.bodyFields = {',
    enabledBodyList = _.reject(body, 'disabled'),
    bodyDataMap;
  if (!_.isEmpty(enabledBodyList)) {
    bodyDataMap = _.map(enabledBodyList, function (value) {
      return `${indent}'${sanitize(value.key, trim)}': '${sanitize(value.value, trim)}'`;
    });
    bodySnippet += '\n' + bodyDataMap.join(',\n') + '\n';
  }
  bodySnippet += '};';
  return bodySnippet;
}