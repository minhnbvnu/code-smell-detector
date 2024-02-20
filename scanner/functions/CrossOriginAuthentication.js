function CrossOriginAuthentication(webAuth, options) {
  this.webAuth = webAuth;
  this.baseOptions = options;
  this.request = new RequestBuilder(options);
  this.webMessageHandler = new WebMessageHandler(webAuth);
  this.storage = new Storage(options);
}