function increaseZoom() {
  var webview = document.querySelector('webview');
  webview.getZoom(function(zoomFactor) {
    var nextHigherZoom = getNextPresetZoom(zoomFactor).high;
    webview.setZoom(nextHigherZoom);
    document.forms['zoom-form']['zoom-text'].value = nextHigherZoom.toString();
  });
}