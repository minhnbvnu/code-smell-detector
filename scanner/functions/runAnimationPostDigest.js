function runAnimationPostDigest(fn) {
      var cancelFn, defer = $$q.defer();
      defer.promise.$$cancelFn = function ngAnimateMaybeCancel() {
        cancelFn && cancelFn();
      };

      $rootScope.$$postDigest(function ngAnimatePostDigest() {
        cancelFn = fn(function ngAnimateNotifyComplete() {
          defer.resolve();
        });
      });

      return defer.promise;
    }