function showLoader(options) {
    options = extend({}, $ionicLoadingConfig || {}, options || {});
    // use a default delay of 100 to avoid some issues reported on github
    // https://github.com/ionic-team/ionic/issues/3717
    var delay = options.delay || options.showDelay || 0;

    deregisterStateListener1();
    deregisterStateListener2();
    if (options.hideOnStateChange) {
      deregisterStateListener1 = $rootScope.$on('$stateChangeSuccess', hideLoader);
      deregisterStateListener2 = $rootScope.$on('$stateChangeError', hideLoader);
    }

    //If loading.show() was called previously, cancel it and show with our new options
    $timeout.cancel(loadingShowDelay);
    loadingShowDelay = $timeout(noop, delay);
    return loadingShowDelay.then(getLoader).then(function(loader) {
      return loader.show(options);
    });
  }