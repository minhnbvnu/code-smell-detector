function getSnippetClient (options) {
  if (options) {
    let connectionTimeout = options.requestTimeout,
      followRedirect = options.followRedirect,
      clientOptions = [];
    if (connectionTimeout && connectionTimeout !== 0) {
      clientOptions.push({ key: guzzleTimeout, value: connectionTimeout });
    }
    if (followRedirect === false) {
      clientOptions.push({ key: guzzleAllowRedirects, value: followRedirect });
    }
    if (clientOptions.length > 0) {
      let snippetArrayOptions = getSnippetArray(clientOptions, getIndentation(options), false) + '\n';
      return `$client = new Client(${snippetArrayOptions});\n`;
    }
  }
  return '$client = new Client();\n';
}