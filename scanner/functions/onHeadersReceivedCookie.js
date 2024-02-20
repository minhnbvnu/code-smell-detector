function onHeadersReceivedCookie(details) {
  details.responseHeaders.forEach(function(responseHeader) {
    if (responseHeader.name.toLowerCase() == 'set-cookie') {
      responseHeader.value = '';
    }
  });
  return {
    responseHeaders: details.responseHeaders
  };
}