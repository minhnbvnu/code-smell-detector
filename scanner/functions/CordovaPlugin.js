function CordovaPlugin() {
  this.webAuth = null;
  this.version = version.raw;
  this.extensibilityPoints = ['popup.authorize', 'popup.getPopupHandler'];
}