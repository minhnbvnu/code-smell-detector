function hideLoader() {
    deregisterStateListener1();
    deregisterStateListener2();
    $timeout.cancel(loadingShowDelay);
    return getLoader().then(function(loader) {
      return loader.hide();
    });
  }