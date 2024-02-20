function SilentAuthenticationHandler(options) {
  this.authenticationUrl = options.authenticationUrl;
  this.timeout = options.timeout || 60 * 1000;
  this.handler = null;
  this.postMessageDataType = options.postMessageDataType || false;

  // prefer origin from options, fallback to origin from browser, and some browsers (for example MS Edge) don't support origin; fallback to construct origin manually
  this.postMessageOrigin =
    options.postMessageOrigin ||
    windowHelper.getWindow().location.origin ||
    windowHelper.getWindow().location.protocol +
      '//' +
      windowHelper.getWindow().location.hostname +
      (windowHelper.getWindow().location.port
        ? ':' + windowHelper.getWindow().location.port
        : '');
}