function getSnippetFooterSync (includeRequestOptions) {
  if (!includeRequestOptions) {
    return '$res = $client->send($request);\n' +
    'echo $res->getBody();\n';
  }
  return '$res = $client->send($request, $options);\n' +
  'echo $res->getBody();\n';
}