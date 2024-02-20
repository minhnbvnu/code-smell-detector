function getheaders (request, indentation) {
  var headerArray = request.toJSON().header,
    headerMap;

  if (!_.isEmpty(headerArray)) {
    headerArray = _.reject(headerArray, 'disabled');
    headerMap = _.map(headerArray, function (header) {
      return `${indentation}'${sanitize(header.key, 'header', true)}': ` +
            `'${sanitize(header.value, 'header')}'`;
    });
    return `headers = {\n${headerMap.join(',\n')}\n}\n`;
  }
  return 'headers = {}\n';
}