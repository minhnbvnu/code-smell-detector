function getHeaders (request, indentation) {
  var headerArray = request.toJSON().header,
    headerMap;

  if (!_.isEmpty(headerArray)) {
    headerArray = _.reject(headerArray, 'disabled');
    headerMap = _.map(headerArray, function (header) {
      return `${indentation}--header '${sanitize(header.key, 'header', true)}: ` +
            `${sanitize(header.value, 'header')}' \\`;
    });
    return headerMap.join('\n');
  }
  return `${indentation}--header '' \\`;
}