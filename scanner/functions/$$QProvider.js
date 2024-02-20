function $$QProvider() {
  this.$get = ['$browser', '$exceptionHandler', function($browser, $exceptionHandler) {
    return qFactory(function(callback) {
      $browser.defer(callback);
    }, $exceptionHandler);
  }];
}