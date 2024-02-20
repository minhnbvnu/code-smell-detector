function HostedPages(client, options) {
  this.baseOptions = options;
  this.client = client;
  this.baseOptions.universalLoginPage = true;
  this.request = new RequestBuilder(this.baseOptions);

  this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  });
}