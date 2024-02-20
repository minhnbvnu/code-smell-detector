function _complete() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        $rootScope.$broadcast('cfpLoadingBar:completed');
        _set(1);

        $timeout.cancel(completeTimeout);

        // Attempt to aggregate any start/complete calls within 500ms:
        completeTimeout = $timeout(function() {
          var promise = $animate.leave(loadingBarContainer, _completeAnimation);
          if (promise && promise.then) {
            promise.then(_completeAnimation);
          }
          $animate.leave(spinner);
        }, 500);
      }