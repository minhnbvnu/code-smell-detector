function $HttpBackendProvider() {
  this.$get = ['$browser', '$window', '$document', '$xhrFactory', function($browser, $window, $document, $xhrFactory) {
    return createHttpBackend($browser, $xhrFactory, $browser.defer, $window.angular.callbacks, $document[0]);
  }];
}