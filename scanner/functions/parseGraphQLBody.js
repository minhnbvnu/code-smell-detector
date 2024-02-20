function parseGraphQLBody (body, indent, trim) {
  var bodySnippet = '',
    rawBody = JSON.stringify(body);
  bodySnippet += 'NSData *postData = [[NSData alloc] initWithData:[@"' + sanitize(rawBody, trim) + '" ' +
  'dataUsingEncoding:NSUTF8StringEncoding]];\n';
  bodySnippet += '[request setHTTPBody:postData];\n';
  return bodySnippet;
}