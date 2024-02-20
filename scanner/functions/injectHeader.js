function injectHeader(name, value, requestHeaders) {
  /**
   * @param {string} name - Name of the header to be inserted
   * @param {string} value - Value of the header to be inserted
   * @param {Object[]} requestHeaders - Provided by webRequest
   *   listeners in callback arg `details.requestHeader`
   * @param {string} requestHeaders[].name
   * @param {string} requestHeaders[].value
   */
  var headerIndex = requestHeaders.findIndex(
    x => x.name.toLowerCase() == name.toLowerCase());

  var newHeader = {name: name, value: value};
  if (headerIndex == -1)
    requestHeaders.push(newHeader);
  else
    requestHeaders[headerIndex] = newHeader;
}