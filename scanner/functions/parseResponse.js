function parseResponse(responseString) {
  var headerLines, line, lines, parsedStatusLine, response;
  response = {};
  lines = responseString.split(/\r\n/);

  parsedStatusLine = parseStatusLine(lines.shift());
  response['protocolVersion'] = parsedStatusLine['protocol'];
  response['statusCode'] = parsedStatusLine['statusCode'];
  response['statusMessage'] = parsedStatusLine['statusMessage'];
  headerLines = [];
  while (lines.length > 0) {
    line = lines.shift();
    if (line === '') {
      break;
    }
    headerLines.push(line);
  }
  response['headers'] = parseHeaders(headerLines);
  response['body'] = lines.join('\r\n');
  return response;
}