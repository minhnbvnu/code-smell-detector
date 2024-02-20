function getSnippetFooterAsync (includeRequestOptions) {
  if (!includeRequestOptions) {
    return '$res = $client->sendAsync($request)->wait();\n' +
    'echo $res->getBody();\n';
  }
  return '$res = $client->sendAsync($request, $options)->wait();\n' +
  'echo $res->getBody();\n';
}