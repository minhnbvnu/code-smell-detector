function onBeforeSendHeadersCookie(details) {
  injectHeader('Cookie', '', details.requestHeaders);
  return {requestHeaders: details.requestHeaders};
}