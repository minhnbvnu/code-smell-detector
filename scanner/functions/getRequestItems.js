function getRequestItems(options) {
  var returnObject = { requestMethod: 'GET', urlRequested: '', headers: '' };
  if (options !== null) {
    var parsedOptions;
    switch (typeof options) {
      case 'object':
        returnObject.urlRequested = formatURL(options);
        parsedOptions = options;
        break;
      case 'string':
        returnObject.urlRequested = options;
        parsedOptions = url.parse(options);
        break;
    }
    if (parsedOptions.method) { returnObject.requestMethod = parsedOptions.method; }
    if (parsedOptions.headers) { returnObject.headers = parsedOptions.headers; }
  }
  return returnObject;
}