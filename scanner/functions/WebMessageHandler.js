function WebMessageHandler(webAuth) {
  this.webAuth = webAuth;
  this.warn = new Warn(webAuth.baseOptions);
}